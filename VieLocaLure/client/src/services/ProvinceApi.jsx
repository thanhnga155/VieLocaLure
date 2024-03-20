import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const GetProvince = async ({ isFilter, key, value }) => {
    // /api/province/filter?area=0
    
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