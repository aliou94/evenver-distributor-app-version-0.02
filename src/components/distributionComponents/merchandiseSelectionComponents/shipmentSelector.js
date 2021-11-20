
import {ReferenceInput, SelectInput} from "react-admin";
import ShipmentMerchandiseDatagrid from "./shipmentMerchandiseDataGrid";
import * as React from "react";

const ShipmentSelector = ({
                              repartitionMode,
                              handleRow,
                              Row,
                              ShipmentSelected,
                              handleSelection,
                              EnableCalculate,
                              handleInstruction,
                              handleAnabel
                          }) => {


    return (

        <div>
            <div style={{display: repartitionMode === "Shipment" ? "inline" : "none"}}>
                <ReferenceInput source="bolNumber" reference="shipmentmanagement/shipments"
                                label="select shipment">
                    <SelectInput
                        source="shipmentNumber"
                        optionValue="shipmentNumber"
                        format={v => {
                            //init  user selection
                            // ShipmentSelected.push(v)
                            // setShipmentSelected(v)
                            handleSelection(v)
                            return v
                        }}

                        optionText={(record) => {
                            return `${record.shipmentNumber}`
                        }}/>
                </ReferenceInput>
            </div>

            <ShipmentMerchandiseDatagrid
                identifier={ShipmentSelected}
                Row={Row}
                setRow={handleRow}
                EnableCalculate={EnableCalculate}
                handleInstruction={handleInstruction}
                handleAnabel = {handleAnabel}
            />

        </div>
    )
}

export default ShipmentSelector