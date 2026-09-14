import { createContext, useState } from "react";

export const SearchContext= createContext();

function Searchbar({children})
{
    const[studSearch,setstudSearch]=useState("");

    const[searchText,setSearchText]=useState("");
    return(
        <SearchContext.Provider value={{searchText,setSearchText,studSearch,setstudSearch}}>
            {children}
        </SearchContext.Provider>
    )
}
export default Searchbar;
