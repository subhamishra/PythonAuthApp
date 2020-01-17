import React from 'react';
import { Grid, Typography, Fab } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import _ from 'lodash'
import UserBoard from '../User/UserBoard';
import { authenticate } from '../../helpers/common';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


const Header = ({ t, handleLoginClick, user, saveUserData }) => {

    let localUser = authenticate();

    if(_.isEmpty(user) && localUser){
        saveUserData(localUser)
    }

    return (
        <Grid container className="header-container" >
            <Grid item xs={8} style={{ paddingLeft: '20px' }} >
                <Typography id="header" variant="h3" style={{ fontWeight: 'bold', fontSize: 'xx-large', color: 'white' }} >
                    Demo Login App
                </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign:"right", paddingRight: '20px' }} >
                {localUser ?
                    <UserBoard user={user} />
                :
                <Fab
                    type="button"
                    variant="extended"
                    color="default"
                    mini="true"
                    style={{
                        width: '100px',
                        height: '35px',
                        backgroundColor: 'green',
                        color: 'white',
                    }}
                    onClick = {handleLoginClick}
                >
                    {t("common:labels.login")}
                </Fab>
                    
                }
            </Grid>
        </Grid>
    )
}

const mapStateToProps = ({ users }) => {
    return {
        user: users.user
    }
}

export default withRouter(connect(mapStateToProps)(withTranslation('common')(Header)));