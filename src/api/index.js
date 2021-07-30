import axios from 'axios'

export const server = "http://localhost:8080"

const api = {
    employee: {
        get: query => axios.get(`${server}/employee/list`, query),
        getById: id => axios.get(`${server}/employee/one/${id}`),
        post: data => axios.post(`${server}/employee/new`, data),
        put: (id, data) => axios.put(`${server}/employee/edit/${id}`, data),
        delete: id => axios.delete(`${server}/employee/delete/${id}`),
    }
}

export default api