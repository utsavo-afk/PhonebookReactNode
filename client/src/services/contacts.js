import axios from 'axios'
// const baseUrl = `http://localhost:3001/api/contacts`
const baseUrl = `/api/contacts`

// get all contacts
export const getAll = () => {
    const req = axios.get(`${baseUrl}`)
    return req.then(res => res.data)
}

// create a contact
export const createContact = (newObject) => {
    const req = axios.post(`${baseUrl}`, newObject)
    return req.then(res => res.data)
}

// update a contact
export const updateContact = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

// delete a contact
export const delContact = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(() => console.log('contact deleted'))
}