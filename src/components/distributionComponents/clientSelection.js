import * as React from "react";
import {DataGrid} from '@material-ui/data-grid';

import clsx from 'clsx';
import {useEffect, useState} from "react";
import {useNotify} from "ra-core";
import {Box, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MerchandiseSelection from "./merchandiseSelection";






const ClientSelection = ({Flag, handleFlag, ClientSelectedRows, handleClient}) => {


    let [SelectionRows, setSelectionRows] = useState([])

    // let [SelectedRows, setSelectedRows] = useState([])


     let [Instructions, setInstructions] = useState("VALIDATE CLIENT")

    const selectionColumns = [

        {
            field: 'fullName',
            headerName: 'Full name',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },

        {field: 'credit', headerName: 'Credit', width: 100},

    ];

    const selectedColumns = [

        {
            field: 'fullName',
            headerName: 'Full name',
            sortable: false,
            width: 160,
            valueGetter: (params) => {
                return `${params.row.firstName} ${params.row.lastName}`
            },
            cellClassName: (params) => {
                // console.log(params)
                return clsx('super-app', {
                    negative: params.row.applicableCredit > params.row.credit,
                    positive: params.row.applicableCredit <= params.row.credit,
                })
            }


        },

        {
            field: 'credit', headerName: 'Credit', width: 100, cellClassName: (params) => {
                return clsx('super-app', {
                    negative: params.row.applicableCredit > params.row.credit,
                    positive: params.row.applicableCredit <= params.row.credit,
                })
            }
        },

        {
            field: 'applicableCredit',
            headerName: 'Edit applicableCredit',
            // editable: true,
            width: 190,
            cellClassName: (params) => {
                if (params) params.isEditable = !Flag
                // console.log(params)
                return clsx('super-app', {
                    negative: params.value > params.row.credit,
                    positive: params.value <= params.row.credit,
                })
            }

        },

    ];

    let notify = useNotify();

    let validate = () => {
        handleFlag(!Flag)
        Flag ?     setInstructions("VALIDATE CLIENT") : setInstructions("UPDATE CLIENT")
    }

    let error = (customerInfos) => {

        let alert = (customerInfo) => {

            if (customerInfo.applicableCredit > customerInfo.credit) {
                notify(`insufficient balance for customer :  ${customerInfo.firstName}, edit amount of applicable credit`)
            }
            else {
                notify(`enter a valid amount of applicable credit for customer :
                ${customerInfo.firstName}`)
            }

        }

        return  customerInfos.forEach(alert)
    }


    useEffect(() => {

        const token = localStorage.getItem('authentication');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', token)
        const request = new Request
        (`http://localhost:8080/evendistributor/clientmanagement/clients`, {
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

                let clientInfo = response.map((data) => {
                    let customerDatabase = {}
                    customerDatabase.id = data.id
                    customerDatabase.firstName = data.firstName
                    customerDatabase.lastName = data.lastName
                    customerDatabase.applicableCredit = data.acceptedCredit[0].value
                    customerDatabase.credit = data.acceptedCredit[0].value
                    return customerDatabase
                })
                  console.log(clientInfo)
                setSelectionRows(clientInfo)
            }).catch(error => {
            notify(error)
        })

    }, [])


    return (
        <div style={{height:400, width: '100%'}} >

            <div style={{display: !Flag  ? "inline" : "none"}}>
                <Box flex={2} mr={{md: 0, lg: '1em'}}>
                    <Typography variant="h6" gutterBottom>
                        Select Customers
                    </Typography>
                </Box>

                <DataGrid
                    rows={SelectionRows}
                    columns={selectionColumns}
                    pageSize={5}
                    checkboxSelection
                    onSelectionModelChange={(row) => {
                        let checkSelection = (customerInfo) => row.selectionModel.includes(customerInfo.id)
                        return (
                            handleClient(() => SelectionRows.filter(checkSelection)),
                                setSelectionRows(SelectionRows)
                        )
                    }}
                />
            </div>

            <br/>

            <Box flex={2} mr={{md: 0, lg: '1em'}}>
                <Typography variant="h6" gutterBottom>
                    Validate Applicable Credit
                </Typography>
            </Box>

            <DataGrid
                rows={ClientSelectedRows}
                columns={selectedColumns}
                pageSize={5}
                onEditCellChangeCommitted={(params) => {
                    let checkUpdate = (clientInfo) => params.id === clientInfo.id
                    let indexOfUpdate = ClientSelectedRows.indexOf(SelectionRows.filter(checkUpdate)[0])
                    return ClientSelectedRows[indexOfUpdate].applicableCredit = +params.props.value
                }}
            />

            <br/>

            <Button variant="contained" color="primary" onClick={() => {
                let checkBalance = customerInfo =>
                    customerInfo.applicableCredit > customerInfo.credit
                    || customerInfo.applicableCredit <= 0
                    || customerInfo.applicableCredit === undefined

                ClientSelectedRows.filter(checkBalance)[0] === undefined ? validate() : error(ClientSelectedRows.filter(checkBalance))
            }}
                    disabled={ClientSelectedRows[0] === undefined}
            >
                {Instructions}
            </Button>

        </div>
    )
};




export default ClientSelection