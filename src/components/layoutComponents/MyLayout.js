import Menu from "./Menu";
import React from "react";
import {Layout } from 'react-admin';
import MyAppBar from './MyAppBar';

const MyLayout = (props)=>
    <Layout{...props}
           appBar={MyAppBar}
           menu={Menu}
    />
export default MyLayout;