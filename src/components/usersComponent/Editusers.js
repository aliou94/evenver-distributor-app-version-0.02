import * as React from "react";
import {
    Edit,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    FormWithRedirect,
    SaveButton,
    DeleteButton,
    SelectInput
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';
import FullNameField from "./IdentityField";
import { usePermissions } from 'react-admin';
import {useTranslate} from "ra-core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const VisitorTitle = ({ record }) =>{
    return(
        record ? <FullNameField record={record} size="32"/> : null
    )
}


export const UserEdit = props => (
    <Edit {...props}
        title={<VisitorTitle/>}
    >
        <UsersForm/>
    </Edit>
);
const Adminauth = ()=>{
    const permission = usePermissions()
    const translate = useTranslate()
    return(
        permission.permissions==="ADMIN"
        ?<Box
                flex={1}
                ml={{ xs: 0, lg: '1em' }}
                mt={{ xs: '1em', lg: 0 }}
            >
                <Typography variant="h6" gutterBottom>
                    status
                </Typography>
                <SelectInput
                    source="status"
                    choices={[
                        { id: 'ACTIVE', name:translate("help.active") },
                        { id: 'INACTIVE', name: translate("help.inactive") }
                    ]}
                />
                <Typography variant="h6" gutterBottom>
                    Role
                </Typography>
                <SelectInput
                    source="role"
                    choices={[
                        { id:'OPERATOR', name:translate("help.operator")  },
                        { id:'ADMIN', name:'admin' },
                        { id:'CLIENT', name:translate("help.customer")  },
                        { id:'DISTRIBUTOR', name:translate("help.distributor")  }
                    ]}
                    alwaysOn/>
            </Box>
            :null
    )
}

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
                                                resource="users"
                                                label="auth.lastName"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    <TextInput
                                        type="email"
                                        source="email"
                                        resource="users"
                                        fullWidth
                                    />
                                    <Box mt="1em" />
                                    <Typography variant="h6" gutterBottom>
                                        Address
                                    </Typography>
                                    <TextInput
                                        source="address.addressLine1"
                                        resource="users"
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
                                    </Box>
                                    <Box flex={2}>
                                        <ArrayInput source="phoneContacts"   resource="users" label="auth.phoneNumber">
                                            <SimpleFormIterator>
                                                <TextInput source="number" label="auth.phoneNumber" resource="users"/>
                                                <TextInput source="provider" label="help.Provider" />
                                                <TextInput source="type" label="Type"/>
                                            </SimpleFormIterator>
                                        </ArrayInput>
                                    </Box>
                                </Box>
                                    <Adminauth/>
                            </Box>
                        </CardContent>
                        <Toolbar>
                            <Box display="flex" justifyContent="space-between" width="100%">
                                <SaveButton
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmit}
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
export default UsersForm