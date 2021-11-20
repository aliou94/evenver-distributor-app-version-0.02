import {makeStyles} from "@material-ui/styles";
import {Toolbar} from "react-admin";
import Button from "@material-ui/core/Button";
import * as React from "react";

const MerchandiseSelectionToolbar = ({
                                         ShipmentSelected,
                                         MerchandiseRepartition,
                                         EnableCalculate,
                                         handleAnabel,
                                         handleInstruction,
                                         Instruction,
                                         handleMerchandise,
                                         handleApproval
                                     }) => {


    const useStyles = makeStyles({
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    });


    let handleDisability = () => {
        // console.log(EnableCalculate)
        !EnableCalculate ? handleInstruction("Validate  Selection") : handleInstruction("Update Selection")
        handleAnabel(!EnableCalculate)
    }


    // console.log(ShipmentSelected)

    return (

        <Toolbar classes={useStyles()}>
            <Button
                variant="contained"
                color="primary"
                disabled={
                    !ShipmentSelected
                }
                onClick={() => {
                    let checkStock = (merchandiseInfo) =>
                        merchandiseInfo.approvedDistribution > merchandiseInfo.quantity
                        || merchandiseInfo.approvedDistribution <= 0
                        || merchandiseInfo.approvedDistribution === undefined
                    handleApproval(false)
                    MerchandiseRepartition.filter(checkStock).length === 0 ? handleDisability() : console.log("error")

                }}
            >
                {Instruction}
            </Button>

            <Button
                variant="contained"
                color="primary"
                disabled={EnableCalculate && Instruction !== "Validate Selection"}
                onClick={()=>
                    handleMerchandise(MerchandiseRepartition,
                        handleApproval(true)
                    )}
            >
                Calculate
            </Button>
        </Toolbar>
    )
}

export default MerchandiseSelectionToolbar