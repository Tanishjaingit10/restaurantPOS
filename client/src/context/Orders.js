import React, { useState, createContext, useEffect } from "react";

export const OrdersContext = createContext();

export const OrdersProvider= (props)=>{

    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        const response = await fetch("/app/orders")
          .then((res) => res.json())
          .catch((err) => {
            console.log("Error", err);
          });
        setOrders(response);
      };
      useEffect(() => {
        fetchOrders();
        //eslint-disable-next-line
      }, []);


    return (
        <div>
            <OrdersContext.Provider value = {[orders, setOrders]}>
                {props.children}
            </OrdersContext.Provider>
        </div>
    );
}