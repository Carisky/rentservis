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
}