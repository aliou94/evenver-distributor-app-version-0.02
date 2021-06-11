import * as React from "react";
import {
    TabbedForm,
    FormTab,
    SelectInput
} from 'react-admin';
import {useState} from "react";



const RepartitioningMode = ({handleRepartitionMode}) => {

    return(
        <SelectInput
            source="repartition"

            choices={[
                { id: 'Total stock', name: 'Total stock' },
                { id: 'Shipment', name: 'Shipment' },
            ]}
            parse={v =>{

                handleRepartitionMode(v)
                //seting a repartition mode upon selection console.log(repartitionMode)
                return v
            }}
        />
    )
}

export const PostEdit = (props) => {

    let [RepartitionMode, setRepartitionMode] = useState("")

    return (

        <TabbedForm>
            <FormTab label="select repartition mode">
                <RepartitioningMode handleRepartitionMode={setRepartitionMode}/>
            </FormTab>

            <FormTab label={`select merchandise/${RepartitionMode}`}>
            </FormTab>


            <FormTab label="Miscellaneous">

            </FormTab>
            <FormTab label="comments">

            </FormTab>
        </TabbedForm>

    );
}

const MerchandiseSelection = ()=>{


    return (

        <div>
       <PostEdit />
        </div>
    )


}


export  default  MerchandiseSelection