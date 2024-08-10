import axios from 'axios';

const url = 'http://localhost:5000';

// Existing receipt-related API calls
export const fetchReceipts = (token) => axios.get(`${url}/receipts`, {
        headers: { Authorization: `Bearer ${token}` }
});
export const createReceipt = (newReceipt, token) => axios.post(`${url}/receipts`, newReceipt, {
        headers: { Authorization: `Bearer ${token}` }
});
export const updateReceipt = (id, updatedReceipt, token) => axios.patch(`${url}/receipts/${id}`, updatedReceipt, {
        headers: { Authorization: `Bearer ${token}` }
});
export const deleteReceipt = (id, token) => axios.delete(`${url}/receipts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
});
export const assignItemToUser = (receiptId, user, item, token) => axios.patch(`${url}/receipts/${receiptId}/assign`, { user, item }, {
        headers: { Authorization: `Bearer ${token}` }
});
export const updateReceiptSplit = (id, splitData, token) => axios.patch(`${url}/receipts/${id}/split`, splitData, {
        headers: { Authorization: `Bearer ${token}` }
});

// New member-related API calls
export const fetchMembers = () => axios.get(`${url}/members`);
export const createMember = (name) => axios.post(`${url}/members`, { name });

// Authorization API calls
export const signup = (name, email, password, confirmPassword) => axios.post(`${url}/api/auth/signup`, { name, email, password, confirmPassword });
export const verifyEmail = (userId, otp) => axios.post(`${url}/api/auth/verifyOTP`, { userId, otp });
export const sendOTPVerificationEmail = (email) => axios.post(`${url}/api/auth/sendOTP`, { email });
export const login = (credentials) => axios.get(`${url}/api/auth/login`, {
        headers: { Authorization: `Basic ${credentials}` } 
});
export const sendChangePassword = (email) => axios.post(`${url}/api/auth/forgot-password`, { email });
export const verifyChangePassword = (resetCode) => axios.post(`${url}/api/auth/verify-reset-password`, { resetCode });
export const resetPassword = (password, confirmPassword) => axios.post(`${url}/api/auth/reset-password`, { password, confirmPassword });
export const verifyToken = (token) => axios.get(`${url}/api/auth/verify-token`, {
    headers: { Authorization: `Bearer ${token}` } 
});