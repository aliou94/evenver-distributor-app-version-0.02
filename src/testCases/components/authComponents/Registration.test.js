import * as React from 'react'
import RegistrationForm from "../../../components/authComponents/Registration";
//import {translate} from  '@ra-core/lib/translate';
import {validate} from "../../../components/authComponents/Registration";
import withTranslate from "react-admin"
import {Component} from "react";



test('validation without values returns required message', () => {
    let values = {
        email:"",
        firstName:"firstName"
    }
   let error = validate(values,"fr")
    expect(error.email).toBe("email requis");
    expect(error.firstName).toBe(undefined);
});


