import * as React from "react";
import {DataGrid} from '@material-ui/data-grid';
import {useEffect, useState} from "react";
import {Box, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {object} from "prop-types";



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
            name:merchandise.name,
            // adding prices to my request
            price: {
                currencyCode: "XOF",
                value: merchandise.price
            }
        }
            requestBody.quantity={
              count: merchandise.approvedDistribution,
                merchandiseUnit: "box"
            }
            return requestBody
    })

    let [DistributionResponse , setDistributionResponse] = useState([])

    let expenditure = {

    }

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
            field: merchandise.name,
            headerName: merchandise.name,
            sortable: false,
            width:160,
            editable: true,
            cellClassName: (params) => {
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


        {field:'quantity', editable:true,   headerName: 'Total received', width: 170},

        {field:'balanceBroughtForward', editable:true,   headerName: 'Balance FWD   ', width: 170},


    ];



    let maxLength = ClientInfo.length + 1
    let rows =  new Array(maxLength)



  if(DistributionResponse.clientDistributions){

    function quantityDispatcher(id, name){

        for (let i = 0; i < DistributionResponse.merchandiseAllocations.length; i++) {

            // probleme here changing category to name

            if( DistributionResponse.merchandiseAllocations[i].merchandise.name === name ){

                let
                    MerchandiseInfo = DistributionResponse.merchandiseAllocations[i].clientInformations
                // let MerchandiseInfoQ = DistributionResponse.merchandiseAllocations[i].distributeQuantity.count

                if(id === "excess"){

                    return DistributionResponse.merchandiseAllocations[i].excessQuantity.count
                }

                if(id === "sum"){

                    try {
                        return DistributionResponse.merchandiseAllocations[i].distributeQuantity.count
                    }
                    catch (exception_var) {
                        return  0
                    }

                }




                    for (let j=0 ; j < DistributionResponse.merchandiseAllocations.length; j++) {


                        try{
                           if ( MerchandiseInfo[j].id === id) {
                              // return  DistributionResponse.merchandiseAllocations[j].distributeQuantity.count
                             return   MerchandiseInfo[j].distributedQuantity.count
                           }
                        } catch (e) {

                            return  0
                        }


                }



            }


        }

     }

    let dynamicRows = [...merchandiseInfo.map((merchandise) => {

         return (
            // merchandise.category
             merchandise.name
         )
      })]

     function sumDispatcher(CustomerRepartition) {
             let  sum = 0
             for( let el in CustomerRepartition  ) {
                 CustomerRepartition.customer = 0
                 CustomerRepartition.id = 0
                 if( CustomerRepartition.hasOwnProperty( el ) ) {
                     sum += parseFloat(CustomerRepartition[el] );
                 }
             }
             return sum;
         }


        for (let i = 0; i < DistributionResponse.clientDistributions.length; i++) {

            rows[i]={}
            rows[i].id = DistributionResponse.clientDistributions[i].id
            // rows[i].quantity = (rows[i].Tilapia + rows[i].Caracas + rows[i].Divers + rows[i].Poison)


            for (let j = 0; j < dynamicRows.length ; j++) {

                rows[i][dynamicRows[j]] = quantityDispatcher(rows[i].id ,dynamicRows[j])

            }

            rows[i].quantity=sumDispatcher(rows[i])

            rows[i].customer = `${DistributionResponse.clientDistributions[i].firstName}
                ${DistributionResponse.clientDistributions[i].lastName}`

            rows[i].id = DistributionResponse.clientDistributions[i].id




            try{

                expenditure[DistributionResponse.merchandiseAllocations[i].merchandise.name] =
                       DistributionResponse.merchandiseAllocations[i].clientInformations[i].distributedQuantity.count
                                        *
                        DistributionResponse.merchandiseAllocations[i].merchandise.price.value

                 console.log(DistributionResponse.merchandiseAllocations[i].clientInformations)

                function test(amount) {
                           console.log(amount)
                }

                test(clientRequestData[i].purchaseAmount.value)
            }  catch (e) {

            }



             rows[i].balanceBroughtForward = clientRequestData[i].purchaseAmount.value

            // rows[i].balanceBroughtForward = (   DistributionResponse.merchandiseAllocations[i].clientInformations[i].distributedQuantity.count * DistributionResponse.merchandiseAllocations[i].merchandise.price.value)



        }

        for (let i = 0; i < DistributionResponse.clientDistributions.length; i++) {
            rows[maxLength] = {}
            for (let j = 0; j < dynamicRows.length ; j++) {
                rows[maxLength][dynamicRows[j]] = quantityDispatcher("excess" ,dynamicRows[j])
            }

            rows[maxLength].quantity = sumDispatcher(rows[maxLength])
            rows[maxLength].id = maxLength
            rows[maxLength].customer = "excess"


        }

        for (let i = 0; i < DistributionResponse.clientDistributions.length; i++) {
            rows[maxLength+1] = {}
            for (let j = 0; j < dynamicRows.length ; j++) {
                rows[maxLength+1][dynamicRows[j]] = quantityDispatcher("sum",dynamicRows[j])
            }

            rows[maxLength+1].quantity = sumDispatcher(rows[maxLength+1])
            rows[maxLength+1].customer = "sum"
            rows[maxLength+1].id = maxLength+1

        }

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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>console.log("hello world")}
                >Validate</Button>
            </div>
        </div>
    )
}

export default RepartitionTable