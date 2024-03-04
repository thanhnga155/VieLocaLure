import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetAllAreas = async (id, token) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/areas`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}