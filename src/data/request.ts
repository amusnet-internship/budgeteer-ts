const host = 'http://localhost:3030';


async function request(method: 'get' | 'post' | 'patch' | 'put' | 'delete', url: string, data?: any) {
    const options: {
        method: 'get' | 'post' | 'patch' | 'put' | 'delete',
        headers: {[header: string]: string},
        body?: string
    } = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status == 204) {
            return response;
        }

        const result = await response.json();

        if (response.ok == false) {
            throw new Error(result.message);
        }

        return result;

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

type RequestMethod = (url: string, data?: any) => Promise<any>;

export const api: {
    get: RequestMethod,
    post: RequestMethod,
    patch: RequestMethod,
    put: RequestMethod,
    delete: RequestMethod,
} = {
    get: request.bind(null, 'get'),
    post: request.bind(null, 'post'),
    patch: request.bind(null, 'patch'),
    put: request.bind(null, 'put'),
    delete: request.bind(null, 'delete'),
}