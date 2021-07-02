import {actionTypes} from '../constants/actionTypes';

const initialState={
    data:[]
}

export const namesReducer = (state = initialState,action) => {
const {type,payload} = action;
switch (type) {
    case actionTypes.GET_ALL_NAMES:
        return(
            {
                ...state,
                data:payload
            }
            )
    case actionTypes.REMOVE_NAME:
        const namesAfterRemoved = state.data.filter(name => name.id !== payload);
        return(
            {
            ...state,
            data:namesAfterRemoved
            }
            )
    case actionTypes.CREATE_NAME:
        const namesAfterCreated = state.data.concat(payload);
        return(
            {
            ...state,
            data:namesAfterCreated
            }
            )
    case actionTypes.UPDATE_NAME:
        const nameIndex = state.data.findIndex(element => element.id === payload.data.id);
        let updatedNames = [];
        state.data.map(name => {
            if(name.id === payload.data.id)name = payload.data 
            updatedNames.push(name);
        });

        console.log(updatedNames);
        
         return(
            {
            ...state,
            data:updatedNames
            }
            )
    default:
    return state;
}


}