import { INITIATE_LOADING } from "../types"



const INITIAL_STATE = {
    isLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case INITIATE_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return {...state}
    }
}