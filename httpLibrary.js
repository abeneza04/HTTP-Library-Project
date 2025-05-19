class HTTPLibrary {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        console.log("Base URL:", this.baseUrl);
    }

    async get(route = '', param = '', query = '') {
        try {
            const resource = this.buildUrl(route, param, query);
            const options = {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            };
            const response = await fetch(resource, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async delete(route='', param='', query='') {
        try {
            const resource = this.buildUrl(route, param, query);
            const options = {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            };
            const response = await fetch(resource, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch(error) {
            throw error;
        }
    }

    buildUrl(route, param, query) {
        let url = this.baseUrl;
        if (route) url += `/${route}`;
        if (param) url += `/${param}`;
        if (query) url += (typeof query === 'string') ? `?${query}` : `?${this.buildQuerryString(query)}`;
        
        console.log("Built URL:", url);
        return url;
    }

    buildQuerryString(query) {
    let queryString = '';
    if (typeof query === 'object' && query !== null) {
        queryString = Object.entries(query)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }
    console.log(queryString);
    return queryString;
}
           
}


