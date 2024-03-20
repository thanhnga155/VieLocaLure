import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetDescription = async (id) => {
    // /api/description?q=homepage
    const config = {
        method: 'GET',
        url: `${serverApi}/description?id=${id}`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}