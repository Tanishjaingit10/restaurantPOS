/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AvailableButton from "./FoodItemOverlay/AvailableButton";
import VariantButton from "./FoodItemOverlay/VariantButton";
import { CategoryContext } from "../../context/Category";
import { nonVegIconImageBase64, vegIconImageBase64 } from "../../constants";
import { NotificationContext } from "../../context/Notification";
import { Modal } from "../Common/Modal";
import SpinLoader from "../SpinLoader";

function FoodItemOverlayButton({ item, children, className }) {
    const veg = "veg";
    const nonVeg = "non-veg";
    const allTime = "allTime";

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const [image, setImage] = useState(null);
    const [foodItem, setFoodItem] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("00:00:00");
    const [availability, setAvailability] = useState("Yes");
    const [availabilityType, setAvailabilityType] = useState(allTime);
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState(nonVeg);
    const [finalVariant, setFinalVariant] = useState([]);
    const [finalAvailable, setFinalAvailable] = useState([]);

    const { fetchItems, categories } = useContext(CategoryContext);
    const notify = useContext(NotificationContext);

    const resetStates = (item) => {
        setFoodItem(item?.foodItem || "");
        setDescription(item?.description || "");
        setTime(item?.time || "00:00:00");
        setAvailability(item?.availability || "Yes");
        setAvailabilityType(item?.availabilityType || allTime);
        setDiscount(item?.discount || 0);
        setPrice(item?.price || 0);
        setCategory(item?.category || "");
        setFoodType(item?.foodType || nonVeg);
        setFinalVariant(item?.finalVariant || []);
        setFinalAvailable(item?.finalAvailable || []);
        setImage(null);
        setPreviewImage(null);
        setImageName("");
    };

    useEffect(() => {
        if (item) resetStates(item);
    }, []);

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
                if (reader?.readyState === 2) {
                    setPreviewImage(reader?.result);
                }
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const postData = {
            foodItem,
            category,
            time,
            description,
            price,
            foodType,
            availability,
            availabilityType,
            discount,
            finalVariant,
            finalAvailable,
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
            ? axios.put(`/app/updateItem/${item._id}`, postData)
            : axios.post("/app/addItem", postData)
        )
            .then(() => {
                notify(`Item ${item ? "Updated" : "Added"}: ${foodItem}`);
                resetStates();
                setIsOpen(false);
            })
            .then(() => fetchItems())
            .catch((err) => notify(err?.response?.data?.message || "Error!!"))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={className}
            >
                {children}
            </button>
            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                onAfterOpen={onModalOpen}
                className="max-h-screen overflow-y-auto p-4 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl m-3 text-red-500 font-semibold">
                    {item ? "Edit" : "Add"} Food Item
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full justify-between">
                        <div className="flex-1 flex flex-col gap-2 mx-4 px-5 py-2">
                            <div>
                                <label htmlFor="foodItem">Item Name</label>
                                <input
                                    name="foodItem"
                                    type="text"
                                    required
                                    value={foodItem}
                                    onChange={(e) =>
                                        setFoodItem(e.target.value)
                                    }
                                    placeholder="Enter Name of Food Item"
                                    className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="Description">Description</label>
                                <input
                                    id="Description"
                                    name="Description"
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Enter Food Item Discription"
                                    className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="time">
                                    Time To Cook ( HH : MM : SS )
                                </label>
                                <input
                                    id="time"
                                    name="time"
                                    type="time"
                                    step="1"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    placeholder="Time To Cook (HH/MM/SS)"
                                    className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="Available">Available</label>
                                <AvailableButton
                                    type="button"
                                    id="Available"
                                    className="p-3 flex items-center justify-between bg-red-400 text-white w-full rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                    state={{
                                        finalAvailable,
                                        setFinalAvailable,
                                        availabilityType,
                                        setAvailabilityType,
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="price">
                                    Item Unit Price (00.00)
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter Item Unit Price"
                                    className="p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                />
                            </div>
                            <div>
                                <label htmlFor="Discount">
                                    Discount (00.00)
                                </label>
                                <input
                                    name="Discount"
                                    type="text"
                                    value={discount}
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                    placeholder="Discount (00.00)"
                                    className="p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="flex-1 mx-4 px-5 gap-2 flex flex-col py-2">
                            <div>
                                <label htmlFor="itemVariant">Variant</label>
                                <VariantButton
                                    type="button"
                                    id="itemVariant"
                                    className="p-3 flex items-center justify-between bg-red-400 text-white w-full rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                    state={{ finalVariant, setFinalVariant }}
                                >
                                    <span>Variant ({finalVariant.length})</span>
                                    <span className="fas fa-chevron-down" />
                                </VariantButton>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <select
                                    name="category"
                                    className="p-3 bg-red-400 text-white w-full rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    value={category}
                                >
                                    <option value="">Uncategorized</option>
                                    {categories.map((option) => (
                                        <option
                                            value={option?.value}
                                            className="bg-red-400"
                                            key={option?._id}
                                        >
                                            {option?.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div className="text-gray-500 text-lg">
                                    Food Type:
                                </div>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setFoodType(nonVeg)}
                                        className="py-2 flex-1 flex text-red-500 items-center mr-3"
                                    >
                                        <span
                                            className={`far fa-${
                                                foodType === nonVeg
                                                    ? "dot-"
                                                    : ""
                                            }circle`}
                                        />
                                        <span className="ml-3 w-full flex justify-between font-bold">
                                            <div>Non - Veg</div>
                                            <img
                                                className="w-4 object-scale-down mr-2"
                                                src={nonVegIconImageBase64}
                                                alt=""
                                            />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFoodType(veg)}
                                        className="py-2 flex-1 flex text-green items-center ml-3"
                                    >
                                        <span
                                            className={`far fa-${
                                                foodType === veg ? "dot-" : ""
                                            }circle`}
                                        />
                                        <span className="ml-3 w-full flex justify-between font-bold">
                                            <div>Veg</div>
                                            <img
                                                className="w-4 object-scale-down mr-2"
                                                src={vegIconImageBase64}
                                                alt=""
                                            />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between pt-8">
                                <div className="text-gray-500 flex flex-col justify-between">
                                    <div className="my-2">
                                        Select Food Item Image
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
                                                `/app/file/image/${item.image}`)
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2">
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

export default FoodItemOverlayButton;
