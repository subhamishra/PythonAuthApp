import React from 'react';
import { withTranslation } from 'react-i18next';
import { FormControl, InputLabel, Input, FormHelperText, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik } from 'formik';

const okButtonStyle = {
    width: "160px",
    textTransform: 'capitalize',
    borderRadius: "24px"
}
const registerButtonStyle = {
    width: "160px",
    textTransform: 'capitalize',
    borderRadius: "24px",
    backgroundColor: 'grey',
}

const actionStyle = {
    justifyContent: 'center'
}


class Login extends React.Component {

    render () {
        const { t } = this.props;

        return (
            <React.Fragment>
                 <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = t(`messages.required`);
                        } 
                        if (!values.password) {
                            errors.password = t(`messages.required`);
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        setTimeout(() => {
                            this.props.handleLogin(values)
                            setSubmitting(false);
                        }, 1000);
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
                        <form  onSubmit={handleSubmit} style={{color: 'white'}}>
                            <DialogContent style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                <FormControl margin="normal" error={errors.email && touched.email} fullWidth>
                                    <InputLabel htmlFor="email" style={{ color: 'white',fontWeight: 'bold', fontSize: 'large' }} >{t(`labels.email_address`)}</InputLabel>
                                    <Input style={{ color: 'wheat' }} name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} autoComplete="off"/>
                                    {errors.email && touched.email && <FormHelperText id="component-error-text">{errors.email}</FormHelperText>}
                                </FormControl>
                                <FormControl margin="normal" error={errors.password && touched.password} fullWidth>
                                    <InputLabel htmlFor="password" style={{ color: 'white',fontWeight: 'bold', fontSize: 'large' }} >{t(`labels.password`)}</InputLabel>
                                    <Input style={{ color: 'wheat' }} type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} autoComplete="off"/>
                                    {errors.password && touched.password && <FormHelperText id="component-error-text">{errors.password}</FormHelperText>}
                                </FormControl>
                            </DialogContent>
                            <DialogActions style={actionStyle}>
                                <Button onClick={() => this.props.handleRegister()} variant="contained" color="secondary"
                                    style={registerButtonStyle} autoFocus>
                                    Register
                                </Button>
                                <Button disabled={isSubmitting} type="submit" variant="contained" color="secondary"
                                    style={okButtonStyle} autoFocus>
                                    Login
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </React.Fragment>
        )
    }
}

export default withTranslation('common')(Login);