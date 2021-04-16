import * as React from "react";
import {Field, Form} from 'react-final-form';
import {
    Edit,
    FormWithRedirect,
    required
} from 'react-admin';
import {Typography, Box, CardActions, Button} from '@material-ui/core';
import FullNameField from "../usersComponent/IdentityField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Input from "../../inputComponent";
import { useTranslate} from 'ra-core';
import { usePermissions } from 'react-admin';
import {useState} from "react";
import ServerPaginationGrid from "./paginationGrid";


let identifier, pendingCredit, acceptedCredit, name;

const ClientTitle = ({ record },) => {
    identifier = record.id
    name = `${record.firstName}  ${record.lastName}`
    if (!record.pendingCredit || !record.pendingCredit[0]) {
        pendingCredit = 0
    } else {
        pendingCredit = record.pendingCredit[0].value
    }
    if (!record.acceptedCredit || !record.acceptedCredit[0]) {
        acceptedCredit = 0
    } else {
        acceptedCredit = record.acceptedCredit[0].value
    }
   // console.log(identifier)
   // console.log( acceptedCredit)
    return (
        record ? <FullNameField record={record} size="32"/> : null
    )
}

const CreditValidationForm = ()=>{
let translate = useTranslate()

const submit = function ({amount}) {
const  token  = localStorage.getItem('authentication');
const  name = localStorage.getItem('fullName');
//console.log(amount,identifier)
let headers = new Headers();
headers.append('Content-Type', 'application/json')
headers.append('Authorization',token)
const request = new Request(`http://localhost:8080/evendistributor/clientmanagement/clients/${identifier}/credits`, {
    method: 'POST',
    body: JSON.stringify({
        receivedBy: name,
        amount: {
            currencyCode: "XOF",
            value: amount
        }
    }),
    headers:headers
});
    return fetch(request)
        .then(response => {
            console.log(response)
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(validateCreditResponse => {
            //console.log(validateCreditResponse)
            window.location.reload();
        });
};
    return(
        <Form onSubmit={submit} render={(_a) => {
                  let handleSubmit = _a.handleSubmit
                  return(
                      <CardContent>
                          <Box/>
                          <Typography gutterBottom variant="h6"> {translate('help.addCredit')}</Typography>
                          <Field
                              autoFocus
                              name="amount"
                              component={Input}
                              label="add credit"
                              validate={required(translate('ra.validation.required'))}
                          />
                          <Box>
                              <Box>
                                  <CardActions>
                                      <Button
                                          variant="contained"
                                          type="submit"
                                          color="secondary"
                                          onClick={handleSubmit}
                                      >
                                     {translate('help.Add')}
                                      </Button>
                                  </CardActions>
                              </Box>
                          </Box>
                      </CardContent>
                  )

              }}/>
    )
}

const CreditorsInfoForm = (props)=> {
   const translate = useTranslate()
    return (
        <FormWithRedirect {...props}
          render={() => (
              <Card>
                  <form>
                      <CardContent>
                          <Box display={{md: 'block', lg: 'flex'}}>
                              <Box flex={2} mr={{md: 0, lg: '1em'}}>
                                  <Typography variant="h6" gutterBottom>
                                      {translate('auth.fullName')} :<span>{name}</span>
                                  </Typography>
                              </Box>
                              <Box
                                  flex={1}
                                  ml={{xs: 0, lg: '1em'}}
                                  mt={{xs: '1em', lg: 0}}
                              >
                      <Typography variant="h6" gutterBottom>
                          {translate('help.pendingCredit')}
                      </Typography>
                         <div>{pendingCredit}</div>
                          <Typography variant="h6" gutterBottom>
                              {translate('help.availableCredit')}
                          </Typography>
                                  <div>
                                      {acceptedCredit}
                                  </div>
                      </Box>
                          </Box>
                      </CardContent>
                  </form>
              </Card>
          )}
        />
    )
}

const CreditManagement = props => {
    return(
        <Edit {...props} title={<ClientTitle/>}>
            <>
            <CreditorsInfoForm/>
            <CreditValidationForm/>
            <InvoiceData/>
            </>
        </Edit>
    )
}


const InvoiceData = ()=> {
let [Invoice] = useState([])
let [ClientInvoice, setClientInvoice] = useState([])

let translate = useTranslate()
const permission = usePermissions()

//let status

/*function Pagination(params){
    page=params.page
        return(
            start = (params.page - 1) * 5,
            end = params.page * 5
        )
    }*/



/*useEffect(()=>{
    const token = localStorage.getItem('authentication');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', token)
    const request = new Request
    (`http://localhost:8080/evendistributor/clientmanagement/clients/${identifier}/credits`, {
        method: 'GET',
        headers: headers
    });

        fetch(request)
            .then((res)=>{
                return(
                    res.json()
                )
            })
            .then((response)=>{
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                let Invoices = response.map((item)=>{
                    let invoiceArray = {};
                    invoiceArray.id = item.invoiceId
                    invoiceArray.invoiceId = item.invoiceId
                    invoiceArray.receivedOn = item.receivedOn
                    invoiceArray.creditedOn = item.creditedOn
                    invoiceArray.receivedBy = item.receivedBy
                    invoiceArray.acceptedBy = item.acceptedBy
                    invoiceArray.amount = item.amount.value
                    invoiceArray.status = item.status
                    return invoiceArray
                })
                setInvoice(()=>Invoices)
                //console.log(Invoices)
            })
    },[page])*/


    const Validate = (ClientInvoice)=>{
        const  token  = localStorage.getItem('authentication');
        const  name = localStorage.getItem('fullName');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization',token);
        console.log("The identifier: " + identifier);
        const request = new Request(`http://localhost:8080/evendistributor/clientmanagement/clients/${identifier}/credits`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    "amount": {
                        "currencyCode": "XOF",
                        "value": ClientInvoice.amount
                    },
                    "invoiceId": ClientInvoice.invoiceId,
                    "receivedOn": null,
                    "receivedBy": ClientInvoice.receivedBy,
                    "creditedOn": null,
                    "acceptedBy": name,
                    "status": "PENDING"
                }
            ),
            headers:headers
        });
        return fetch(request)
            .then(response => {
                console.log(response)
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(validateCreditResponse => {
               // status = validateCreditResponse.status
               // console.log(validateCreditResponse)
                window.location.reload();
            });
    }



let columns = permission.permissions==="ADMIN"
    ?(
        [
            { field: 'invoiceId', headerName:translate('help.invoiceId'), width:150 },
            { field: 'amount', headerName:translate('help.Amount'), width:90,  type: 'number', sortable: false },
            { field: 'status', headerName:translate('help.status'), width:150, type: 'string',sortable: false  },
            { field: 'receivedBy', headerName:translate('help.receivedBy'), width:150,type: 'string', sortable: false  },
            { field: 'receivedOn', headerName:translate('help.receivedOn'), width:170 , type: 'date' },
            { field: 'acceptedBy', headerName:translate('help.acceptedBy'), width:150, type: 'string', sortable: false },
            { field: 'creditedOn', headerName:translate('help.creditedOn'), width:150, type: 'date'  },
            {field: 'deposits',
                headerName: 'validation',
                renderCell: (params) =>{
               // console.log(params.row.status)
                    if(params.row.status==="En attente"||params.row.status==="pending") {
                        return (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="medium"
                                onClick={() => {
                                    return (
                                        Validate(ClientInvoice)
                                    )
                                }}
                                disabled={false}
                            >
                                {translate('help.validate')}
                            </Button>
                        )
                    }else {
                        return (
                           // console.log(params.row.status),
                            <Button
                                variant="contained"
                                color="secondary"
                                size="medium"
                                onClick={()=>{
                                    return(
                                        Validate(ClientInvoice)
                                    )
                                }}
                                disabled={true}
                            >
                                {translate('help.validate')}
                            </Button>
                        )}
                }}
                ])
    : (
        [
            { field: 'invoiceId', headerName:translate('help.invoiceId'), width:150 },
            { field: 'amount', headerName:translate('help.Amount'), width:90,  type: 'number', sortable: false },
            { field: 'status', headerName:translate('help.status'), width:150, type: 'string',  sortable: false  },
            { field: 'receivedBy', headerName:translate('help.receivedBy'), width:150,type: 'string', sortable: false  },
            { field: 'receivedOn', headerName:translate('help.receivedOn'), width:170 , type: 'date' },
            { field: 'acceptedBy', headerName:translate('help.acceptedBy'), width:150, type: 'string', sortable: false },
            { field: 'creditedOn', headerName:translate('help.creditedOn'), width:150, type: 'date'  },

        ]
    )
    return(
       <ServerPaginationGrid invoice={Invoice} setClientInvoice={setClientInvoice} columns={columns} identifier={identifier}/>
    )
}



export  default CreditManagement