import axios from 'axios'

const serverApi = process.env.REACT_APP_SERVER_API;

export const LoginAPI = async (data) => {
    const response = await axios.post(`${serverApi}/Account/login`, data);
    return response;
}