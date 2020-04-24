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

export const createPet = async (pet) => {
    console.log('api - pet', pet)
    return await api.post('/pets/', pet)
};

export const getAllPets = async (userId) => {
    console.log('api - allpets', userId)
    return await api.get(`/pets/account/${userId}`)
};

export const getUserById = async (userId) => {
    console.log('api-userID', userId)
    return await api.get(`/users/${userId}`)
}