import axios from 'axios';
import {API_URL_COMMENTS} from "../utils/consts";


export const fetchComments = async (discussionId) => {
    const response = await axios.get(`${API_URL_COMMENTS}/${discussionId}`);
    return response.data;
};


export const createComment = async (comment) => {
    const response = await axios.post(API_URL_COMMENTS, comment);
    return response.data;
};

export const updateComment = async (commentId, data) => {
    const response = await axios.put(`${API_URL_COMMENTS}/${commentId}`, data);
    return response.data;
};

export const deleteComment = async (commentId, data) => {
    const response = await axios.delete(`${API_URL_COMMENTS}/${commentId}`, { data });
    return response.data;
};