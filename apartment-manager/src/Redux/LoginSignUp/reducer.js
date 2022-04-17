import { AUTH_STATE , LOGIN_TOKEN } from "./action";

const initState = {
    
    authState: JSON.parse(localStorage.getItem('authState')) ||false,
    token: JSON.parse(localStorage.getItem('logintoken'))  || null
}

export const loginReducer = (store=initState,{type,payload}) => {
    switch(type){
        case AUTH_STATE:
            localStorage.setItem('authState',JSON.stringify(payload))
            return {...store,authState:payload}

        case LOGIN_TOKEN:
            localStorage.setItem('logintoken',JSON.stringify(payload))
            return {...store,token:payload}
        
         default:
            return store
    }
}