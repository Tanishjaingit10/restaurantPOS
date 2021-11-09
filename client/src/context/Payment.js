import React, { useState, createContext } from "react";

export const PaymentContext = createContext();

export const PaymentProvider= (props)=>{

    const [payment, setPayment] = useState({
        subTotal: 0.00,
        tax: 0.00,
        discount: 0.00,
        total: 0.00,
        mode: null,
        status: 'pending',
        orderType: 'Order new',
        orderStatus: null,
        table: 0
    })

    return (
        <div>
            <PaymentContext.Provider value = {[payment, setPayment]}>
                {props.children}
            </PaymentContext.Provider>
        </div>
    );
}