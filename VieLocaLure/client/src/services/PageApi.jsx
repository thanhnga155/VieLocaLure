import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetPage = async () => {
    const config = {
        method: 'GET',
        url: `${serverApi}/page`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }

    }
    const { data } = await axios(config);
    return data
}