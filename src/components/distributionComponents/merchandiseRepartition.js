import * as React from "react";
import {DataGrid} from '@material-ui/data-grid';
import {useEffect} from "react";
import {Box, Typography} from "@material-ui/core";




let rows=[
        { id: 1,
            customer:"Bakary",
            Tilapia:8,
            Caracas: 2,
            Divers:5,
            Poison:4,
            Quantity:19
        },

        ]


const RepartitionTable = ({ClientInfo, merchandiseInfo})=>{


 useEffect(()=>{
 },[merchandiseInfo])
console.log(ClientInfo, merchandiseInfo)

let dynamicColumns= [... merchandiseInfo.map((merchandise)=>{
    return{
        field: merchandise.category,
        headerName: merchandise.category,
        sortable: false,
        width: 160
    }
})]

// let dynamicRow = [...ClientInfo.map(client=>{
//   merchandiseInfo.map((merchandise =>{
//     return (
//           { id: client.index,
//               customer : `${client.firstName} ${client.lastName}`
//           }
//       )
//   }))
// })]

let  Columns = [

    {
        field: 'customer',
        headerName: 'Client',
        sortable: false,
        width: 160,
    },


    ...dynamicColumns,


    {field: 'Quantity', headerName: ' Total received', width: 170},



];

// let RepartitionField = [...staticColumns]

    return(
       <div style={{height:500, width: '145%'}} >
           <Box flex={2} mr={{md: 0, lg: '1em'}}>
               <Typography variant="h6" gutterBottom>
                   Merchandise Repartition
               </Typography>
           </Box>
           <br/>
           <br/>
           <DataGrid
           columns={Columns}
           rows={rows}
       />
       </div>
    )
}


export  default RepartitionTable