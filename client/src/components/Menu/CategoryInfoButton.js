import React, { useContext, useState } from "react";
import axios from "axios";

import { CategoryContext } from "../../context/Category";
import CategoryOverlayButton from "./CategoryOverlayButton";
import { Modal } from "../Common/Modal";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";

function CategoryInfoButton({ category, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { fetchCategories } = useContext(CategoryContext);
    const notify = useContext(NotificationContext);

    const handleDeleteCategory = () => {
        setLoading(true);
        axios
            .delete(`/app/removeCategory/${category._id}`)
            .then(() => {
                setIsOpen(false);
                notify(`Category Deleted: ${category.category}`);
                fetchCategories();
            })
            .catch((err) => notify(err?.response?.data?.message || "Error!!"))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} {...rest}>
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    Category - {category.category}
                </div>
                <div className="w-2/3">
                    <div className="my-4">
                        <div className="text-gray-500 text-sm">
                            Category Name
                        </div>
                        <div className="font-semibold">{category.category}</div>
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
                            <div className="my-4 text-lg">Category Image</div>
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
                    <CategoryOverlayButton
                        item={category}
                        className="rounded-lg p-3 w-40 font-medium m-2 bg-green text-white"
                    >
                        + Edit Category
                    </CategoryOverlayButton>
                </div>
            </Modal>
        </>
    );
}

export default CategoryInfoButton;
