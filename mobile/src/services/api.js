import axios from 'axios';

const api = axios.create(
    {
        baseURL: 'http://200.17.210.142:3333',

    }
)

export default api;