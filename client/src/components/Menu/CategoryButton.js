import React, { useContext, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";

import EditCategoryButton from "./EditCategoryButton";
import { CategoryContext } from "../../context/Category";

function CategoryButton({ deleteCategory, category }) {
    const [isOpen, setIsOpen] = useState(false);
    const { fetchCategories } = useContext(CategoryContext);

    const handleDeleteCategory = () => {
        axios
            .delete(`/app/removeCategory/${category._id}`)
            .then((res) => fetchCategories())
            .catch((err) => console.log("Error", err.response));
    };

    return (
        <div className="flex">
            <button onClick={handleDeleteCategory} className={`far fa-trash-alt mt-2 h-6 text-red ${deleteCategory || "hidden"}`}/>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="px-8 py-3 font-bold text-gray-500 text-xl m-2 border shadow-md border-black rounded-md"
            >
                {category.category}
            </button>

            <ReactModal
                isOpen={isOpen}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(2px)",
                    },
                }}
                contentLabel={"Add Category Modal"}
                className={
                    "flex justify-center absolute z-50 items-center w-screen h-screen"
                }
            >
                <div className=" p-10 flex flex-col items-center relative bg-white rounded-xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fas fa-times absolute text-2xl right-6 top-4"
                    />
                    <div className="text-center text-3xl mb-6 text-red font-semibold">
                        Category - {category.category}
                    </div>
                    <div className="w-2/3">
                        <div className="my-4">
                            <div className="text-gray-500 text-sm">
                                Category Name
                            </div>
                            <div className="font-semibold">
                                {category.category}
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="text-gray-500 text-sm">
                                Category Discription
                            </div>
                            <div className="font-semibold">
                                {category.description}
                            </div>
                        </div>
                        <div className="flex justify-between my-4">
                            <div className="text-gray-500">
                                <div className="my-4 text-lg">
                                    Category Image
                                </div>
                            </div>
                            <div>
                                <img
                                    className="border border-red w-40 h-40"
                                    src={category.image}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg p-3 w-40 font-medium m-2 bg-red text-white"
                        >
                            Menu
                        </button>
                        <button
                            onClick={handleDeleteCategory}
                            className="rounded-lg p-3 w-40 font-medium m-2 bg-red text-white"
                        >
                            - Delete Category
                        </button>
                        <EditCategoryButton category={category} />
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}

export default CategoryButton;
