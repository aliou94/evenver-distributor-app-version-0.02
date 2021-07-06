import * as React from "react";
import {
    TabbedForm,
    FormTab,
    SelectInput,
} from 'react-admin';

import {useState} from "react";

import {Box, Typography} from "@material-ui/core";
import ShipmentSelector from "./merchandiseSelectionComponents/shipmentSelector";
import MerchandiseSelectionToolbar from "./merchandiseSelectionComponents/merchandiseSelectionToobar";
import StockMerchandiseDatagrid from "./merchandiseSelectionComponents/totalStockMerchandiseDataGrid";


const RepartitioningMode = ({handleRepartitionMode}) => {

    return (
        <SelectInput
            source="repartition"
            choices={[
                {id: 'Total stock', name: 'Total stock'},
                {id: 'Shipment', name: 'Shipment'},
            ]}
            parse={v => {
                handleRepartitionMode(v)
                //seting a repartition mode upon selection console.log(repartitionMode)
                return v
            }}
        />
    )
}


export const MerchandiseSelection = ({ MerchandiseSelectedRows, handleMerchandise, Instruction, handleInstruction,  handleApproval}) => {

    let [RepartitionMode, setRepartitionMode] = useState("")

    let [ShipmentSelected, setShipmentSelected] = useState([])

    let [EnableCalculate, setEnableCalculate] = useState(true)

    const handleRow = (values) => handleMerchandise(values)

    const handleAnabel = (values) => setEnableCalculate(values)

    const handleSelection = (values) => setShipmentSelected(values)

// console.log(RepartitionMode)
    return (
       <div>
           <Box flex={2} mr={{md: 0, lg: '1em'}}>
               <Typography variant="h6" gutterBottom>
                   Merchandise selection
               </Typography>
           </Box>

           <TabbedForm syncWithLocation={false} toolbar={ RepartitionMode ?
               <MerchandiseSelectionToolbar
               ShipmentSelected={ShipmentSelected}
               MerchandiseRepartition={MerchandiseSelectedRows}
               EnableCalculate={EnableCalculate}
               Instruction={Instruction}
               handleAnabel={handleAnabel}
               handleInstruction={handleInstruction}
               handleMerchandise={handleMerchandise}
               handleApproval={handleApproval}
           />:null}>
               <FormTab label="select repartition mode">
                   <RepartitioningMode handleRepartitionMode={setRepartitionMode}/>
               </FormTab>

               <FormTab label={`select merchandise/${RepartitionMode}`}>
                   {
                       RepartitionMode === "Shipment" &&
                       < ShipmentSelector
                           repartitionMode={RepartitionMode}
                           handleRow={handleRow}
                           Row={ MerchandiseSelectedRows}
                           handleSelection={handleSelection}
                           ShipmentSelected={ShipmentSelected}
                           EnableCalculate={EnableCalculate}
                           handleInstruction={handleInstruction}
                           handleAnabel = {handleAnabel}
                       />
                   }

                   {
                       RepartitionMode === "Total stock" &&
                       <StockMerchandiseDatagrid
                           repartitionMode={RepartitionMode}
                           handleRow={handleRow}
                           Row={ MerchandiseSelectedRows}
                           handleSelection={handleSelection}
                           ShipmentSelected={ShipmentSelected}
                           EnableCalculate={EnableCalculate}
                           handleInstruction={handleInstruction}
                           handleAnabel = {handleAnabel}
                       />
                   }
               </FormTab>

           </TabbedForm>
       </div>


    );
}


export default MerchandiseSelection