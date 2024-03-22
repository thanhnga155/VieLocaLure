import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;


export const GetTour = async ({ isFilter, filterKey, key, value } = {}) => {
    // /api/tour/filter?key=hottest&max=3

    let url = `${serverApi}/tour`
    if (isFilter) {
        url += `/filter?key=${filterKey}${key ? `&${key}=${value}` : ''}`;
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

export const SearchTour = async (params) => {
    const config = {
        method: 'POST',
        url: `${serverApi}/tour/search`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        data: params
    }

    const { data } = await axios(config);
    return data
}

export const GetTourDetailByUrl = async (url) => {
    const config = {
        method: 'GET',
        url: `${serverApi}/tour/detail?url=${url}`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    const { data } = await axios(config);
    return data
}