import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ArrayField,
    SingleFieldList,
    ChipField,
    usePermissions,
} from 'react-admin';
import {useTranslate} from "ra-core";

export const FullNameFiled = ({record}) => {
    return(
            <div>{record.firstName} {record.lastName}</div>
    )
 }

 export const Clientlist = props => {
    const permission = usePermissions()
    //console.log(permission.permissions)
    let translate = useTranslate()
    return(
        <List {...props}
              title={translate('help.titleClient')}
              bulkActionButtons={false}
        >
            <Datagrid>
                <FullNameFiled label="auth.fullName"/>
                <ArrayField source="phoneContacts" label="auth.phoneNumber"><SingleFieldList><ChipField source="number" /></SingleFieldList></ArrayField>
                <TextField source="address.city" label="help.City"/>
                <TextField source="address.state" label="help.State"/>
                <ArrayField source="pendingCredit" label="help.pendingCredit"><SingleFieldList><ChipField source="value" /></SingleFieldList></ArrayField>
                <ArrayField source="acceptedCredit" label="help.availableCredit"><SingleFieldList><ChipField source="value" /></SingleFieldList></ArrayField>
                {
                    (permission.permissions==="DISTRIBUTOR")
                    ? null
                    :<EditButton label="help.Add"/>
                }
                />
            </Datagrid>
        </List>
    )
};





