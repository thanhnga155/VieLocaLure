import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetDestination = async ({ isFilter, key, value } = {}) => {
    // /api/destination/filter?area=0
    
    let url = `${serverApi}/destination`;
    if (isFilter) {
        url += `/filter?${key}=${value}`;
    }
    const config = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}

export const UpdateDestinationById = async (id, data) => {
    const { response } = await axios.put(`${serverApi}/destination?id=${id}`, data);
    return response
}

export const AddDestination = async (data) => {
    const { response } = await axios.post(`${serverApi}/destination`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response
}

export const DeleteDestination = async (id) => {
    const { response } = await axios.delete(`${serverApi}/destination?id=${id}`);
    return response
}

export const GetDestinationById = async (id) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/destination?id=` + id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}