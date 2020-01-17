import React, { useState } from 'react';
import { Grid, Typography, IconButton, Popover, MenuItem } from '@material-ui/core';
import { AccountCircle, PowerSettingsNew, ScreenLockRotation } from '@material-ui/icons';
import { API } from '../../api';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { saveUserData } from '../../actions/users';

const UserBoard = (props) => {
    let [anchorEl, handleMenu] = useState(null);

    const handleLogout = () => {
        API.post('logout', {}, { responseType: 'text', headers: { 'content-type': 'application/json' } })
            .then(result => {
                localStorage.clear();
                props.history.push('/')
                props.dispatch(saveUserData({}));
            })
    }

    return (
        <React.Fragment>
            <Grid container >
                <Grid item xs={3} >
                    <IconButton
                        aria-owns={Boolean(anchorEl) ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={(evt) => handleMenu(evt.currentTarget)}
                        color="secondary"
                        style={{ padding: '0px'}}
                    >
                        <AccountCircle style={{ fontSize: '35px', color: 'black' }} />
                    </IconButton>
                    <Popover
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={() => handleMenu(null)}
                    >
                        <MenuItem onClick={() => {}} style={{ marginLeft: "-10px" }}>
                            <AccountCircle style={{ padding: "10px", fontSize: "25px", color: "#b6b6b6" }}/>
                            { props.user.first_name }
                        </MenuItem>
                        <MenuItem onClick={() => {}} style={{ marginLeft: "-10px" }}>
                            <ScreenLockRotation style={{ padding: "10px", fontSize: "25px", color: "#b6b6b6" }} />
                            Change Password
                        </MenuItem>
                        <MenuItem id="logout-button" onClick={handleLogout} style={{ marginLeft: "-10px" }}>
                            <PowerSettingsNew style={{ padding: "10px", fontSize: "25px", color: "#b6b6b6" }} />
                            Logout
                        </MenuItem>
                    </Popover>
                </Grid>
                <Grid item xs={9} style={{ textAlign: 'left', paddingLeft: '5px' }} >
                    <Typography variant="h6" style={{ fontSize: '1.3rem', fontWeight: 600, color: 'white' }}>
                        Welcome, { props.user.first_name + " " + props.user.last_name }
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default withRouter(connect()(UserBoard));