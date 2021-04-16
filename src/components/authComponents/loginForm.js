import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import Usestyles from "../../makeStyles";
import { useTranslate, useLogin, useNotify, useSafeSetState} from 'ra-core';
import {
    Avatar,
    Button,
    Card,
    CardActions,
} from '@material-ui/core';
import LockIcon from "@material-ui/icons/Lock";
import {Notification} from "react-admin";
import Input from "../../inputComponent";

let LoginForm = function (props) {
    let _a = useSafeSetState(false), setLoading = _a[1];
    let login = useLogin();
    let translate = useTranslate();
    let notify = useNotify();
    let classes = Usestyles(props);
    let validate = function (values) {
        let errors = { email: undefined, password: undefined };
        if (!values.email) {
            errors.email = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };
    let submit = function (values) {
        setLoading(true);
        login(values)
            .then(function () {
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                notify(typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message, 'warning');
            });
    };
    return <>
       <Form onSubmit={submit} validate={validate}
             render={(_a) => {
                 let handleSubmit = _a.handleSubmit;
                 return   <div className={classes.main}>
                     <form onSubmit={handleSubmit}  >
                             <Card className={classes.card}>
                                 <div className={classes.avatar}>
                                     <Avatar className={classes.icon}>
                                         <LockIcon />
                                     </Avatar>
                                 </div>
                                 <div className={classes.form}>
                                     <div className={classes.input}>
                                         <Field
                                             autoFocus
                                             name="email"
                                             component={Input}
                                             label={translate('auth.email',{ smart_count: 2,})}
                                             type='text'
                                         />
                                     </div>
                                     <div className={classes.input}>
                                         <Field
                                             id="password"
                                             name="password"
                                             // @ts-ignore
                                             component={Input}
                                             label={translate('ra.auth.password')}
                                             type="password"
                                         />
                                     </div>
                                 </div>
                                 <CardActions className={classes.actions}>
                                     <Button
                                         variant="contained"
                                         type="submit"
                                         color="primary"
                                         fullWidth
                                     >
                                         {translate("ra.auth.sign_in")}
                                     </Button>
                                 </CardActions>
                                 <Notification/>
                             </Card>
                     </form>
                     </div>
             }} />
             <div className={classes.rel}>
            <p>
                <a className={classes.a} href="#/ForgotPassword">
                    {translate("link.resetPassword",{ smart_count: 2,})}
                </a>

                <a className={classes.a} href="#/Registration">
                    {translate("link.register",{ smart_count: 2,})}
                </a>
            </p>
        </div>
        </>
};

LoginForm.propTypes = {
    redirectTo: PropTypes.string,
};
export default LoginForm;