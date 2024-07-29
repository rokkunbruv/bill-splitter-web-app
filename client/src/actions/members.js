import * as api from '../api';

export const getMembers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMembers();
        dispatch({ type: 'FETCH_ALL_MEMBERS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const addMember = (name) => async (dispatch) => {
    try {
        const { data } = await api.createMember(name);
        dispatch({ type: 'ADD_MEMBER', payload: data });
    } catch (error) {
        console.log(error);
    }
};