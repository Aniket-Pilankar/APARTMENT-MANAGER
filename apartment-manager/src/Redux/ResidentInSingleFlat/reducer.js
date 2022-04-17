import { RESIDENT_DETAILS } from "./action"


const initState = {
    resident:[]
}

export const residentReducer = (store=initState,{type,payload}) => {
    switch (type) {
        case RESIDENT_DETAILS:
            
            return {...store,resident:[...payload]}
    
        default:
            return store
    }
}

