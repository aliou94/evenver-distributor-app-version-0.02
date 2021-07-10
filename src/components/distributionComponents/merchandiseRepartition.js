import * as React from "react";
import {DataGrid} from '@material-ui/data-grid';
import {useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";









const RepartitionTable = ({ClientInfo, merchandiseInfo}) => {

    let clientRequestData = ClientInfo.map(client => {
        let clientRequest = {
            "firstName": client.firstName,
            "id": client.id,
            "lastName": client.lastName,
            "purchaseAmount": {
                "currencyCode": "xof",
                "value": client.applicableCredit
            },
        }
        return clientRequest
    })

    let merchandiseRequest = merchandiseInfo.map((merchandise) => {
        let requestBody = {}
        requestBody.merchandise ={
            category: merchandise.category,
            id:merchandise.id,
            name:merchandise.name
        }
            requestBody.quantity={
            count: merchandise.approvedDistribution,
                merchandiseUnit: "box"
            }
            return requestBody
    })

    let [DistributionResponse , setDistributionResponse] = useState([])

    // let [Rows, setRows] = useState([])
    //
    // let Rows


    useEffect(() => {
        const token = localStorage.getItem('authentication');
         // const name = localStorage.getItem('fullName');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);
        const request
            = new Request(`http://localhost:8080/evendistributor/merchandisedistribution/calculatedistribution`,
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "clientDistributions": clientRequestData,
                        "distributionMode": "STOCK",
                        "merchandise": merchandiseRequest
                    }
    ),
                headers: headers
    });
        return fetch(request)
            .then(response => {
                // console.log(response)
                if (response.status < 200 || response.status >= 300) {
                    //throw new Error(response.statusText);
                    return;
                }
                return response.json();
            })
            .then(distributionResponse => {
                // status = validateCreditResponse.status
                setDistributionResponse(distributionResponse)
            });


    }, [merchandiseInfo])


    let dynamicColumns = [...merchandiseInfo.map((merchandise) => {
        return {
            field: merchandise.category,
            headerName: merchandise.category,
            sortable: false,
            width: 160,
            editable: true,
            cellClassName: (params) => {
                 // console.log(params.row)
            }
        }
    })]


    let Columns = [

        {
            field: 'customer',
            headerName: 'Client',
            sortable: false,
            width: 160,
        },


        ...dynamicColumns,


        {field: 'quantity',  editable:true, headerName: ' Total received', width: 170},


    ];

    let maxLength = ClientInfo.length + 1
    let rows =  new Array(maxLength)


  if(DistributionResponse.clientDistributions){



     // let maxLength = DistributionResponse.clientDistributions.length
     // let rows =  new Array(maxLength)

    function quantityDispatcher(id, name){

        for (let i = 0; i < DistributionResponse.merchandiseAllocations.length; i++) {

            if( DistributionResponse.merchandiseAllocations[i].merchandise.category === name ){

                let MerchandiseInfo = DistributionResponse.merchandiseAllocations[i].clientInformations
                // let MerchandiseInfoQ = DistributionResponse.merchandiseAllocations[i].distributeQuantity.count

                if(id === "excess"){
                    return DistributionResponse.merchandiseAllocations[i].excessQuantity.count
                }

                if(id === "sum"){
                    return DistributionResponse.merchandiseAllocations[i].distributeQuantity.count
                }

                 for (let j = 0; j < MerchandiseInfo.length ; j++) {

                    if(MerchandiseInfo[j].id===id){
                        return  MerchandiseInfo[j].distributedQuantity.count
                    }
                }
            }

        }

     }

        for (let i = 0
            ; i < DistributionResponse.clientDistributions.length; i++) {
            rows[i]={}
            rows[i].id = DistributionResponse.clientDistributions[i].id
            rows[i].customer = `${DistributionResponse.clientDistributions[i].firstName}  ${DistributionResponse.clientDistributions[i].lastName}`
            rows[i].Tilapia = quantityDispatcher(rows[i].id ,DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[i].caracas = quantityDispatcher(rows[i].id ,DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[i].Divers = quantityDispatcher(rows[i].id ,DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[i].Liste = quantityDispatcher(rows[i].id ,DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[i].quantity =  quantityDispatcher(rows[i].id ,DistributionResponse.merchandiseAllocations[i].merchandise.category)
            console.log(rows[i].quantity)
        }
        for (let i = 0; i < DistributionResponse.clientDistributions.length; i++) {
            rows[maxLength] = {}
            rows[maxLength].customer = "excess"
            rows[maxLength].id = maxLength
            rows[maxLength].Tilapia = quantityDispatcher("excess", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[maxLength].caracas = quantityDispatcher("excess", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[maxLength].Divers = quantityDispatcher("excess", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[maxLength].Liste = quantityDispatcher("excess", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            // rows[maxLength].quantity =
            //     (rows[maxLength].Tilapia + rows[maxLength].Caracas + rows[maxLength].Divers + rows[maxLength].Liste)
        }
        for (let i = 0; i < DistributionResponse.clientDistributions.length; i++) {
            rows[maxLength+1] = {}
            rows[maxLength+1].customer = "sum"
            rows[maxLength+1].id = (maxLength + 1)
            rows[maxLength+1].Tilapia = quantityDispatcher("sum", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[maxLength+1].caracas = quantityDispatcher("sum", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            // console.log(rows[maxLength+1].Caracas)
            rows[maxLength+1].Divers = quantityDispatcher("sum", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            rows[maxLength+1].Liste = quantityDispatcher("sum", DistributionResponse.merchandiseAllocations[i].merchandise.category)
            // rows[maxLength+1].quantity =
            //     (rows[maxLength+1].Tilapia + rows[maxLength+1].Caracas) + (rows[maxLength+1].Divers + rows[maxLength+1].Liste)
        }

  // console.log(rows)

  }




    return (
        <div style={{height: 300, width: '145%'}}>
            <Box flex={2} mr={{md: 0, lg: '1em'}}>
                <Typography variant="h6" gutterBottom>
                    Merchandise Repartition
                </Typography>
            </Box>
            <br/>
            <DataGrid
                columns={Columns}
                rows={rows}
            />
            <br/>
            <div>
                <Button disabled variant="contained" color="primary">Validate</Button>
            </div>
        </div>
    )
}


export default RepartitionTable