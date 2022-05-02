import { AUTH_STATE , LOGIN_TOKEN ,LOGIN_DATA } from "./action";

const initState = {
    
    authState: JSON.parse(localStorage.getItem('authState')) ||false,
    token: JSON.parse(localStorage.getItem('logintoken'))  || null,
    // userData:{}
}

export const loginReducer = (store=initState,{type,payload}) => {
    switch(type){
        case AUTH_STATE:
            localStorage.setItem('authState',JSON.stringify(payload))
            return {...store,authState:payload}

        case LOGIN_TOKEN:
            localStorage.setItem('logintoken',JSON.stringify(payload))
            return {...store,token:payload}
        
        // case LOGIN_DATA:
        //     return {...store,userData:payload}
         default:
            return store
    }
}