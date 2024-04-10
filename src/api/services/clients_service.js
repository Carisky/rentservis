import api_config from "../api_config";
import axios from "axios";

export default class clients_service{
    static async findAll() {
        try {
            const response = await axios.get(api_config.clients);
            return response.data;
        } catch (error) {
            console.error('Error fetching clients:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await axios.delete(`${api_config.clients}/${id}`);
            return response;
        } catch (error) {
            console.error('Error delete client:', error);
            throw error;
        }
    }

    static async put(id, data) {
        try {
            const response = await axios.put(`${api_config.clients}/${id}`, data);
            return response;
        } catch (error) {
            console.error('Error update client:', error);
            throw error;
        }
    }
    static async create(data) {
        try {
            const response = await axios.post(`${api_config.clients}`, data);
            return response;
        } catch (error) {
            console.error('Error create client:', error);
            throw error;
        }
    }    
}