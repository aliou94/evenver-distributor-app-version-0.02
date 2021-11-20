import * as React from "react";
import {
    Edit,
    ArrayInput,SimpleFormIterator,
    TextInput,NumberInput,
    FormWithRedirect,
    SaveButton
} from 'react-admin';
import { Typography, Box, Toolbar} from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";




let shipmentNumber , identifier



const ShipmentNumber = ({ record }) =>{
    shipmentNumber = record.shipmentNumber
    return(
       <div>{record.shipmentNumber}</div>
    )
}


const transform = data => {
    delete data.id;
    return({
        ...data,
        acceptedBy:identifier
    });
}

const UsersForm=(props)=>{
   // let translate = useTranslate()
   // const permission = usePermissions()
    return(
        <FormWithRedirect
            {...props}
            render={formProps => (
                <Card>
                    <form>
                        <CardContent>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                        shipment information : {shipmentNumber}
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="createdOn"
                                                resource="shipments"
                                                label="date of creation"
                                                disabled
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="boatNumber"
                                                resource="shipments"
                                                label="bol number"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    <Box mt="1em" />
                                    <Typography variant="h6" gutterBottom>
                                       Shipment merchandise information :
                                    </Typography>
                                    <ArrayInput source="merchandise" label="shipment merchandise">
                                        <SimpleFormIterator disableRemove disableAdd>
                                            <TextInput source="merchandise.name" label="category"/>
                                            <TextInput source="merchandise.id" style={{display:'none'}}/>
                                                <NumberInput source="quantity.count" label="quantity"/>
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </Box>
                                <Box
                                    flex={1}
                                    ml={{ xs: 0, lg: '1em' }}
                                    mt={{ xs: '1em', lg: 0 }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                     Description
                                    </Typography>
                                    <TextInput source="description" />
                                </Box>

                            </Box>
                        </CardContent>
                        <Toolbar>
                            <Box display="flex" justifyContent="space-between" width="100%">
                                <SaveButton
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmit}
                                    transform={transform}
                                />
                            </Box>
                        </Toolbar>
                    </form>
                </Card>
            )}
        />
    )
}



export const ShipmentEdit= props => (
    <Edit{...props}
         title={<ShipmentNumber/>}
         undoable={false}
    >
        <UsersForm/>
    </Edit>
);
export default ShipmentEdit






