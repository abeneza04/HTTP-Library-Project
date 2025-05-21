class HTTPLibrary {
    // Constructor
    constructor(baseUrl) {
        if (typeof baseUrl !== 'string' || !baseUrl.trim()) { // Check for valid url
            throw new Error("Invalid baseUrl. It must be a non-empty string.");
        }
        this.baseUrl = baseUrl;
        console.log("Base URL:", this.baseUrl);
    }

    // request function for all type
    async request(method, route = '', param = '', query = '', data = null) {
        try {
        this.validateInputs(method, route, param, data); // check for valid Input
        const resource = this.buildUrl(route, param, query);
        
        const options = { 
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && data) { // update body for POST, PUT, PATCH
            options.body = JSON.stringify(data);
        }

        const response = await fetch(resource, options);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return await response.json();
        } catch (error) {
        return error.message;
        }
    }

    // Request option
    async get(route = '', param = '', query = '') {
        return this.request('GET', route, param, query);
    }

    async delete(route = '', param = '', query = '') {
        return this.request('DELETE', route, param, query);
    }

    async post(route = '', param = '', query = '', data = {}) {
        return this.request('POST', route, param, query, data);
    }

    async put(route = '', param = '', query = '', data = {}) {
        return this.request('PUT', route, param, query, data);
    }

    async patch(route = '', param = '', query = '', data = {}) {
        return this.request('PATCH', route, param, query, data);
    }

    // support function for route, param, query

    buildUrl(route, param, query) { // build valid url
        let url = this.baseUrl;
        if (route) url += `/${route}`;
        if (param) url += `/${param}`;
        if (query) url += (typeof query === 'string') ? `?${query}` : `?${this.buildQueryString(query)}`;
        
        console.log("Built URL:", url);
        return url;
    }

    buildQueryString(query) { // convert to query string if input not query string
    let queryString = '';
    if (typeof query === 'object' && query !== null) {
        queryString = Object.entries(query)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }
    console.log(queryString);
    return queryString;
    }

    validateInputs(method, route, param = '', data = {}) { // throw error for each invalid input
        if (route == null || (typeof route !== 'string' && typeof route !== 'number')) {
            throw new Error(`${method}: Route must be a non-empty string or number.`);
        }
        if (String(route).trim() === '') {
            throw new Error(`${method}: Route cannot be empty or whitespace.`);
        }

        if (['DELETE', 'PUT', 'PATCH'].includes(method)) {
            if (param == null || String(param).trim() === '') { 
                throw new Error(`${method}: Param (e.g., ID) is required.`);
            }
        }

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            if (!data || typeof data !== 'object') {
                throw new Error(`${method}: Valid data object is required.`);
            }
        }
    }
           
}