import { SET_ACTIVE_LINK } from "../types"

export const setActiveLink = (link) => {
    return {type: SET_ACTIVE_LINK, payload:link}
}