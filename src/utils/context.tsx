import { createContext, useReducer } from "react";

type ContextTypes = {
    state:any;
    dispatch:any;
}

export const Context = createContext({} as ContextTypes);

let initialState = {
    token:null,
    data:null,
    query:null
}

const reducer = (state,action) => {
    switch (action.type) {
        case "getToken":
        return {
            ...state,
            token:action.payload
        }
        case "getData":
        return {
            ...state,
            data:action.payload
        }
        case "setQuery":
        return {
            ...state,
            query:action.payload
        }
        default:
        return new Error('nothing returns');
    }
}

const ContextProvider = ({ children }) => {

    const [state,dispatch] = useReducer(reducer,initialState);


    return (
        <Context.Provider
        value={{
            state,
            dispatch
        }}
        >
            {children}
        </Context.Provider>
    )
}


export default ContextProvider;