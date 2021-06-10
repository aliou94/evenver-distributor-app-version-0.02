import * as React from "react";
import { Route } from 'react-router-dom';
import ForgotPasswordForm from "./components/authComponents/forgotPassword";
import ResetPassword from "./components/authComponents/resetPassword";
import RegistrationForm from "./components/authComponents/Registration";
import ConfirmPassCode from "./components/authComponents/confirmPassCode";
import Configuration from "./components/layoutComponents/Configuration";
import ClientList from "./components/distributionComponents/clientSelection";


export default [
    <Route exact path="/forgotPassword" component={ForgotPasswordForm} noLayout />,
    <Route exact path="/resetPassword"  component={ResetPassword} noLayout />,
    <Route exact path="/Registration"  component={RegistrationForm} noLayout />,
    <Route exact path="/confirmation"  component={ConfirmPassCode} noLayout />,
    <Route exact path="/configuration" component={Configuration}/>,
    <Route exact path="/sample" component={ClientList}/>,
];