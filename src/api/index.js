import axios from 'axios'

export const server = "http://localhost:8080"

export default {
    employee: {
        get: query => axios.get(`${server}/employee/list`, query),
        getById: id => axios.get(`${server}/employee/one/${id}`),
    }
}
