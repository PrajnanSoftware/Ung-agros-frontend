import { axiosInstance } from "../utils/axiosInstance"

export const getAddress = async () => {
    return await axiosInstance.get('/address');
}