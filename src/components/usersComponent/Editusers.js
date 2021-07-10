import * as React from "react";
import {
    Edit,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    FormWithRedirect,
    SaveButton,
    DeleteButton,
    SelectInput, required
} from 'react-admin';
import {Typography, Box, Toolbar, InputLabel} from '@material-ui/core';
import FullNameField from "./IdentityField";
import {usePermissions} from 'react-admin';
import {useTranslate} from "ra-core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const VisitorTitle = ({record}) => {
    return (
        record ? <FullNameField record={record} size="32"/> : null
    )
}


const AdminAuth = () => {
    const permission = usePermissions()
    const translate = useTranslate()
    return (
        permission.permissions === "ADMIN"
            ? <Box
                flex={1}
                ml={{xs: 0, lg: '1em'}}
                mt={{xs: '1em', lg: 0}}
            >
                <Typography variant="h6" gutterBottom>
                    status
                </Typography>
                <SelectInput
                    source="status"
                    choices={[
                        {id: 'ACTIVE', name: translate("help.active")},
                        {id: 'INACTIVE', name: translate("help.inactive")}
                    ]}
                />
                <Typography variant="h6" gutterBottom>
                    Role
                </Typography>
                <SelectInput
                    source="role"
                    choices={[
                        {id: 'OPERATOR', name: translate("help.operator")},
                        {id: 'ADMIN', name: 'admin'},
                        {id: 'CLIENT', name: translate("help.customer")},
                        {id: 'DISTRIBUTOR', name: translate("help.distributor")}
                    ]}
                    alwaysOn/>
            </Box>
            : null
    )
}

const UsersForm = (props) => {
    let translate = useTranslate()
    return (
        <FormWithRedirect
            {...props}
            render={formProps => (
                <Card>
                    <form>
                        <CardContent>
                            <Box display={{md: 'block', lg: 'flex'}}>
                                <Box flex={2} mr={{md: 0, lg: '1em'}}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate('help.identity')}
                                    </Typography>
                                    <Box display={{xs: 'block', sm: 'flex'}}>
                                        <Box
                                            flex={1}
                                            mr={{xs: 0, sm: '0.5em'}}
                                        >
                                            <TextInput
                                                source="firstName"
                                                label="auth.firstName"
                                                fullWidth
                                                validate={required(translate('ra.validation.required'))}
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{xs: 0, sm: '0.5em'}}
                                        >
                                            <TextInput
                                                source="lastName"
                                                resource="users"
                                                label="auth.lastName"
                                                fullWidth
                                                validate={required(translate('ra.validation.required'))}
                                            />
                                        </Box>
                                    </Box>
                                    <TextInput
                                        type="email"
                                        source="email"
                                        resource="users"
                                        fullWidth
                                        validate={required(translate('ra.validation.required'))}
                                    />
                                    <Box mt="1em"/>
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
                                    <Box display={{xs: 'block', sm: 'flex'}}>
                                        <Box
                                            flex={2}
                                            mr={{xs: 0, sm: '0.5em'}}>
                                            <TextInput
                                                source="address.city"
                                                label="help.City"
                                                fullWidth
                                                helperText={false}
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            mr={{xs: 0, sm: '0.5em'}}
                                        >
                                            <TextInput
                                                source="address.state"
                                                label="help.State"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                    <Box flex={2}>
                                        <ArrayInput source="phoneContacts" resource="users" label="auth.phoneNumber">
                                            <SimpleFormIterator>
                                                <TextInput source="number" label="auth.phoneNumber" resource="users"/>
                                                <TextInput source="provider" label="help.Provider"/>
                                                <SelectInput source="type" label="Tel type" choices={[
                                                    { id: 'CELL', name: translate('auth.cell') },
                                                    { id: 'LAND', name: translate('auth.land') },
                                                    { id: 'OFFICE', name:translate('auth.office') },
                                                ]} />
                                            </SimpleFormIterator>
                                        </ArrayInput>
                                    </Box>
                                </Box>
                                <AdminAuth/>
                            </Box>
                        </CardContent>
                        <Toolbar>
                            <Box display="flex" justifyContent="space-between" width="100%">
                                <SaveButton
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmit}
                                />
                                <DeleteButton record={formProps.record}/>
                            </Box>
                        </Toolbar>
                    </form>
                </Card>
            )}
        />
    )
}


export const UserEdit = props => (
    <Edit {...props}
          title={<VisitorTitle/>}
    >
        <UsersForm/>
    </Edit>
);

export default UsersForm