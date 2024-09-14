import axios from "axios";

const favoritesAPI = axios.create({ baseURL: "http://localhost:8000/favorite" });

async function getFavorites() {
    try {
        const response = await favoritesAPI.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
}

async function postFavorite(id) {
    try {
        await favoritesAPI.post(`/${id}`);
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
}

async function deleteFavorite(id) {
    try {
        await favoritesAPI.delete(`/${id}`);
    } catch (error) {
        console.error('Error deleting favorite:', error);
        throw error;
    }
}

export {
    getFavorites,
    postFavorite,
    deleteFavorite
};
