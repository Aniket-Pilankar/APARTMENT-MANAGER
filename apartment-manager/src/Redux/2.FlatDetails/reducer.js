import { FLAT_DETAILS } from "./action"
import { FLAT_TOTALPAGES } from "./action"


const initState = {
    flatAllDetails : [],
    flat_totalPages:0
}

export const flatReducer = (store=initState,{type,payload}) => {
    switch(type){
        case FLAT_DETAILS : 
            return {...store,flatAllDetails:[...payload]} 

        case FLAT_TOTALPAGES:
            return {...store,flat_totalPages:payload}

        default :
            return store
    }
}