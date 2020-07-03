import { SET_ACTIVE_LINK, NAVIGATE_TO_COURSE,
     ASSESSMENT_SELECTED, CLASS_SELECTED, MATERIALS_VIEW } from "../types"

export const setActiveLink = (link) => {
    return {type: SET_ACTIVE_LINK, payload:link}
}

export const navigateToClass = (catgeory) => {
    return {type: NAVIGATE_TO_COURSE, payload: catgeory}
}

export const assessmentSelected = (assessment) => {
    return {type: ASSESSMENT_SELECTED, payload: assessment}
}

export const selectedClass = (className) => {
    return {type: CLASS_SELECTED, payload: className}
}

export const materialsView = (materials) => {
    return {type: MATERIALS_VIEW, payload: materials}
}