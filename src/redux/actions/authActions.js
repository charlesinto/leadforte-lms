import { INITIATE_LOADING } from "../types";

export const initiateLoading = (isLoading = false) => {
    return {type: INITIATE_LOADING, payload: isLoading}
}

