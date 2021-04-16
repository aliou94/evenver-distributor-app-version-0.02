import * as React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useTranslate} from 'ra-core';


function ConfirmationDialogRaw(props) {
    const translate = useTranslate()

    const options = ["sum", "update", "cancel"];

    let {
        onClose, open, handleSelection,
        currententry, newentry, handleCount, item,
        duplicatedItem,
        ...other
    } = props

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">{translate("help.option")}</DialogTitle>
            <DialogContent dividers>
                <p>{translate("help.duplicate")} {duplicatedItem} </p>
                <p> {translate("help.currentEntry")} {currententry}, {translate("help.newEntry")} {newentry} </p>
                <p>{translate("help.question")}</p>
                <RadioGroup
                    onChange={handleSelection}
                >
                    {options.map((option) => (
                        <FormControlLabel value={option} key={option} control={<Radio/>} label={option}/>
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    return (
                        handleCount(),
                            onClose()
                    )
                }

                }
                        color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

export default ConfirmationDialogRaw

