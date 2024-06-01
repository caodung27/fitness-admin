import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://fitness-be.onrender.com';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const auth = localStorage.getItem('auth');
    const token = auth ? JSON.parse(auth).token : null;
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

const getResponseData = (resource, json) => {
    console.log('Response JSON:', json);
    if (resource === 'user' || resource === 'path') {
        const dataKey = resource === 'user' ? 'users' : 'paths'; 
        const data = json[dataKey];
        if (Array.isArray(data)) {
            return data.map(item => getResourceData(resource, item));
        } else if (typeof data === 'object') {
            return [getResourceData(resource, data)];
        } else {
            throw new Error('Invalid JSON data');
        }
    } else {
        throw new Error(`Unexpected resource: ${resource}`);
    }
};

const getResourceData = (resource, item) => {
    if (resource === 'user') {
        return {
            id: item._id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            password: item.password,
            location: item.location,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            age: item.age,
            gender: item.gender,
            height: item.height,
            weight: item.weight
        };
    } else if (resource === 'path') {
        return {
            id: item._id,
            type: item.type,
            start: item.start,
            end: item.end,
            speed: item.speed,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    } else {
        throw new Error(`Unexpected resource: ${resource}`);
    }
};

const DataProvider = {
    getList: async (resource, params) => {
        try {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(params.filter),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const { headers, json } = await httpClient(url);
            const data = getResponseData(resource, json);
            const total = headers.has('content-range') ? parseInt(headers.get('content-range').split('/').pop(), 10) : data.length;
            return {
                data: data,
                total: total,
            };
        } catch (error) {
            console.error('Error in getList:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },

    getOne: async (resource, params) => {
        try {
            const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
            const data = getResourceData(resource, json);
            return { data };
        } catch (error) {
            console.error('Error in getOne:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },
    
    getMany: async (resource, params) => {
        try {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const { json } = await httpClient(url);
            const data = getResponseData(resource, json);
            return { data: data };
        } catch (error) {
            console.error('Error in getMany:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },

    getManyReference: async (resource, params) => {
        try {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify({
                    ...params.filter,
                    [params.target]: params.id,
                }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const { headers, json } = await httpClient(url);
            const data = getResponseData(resource, json);
            const total = headers.has('content-range') ? parseInt(headers.get('content-range').split('/').pop(), 10) : data.length;
            return {
                data: data,
                total: total,
            };
        } catch (error) {
            console.error('Error in getManyReference:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },

    update: async (resource, params) => {
        try {
            const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });
            const responseData = getResourceData(resource, json);
            return { data: responseData };
        } catch (error) {
            console.error('Error in update:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },    

    create: async (resource, params) => {
        try {
            const { json } = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return { data: getResponseData(resource, [json])[0] };
        } catch (error) {
            console.error('Error in create:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },

    delete: async (resource, params) => {
        try {
            const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'DELETE',
            });
            return { data: getResponseData(resource, [json])[0] };
        } catch (error) {
            console.error('Error in delete:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },

    deleteMany: async (resource, params) => {
        try {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            const { json } = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
                method: 'DELETE',
            });
            const data = getResponseData(resource, json);
            return { data: data };
        } catch (error) {
            console.error('Error in deleteMany:', error, 'Resource:', resource, 'Params:', params);
            throw error;
        }
    },
};

export default DataProvider;
