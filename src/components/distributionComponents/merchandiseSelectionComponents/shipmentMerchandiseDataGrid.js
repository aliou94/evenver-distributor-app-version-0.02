
import clsx from "clsx";
import {useEffect} from "react";
import {DataGrid} from "@material-ui/data-grid";
import * as React from "react";
import {makeStyles} from "@material-ui/styles";

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

const ShipmentMerchandiseDatagrid = ({identifier, Row, setRow, EnableCalculate, handleInstruction, handleAnabel}) => {


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
                    // negative: params.row.approvedDistribution > params.row.quantity,
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
                    // negative: params.row.approvedDistribution > params.row.quantity,
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
                    // negative: params.row.approvedDistribution > params.row.quantity,
                    positive: params.row.approvedDistribution <= params.row.quantity,
                })
            }

        },

    ];


    useEffect(() => {
        setRow([])
        handleInstruction("Validate merchandise")
        handleAnabel(true)
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
                    return setRow(Row)
                }}
            />

            <br/>
        </div>
    )
}

export  default ShipmentMerchandiseDatagrid
