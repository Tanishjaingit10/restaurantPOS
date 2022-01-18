import React, { useState, useContext } from "react";

import { ThemeContext } from "../context/Theme";
import CustomNavBar from "../items/CustomNavBar";
import AddCategoryButton from "./Menu/AddCategoryButton";
import AddFoodItemButton from "./Menu/AddFoodItemButton";
import CategoryButton from "./Menu/CategoryButton";
import ItemInfoButton from "./Menu/ItemInfoButton";
import { CategoryContext } from "../context/Category";

const Menu = () => {
    const theme = useContext(ThemeContext);
    const { categories, foodItems, fetchCategories, fetchItems } =
        useContext(CategoryContext);
    const [deleteFoodItem, setDeleteFoodItem] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(false);

    const handleRefresh = () => {
        fetchCategories();
        fetchItems();
    };

    return (
        <>
            <div className="font-roboto h-screen">
                <CustomNavBar />
                <div className="flex h-24 items-center justify-between border-b-2 border-gray-300">
                    <p className="text-2xl text-gray-500 ml-6 font-bold ">
                        Menu
                    </p>
                    <div>
                        <button
                            onClick={handleRefresh}
                            className="fas fa-sync-alt bg-red mr-6 p-4 text-white rounded-md"
                            style={{ backgroundColor: theme.backgroundColor }}
                        ></button>
                        <button
                            onClick={() => setDeleteFoodItem((prev) => !prev)}
                            className="mr-6 p-4 text-white rounded-md leading-4"
                            style={{ backgroundColor: theme.backgroundColor }}
                        >
                            - Delete Food Item
                        </button>
                        <AddFoodItemButton />
                        <button
                            onClick={() => setDeleteCategory((prev) => !prev)}
                            className="mr-6 p-4 text-white rounded-md leading-4"
                            style={{ backgroundColor: theme.backgroundColor }}
                        >
                            - Delete Category
                        </button>
                        <AddCategoryButton />
                    </div>
                </div>
                <div className="p-6">
                    {categories.map((item) => (
                        <div key={item._id}>
                            <div>
                                <CategoryButton
                                    deleteCategory={deleteCategory}
                                    category={item}
                                />
                            </div>
                            <div className="grid grid-cols-6 py-2">
                                {foodItems
                                    .filter((e) => e.category === item.category)
                                    .map((item) => (
                                        <div key={item._id}>
                                            <ItemInfoButton
                                                deleteFoodItem={deleteFoodItem}
                                                item={item}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                    {foodItems.filter((e) => !e.category).length ? (
                        <div>
                            <div>
                                <button className="px-8 py-3 font-bold text-gray-500 text-xl m-2 border shadow-md border-black rounded-md">
                                    Uncategorized
                                </button>
                            </div>
                            <div className="grid grid-cols-6 py-2">
                                {foodItems
                                    .filter((e) => !e.category)
                                    .map((item) => (
                                        <div key={item._id}>
                                            <ItemInfoButton
                                                deleteFoodItem={deleteFoodItem}
                                                item={item}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default Menu;
