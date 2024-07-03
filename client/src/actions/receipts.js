import * as api from '../api';

export const getReceipts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchReceipts();

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
    
}

export const createReceipt = (receipt) => async (dispatch) => {
    try {
        const { data } = await api.createReceipt(receipt);

        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updateReceipt = (id, receipt) => async (dispatch) => {
    try {
        const { data } = await api.updateReceipt(id, receipt);
           
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteReceipt = (id) => async (dispatch) => {
    try {
        await api.deleteReceipt(id);

        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const assignItemToUser = (receiptId, user, item) => async (dispatch) => {
    try {
        const { data } = await api.assignItemToUser(receiptId, user, item);
        
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}
