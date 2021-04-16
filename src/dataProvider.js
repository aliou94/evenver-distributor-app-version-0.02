import {fetchUtils} from 'react-admin';
import { stringify } from 'query-string';

const apiUrl ='http://localhost:8080/evendistributor';
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const  token  = localStorage.getItem('authentication');
    options.headers.set('Authorization', token);
    // eslint-disable-next-line no-undef
    return (
        fetchUtils.fetchJson(url, options)
    )
};


export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
       // let role = params.filter.role
        const query = {
            sort: JSON.stringify([field,order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        };
        const url = !params.filter.role
            ?`${apiUrl}/${resource}?${stringify(query)}`
            :`${apiUrl}/${resource}?_end=${perPage}&_order=DESC&_sort=role&_start=0&role=${params.filter.role}`
       // const url =`${apiUrl}/${resource}?_end=${perPage}&_order=DESC&_sort=role&_start=0&role=${params.filter.role}`;
       // const url =`${apiUrl}/${resource}?${stringify(query)}`;

        if (resource==="shipmentmanagement/shipments"){
             return httpClient(url).then(({ headers, json }) => ({
                 data: json.map(resource => ({ ...resource,id: resource.shipmentNumber}) ),
                 total: parseInt(headers.get('X-Total-Count').split('/').pop(), 10),
             }));

         }
        return httpClient(url).then(({ headers, json }) => (
            {

            data: json.map(resource => ({ ...resource}) ),
            total: parseInt(headers.get('X-Total-Count').split('/').pop(), 10)
        }));
    },

    getOne: (resource, params) =>{
        if (resource==="shipmentmanagement/shipments"){
            return  httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json }) => ({
                data: { ...json, id: resource.shipmentNumber},
            }))
        }
        return(
            httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json }) => ({
                data: { ...json},
            }))
        )
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        if (resource==="shipmentmanagement/shipments"){
            return httpClient(url).then(({ json }) => ({data: json.map(resource => ({ ...resource, id:resource.shipmentNumber}) )}));
        }
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { role} = params.sort;
        const query = {
            sort: JSON.stringify(role),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.map(resource => ({ ...resource, id:resource.shipmentNumber}) ),
            total: parseInt(headers.get('X-Total-Count').split('/').pop(), 2),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json , id: json.shipmentNumber}));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id:json.shipmentNumber },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json, id:json.shipmentNumber })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    }
};


