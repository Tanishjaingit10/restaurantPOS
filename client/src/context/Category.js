import React, { useState, createContext, useEffect } from "react";

export const CategoryContext = createContext();

export const CategoryProvider= (props)=>{

    const [category, setCategory] = useState([]);
    const fetchCategories = async () => {
        const response = await fetch("/app/category")
          .then((res) => res.json())
          .catch((err) => {
            console.log("Error", err);
          });
        setCategory(response);
      };

      useEffect(() => {
        fetchCategories();
        //eslint-disable-next-line
      }, []);

    return (
        <div>
            <CategoryContext.Provider value = {[category, setCategory]}>
                {props.children}
            </CategoryContext.Provider>
        </div>
    );
}