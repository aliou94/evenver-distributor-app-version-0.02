import * as React from 'react';
import {Field, Form} from 'react-final-form';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslate, useNotify} from 'ra-core';
import {Button, MenuItem, InputLabel, Select, Card, CardActions} from '@material-ui/core';
import {Notification, required} from "react-admin";
import Input from "../../inputComponent";
import {useState} from "react";
import LoginForm from "./loginForm";

let useStyles = makeStyles(function (theme) {
    return {
        main: {
            "display": 'flex',
            "flexDirection": 'column',
            "minHeight": '100vh',
            "alignItems": 'center',
            "justifyContent": 'flex-start',
            "backgroundSize": 'cover',
        },

        card: {
            minWidth: 300,
            marginTop: '3em',
        },


        form: {
            padding: '0 1em 1em 1em',

        },
        input: {
            marginTop: '1em',
            margin: '1em',
            float: 'left'
        },

        button: {
            width: '100%',
        },
        a: {
            marginTop: '1em',
            display: 'flex',
            justifyContent: 'center',
            color: theme.palette.grey[500],
        },

        actions: {
            padding: '0 1em 1em 1em',
        },

    };
}, {name: 'RaLoginForm'});

let Cell = ({type, change}) => {
    let classes = useStyles();
    let translate = useTranslate();

    return (
        <div>
            <div className={classes.input}>
                <InputLabel id="label">Tel type</InputLabel>
                <Select labelId="label" id="select" value={type} onChange={change}  name="phoneContacts[0].type">
                    <MenuItem value="cell">{translate('auth.cell')}</MenuItem>
                    <MenuItem value="land">{translate('auth.land')}</MenuItem>
                    <MenuItem value="office">{translate('auth.office')}</MenuItem>
                </Select>
            </div>
            <div className={classes.input}>
                <Field
                    autoFocus
                    name="phoneContacts[0].number"
                    component={Input}
                    label={translate('auth.phoneNumber')}
                />
            </div>
            <div className={classes.input}>
                <Field
                    autoFocus
                    name="phoneContacts[0].provider"
                    component={Input}
                    label='Operator'
                    validate={required(translate('ra.validation.required'))}
                />
            </div>
        </div>

    )
}

let Land = ({type, change}) => {
    let classes = useStyles();
    let translate = useTranslate()
    return (
        <div className={classes.input}>
            <div className={classes.input}>
                <InputLabel id="label">Tel type</InputLabel>
                <Select labelId="label" id="select" value={type} onChange={change}>
                    <MenuItem value="cell">{translate('auth.cell')}</MenuItem>
                    <MenuItem value="land">{translate('auth.land')}</MenuItem>
                    <MenuItem value="office">{translate('auth.office')}</MenuItem>
                </Select>
            </div>
            <div className={classes.input}>
                <Field
                    autoFocus
                    name="cell"
                    component={Input}
                    label={translate('auth.phoneNumber')}
                />
            </div>
        </div>
    )
}

let Office = ({type, change}) => {
    let classes = useStyles();
    let translate = useTranslate();
    return (
        <div className={classes.input}>
            <div className={classes.input}>
                <InputLabel id="label">Tel type</InputLabel>
                <Select labelId="label" id="select" value={type} onChange={change}>
                    <MenuItem value="cell">{translate('auth.cell')}</MenuItem>
                    <MenuItem value="land">{translate('auth.land')}</MenuItem>
                    <MenuItem value="office">{translate('auth.office')}</MenuItem>
                </Select>
            </div>
            <div className={classes.input}>
                <Field
                    autoFocus
                    name="cell"
                    component={Input}
                    label={translate('auth.phoneNumber')}
                />
            </div>
        </div>
    )
}

const Options = () => {
    const [type, setType] = useState('cell')
    const handleChange = (event) => {
        setType(event.target.value);
    };
    if (type === 'cell') {
        return (
            <Cell type={type} change={handleChange}/>
        )
    } else if (type === 'land') {
        return (
            <Land type={type} change={handleChange}/>
        )
    } else {
        return <Office type={type} change={handleChange}/>
    }

}


let RegistrationForm = function (props) {

    let notify = useNotify();
    let classes = useStyles(props);
    let [showLoginForm, setLoginForm] = useState(false);
    let translate = useTranslate();

    let  validate = function (values) {

        let errors = { email: undefined,
            firstName: undefined,
            lastName:undefined,
            cell:undefined,
            userPassword:undefined,
            password:undefined,
            city:undefined
        };

        if (!values.email) {
            errors.email = translate('ra.validation.required');
        }
        if (!values.firstName) {
            errors.firstName= translate('ra.validation.required');
        }
        if (!values.lastName) {
            errors.lastName = translate('ra.validation.required');
        }
        if (!values.userPassword) {
            errors.userPassword = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

function submit({email, userPassword, password, firstName, lastName,phoneContacts, }) {

        if (userPassword === password) {
            const request = new Request(window.encodeURI('http://localhost:8080/evendistributor/usermanagement/users'), {
                method: 'POST',
                body: JSON.stringify({email, userPassword, firstName, lastName, phoneContacts}),
                headers: new Headers({'Content-Type': 'application/json'}),
            });

            fetch(request)
                .then(response => {
                    return response.json();
                })
                .then(authorisedResponse => {
                    setLoginForm(true)
                    notify(translate('help.approval'))

                });
        } else notify(translate('help.misMatch'))
    };

    if (showLoginForm) {
        return <LoginForm/>
    }

return (
        <Form onSubmit={submit} validate={validate}
              render={(_a) => {
                  let handleSubmit = _a.handleSubmit;
                  return (
          <form onSubmit={handleSubmit} className={classes.main}>
              <Card className={classes.card}>
                  <h2 className={classes.a}>~{translate('link.register')}~</h2>
                  <p className={classes.a}>{translate('link.register')}</p>
                  <div className={classes.form}>
                      <div>
                          <Field
                              autoFocus
                              name="firstName"
                              component={Input}
                              label={translate('auth.firstName')}
                          />
                      </div>

                      <div>
                          <Field
                              autoFocus
                              name="lastName"
                              component={Input}
                              label={translate('auth.lastName')}
                          />
                      </div>
                      <div>
                          <Field
                              autoFocus
                              name="email"
                              component={Input}
                              label='Email'
                          />
                      </div>
                      <div>
                          <Options/>
                      </div>
                      <div>
                          <Field
                              autoFocus
                              name="userPassword"
                              component={Input}
                              label={translate('ra.auth.password')}
                              type='password'
                          />
                          <Field
                              autoFocus
                              name="password"
                              component={Input}
                              label={translate('auth.confirmPassword')}
                              type='password'
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
                          {translate('link.register')}
                      </Button>
                  </CardActions>
                  <Notification/>
              </Card>
              <div className={classes.a}>{translate('help.sign_in')}<a
                  href="#/LoginForm"> {translate("ra.auth.sign_in")}</a></div>
          </form>
      )
              }}/>
)
}


export default RegistrationForm