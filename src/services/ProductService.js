import axios from 'axios';

const API_URL = "http://localhost:8081/api/products";

export default {
    getAllProducts() {
        return axios.get(API_URL);
    },

    createProduct(product) {
        return axios.post(API_URL, product);
    },

    deleteProduct(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
} 