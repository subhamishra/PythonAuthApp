import React from 'react';
import { withTranslation } from 'react-i18next';
import { FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Button } from '@material-ui/core';
import { Formik } from 'formik';
import MainLayout from '../Common/MainLayout';
import { API } from '../../api';
import { withRouter } from 'react-router-dom'

const registerButtonStyle = {
    width: "160px",
    textTransform: 'capitalize',
    borderRadius: "24px"
}



class Register extends React.Component {

    render () {
        const { t } = this.props;

        return (
            <React.Fragment>
                <MainLayout>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = t(`messages.required`);
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = t(`messages.invalid_email`);
                            }
                            if (!values.password) {
                                errors.password = t(`messages.required`);
                            }
                            if (!values.username) {
                                errors.username = t(`messages.required`);
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                API.post('register', values, { responseType: 'text', headers: { 'content-type': 'application/json' } })
                                    .then(result => {
                                        this.props.history.push('/Home');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            }, 400);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form  onSubmit={handleSubmit} style={{color: 'white', height: '100%', width: '100%' }}>
                                <Grid container style={{ justifyContent: 'flex-end', height: '100%' }} spacing={24}>
                                    <Grid item xs={5} style={{ textAlign: 'left', height: '100%', padding: '10px' }}>
                                        <Paper style={{ backgroundColor: '#394963', width: '100%', height: '100%', opacity: '0.7' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 50px)', overflowX: 'auto'}}>
                                                <Grid container style={{ padding: '0px 50px'}}>
                                                    <FormControl margin="normal" error={errors.email && touched.email} fullWidth>
                                                        <InputLabel htmlFor="email" style={{ color: 'white',fontWeight: 'bold', fontSize: 'large' }} >{t(`labels.email_address`)}</InputLabel>
                                                        <Input style={{ color: 'wheat' }} type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} autoComplete="off"/>
                                                        {errors.email && touched.email && <FormHelperText id="component-error-text">{errors.email}</FormHelperText>}
                                                    </FormControl>
                                                </Grid>
                                                <Grid container style={{ padding: '0px 50px'}}>
                                                    <FormControl margin="normal" error={errors.email && touched.email} fullWidth>
                                                        <InputLabel htmlFor="first_name" style={{ color: 'white',fontWeight: 'bold', fontSize: 'large' }} >{t(`labels.first_name`)}</InputLabel>
                                                        <Input style={{ color: 'wheat' }} name="first_name" onChange={handleChange} onBlur={handleBlur} value={values.first_name} autoComplete="off"/>
                                                        {errors.first_name && touched.first_name && <FormHelperText id="component-error-text">{errors.first_name}</FormHelperText>}
                                                    </FormControl>
                                                </Grid>
                                                <Grid container style={{ padding: '0px 50px'}}>
                                                    <FormControl margin="normal" error={errors.last_name && touched.last_name} fullWidth>
                                                        <InputLabel htmlFor="last_name" style={{ color: 'white',fontWeight: 'bold', fontSize: 'large' }} >{t(`labels.last_name`)}</InputLabel>
                                                        <Input style={{ color: 'wheat' }} name="last_name" onChange={handleChange} onBlur={handleBlur} value={values.last_name} autoComplete="off"/>
                                                        {errors.last_name && touched.last_name && <FormHelperText id="component-error-text">{errors.last_name}</FormHelperText>}
                                                    </FormControl>
                                                </Grid>
                                                <Grid container style={{ padding: '0px 50px'}} >
                                                    <FormControl margin="normal" error={errors.username && touched.username} fullWidth>
                                                        <InputLabel htmlFor="username" style={{ color: 'white',fontWeight: 'bold', fontSize: 'large' }} >{t(`labels.username`)}</InputLabel>
                                                        <Input style={{ color: 'wheat' }} type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username} autoComplete="off"/>
                                                        {errors.username && touched.username && <FormHelperText id="component-error-text">{errors.username}</FormHelperText>}
                                                    </FormControl>
                                                </Grid>
                                                <Grid container style={{ padding: '0px 50px'}} >
                                                    <FormControl margin="normal" error={errors.password && touched.password} fullWidth>
                                                        <InputLabel htmlFor="password" style={{ color: 'white',fontWeight: 'bold', fontSize: 'large' }} >{t(`labels.password`)}</InputLabel>
                                                        <Input style={{ color: 'wheat' }} type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} autoComplete="off"/>
                                                        {errors.password && touched.password && <FormHelperText id="component-error-text">{errors.password}</FormHelperText>}
                                                    </FormControl>
                                                </Grid>
                                            </div>
                                            <div style={{ display: 'flex', paddingRight: '10px', flexDirection: 'column', alignItems: 'flex-end', height: '50px'}}>
                                                <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}
                                                    style={registerButtonStyle} autoFocus>
                                                    Register
                                                </Button>
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </MainLayout>
            </React.Fragment>
        )
    }
}

export default withRouter(withTranslation('common')(Register));