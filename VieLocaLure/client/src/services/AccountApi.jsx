import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetCustomer = async () => {
    const config = {
        method: 'GET',
        url: `${serverApi}/account/customer`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}

export const AddCustomer = async (data) => {
    const { response } = await axios.post(`${serverApi}/account/customer`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response
}

export const DeleteCustomer = async (id) => {
    const { response } = await axios.delete(`${serverApi}/account/customer?id=${id}`);
    return response
}

export const GetCustomerById = async (id) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/account/customer?id=` + id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const UpdateCustomerById = async (id, data) => {
    const { response } = await axios.put(`${serverApi}/account/customer?id=${id}`, data);
    return response
}