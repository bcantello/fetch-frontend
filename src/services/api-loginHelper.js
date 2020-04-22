import axios from 'axios'

const api = axios.create({
    baseURL: "https://fetch-app-heroku.herokuapp.com/"
});

export const createUser = async (user) => {
    return await api.post('/users/', user)
};

export const verifyUser = async (user) => {
    return await api.get(`/users/${user.email}/${user.password}`, user)
};
