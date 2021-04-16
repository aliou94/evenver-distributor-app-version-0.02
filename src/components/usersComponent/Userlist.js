import * as React from "react";
import { Fragment} from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Filter,
    SelectInput
} from 'react-admin';
//import { useTranslate} from 'ra-core';


const UserFilter = (props) => (
    <Filter {...props} >
        <SelectInput
            source='role'
            choices={[
        { id:'OPERATOR', name:'operator' },
        { id:'ADMIN', name:'admin' },
        { id:'CLIENT', name:'client' },
        { id:'DISTRIBUTOR', name:'distributor' }
    ]}
        alwaysOn/>
    </Filter>
);

export const UserList = (props) =>{
   // let translate = useTranslate()
    return  (
<Fragment>
    <List
        {...props}
        title="help.titleUser"
        actions={false}
        bulkActionButtons={false}
        sort={{ field: 'role', order: 'DESC',  sort:'role'}}
        filters={<UserFilter/>}
    >
        <Datagrid>
            <TextField source="firstName" label="auth.firstName" />
            <TextField source="lastName" label="auth.lastName" />
            <TextField source="role"/>
            <TextField source="status"/>
            <TextField source="phoneContacts.number" label="auth.phoneNumber"/>
            <EditButton/>
        </Datagrid>
    </List>
</Fragment>
    );
}