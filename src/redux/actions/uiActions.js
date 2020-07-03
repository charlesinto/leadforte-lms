import { SET_ACTIVE_LINK, NAVIGATE_TO_COURSE, ASSESSMENT_SELECTED } from "../types"

export const setActiveLink = (link) => {
    return {type: SET_ACTIVE_LINK, payload:link}
}

export const navigateToClass = (catgeory) => {
    return {type: NAVIGATE_TO_COURSE, payload: catgeory}
}

export const assessmentSelected = (assessment) => {
    return {type: ASSESSMENT_SELECTED, payload: assessment}
}