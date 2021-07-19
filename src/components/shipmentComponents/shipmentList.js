import * as React from "react";
import {Datagrid, List, TextField} from "react-admin";
import { useTranslate} from 'ra-core';

const StockField = ({ record = {}, source }) => {
   // const translate = useTranslate()
    let sum = 0
    const GenerateSum = (stock)=>  sum += stock.quantity.count
    record.merchandise.forEach(GenerateSum)

     // console.log(record.merchandise)
  return (
        <div>
            {sum} {record.merchandise[0].quantity.merchandiseUnit}
        </div>
    );
}

const ShipmentList = props => {
const translate = useTranslate()
    return(
        <List {...props} title={translate("help.listOfShipment")}>
            <Datagrid rowClick="edit">
                <TextField source="createdBy" label={translate("help.createdBy")} />
                <TextField source="createdOn" label={translate("help.createdOn")} />
                <TextField source="acceptedBy" label={translate("help.acceptedBy")} />
                <TextField source="acceptedOn" label={translate("help.acceptedOn")}/>
                <TextField source="bolNumber" label={translate("help.bol")} />
                <TextField source="shipmentNumber" label={translate("help.shipmentNumber")}/>
                <StockField source="quntity" label={translate("help.stock")}/>
            </Datagrid>
        </List>
    )
}

export default ShipmentList
