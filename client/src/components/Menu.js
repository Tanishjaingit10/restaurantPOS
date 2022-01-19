import React, { useState, useContext, useEffect } from "react";

import { ThemeContext } from "../context/Theme";
import CustomNavBar from "../items/CustomNavBar";
import CategoryInfoButton from "./Menu/CategoryInfoButton";
import ItemInfoButton from "./Menu/ItemInfoButton";
import { CategoryContext } from "../context/Category";
import { NotificationContext } from "../context/Notification";
import FoodItemOverlayButton from "./Menu/FoodItemOverlayButton";
import SpinLoader from "./SpinLoader";
import CategoryOverlayButton from "./Menu/CategoryOverlayButton";
import axios from "axios";
import { nonVegIconImageBase64, vegIconImageBase64 } from "../constants";

const Menu = () => {
    const theme = useContext(ThemeContext);
    const { categories, foodItems, fetchCategories, fetchItems } =
        useContext(CategoryContext);
    const notify = useContext(NotificationContext);
    const [deleteFoodItem, setDeleteFoodItem] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchCategories()
            .then(() => fetchItems())
            .then(() => setLoading(false));
        // eslint-disable-next-line
    }, []);

    const handleRefresh = async () => {
        setRefreshLoading(true);
        fetchCategories()
            .then(() => fetchItems())
            .then(() => notify("Menu Updated"))
            .catch((err) => notify(err?.response?.data?.message || "Error !!"))
            .finally(() => setRefreshLoading(false));
    };

    const handleDeleteCategory = (item) => {
        setLoading(true);
        axios
            .delete(`/app/removeCategory/${item._id}`)
            .then(() => {
                notify(`Category Deleted: ${item.category}`);
                fetchCategories();
            })
            .catch((err) => notify(err?.response?.data?.message || "Error!!"))
            .finally(() => setLoading(false));
    };

    const handleDeleteFoodItem = (item) => {
        setLoading(true);
        axios
            .delete(`/app/removeItem/${item._id}`)
            .then(async () => {
                notify(`Item Deleted: ${item.foodItem}`);
                fetchItems();
            })
            .catch((err) => notify(err?.response?.data?.message || "Error!!"))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <div className="font-roboto">
                {loading && <SpinLoader className="fixed top-1/2 left-1/2" />}
                <div className="fixed top-0 right-0 left-14 z-10">
                    <CustomNavBar />
                    <div className="flex h-24 bg-white items-center justify-between border-b-2 border-gray-300">
                        <p className="text-2xl text-gray-500 ml-6 font-bold ">
                            Menu
                        </p>
                        <div>
                            <button
                                onClick={handleRefresh}
                                className="leading-4 bg-red mr-6 p-4 text-white rounded-md"
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                }}
                            >
                                <div
                                    className={`fas fa-sync-alt${
                                        refreshLoading ? " animate-spin" : ""
                                    }`}
                                ></div>
                            </button>
                            <button
                                onClick={() =>
                                    setDeleteFoodItem((prev) => !prev)
                                }
                                className="mr-6 p-4 text-white rounded-md leading-4"
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                }}
                            >
                                - Delete Food Item
                            </button>
                            <FoodItemOverlayButton className="overflow-hidden rounded-md mr-6 p-4 text-white leading-4 bg-green">
                                + Add Food Item
                            </FoodItemOverlayButton>
                            <button
                                onClick={() =>
                                    setDeleteCategory((prev) => !prev)
                                }
                                className="mr-6 p-4 text-white rounded-md leading-4 bg-red"
                            >
                                - Delete Category
                            </button>
                            <CategoryOverlayButton className="mr-6 p-4 text-white rounded-md leading-4 bg-green">
                                + Add Category
                            </CategoryOverlayButton>
                        </div>
                    </div>
                </div>
                <div className="p-6 mt-36">
                    {categories.map((item) => (
                        <div key={item._id} className="mb-4">
                            <div className="grid my-1 grid-cols-6">
                                <div className="flex">
                                    <button
                                        onClick={() =>
                                            handleDeleteCategory(item)
                                        }
                                        className={`far fa-trash-alt h-4 m-1 text-red ${
                                            deleteCategory || "hidden"
                                        }`}
                                    />
                                    <CategoryInfoButton
                                        category={item}
                                        style={{
                                            backgroundImage: `url(${item?.image})`,
                                        }}
                                        className="rounded-md bg-center flex-1"
                                    >
                                        <div className="bg-white bg-opacity-80 px-8 py-3 font-bold text-gray-600 text-xl border shadow-md border-black rounded-md">
                                            {item.category}
                                        </div>
                                    </CategoryInfoButton>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 py-2">
                                {foodItems
                                    .filter((e) => e.category === item.category)
                                    .map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex pr-4"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleDeleteFoodItem(item)
                                                }
                                                className={`far fa-trash-alt mt-2 p-1 pl-0 h-6 text-red ${
                                                    deleteFoodItem || "hidden"
                                                }`}
                                            />
                                            <ItemInfoButton
                                                item={item}
                                                className="text-center relative flex-1 rounded-md bg-yellow-100 p-8 my-2 text-xl shadow-md"
                                            >
                                                <img
                                                    className="absolute w-4 top-3 right-3"
                                                    src={
                                                        item.foodType === "veg"
                                                            ? vegIconImageBase64
                                                            : nonVegIconImageBase64
                                                    }
                                                    alt=""
                                                />
                                                {item.foodItem}
                                            </ItemInfoButton>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                    {foodItems.some(
                        (e) =>
                            !categories.some((x) => e.category === x.category)
                    ) ? (
                        <div>
                            <div className="grid my-1 grid-cols-6">
                                <div className="px-8 text-center py-3 font-bold text-gray-600 text-xl border shadow-md border-black rounded-md">
                                    Uncategorized
                                </div>
                            </div>
                            <div className="grid grid-cols-6 py-2">
                                {foodItems
                                    .filter(
                                        (e) =>
                                            !categories.some(
                                                (x) => e.category === x.category
                                            )
                                    )
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
