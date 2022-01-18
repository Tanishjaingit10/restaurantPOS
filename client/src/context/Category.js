import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const fetchCategories = () => {
        axios
            .get("/app/category")
            .then((res) => setCategories(res.data))
            .catch((err) => console.log("Error", err.response));
    };
    const fetchItems = () => {
        axios
            .get("/app/items")
            .then((res) => setFoodItems(res.data))
            .catch((err) => console.log("Error", err.response));
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
