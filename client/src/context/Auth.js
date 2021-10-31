import React, { useState, createContext } from "react";

export const OrderContext = createContext();

export const OrderProvider= (props)=>{

    const [cart, setCart]= useState([
        {
         fooditem:"pizza",
         Image:null,
         orderedvariant: [],
         Price: 24,
         subTotal: null  
    },
])

    return (
        <div>
            <OrderContext.Provider value= {[cart, setCart]}>
                {props.children}
            </OrderContext.Provider>
        </div>
    );
}