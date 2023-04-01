import axios from 'axios';

export default class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://localhost:44376',
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });
    }


    get(endpoint) {
        return this.api.get(endpoint);
    }

    post(endpoint, data) {
        return this.api.post(endpoint, data);
    }

    put(endpoint, data) {
        return this.api.put(endpoint, data);
    }

    delete(endpoint) {
        return this.api.delete(endpoint);
    }

}
