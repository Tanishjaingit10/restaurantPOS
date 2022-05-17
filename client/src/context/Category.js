import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../config";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const fetchCategories = async () => {
        const res = await axios.get(`${BackendUrl}/app/category`);
        if (res?.data) setCategories(res.data);
    };

    const fetchItems = async () => {
        const res = await axios.get(`${BackendUrl}/app/items`);
        if (res?.data) setFoodItems(res.data);
    };

    useEffect(() => {
        fetchCategories();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchItems();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <CategoryContext.Provider
                value={{
                    categories,
                    setCategories,
                    foodItems,
                    setFoodItems,
                    fetchCategories,
                    fetchItems,
                }}
            >
                {props.children}
            </CategoryContext.Provider>
        </div>
    );
};
