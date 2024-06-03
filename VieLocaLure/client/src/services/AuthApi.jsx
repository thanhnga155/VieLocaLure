import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const LoginAPI = async (data) => {
    // const response = await axios.post(`${serverApi}/Account/login`, data);
    // return response;
    return {
        data: {role: 'admin', accesstoken: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbG…lciJ9.DLi1EijxvAFiOZ-f_lOrViwVzHFHlKjIoEI1ElRmwgI', username: 'theanh1'}
    }
}