import React, { Component } from 'react';
import { Dialog } from '@material-ui/core';
import { connect } from 'react-redux';
import { hideModal, hideNestedModal } from '../../../actions/modals';
import _ from 'lodash';
import { default as modalTypes } from './Modals';
import { BrowserRouter } from 'react-router-dom';

const MODAL_TYPES = {
    'login-form-modal': modalTypes.LoginFormModal,
  }

class ModalRoot extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: true
        }
    }
    
    getDialogProps = () => {
        const { resource, params, nestedResource, nestedParams, hideModal, hideNestedModal, isNested } = this.props;

        return {
            resource: isNested? nestedResource : resource,
            params: isNested? nestedParams : params,
            hideModalFn: isNested? hideNestedModal : hideModal
        };
    }

    render(){
        const { resource, params, hideModalFn }  = this.getDialogProps();

        if(!_.isEmpty(resource)){
            const SpecifiedModal = MODAL_TYPES[resource];
            const fullScreenMode =  resource.includes('full-screen');

            return(
                <BrowserRouter>
                    <Dialog fullScreen={fullScreenMode} id={params.modalId || "modal-box"} open={true} onClose={ hideModalFn } maxWidth='md' PaperProps={(params.paperProps && params.paperProps) || {}}>
                        <SpecifiedModal modalAttributes={params} />
                    </Dialog>
                </BrowserRouter>
            )
        }else{
            return null
        } 
    }    
}

const mapStateToProps = ({ modals: { resource, params, nestedResource, nestedParams } }) => {        
    return {
        resource,
        params,
        nestedResource,
        nestedParams
    }
}

const mapDispatchToProps = {
    hideModal,
    hideNestedModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);