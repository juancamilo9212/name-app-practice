import {actionTypes} from '../constants/actionTypes';

export const getNames = (names) => {
    return{
        type:actionTypes.GET_ALL_NAMES,
        payload:names
    }
}

export const createName = (newName) => {
    return{
        type:actionTypes.CREATE_NAME,
        payload:newName
    }
}

export const updateName = (updatedName) => {
    return{
        type:actionTypes.UPDATE_NAME,
        payload:updatedName
    }
}

export const removeName = (id) => {
    return{
        type:actionTypes.REMOVE_NAME,
        payload:id
    }
}