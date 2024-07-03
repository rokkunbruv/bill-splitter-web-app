import axios from 'axios';

const url = 'http://localhost:5000/receipts';

export const fetchReceipts = () => axios.get(url);
export const createReceipt = (newReceipt) => axios.post(url, newReceipt);
export const updateReceipt = (id, updatedReceipt) => axios.patch(`${url}/${id}`, updatedReceipt);
export const deleteReceipt = (id) => axios.delete(`${url}/${id}`);
export const assignItemToUser = (receiptId, user, item) => axios.patch(`${url}/${receiptId}/assign`, { user, item });
