import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/Category";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";

function CategoryOverlayButton({ item, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const { fetchCategories } = useContext(CategoryContext);
    const notify = useContext(NotificationContext);

    useEffect(() => {
        if (item) {
            setImage(item.image);
            setCategory(item.category);
            setDescription(item.description);
        }
        // eslint-disable-next-line
    }, []);

    const handleImageUpload = (e) => {
        const img = e.target.files[0];
        if (!img) {
            setImageName("");
            setImage("");
        } else {
            setImageName(img?.name);
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result);
                }
            };
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        const postData = {
            category,
            description,
            image,
        };

        (item
            ? axios.put(`/app/updateCategory/${item._id}`, postData)
            : axios.post("app/addCategory/", postData)
        )
            .then(() => {
                notify(`Category ${item ? "Updated" : "Added"}: ${category}`);
                setImage("");
                setImageName("");
                setCategory("");
                setDescription("");
                fetchCategories();
                setIsOpen(false);
            })
            .catch((err) => {
                if (err.response.status === 413)
                    notify("Error! Image size too large");
                else notify(err?.response?.data?.message || "Error!!");
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <button onClick={() => setIsOpen((prev) => !prev)} {...rest}>
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="w-5/12 p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    {item ? "Edit" : "Add"} Category
                </div>
                <div className="w-2/3">
                    <input
                        name="Category"
                        type="text"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter Category Name"
                        className="w-full p-4 font-medium rounded-md border-gray-400 border outline-none transition duration-150 ease-in-out mb-4 mt-2"
                    />
                    <input
                        name="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Category Description"
                        className="w-full p-4 font-medium rounded-md border-gray-400 border outline-none transition duration-150 ease-in-out mb-4 mt-2"
                    />
                    <div className="flex justify-between mt-4">
                        <div className="text-gray-500 flex flex-col justify-between">
                            <div className="m-2">
                                Select Category Image
                                <div className="text-lg font-medium">
                                    {imageName}
                                </div>
                            </div>
                            <div className="m-4">
                                <label
                                    className="rounded-lg px-6 p-3 font-medium bg-red text-white"
                                    htmlFor="image"
                                >
                                    Choose&nbsp;File
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e)}
                                    id="image"
                                />
                            </div>
                        </div>
                        <div>
                            <img
                                className="border border-red w-40 h-40"
                                src={image}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleSubmit}
                            className="rounded-lg p-3 w-40 font-medium m-4 bg-red text-white"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CategoryOverlayButton;
