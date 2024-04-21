import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetProvince = async ({ isFilter, key, value } = {}) => {
    // /api/province/filter?province=0
    
    let url = `${serverApi}/province`;
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

export const GetProvinceById = async (id) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/province?id=` + id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const UpdateProvinceById = async (id, data) => {
    const { response } = await axios.post(`${serverApi}/province?id=${id}`, data);
    return response
}

export const AddProvince = async (data) => {
    const { response } = await axios.post(`${serverApi}/province`, data);
    return response
}

export const DeleteProvince = async (id) => {
    const { response } = await axios.delete(`${serverApi}/province?id=${id}`);
    return response
}