import { FLAT_DETAILS } from "./action"


const initState = {
    flatAllDetails : []
}

export const flatReducer = (store=initState,{type,payload}) => {
    switch(type){
        case FLAT_DETAILS : 
            return {...store,flatAllDetails:[...payload]} 

        default :
            return store
    }
}