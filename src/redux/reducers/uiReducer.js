import { INITIATE_LOADING, SET_ACTIVE_LINK } from "../types"



const INITIAL_STATE = {
    isLoading: false,
    activeLink: 'home',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case INITIATE_LOADING:
            return {...state, isLoading: action.payload}
        case SET_ACTIVE_LINK:
            return {...state, activeLink: action.payload}
        default:
            return {...state}
    }
}