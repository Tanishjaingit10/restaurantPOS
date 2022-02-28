import axios from "axios";
import React, { useContext, useState } from "react";
import { CategoryContext } from "../../context/Category";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";

function CategoryOverlayButton({ item, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const { fetchCategories } = useContext(CategoryContext);
    const notify = useContext(NotificationContext);

    const resetStates = (item) => {
        setImage(null);
        setCategory(item?.category || "");
        setDescription(item?.description || "");
        setPreviewImage(null);
        setImageName("");
    };

    const onModalOpen = () => {
        if (item) resetStates(item);
    };

    const handleImageUpload = (e) => {
        const img = e.target?.files[0];
        setImage(img);
        if (!img) {
            setImageName("");
            setPreviewImage(null);
        } else {
            setImageName(img?.name);
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPreviewImage(reader.result);
                }
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const postData = {
            category,
            description,
        };

        if (image) {
            const bodyFormData = new FormData();
            bodyFormData.append("file", image);
            const config = { headers: { Accept: "application/json" } };
            try {
                const res = await axios.post("/app/file", bodyFormData, config);
                postData.image = res.data;
            } catch (err) {
                notify(
                    err?.response?.data?.message || "Unable to upload image"
                );
            }
        }

        (item
            ? axios.put(`/app/updateCategory/${item._id}`, postData)
            : axios.post("app/addCategory/", postData)
        )
            .then(() => {
                notify(`Category ${item ? "Updated" : "Added"}: ${category}`);
                resetStates();
                fetchCategories();
                setIsOpen(false);
            })
            .catch((err) => {
                if (err?.response?.status === 413)
                    notify("Error! Image size too large");
                else notify(err?.response?.data?.message || "Error!!");
            })
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
                onAfterOpen={onModalOpen}
                className="p-10 px-24 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red-500 font-semibold">
                    {item ? "Edit" : "Add"} Category
                </div>
                <form onSubmit={handleSubmit} className="w-96">
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
                            <div className="my-2">
                                Select Category Image
                                <div className="text-lg font-medium">
                                    {imageName}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    className="rounded-lg cursor-pointer px-6 p-3 font-medium bg-red-500 text-white"
                                    htmlFor="image"
                                >
                                    Choose&nbsp;File
                                </label>
                                <input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    id="image"
                                />
                            </div>
                        </div>
                        <div>
                            <img
                                className="border object-contain border-red-500 w-40 h-40"
                                src={
                                    previewImage ||
                                    (item?.image &&
                                        `/app/file/image/${item?.image}`)
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="rounded-lg p-3 w-40 font-medium m-4 bg-red-500 text-white"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default CategoryOverlayButton;
