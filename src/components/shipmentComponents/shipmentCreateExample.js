import * as React from "react";
import {SimpleForm,TextInput,ArrayInput,SimpleFormIterator,NumberInput,
    Create, Toolbar,SaveButton,ReferenceInput,SelectInput}
    from 'react-admin';
import {DataGrid} from '@material-ui/data-grid';
//import { Button } from '@material-ui/core';
//import {useFormState} from "react-final-form";


const SaveButtoun = (props)=>(
    <Toolbar {...props} >
        <SaveButton
            label="save"
            redirect="Edit"
            submitOnEnter={true}
        />
    </Toolbar>
)


const ShipmentExample= (props)  => {
    let permissions = localStorage.getItem("fullName")
    console.log(permissions)

    const divStyle = {
        display: 'none',
    };

   const Sample = ()=>{

       return(
           [
               {
                   id: 1,
                   merchandise : {
                       category:" tilapia",
                       id:"555",
                       name:"carp"
                   },
                   quantity : {
                       count:5,
                       merchandiseUnit:"box"
                   }

               },
               {
                   id: 2,
                   merchandise: {
                       category :"fish",
                       id:"555",
                       name:"carp"
                   },
                   quantity: {
                       count:5,
                       merchandiseUnit: "box"
                   }
               }
           ]
       )
   }

    const columns = [
        { field: 'quantity.count', headerName: 'quantity', width: 130,
        valueGetter: (params) =>
            params.row.quantity.count
        },
        {
            field: 'merchandise',
            headerName: 'merchandise',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                params.row.merchandise.name
        },
    ];




    const transform = data => {

      console.log(data.merchandise)
        return({
            ...data,
            createdOn:"02/02/1999",
            merchandise: Sample()
        });
    }

    const Selectmerchsndise = ()=>{

        return(
         <>
             <ReferenceInput source="merchandise.merchandise.category" reference="merchandisemanagement/merchandise"
                             label="select merchandise">
                 <SelectInput optionValue="category" optionText={(record)=>{
                     let x = record
                     // console.log(x), this  will be needed at the tiome of creating merchsndise
                     return record.category
                 }}/>
             </ReferenceInput>
         </>

        )
    }

    return (
        <Create {...props} transform={transform}>
            <SimpleForm toolbar={<SaveButton/>}>
                <TextInput source="createdBy" initialValue={permissions} style={divStyle}/>
                <TextInput source="Bol"/>
                <Selectmerchsndise/>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={Sample()} columns={columns} pageSize={5}/>
                </div>
            </SimpleForm>
        </Create>
    );
}

export const shipmentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="createdBy"  />
            <ArrayInput source="merchandise">
                <SimpleFormIterator>
                    <TextInput source="merchandise.category" />
                    <NumberInput source="quantity.count" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="id" />
        </SimpleForm>
    </Create>
);


export  default  ShipmentExample