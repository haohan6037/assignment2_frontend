
import axiosInstance from "../utils/axiosConfig";


class BlogsDataService {
    async signup(data) {
        return axiosInstance.post("/signup/", data);
    }
    async createPost(data) {
        return axiosInstance.post("/posts/create/", data);
    }
    async postDetail(id) {
        return axiosInstance.get(`/posts/${id}/`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BlogsDataService();