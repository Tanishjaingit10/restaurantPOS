import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const OrdersContext = createContext();

export const OrdersProvider = (props) => {
    const [orders, setOrders] = useState([]);
    const [tables, setTables] = useState([]);

    const fetchOrders = () => {
        axios
            .get("/app/orders")
            .then((res) => setOrders(res.data))
            .catch((err) => console.log("error", err));
    };

    const fetchTables = async () => {
        axios
            .get("/app/table")
            .then((res) => setTables(res.data))
            .catch((err) => console.log("error", err));
    };
    useEffect(() => {
        fetchOrders();
        fetchTables();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <OrdersContext.Provider
                value={{ orders, setOrders, tables, setTables }}
            >
                {props.children}
            </OrdersContext.Provider>
        </div>
    );
};
