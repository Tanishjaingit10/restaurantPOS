import React, { useState, createContext } from "react";

export const CustomerContext = createContext();

export const CustomerProvider= (props)=>{

    const [customer, setCustomer] = useState({
       name: null,
       contact: null,
       email: null
    })

    return (
        <div>
            <CustomerContext.Provider value = {[customer, setCustomer]}>
                {props.children}
            </CustomerContext.Provider>
        </div>
    );
}