import axios from 'axios';
const value = sessionStorage.getItem('token');
export default class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5088',
            headers: {
                Authorization: `Bearer ${value}`,
            },
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
