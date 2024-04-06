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
}