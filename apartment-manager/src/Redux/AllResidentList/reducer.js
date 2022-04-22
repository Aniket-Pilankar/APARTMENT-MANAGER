import { ALLRESIDENT_LIST } from "./action";

const initState = {
    allResidentList : []
}

export const allresidentReducer = (store = initState,{type,payload}) => {
    switch(type){

        case ALLRESIDENT_LIST:
            return {...store,allResidentList:[...payload]}

            default:
                return store
    }
}