import { createContext, useReducer } from "react";

type ContextTypes = {
    state:any;
    dispatch:any;
}

export const Context = createContext({} as ContextTypes);

let initialState = {
    token:null,
    data:null,
    query:null,
    artistID:null,
    artistTrack:null,
    isPlaying:false,
    isArtistTrack:false
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
        case "getArtistID":
        return {
            ...state,
            artistID:action.payload
        }
        case "getArtistTrack":
        return {
            ...state,
            artistTrack:action.payload
        }
        case "setIsPlaying":
        return {
            ...state,
            isPlaying:action.payload
        }
        case "setIsArtistTrack":
        return {
            ...state,
            isArtistTrack:action.payload
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