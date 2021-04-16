import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import Usestyles from "../../makeStyles";
import {useTranslate,useNotify} from 'ra-core';
import {
    Button,
    Card,
    CardActions,
} from '@material-ui/core';
import Input from "../../inputComponent";
import LoginForm from "./loginForm";
import {useState} from "react";

const ResetPassword = function(props){
    const [showLoginForm,setshowLoginForm] = useState(false)
    let email = props.email;
    let translate = useTranslate();
    let notify = useNotify();
    let classes = Usestyles(props);

    let submit = function ({userPassword,password}) {
        console.log(userPassword)
        if(userPassword===password){
            const request = new Request('http://localhost:8080/evendistributor/usermanagement/users', {
                method: 'PATCH',
                body: JSON.stringify({userPassword,email}),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            return fetch(request)
                .then(response => {
                    console.log(response)
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(resetPasswordResponse => {
                    console.log(resetPasswordResponse.status)
                        return(
                            notify(translate('help.update')),
                                setshowLoginForm(true)
                        )
                });
        } else notify(translate('help.misMatch'))
    };
    let validate = function ({password,userPassword}) {
        let errors = { userPassword: undefined, password:undefined,};
        if (!userPassword) {
            errors.userPassword = translate('ra.validation.required');
        }
        if (!password) {
            errors.password = translate('ra.validation.required');
        }

        return errors;
    };
    if(showLoginForm){
        return (
            <LoginForm/>
        )} else
        return (
            <Form onSubmit={submit} validate={validate}
                  render={(_a) => {
                      let handleSubmit = _a.handleSubmit;
                      return   (
                          <form onSubmit={handleSubmit}  >
                              <div className={classes.main}>
                                  <Card className={classes.card}>
                                      <h2 className={classes.a}> {translate('help.resetHeader')}</h2>
                                      <p className={classes.a}> {translate('help.reset')}</p>
                                      <div className={classes.form}>
                                          <div className={classes.input}>
                                              <Field
                                                  autoFocus
                                                  name="password"
                                                  component={Input}
                                                  label={translate('auth.password')}
                                                  type="password"
                                              />
                                          </div>
                                          <div className={classes.input}>
                                              <Field
                                                  autoFocus
                                                  name="userPassword"
                                                  component={Input}
                                                  label={translate('auth.confirmPassword')}
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
                                              {translate('action.changePassword')}
                                          </Button>
                                      </CardActions>
                                  </Card>
                              </div>
                          </form>
                      )
                  }} />
        )
}

ResetPassword.propTypes = {
    redirectTo: PropTypes.string,
};

export default ResetPassword;

