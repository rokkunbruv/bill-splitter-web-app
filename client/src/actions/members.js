import * as api from '../api';

export const getMembers = (token) => async (dispatch) => {
    try {
        const { data } = await api.fetchMembers(token);
        dispatch({ type: 'FETCH_ALL_MEMBERS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const addMember = (name, token) => async (dispatch) => {
    try {
        const { data } = await api.createMember(name, token);
        dispatch({ type: 'ADD_MEMBER', payload: data });
    } catch (error) {
        console.log(error);
    }
};