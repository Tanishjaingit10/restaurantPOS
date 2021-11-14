import React, { useState, createContext, useEffect } from "react";

export const OrdersContext = createContext();

export const OrdersProvider= (props)=>{

    const [orders, setOrders] = useState([])
    const [tables, setTables] = useState([])

    const fetchOrders = async () => {
        const response = await fetch("/app/orders")
          .then((res) => res.json())
          .catch((err) => {
            console.log("Error", err);
          });
        setOrders(response);
      };

      const fetchTables = async () => {
        const response = await fetch("/app/table")
          .then((res) => res.json())
          .catch((err) => {
            console.log("Error", err);
          });
        setTables(response);
      };
      useEffect(() => {
        fetchOrders();
        fetchTables();
        //eslint-disable-next-line
      }, []);



    return (
        <div>
            <OrdersContext.Provider value = {[orders, setOrders, tables, setTables]}>
                {props.children}
            </OrdersContext.Provider>
        </div>
    );
}