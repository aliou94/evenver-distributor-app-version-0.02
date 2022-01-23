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
import {Notification} from "react-admin";
import {useState} from "react";
import ResetPassword from "./resetPassword";


const ConfirmPassCode = function (props) {

    const [showResetPassword,setshowResetPassword] = useState('');
    let notify = useNotify();
    let translate = useTranslate();
    let classes = Usestyles(props);

    let submit = function ({email=props.email,passcode}) {

        const request = new Request('http://localhost:8080/evendistributor/usermanagement/password-validate', {
            method: 'POST',
            body: JSON.stringify({email,passcode}),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {

                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(validatePasswordResponse => {

                if(validatePasswordResponse.status==="SUCCESS"){
                    return(
                        setshowResetPassword("SUCCESS")
                    )
                } else{
                    notify(translate('notify.error.passCode'))
                }
            });
    };
    let validate = function ({passcode}) {
        let errors = { passcode: undefined};
        if (!passcode) {
            errors.passcode = translate('ra.validation.required');
        }
        return errors;
    };
    if(showResetPassword==="SUCCESS"){
        return (
            <ResetPassword email={props.email}/>
        )
    }
    return(
        <Form onSubmit={submit} validate={validate}
              render={(_a) => {
                  let handleSubmit = _a.handleSubmit;
                  return   (
                      <form onSubmit={handleSubmit}  >
                          <div className={classes.main}>
                              <Card className={classes.card}>
                                  <h2 className={classes.a}>{translate('help.verify')}</h2>
                                  <p className={classes.a}>{translate('help.verifyInstructions')} </p>
                                  <div className={classes.form}>
                                      <div className={classes.input}>
                                          <Field
                                              autoFocus
                                              name="passcode"
                                              component={Input}
                                              label={translate('help.passCode')}
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
                                          {translate('action.verify')}
                                      </Button>
                                  </CardActions>
                              </Card>
                              <Notification/>
                          </div>
                      </form>
                  )
              }}/>
    )
};

ConfirmPassCode.propTypes = {
    redirectTo: PropTypes.string,
};

export default ConfirmPassCode