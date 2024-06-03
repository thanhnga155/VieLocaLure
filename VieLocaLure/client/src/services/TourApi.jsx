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

export const GetTourFromPackage = async (tour, id) => {
    let url = `${serverApi}/tour/url?=${tour}&detail=${id}`;
    
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
    let p = ""
    for (let key in params) {
        let value = params[key];
        if (value !== "") {
            p += `${key}=${value}&`;
        }
    }

    p = p.substring(0, p.length - 1);
    
    
    const config = {
        method: 'GET',
        url: `${serverApi}/tour/search?${p}`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }

    const { data } = await axios(config);
    return data
}

export const SearchTourByImage = async (data) => {
    const { response } = await axios.post(`${serverApi}/tour/search/image`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    });
    return response
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

export const AddTour = async (data) => {
    const { response } = await axios.post(`${serverApi}/tour`, data);
    return response
}

export const DeleteTour = async (id) => {
    const { response } = await axios.delete(`${serverApi}/tour?id=${id}`);
    return response
}

export const UpdateTourById = async (id, data) => {
    const { response } = await axios.put(`${serverApi}/tour?id=${id}`, data);
    return response
}

export const BookingTour = async (data) => {
    const { response } = await axios.post(`${serverApi}/booking`, data);
    return response
}