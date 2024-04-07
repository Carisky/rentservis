import api_config from "../api_config";
import axios from "axios";

export default class apartments_service{
    static async findAll() {
        try {
            const response = await axios.get(api_config.apartments);
            return response.data;
        } catch (error) {
            console.error('Error fetching apartments:', error);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const response = await axios.delete(`${api_config.apartments}/${id}`);
            return response;
        } catch (error) {
            console.error('Error delete apartment:', error);
            throw error;
        }
    }

    static async put(id, data) {
        try {
            const response = await axios.put(`${api_config.apartments}/${id}`, data);
            return response;
        } catch (error) {
            console.error('Error update apartment:', error);
            throw error;
        }
    }
}