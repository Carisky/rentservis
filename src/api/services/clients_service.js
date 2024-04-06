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
}