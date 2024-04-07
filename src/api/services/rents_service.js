import api_config from "../api_config";
import axios from "axios";

export default class rents_service{
    static async findAll() {
        try {
            const response = await axios.get(api_config.rents);
            return response.data;
        } catch (error) {
            console.error('Error fetching rents:', error);
            throw error;
        }
    }
    static async delete(id) {
        try {
            const response = await axios.delete(`${api_config.rents}/${id}`);
            return response;
        } catch (error) {
            console.error('Error delete rent:', error);
            throw error;
        }
    }
    static async put(id, data) {
        try {
            const response = await axios.put(`${api_config.rents}/${id}`, data);
            return response;
        } catch (error) {
            console.error('Error update rent:', error);
            throw error;
        }
    }
}