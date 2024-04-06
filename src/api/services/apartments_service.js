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
}