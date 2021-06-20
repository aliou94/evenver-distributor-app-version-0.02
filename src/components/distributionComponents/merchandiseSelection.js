import * as React from "react";
import {
    TabbedForm,
    FormTab,
    SelectInput, ReferenceInput,
    Datagrid, TextField
} from 'react-admin';
import {makeStyles} from '@material-ui/styles';
import {useState} from "react";
import {DataGrid} from "@material-ui/data-grid";
import clsx from "clsx";


const useStyles = makeStyles({
    root: {
        '& .super-app.negative': {
            backgroundColor: '#f44336',
            color: 'white',
        },
        '& .super-app.positive': {
            backgroundColor: '#4791db',
            color: 'white',

        },
    },
});

const Columns = [

    {
        field:'category',
        headerName:'Merchanidise',
        width: 160,
        cellClassName: (params) => {
            // console.log(params)
            return clsx('super-app', {
                negative: params.row.approvedDistribution > params.row.quantity,
                positive: params.row.approvedDistribution  <= params.row.quantity,
            })
        }
    },

    {
        field:'quantity', headerName:'Quantity', width: 100,
        cellClassName: (params) => {
            // console.log(params)
            return clsx('super-app', {
                negative: params.row.approvedDistribution > params.row.quantity,
                positive: params.row.approvedDistribution  <= params.row.quantity,
            })
        }
    },

    {
        field: 'approvedDistribution',
        headerName: 'Approved Distribution',
        editable: true,
        width: 190,
        cellClassName: (params) => {
            // console.log(params)
            return clsx('super-app', {
                negative: params.row.approvedDistribution > params.row.quantity,
                positive: params.row.approvedDistribution  <= params.row.quantity,
            })
        }

    },

];




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

const MerchandiseDatagrid = ({merchandiseData, identifier})=>{

    let row = []
    const classes = useStyles();

if(merchandiseData && identifier){
    let sortSelectedData = (merchandiseInfo) => merchandiseInfo.shipmentNumber === identifier
     let selectedData = merchandiseData.filter(sortSelectedData)[0]

  if(selectedData){
      let merchandiseInfo = selectedData.merchandise.map((data)=>{
          let dataInfo = {}
          dataInfo.id = data.merchandise.id
          dataInfo.category = data.merchandise.category
          dataInfo.quantity = data.quantity.count
          return dataInfo
      })
       row = merchandiseInfo
      // console.log(row)
  }

}
    return(
        <div style={{height: 400, width: '150%'}} >
            <DataGrid
                className={classes.root}
                rows={row}
                columns={Columns}
                pageSize={5}
                onEditCellChangeCommitted={(params) => {
                  console.log(params)
                }}
            />
        </div>
    )
}

const MerchandiseSelector = ({repartitionMode}) => {

    let merchandiseData = []
    let Rows = []

    let [ShipmentSelected , setShipmentSelected ] = useState([])


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
                            setShipmentSelected(v)

                            return v
                        }}

                        optionText={(record) => {


                            merchandiseData.push(record)
                            merchandiseData.concat(record)



                            //   console.log(selectedData.merchandise)

                            // if (repartitionMode === "Shipment" && selectedData) {
                            //


                            //we want to make a distiction at this point  btn what the merchandise data should be
                            //we have two cases one: where repMode===shipment and the other where repMode = totalStock


                            return `${record.shipmentNumber}`
                        }}/>
                </ReferenceInput>

            </div>
            <MerchandiseDatagrid merchandiseData={merchandiseData} identifier={ShipmentSelected}/>
        </div>
    )
}




export const PostEdit = () => {

    let [RepartitionMode, setRepartitionMode] = useState("")

    return (

        <TabbedForm syncWithLocation={false}>
            <FormTab label="select repartition mode">
                <RepartitioningMode handleRepartitionMode={setRepartitionMode}/>
            </FormTab>

            <FormTab label={`select merchandise/${RepartitionMode}`}>
                < MerchandiseSelector repartitionMode={RepartitionMode}/>
            </FormTab>

        </TabbedForm>

    );
}

const MerchandiseSelection = () => {
    return (
        <div>
            <PostEdit/>
        </div>
    )


}


export default MerchandiseSelection