import axios from 'axios';

const url = 'http://localhost:5000';

// Existing receipt-related API calls
export const fetchReceipts = () => axios.get(`${url}/receipts`);
export const createReceipt = (newReceipt) => axios.post(`${url}/receipts`, newReceipt);
export const updateReceipt = (id, updatedReceipt) => axios.patch(`${url}/receipts/${id}`, updatedReceipt);
export const deleteReceipt = (id) => axios.delete(`${url}/receipts/${id}`);
export const assignItemToUser = (receiptId, user, item) => axios.patch(`${url}/receipts/${receiptId}/assign`, { user, item });
export const updateReceiptSplit = (id, splitData) => axios.patch(`${url}/receipts/${id}/split`, splitData);

// New member-related API calls
export const fetchMembers = () => axios.get(`${url}/members`);
export const createMember = (name) => axios.post(`${url}/members`, { name });
