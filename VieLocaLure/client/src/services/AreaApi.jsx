import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetArea = async () => {
    const config = {
        method: 'GET',
        url: `${serverApi}/area`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}

export const GetAreaIDByURL = async (url) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/area/url?url=` + url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}

export const GetAreaById = async (id) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/area?id=` + id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const UpdateAreaById = async (id, data) => {
    const { response } = await axios.put(`${serverApi}/area?id=${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response
}

export const AddArea = async (data) => {
    const { response } = await axios.post(`${serverApi}/area`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response
}

export const DeleteArea = async (id) => {
    const { response } = await axios.delete(`${serverApi}/area?id=${id}`);
    return response
}