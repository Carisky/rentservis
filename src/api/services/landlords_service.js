import api_config from "../api_config";
import axios from "axios";

export default class landlords_service{
    static async findAll() {
        try {
            const response = await axios.get(api_config.landlords);
            return response.data;
        } catch (error) {
            console.error('Error fetching landlords:', error);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const response = await axios.delete(`${api_config.landlords}/${id}`);
            return response;
        } catch (error) {
            console.error('Error delete landlord:', error);
            throw error;
        }
    }

    static async put(id, data) {
        try {
            const response = await axios.put(`${api_config.landlords}/${id}`, data);
            return response;
        } catch (error) {
            console.error('Error update landlord:', error);
            throw error;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${api_config.landlords}`, data);
            return response;
        } catch (error) {
            console.error('Error create landlord:', error);
            throw error;
        }
    } 
}