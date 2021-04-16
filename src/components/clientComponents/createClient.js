import * as React from "react";
import {
    ArrayInput,
    Create,
    SimpleForm, SimpleFormIterator,
    TextInput,
    required
} from 'react-admin';
import {useTranslate} from "ra-core";
import {Box, Typography} from "@material-ui/core";

export const CreateClient= props => {
    let translate = useTranslate();
    return(
    <Create {...props} title="create a client">
            <SimpleForm redirect="List">
               <div display={{ md: 'block', lg: 'flex' }}>
                   <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                       <Typography variant="h6" gutterBottom>
                           {translate('help.identity')}
                       </Typography>
                       <Box display={{ xs: 'block', sm: 'flex' }}>
                           <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <TextInput source="lastName"  label="auth.firstName" validate={required(translate('ra.validation.required'))} />
                           </Box>
                       </Box>
                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                         <TextInput source="firstName" label="auth.lastName" validate={required(translate('ra.validation.required'))}/>
                         <Typography variant="h6" gutterBottom>
                             Address
                         </Typography>
                         <TextInput source="address.city" label="help.City"  validate={required(translate('ra.validation.required'))}/>
                         <TextInput source="address.state" label="help.State"/>
                         <TextInput source="address.postalCode" label="help.postalCode"/>
                         <Typography variant="h6" gutterBottom>
                             {translate('auth.phoneNumber')}
                         </Typography>
                         <ArrayInput source="phoneContacts" validate={required(translate('ra.validation.required'))}>
                             <SimpleFormIterator>
                                 <TextInput source="number" label="Number"  validate={required(translate('ra.validation.required'))}/>
                                 <TextInput source="provider" label="Provider" />
                                 <TextInput source="type" label="Type"/>
                             </SimpleFormIterator>
                         </ArrayInput>
                     </Box>
                   </Box>

               </div>
            </SimpleForm>
        </Create>
    );
}