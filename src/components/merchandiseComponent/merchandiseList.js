import * as React from "react";
import {
    List, Datagrid, TextField,
    EditButton, usePermissions
} from 'react-admin';
import {useTranslate} from "ra-core";


const MerchandiseList = props => {
    const permission = usePermissions()
    let translate = useTranslate()
    return(
        <List {...props}  title={translate("help.listOfMerchandise")} bulkActionButtons={false}>
                <Datagrid rowClick="edit">
                    <TextField source="name" label="help.category"/>
                    <TextField source="category" label="help.name"/>
                    //create a help.price
                    <TextField source="price.value" label="help.price"/>
                    <TextField source="price.currencyCode" label="help.currency"/>
                    {
                        (permission.permissions==="ADMIN")
                            ?<EditButton label="help.Modify"/>
                            : null
                    }
                </Datagrid>
            </List>
    )
}

export  default MerchandiseList










