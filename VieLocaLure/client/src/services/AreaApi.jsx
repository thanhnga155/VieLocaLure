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