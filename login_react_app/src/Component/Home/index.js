import React from 'react';
import MainLayout from '../Common/MainLayout';
import { Grid } from '@material-ui/core';

class Home extends React.Component {

    state = {
        users: []
    }

    render(){
        return (
            <MainLayout key="home" >
                <Grid container >
                    {
                     }
                </Grid>
            </MainLayout>
        )
    }
}



export default Home;
