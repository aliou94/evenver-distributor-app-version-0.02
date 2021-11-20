import * as React from "react";
import {
    Create, Datagrid,
    SimpleForm, TextField,
    TextInput,
} from 'react-admin';
import {useTranslate} from "ra-core";

const MerchandiseCreate = props => {
    const translate = useTranslate()
    return(
            <Create {...props} title={translate("help.createMerchandise")} riderect="List">
                <SimpleForm>
                    <TextInput source="name" label="help.category" />
                    <TextInput source="category"  label="help.name" />
                    <TextInput source="price"  label="price" />
                </SimpleForm>
            </Create>

    )
}

export default MerchandiseCreate