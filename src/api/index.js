import axios from 'axios'

export const server = "https://arcane-peak-34168.herokuapp.com"

const api = {
    employee: {
        get: query => axios.get(`${server}/employee/list`, query),
        getById: id => axios.get(`${server}/employee/one/${id}`),
        post: data => axios.post(`${server}/employee/new`, data),
        put: (id, data) => axios.put(`${server}/employee/edit/${id}`, data),
        delete: id => axios.delete(`${server}/employee/delete/${id}`),
        upload: formData => axios.post(`${server}/upload`, formData),
    }
}

export default api