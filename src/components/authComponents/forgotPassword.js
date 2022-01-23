import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import Usestyles from "../../makeStyles";
import { useTranslate, useNotify} from 'ra-core';
import {Notification} from "react-admin";
import {
    Avatar,
    Button,
    Card,
    CardActions,
} from '@material-ui/core';
import Input from "../../inputComponent";
import LockIcon from "@material-ui/icons/Lock";
import ConfirmPassCode from "./confirmPassCode";
import {useState} from "react";

const ForgotPasswordForm = function (props) {
    const [displayConfirmPasscodePage , setdisplayConfirmPasscodePage] = useState(false);
    const [email,setEmail] = useState('');
    let notify = useNotify();
    let translate = useTranslate();
    let classes = Usestyles(props);
    let validate = function (values) {
        let errors = { email:undefined};
        if (!values.email) {
            errors.email = translate('ra.validation.required');
        }
        return errors;
    };
let submit = ({email}) => {
    const request = new Request('http://localhost:8080/evendistributor/usermanagement/password-reset', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    });
        fetch(request)
            .then(response => {

                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(resetPasswordResponse => {
                if(resetPasswordResponse.status==="SUCCESS"){
                    return(
                        setdisplayConfirmPasscodePage(true),
                            setEmail(email)
                    )
                }else{
                    notify(translate('notify.error.email'))
                }

            });
    }

if(displayConfirmPasscodePage){
    return (
        <ConfirmPassCode email={email}/>
    )
}
    else {
        return (
            <Form onSubmit={submit} validate={validate}
                  render={(_a) => {
                      let handleSubmit = _a.handleSubmit;
return   (
  <form onSubmit={handleSubmit}  >
  <div className={classes.main}>
      <Card className={classes.card}>
          <div className={classes.form}>
              <div className={classes.avatar}>
                  <Avatar className={classes.icon}>
                      <LockIcon />
      </Avatar>
      </div>
      <h2 className={classes.a}>{translate('help.forgotPassword')}</h2>
      <p className={classes.a}>{translate('help.email')}</p>
      <div className={classes.input}>
          <Field
              autoFocus
              name="email"
              component={Input}
              label={translate('auth.email')}
          />
      </div>
          </div>
          <CardActions className={classes.actions}>
              <Button
                  variant="contained"
                  type="submit"
                  color="primary"
              >
                  {translate('action.requestPassCode')}
              </Button>
          </CardActions>
      </Card>
      <Notification />
      </div>
  </form>
)
}} />
)
    }

};

ForgotPasswordForm.propTypes = {
    redirectTo: PropTypes.string,
};

export default ForgotPasswordForm;