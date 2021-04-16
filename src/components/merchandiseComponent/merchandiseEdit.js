import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
} from 'react-admin';

export const MerchandiseIdentification = ({record}) =>{
    let id = record.id
    console.log(id)
    return(
        <div>{record.category}</div>
    )
}
const MerchandiseEdit = props => (
    <Edit {...props}  title={<MerchandiseIdentification/>}>
        <SimpleForm>
            <TextInput source="category" label="help.category" />
            <TextInput source="name" label="help.name"/>
        </SimpleForm>
    </Edit>
);

export default MerchandiseEdit