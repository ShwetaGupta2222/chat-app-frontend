import { createContext,useState} from "react";
export const IndexContext = createContext();

export const IndexContextProvider =({children})=>{
    const [state,setState]=useState(false);
    return(
    <IndexContext.Provider value={{state,setState}}>
        {children}
    </IndexContext.Provider>
    )
}