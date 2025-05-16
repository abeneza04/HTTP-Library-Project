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

    buildUrl(route, param, query) {
        let url = this.baseUrl;
        if (route) url += `/${route}`;
        if (param) url += `/${param}`;
        if (query) url += `?${query}`
        
        console.log("Built URL:", url);
        return url;
    }
           
}


