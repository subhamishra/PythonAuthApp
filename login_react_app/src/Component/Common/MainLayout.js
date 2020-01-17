import React from 'react';
import './index.css'
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modals';
import { withRouter } from 'react-router-dom';
import { saveUserData } from '../../actions/users';

class MainLayout extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            pathname: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.location.pathname !== prevState.pathname){

            return { pathname: nextProps.location.pathname }
        }

        return null;
    }

    handleLoginClick = () => {
        this.props.showModal({
            resource: 'login-form-modal',
            handleLogin: () => { this.props.history.push('/Home') },
            handleRegister: () => { this.props.history.push('/register') },
            paperProps: {
                style: {
                    backgroundColor:'#394963',
                    opacity: '0.7',
                    width: '400px',
                    height: '500px'
                }
            } 
        })
    }

    render () {
        const { saveUserData } = this.props;

        return (
            <React.Fragment>
                <div className="main" >
                    <Header handleLoginClick={this.handleLoginClick} user={this.props.user} saveUserData={saveUserData} />
                    <div className="body-content" >
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    showModal,
    saveUserData
}

export default withRouter(connect(null, mapDispatchToProps)(MainLayout));