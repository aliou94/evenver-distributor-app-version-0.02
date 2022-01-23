import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'
import {useNotify,useTranslate} from 'ra-core';




function loadServerRows(page, invoice) {
    return new Promise((resolve) => {
            resolve(invoice);
    });
}



export default function

    ServerPaginationGrid(props) {

    let [Page, setPage] = React.useState(1);
    let [End, setEnd] = React.useState(5);
    let [Start, setStart] = React.useState(0);
    const [Rows, setRows] = React.useState([]);
    let identifier = props.identifier;
    let notify = useNotify();
    let translate = useTranslate();

    const handlePageChange = (params) => {
        setPage(params.page)
        setStart((params.page - 1) * 5)
        setEnd(params.page * 5)
    }

    React.useEffect(() => {

        const token = localStorage.getItem('authentication');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', token)
        const request = new Request
        (`http://localhost:8080/evendistributor/clientmanagement/clients/${identifier}/credits?_end=${End}&_order=DESC&_sort=id&_start=${Start}`, {
            method: 'GET',
            headers: headers
        });
        fetch(request)
            .then((res)=>{
              //let  totalPages = parseFloat(res.headers.get('X-Total-Count'))
                return(
                    res.json()
                )
            })
            .then((response)=>{
                if (response.status < 200 || response.status >= 300) {
                    return;
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
                    invoiceArray.currencyCode= item.amount.currencyCode
                    invoiceArray.status = translate(`help.${item.status}`)
                    return invoiceArray
                })
                setRows(()=>Invoices)

            }).catch(error => {
            notify(error)
        })

        let active = true;
        (async () => {
            const newRows = await loadServerRows(Page, Rows)
            if (!active) {
                return;
            }
            setRows(newRows)

        })();

        return () => {
            active = false;
        };
    }, [Page]);

    return (
        <div style={{ height:400, width: '100%' }}>
            <DataGrid
                rows={Rows}
                columns={props.columns}
                pageSize={5}
                rowCount={25}
                pagination
                paginationMode="server"
                onPageChange={handlePageChange}
                sortingOrder={['desc','desc']}
                sortModel={
                    [
                        {
                            field:'invoiceId',
                            sort:'desc',
                        }
                    ]
                }
                onRowClick={(params)=>{
                    props.validate(params.row)
                }}
                {...Rows}
            />
        </div>
    );
}