import * as React from "react";
import {
    Edit,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    FormWithRedirect,
    SaveButton,
    DeleteButton,
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';
import FullNameField from "../usersComponent/IdentityField";
import {useTranslate} from "ra-core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const VisitorTitle = ({ record }) =>
    record ? <FullNameField record={record} size="32" /> : null;


export const ClientEdit = props => (

    <Edit{...props}
         title={<VisitorTitle/>}
    >
        <UsersForm/>
    </Edit>
);

const UsersForm=(props)=>{
 let translate = useTranslate()
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
                                        {translate('help.identity')}
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="firstName"
                                                resource="clients"
                                                label="auth.firstName"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="lastName"
                                                resource="clients"
                                                label="auth.lastName"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    {/*<TextInput*/}
                                    {/*    type="email"*/}
                                    {/*    source="email"*/}
                                    {/*    resource="clients"*/}
                                    {/*    fullWidth*/}
                                    {/*/>*/}

                                    <Typography variant="h6" gutterBottom>
                                        Address
                                    </Typography>
                                    <TextInput
                                        source="address.addressLine1"
                                        resource="customers"
                                        label="help.address"
                                        multiline
                                        fullWidth
                                        helperText={false}
                                    />
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={2}
                                            mr={{ xs: 0, sm: '0.5em' }}>
                                            <TextInput
                                                source="address.city"
                                                label="help.City"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <TextInput
                                                source="address.state"
                                                label="help.State"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box flex={2}>
                                            <ArrayInput source="phoneContacts">
                                                <SimpleFormIterator>
                                                    <TextInput source="number" label="Number"/>
                                                    <TextInput source="provider" label="Provider" />
                                                    <TextInput source="type" label="Type"/>
                                                </SimpleFormIterator>
                                            </ArrayInput>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                        <Toolbar>
                            <Box display="flex" justifyContent="space-between" width="100%">
                                <SaveButton
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                />
                                <DeleteButton record={formProps.record} />
                            </Box>
                        </Toolbar>
                    </form>
                </Card>
            )}
        />
    )
}
export default ClientEdit