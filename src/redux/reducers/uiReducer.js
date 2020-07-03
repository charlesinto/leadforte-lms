import { INITIATE_LOADING, SET_ACTIVE_LINK, NAVIGATE_TO_COURSE, ASSESSMENT_SELECTED, CLASS_SELECTED, MATERIALS_VIEW } from "../types"



const INITIAL_STATE = {
    isLoading: false,
    activeLink: 'home',
    category: '1',
    assessment: {},
    data:[],
    className: '',
    materials: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case INITIATE_LOADING:
            return {...state, isLoading: action.payload}
        case SET_ACTIVE_LINK:
            return {...state, activeLink: action.payload}
        case NAVIGATE_TO_COURSE: 
         return {...state, category: action.payload}
        case ASSESSMENT_SELECTED:
            return {...state, assessment: action.payload.assessment, data: action.payload.data}
        case CLASS_SELECTED:
            return {...state, className: action.payload}
        case MATERIALS_VIEW:
            return {...state, materials: action.payload}
        default:
            return {...state}
    }
}