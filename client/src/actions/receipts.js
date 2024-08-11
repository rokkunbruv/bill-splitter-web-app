import * as api from '../api';

export const getReceipts = (token) => async (dispatch) => {
    try {
        const { data } = await api.fetchReceipts(token);

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
    
}

export const createReceipt = (receipt, token) => async (dispatch) => {
    try {
        const { data } = await api.createReceipt(receipt, token);
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updateReceipt = (id, receipt, token) => async (dispatch) => {
    try {
        const { data } = await api.updateReceipt(id, receipt, token);
           
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteReceipt = (id, token) => async (dispatch) => {
    try {
        await api.deleteReceipt(id, token);

        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.error('Delete receipt error:', error.response?.data || error.message);
        // Optionally dispatch an error action here
        console.log('Token:', token);
    }
}

export const assignItemToUser = (receiptId, user, item, token) => async (dispatch) => {
    try {
        const { data } = await api.assignItemToUser(receiptId, user, item, token);
       
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateReceiptSplit = (id, splitData, token) => async (dispatch) => {
    try {
        const { data } = await api.updateReceiptSplit(id, splitData, token);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};