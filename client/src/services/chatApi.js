import axiosInstance from "../axios/axios";

export const createChat = ( senderId,receiverId) =>{
    
    return axiosInstance("WorkerJwtkey").post('/chat/createChat', {senderId,receiverId});
} 

export const chatRoom = (id) =>{
    return axiosInstance("WorkerJwtkey").get(`/chat/${id}`);
}

export const getWorker = (id) =>{
    return axiosInstance("UserJwtkey").get(`/chat/getWorker/${id}`);
}

export const getUser = (id) =>{
    return axiosInstance("WorkerJwtkey").get(`/chat/getUser/${id}`);
}


export const findChat = (firstId, secondId) => axios.get(`/chat/find/${firstId}/${secondId}`);

//message api


export const getMessages = (id) => {
    return axiosInstance("WorkerJwtkey").get(`/message/${id}`);
}

export const sendMessage = (data) => {
    return axiosInstance("WorkerJwtkey").post('/message/', {...data})
}