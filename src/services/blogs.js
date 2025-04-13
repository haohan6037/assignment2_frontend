
import axiosInstance from "../utils/axiosConfig";


class BlogsDataService {
    async signup(data) {
        return axiosInstance.post("/signup/", data);
    }
}

export default new BlogsDataService();