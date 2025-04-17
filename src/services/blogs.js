
import axiosInstance from "../utils/axiosConfig";


class BlogsDataService {
    async signup(data) {
        return axiosInstance.post("/signup/", data);
    }
    async login(data) {
        return axiosInstance.post("/login/", data);
    }
    async createPost(data) {
        return axiosInstance.post("/posts/create/", data);
    }
    async postDetail(id) {
        return axiosInstance.get(`/posts/${id}/`);
    }
    async postList() {
        return axiosInstance.get(`/posts/`);
    }
    async deletePost(id, token) {
        return axiosInstance.delete(`/posts/${id}/delete/`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BlogsDataService();