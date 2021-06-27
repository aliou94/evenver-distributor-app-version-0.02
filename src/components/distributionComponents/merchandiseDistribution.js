import * as React from "react";
import {DataGrid} from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {useEffect, useState} from "react";
import {useNotify} from "ra-core";
import {Box, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MerchandiseSelection from "./merchandiseSelection";
import RepartitionTable from "./merchandiseRepartition";
import ClientSelection from "./clientSelection";




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




const ClientList = () => {

    let [Flag, setFlag] = useState(false)

    let [IsValid, setIsValid] = useState(false)

    let [ClientSelectedRows, setClientSelectedRows] = useState([])

    let [MerchandiseSelectedRows, setMerchandiseSelectedRows] = useState([])

    let [Instruction, setInstructions] = useState("Validate Selection")

    const handleFlag = ()=> setFlag(!Flag)

    const handleApproval = (bool)=> setIsValid(bool)

    const handleMerchandise = merchandiseInfo =>setMerchandiseSelectedRows(merchandiseInfo)

    const handleClient = clientInfo =>setClientSelectedRows(clientInfo )

    const handleInstruction = (instructionText)=> setInstructions(instructionText)




     const classes = useStyles()




    return (
        <div style={{height:500, width: '70%'}} className={classes.root}>

            <ClientSelection
                Flag={Flag}
                handleFlag={handleFlag}
                ClientSelectedRows={ClientSelectedRows}
                handleClient={handleClient }
                Instruction={Instruction}
                handleInstruction={handleInstruction }
            />

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>


            {Flag &&  <div>

                <MerchandiseSelection
                    MerchandiseSelectedRows={MerchandiseSelectedRows}
                    handleMerchandise={handleMerchandise}
                    Instruction={Instruction}
                    handleInstruction={handleInstruction }
                    handleApproval={handleApproval}
                />
            </div>}

            <br/>
            <br/>

            <div style={{display: Flag ? "inline" : "none"}}>

                {
                    Flag && IsValid &&  <RepartitionTable
                        Instruction={Instruction}
                        ClientInfo={ClientSelectedRows}
                        merchandiseInfo={MerchandiseSelectedRows}
                    />
                }

            </div>
<br/>


        </div>
    )
};




export default ClientList