
import axiosInstance from "../utils/axiosConfig";


class BlogsDataService {
    async signup(data) {
        return axiosInstance.post("/signup/", data);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BlogsDataService();