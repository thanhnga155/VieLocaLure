import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetMenuItems = async () => {
    const config = {
        method: 'GET',
        url: `${serverApi}/menuItems`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}

export const GetMenuItemById = async (id) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/menuItems?id=` + id,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}

export const UpdateMenuItemById = async (id, data) => {
    const { response } = await axios.post(`${serverApi}/menuItems?id=${id}`, data);
    return response
}

export const AddMenuItem = async (data) => {
    const { response } = await axios.post(`${serverApi}/menuItems`, data);
    return response
}

export const DeleteMenuItem = async (id) => {
    const { response } = await axios.delete(`${serverApi}/menuItems?id=${id}`);
    return response
}