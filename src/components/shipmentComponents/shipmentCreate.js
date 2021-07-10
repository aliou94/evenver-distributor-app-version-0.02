import React, {useCallback, useEffect, useState} from 'react'

import {
    ReferenceInput, SelectInput,
    Create, SimpleForm, TextInput, NumberInput,
    SaveButton, SimpleFormIterator
} from 'react-admin';

import RichTextInput from 'ra-input-rich-text';

import {useFormState, useForm} from 'react-final-form';

import {Button} from '@material-ui/core';

import {DataGrid} from '@material-ui/data-grid'

import ConfirmationDialogRaw from "./dialogueBox";

import {useTranslate} from 'ra-core';

let isOpen = false

let
    currentEntry, newEntry, duplicatedItem, duplicateIndex, revisedDataMerchandise


let merchandiseIdentification = []


const MerchandiseDataGrid = (props) => {

    const translate = useTranslate()

    const columns = [
        {field: 'merchandise', headerName: translate("help.merchandise"), width: 130},
        {field: 'quantity', headerName: translate("help.quantity"), width: 130},
        {field: 'merchandiseUnit', headerName: "unit", width: 130},
    ]

    let MerchandiseSelection = props.merchandiseArray.map((item) => {
        let invoiceArray = {};
        invoiceArray.id = item.merchandise.category
        invoiceArray.merchandise = item.merchandise.category
        invoiceArray.quantity = item.quantity.count
        invoiceArray.merchandiseUnit = item.quantity.merchandiseUnit
        //console.log(invoiceArray)
        return invoiceArray
    })

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={MerchandiseSelection}
                columns={columns}
                pageSize={5}
                rowCount={5}
            />
        </div>
    )
}

const MerchandiseStockValidationForm = () => {

    const translate = useTranslate()
    const form = useForm()
    const {values} = useFormState()

    const [MerchandiseData, setCount] = useState([])
    const [option, setOption] = useState("cancel")
    let [open, setOpen] = useState(true)
    let [ ShipmentIdentification, setShipmentIdentification] = useState()

    const resetForm = useCallback(() => {
        form.change('merchandise.merchandise.category', null);
        form.change('merchandise.quantity.count', null);
        form.change('merchandise.quantity.merchandiseUnit', null);
        form.change("merchandise.merchandise.id")
    }, [form]);



    const checkForDuplicates = () => {
        let pureArray = []
        MerchandiseData.forEach((item) => pureArray.push(item.merchandise.category))
        isOpen = (new Set(pureArray).size !== pureArray.length)
        // console.log(pureArray)
        //console.log(pureArray.includes(values.merchandise.merchandise.category))
        if (isOpen === true) {
            setOpen(true)
            duplicatedItem = values.merchandise.merchandise.category
            duplicateIndex = pureArray.indexOf(duplicatedItem)
            newEntry = values.merchandise.quantity.count
            currentEntry = MerchandiseData[duplicateIndex].quantity.count
        }
        return revisedDataMerchandise = MerchandiseData
    }

    const handleDuplicate = () => {
        if (option === "sum") {
            MerchandiseData[duplicateIndex].quantity.count = parseFloat(currentEntry) + parseFloat(newEntry)
            return (
                setCount(MerchandiseData.slice(0, MerchandiseData.length - 1)),
                    revisedDataMerchandise = revisedDataMerchandise.slice(0, revisedDataMerchandise.length - 1),
                    isOpen = false
            )
        } else if (option === "update") {
            MerchandiseData[duplicateIndex].quantity.count = parseFloat(newEntry)
            return (
                setCount(MerchandiseData.slice(0, MerchandiseData.length - 1)),
                    revisedDataMerchandise = revisedDataMerchandise.slice(0, revisedDataMerchandise.length - 1),
                    isOpen = false
            )
        } else if (option === "cancel") {
            if (MerchandiseData[duplicateIndex] !== undefined)
                MerchandiseData[duplicateIndex].quantity.count = parseFloat(currentEntry)
            return (
                setCount(MerchandiseData.slice(0, MerchandiseData.length - 1)),
                    revisedDataMerchandise = revisedDataMerchandise.slice(0, revisedDataMerchandise.length - 1),
                    isOpen = false
            )
        }
        return (
            setCount(MerchandiseData.slice(0, MerchandiseData.length - 1)),
                revisedDataMerchandise = revisedDataMerchandise.slice(0, revisedDataMerchandise.length - 1),
                revisedDataMerchandise = MerchandiseData
        )
    }

    const decisionMaking = (event) => setOption(event.target.value)

    const generateID = (data, category) => {
        let verifiedObjectIndex = data.findIndex(x => x.category === category)
        console.log(data)
        if (verifiedObjectIndex >= 0) setShipmentIdentification(data[verifiedObjectIndex].id)
        // console.log(setShipmentIdentification)
    }

    const handleClose = () => setOpen(false)

    const AddMerchandise = () => {
        setCount(prevState => prevState.concat(values.merchandise))
        MerchandiseData.push(values.merchandise)
        checkForDuplicates()
        // setShipmentIdentification(null)
        resetForm()

    }



    return (
        <>
            <ReferenceInput source="merchandise.merchandise.category" reference="merchandisemanagement/merchandise"
                            label={translate("help.select")}>
                <SelectInput source="category" optionValue="category" optionText={(record) => {

                    merchandiseIdentification.push(record)
                    if(values.merchandise&&!values.merchandise.merchandise){
                        return  null
                    }
                    if (values.merchandise) generateID(merchandiseIdentification, values.merchandise.merchandise.category)
                    return (
                        record.category
                    )
                }}/>
            </ReferenceInput>
            {'  '}
            < NumberInput source="merchandise.quantity.count" label={translate("help.quantity")} parse={v => v}
                          min="0"/>
            {' '}
            <TextInput source="merchandise.merchandise.id" initialValue={ShipmentIdentification}
                       style={{display: "none"}}/>
            <SelectInput source="merchandise.quantity.merchandiseUnit" label="merchandise unit" choices={[
                { id: 'kg', name: "kg"},
                { id: 'box', name: "box" },
            ]} />
            <div>
                <Button color="secondary"
                        disabled={
                           ! values.merchandise
                           || !values.merchandise.quantity
                           || !values.merchandise.merchandise
                           || !values.merchandise.quantity.merchandiseUnit
                           || values.merchandise.merchandise.id === undefined
                        }
                        onClick={AddMerchandise}
                >
                    {translate("help.Add")}
                </Button>
            </div>
            <MerchandiseDataGrid merchandiseArray={MerchandiseData}/>
            <br/>
            {isOpen &&
            <ConfirmationDialogRaw
                open={open} value={option} newentry={newEntry}
                currententry={currentEntry} onClose={handleClose}
                handleSelection={decisionMaking} handleCount={handleDuplicate}
                duplicatedItem={duplicatedItem}
            />
            }
        </>
    )

}

const transform = data => {
    return ({
        ...data,
        merchandise: revisedDataMerchandise
    });
}

const ShipmentCreate = props => {
    let permission = localStorage.getItem("permission")
    let translate = useTranslate()

    return (
        <Create {...props} title={translate("help.shipment")} transform={transform}>
            <SimpleForm toolbar={<SaveButton/>}>
                <TextInput source="createdBy" initialValue={permission} style={{display: 'none'}}/>
                <TextInput source="boatNumber"/>
                <TextInput source="signature" initialValue={permission} disabled/>
                <RichTextInput source="description" parse={v => v}/>
                <MerchandiseStockValidationForm/>
            </SimpleForm>
        </Create>
    );
}

export default ShipmentCreate

