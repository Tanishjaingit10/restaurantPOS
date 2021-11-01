import React, { useState, createContext } from "react";

export const PaymentContext = createContext();

export const PaymentProvider= (props)=>{

    const [payment, setPayment] = useState({
        subTotal: 0.00,
        tax: 0.00,
        discount: 0.00,
        total: 0.00
    })

    return (
        <div>
            <PaymentContext.Provider value = {[payment, setPayment]}>
                {props.children}
            </PaymentContext.Provider>
        </div>
    );
}