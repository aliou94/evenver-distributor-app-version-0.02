import * as React from "react";
import {
    TabbedForm,
    FormTab,
    SelectInput, ReferenceInput,
    Datagrid, Toolbar
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
        editable: true,
        width: 150,
        cellClassName: (params) => {
            // console.log(params)
            return clsx('super-app', {
                negative: params.row.approvedDistribution > params.row.quantity,
                positive: params.row.approvedDistribution <= params.row.quantity,
            })
        }

    },

];

const MerchandiseSelectionToolbar = props => {
    const useStyles = makeStyles({
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    });
    return(
        <Toolbar {...props}  classes={useStyles()} >
            <Button variant="contained" color="primary" disabled>
                validate
            </Button>

            <Button variant="contained" color="primary" disabled>
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

const MerchandiseDatagrid = ({identifier}) => {


    let [Row, setRow] = useState([])

    const classes = useStyles();

    useEffect(() => {
        setRow([])
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
                     return Row[indexOfUpdate].approvedDistribution = +params.props.value
                }}
            />

            <br/>
        </div>
    )
}

const MerchandiseSelector = ({repartitionMode}) => {


    let [ShipmentSelected, setShipmentSelected] = useState([])


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
                            return `${record.shipmentNumber}`
                        }}/>
                </ReferenceInput>
            </div>
            <MerchandiseDatagrid identifier={ShipmentSelected}/>
        </div>
    )
}





export const MerchandiseSelection = () => {

    let [RepartitionMode, setRepartitionMode] = useState("")

    return (

        <TabbedForm syncWithLocation={false} toolbar={<MerchandiseSelectionToolbar />}>
            <FormTab label="select repartition mode">
                <RepartitioningMode handleRepartitionMode={setRepartitionMode}/>
            </FormTab>

            <FormTab label={`select merchandise/${RepartitionMode}`}>
                < MerchandiseSelector repartitionMode={RepartitionMode}/>
            </FormTab>

        </TabbedForm>

    );
}


export default MerchandiseSelection