import React from 'react'
import { createContext, useReducer } from 'react'

const initialStates = {
    isPlaying: 0,

}

export const StateDispatcher = createContext(null);
export const States = createContext(null);

function stateReducer(states, action) {
    switch (action.type) {
        case "pause": {
            return { ...states, isPlaying: 0 };
        }
        case "play": {
            return { ...states, isPlaying: 1 }
        }
        default: {
            throw new Error("invalid action type!")
        }
    }
}

export default function MainProvider({ children }) {
    const [state, dispatch] = useReducer(stateReducer, initialStates)

    return (
        <States.Provider value={state}>
            <StateDispatcher.Provider value={dispatch}>
                {children}
            </StateDispatcher.Provider >
        </States.Provider>
    )
}