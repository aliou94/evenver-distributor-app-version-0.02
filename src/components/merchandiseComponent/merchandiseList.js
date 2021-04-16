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
                    <TextField source="category" label="help.category"/>
                    <TextField source="name" label="help.name"/>
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










