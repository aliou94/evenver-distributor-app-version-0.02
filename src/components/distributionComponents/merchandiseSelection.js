import * as React from "react";
import {
    TabbedForm,
    FormTab,
    SelectInput, ReferenceInput,
    Datagrid, Toolbar, SaveButton
} from 'react-admin';
import {makeStyles} from '@material-ui/styles';
import {useEffect, useState} from "react";
import {DataGrid} from "@material-ui/data-grid";
import clsx from "clsx";
import Button from "@material-ui/core/Button";


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
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    },
});










const MerchandiseSelectionToolbar = ({
                                         ShipmentSelected,
                                         MerchandiseRepatition,
                                         EnableCalculate,
                                         handleAnabel,
                                         handleInstruction,
                                         Instruction}) => {


    const useStyles = makeStyles({
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    });




    let handleDisability = ()=> {
        // console.log(EnableCalculate)
        !EnableCalculate ? handleInstruction ("Validate  Selection") : handleInstruction ("Update Selection")
        handleAnabel(!EnableCalculate)

     }



    return(
        <Toolbar  classes={useStyles()} >
            <Button
                variant="contained"
                color="primary"
                 disabled={!ShipmentSelected}
                onClick={()=>{
                  let  checkStock = (merchandiseInfo)=>
                      merchandiseInfo.approvedDistribution > merchandiseInfo.quantity
                     || merchandiseInfo.approvedDistribution <=0
                     || merchandiseInfo.approvedDistribution === undefined

                    MerchandiseRepatition.filter(checkStock).length===0 ? handleDisability (): console.log("error")
                }}
            >
                {Instruction}
            </Button>

            <Button variant="contained" color="primary" disabled={EnableCalculate}>
                Calculate
            </Button>
        </Toolbar>
    )
}


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



const MerchandiseDatagrid = ({identifier, Row, setRow,  EnableCalculate, handleInstruction}) => {

    const classes = useStyles();

    const Columns = [

        {
            field: 'category',
            headerName: 'Merchanidise',
            width: 160,
            editable: false,
            cellClassName: (params) => {
                // console.log(params)
                return clsx('super-app', {
                    negative: params.row.approvedDistribution > params.row.quantity,
                    positive: params.row.approvedDistribution <= params.row.quantity,
                })
            }
        },

        {
            field: 'quantity', headerName: 'Quantity',
            width: 100,
            editable: false,
            cellClassName: (params) => {
                // console.log(params)
                return clsx('super-app', {
                    negative: params.row.approvedDistribution > params.row.quantity,
                    positive: params.row.approvedDistribution <= params.row.quantity,
                })
            }
        },

        {
            field: 'approvedDistribution',
            headerName: 'Edit Approved Distribution',
            // editable: true,
            width: 150,
            cellClassName: (params) => {
                // console.log(params)
                if (params) params.isEditable = EnableCalculate
                return clsx('super-app', {
                    negative: params.row.approvedDistribution > params.row.quantity,
                    positive: params.row.approvedDistribution <= params.row.quantity,
                })
            }

        },

    ];



    useEffect(() => {
        setRow([])
        handleInstruction("Validate merchandise")
        const token = localStorage.getItem('authentication');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', token)
        const request = new Request

        (`http://localhost:8080/evendistributor/shipmentmanagement/shipments/${identifier}`, {
            method: 'GET',
            headers: headers
        });

        fetch(request)
            .then((res) => {
                return (
                    res.json()
                )
            })
            .then((response) => {

                if (response.status < 200 || response.status >= 300) {
                    //  throw new Error(response.statusText);
                    return;
                }

                let merchandiseInfo = response.merchandise.map((data) => {
                    let dataInfo = {}
                    dataInfo.id = data.merchandise.id
                    dataInfo.category = data.merchandise.category
                    dataInfo.quantity = data.quantity.count
                    dataInfo.approvedDistribution = data.quantity.count
                    return dataInfo
                })
                  // console.log(merchandiseInfo)
                   setRow(merchandiseInfo)
                // console.log(Row)

                // setSelectionRows(clientInfo)
            }).catch(error => {
              console.log(error)
        })

    }, [identifier])


    return (
        <div style={{height: 400, width: '150%'}}>
            <DataGrid
                className={classes.root}
                rows={Row}
                columns={Columns}
                pageSize={5}
                onEditCellChangeCommitted={(params) => {

                     let checkUpdate = (clientInfo) => params.id === clientInfo.id
                     let indexOfUpdate = Row.indexOf(Row.filter(checkUpdate)[0])
                    Row[indexOfUpdate].approvedDistribution = +params.props.value
                     return  setRow(Row)
                }}
            />

            <br/>
        </div>
    )
}

const ShipmentSelector = ({repartitionMode,
                              handleRow,
                              Row ,
                              ShipmentSelected,
                              handleSelection,
                              EnableCalculate,
                              handleInstruction
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

            <MerchandiseDatagrid
                identifier={ShipmentSelected}
                Row ={Row}
                setRow={handleRow}
                EnableCalculate={EnableCalculate}
                handleInstruction={handleInstruction }
            />


        </div>
    )
}




export const MerchandiseSelection = () => {

    let [RepartitionMode, setRepartitionMode] = useState("")

    let [ShipmentSelected, setShipmentSelected] = useState([])

    let [EnableCalculate, setEnableCalculate] = useState(true)

    const [Instruction, setInstructions] = useState("Validate Selection")

    let [Row, setRow] = useState([])

    const handleRow = (values)=>  setRow(values)

    const handleAnabel = (values)=>  setEnableCalculate(values)

    const handleSelection = (values)=> setShipmentSelected(values)

    const handleInstruction = (values)=> setInstructions(values)

    return (

        <TabbedForm syncWithLocation={false} toolbar={<MerchandiseSelectionToolbar
            ShipmentSelected={ShipmentSelected}
            MerchandiseRepatition={Row}
            EnableCalculate={EnableCalculate}
            Instruction={Instruction}
            handleAnabel={handleAnabel}
            handleInstruction={handleInstruction }
        />}>
            <FormTab label="select repartition mode">
                <RepartitioningMode handleRepartitionMode={setRepartitionMode}/>
            </FormTab>

            <FormTab label={`select merchandise/${RepartitionMode}`}>
                < ShipmentSelector
                    repartitionMode={RepartitionMode}
                    handleRow = {handleRow}
                    Row={Row}
                    handleSelection={handleSelection}
                    ShipmentSelected={ShipmentSelected}
                    EnableCalculate={EnableCalculate}
                    handleInstruction={handleInstruction }
                />
            </FormTab>

        </TabbedForm>

    );
}


export default MerchandiseSelection