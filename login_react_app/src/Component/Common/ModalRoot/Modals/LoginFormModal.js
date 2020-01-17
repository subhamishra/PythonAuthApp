import React from 'react';
import { DialogTitle, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import { hideModal } from '../../../../actions/modals';
import { saveUserData } from '../../../../actions/users';
import LoginForm from '../../../Login';
import { login } from '../../../../api/login';
import { withRouter } from 'react-router-dom'

const closeButtonStyle = {
    position: 'absolute',
    top: '2%',
    right: '2%'
}

class LoginFormModal extends React.Component {

    handleRegister = () => {
        const { hideModal, modalAttributes } = this.props;
        hideModal();
        if(modalAttributes.handleRegister){
            modalAttributes.handleRegister()
        }
    }

    handleLogin = (values) => {
        const { hideModal, saveUserData, modalAttributes } = this.props;

        login({ "username": values.email, "password": values.password })
            .then(result => {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                saveUserData(result.user);
                hideModal();
                if(modalAttributes.handleLogin){
                    modalAttributes.handleLogin();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { hideModal } = this.props;

        return (
            <React.Fragment>
                <DialogTitle style={{ color: 'white' }}>
                    Login Form
                    <IconButton aria-label="Close" style={closeButtonStyle} onClick={() => hideModal()}>
                        <Close style={{ width: '1rem', height: '1rem', color: 'white' }} />
                    </IconButton>
                </DialogTitle>
                <LoginForm handleLogin={this.handleLogin} handleRegister={this.handleRegister} />
            </React.Fragment>
        );
    };
}

const mapDispatchToProps = {
    hideModal,
    saveUserData
}

export default withRouter(connect(null, mapDispatchToProps)(LoginFormModal));