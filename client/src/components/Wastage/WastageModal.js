import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { getNewId } from "../../Utils";
import { Modal } from "../Common/Modal";
import SpinLoader from "../SpinLoader";
import { CategoryContext } from "../../context/Category";
import { OrdersContext } from "../../context/Orders";
import { NotificationContext } from "../../context/Notification";

export const WastageModal = ({ isOpen, setIsOpen }) => {
    const [logWastageIsOpen, setLogWastageIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [foodItemType, setFoodItemType] = useState("Solid");
    const [amountType, setAmountType] = useState("gms");
    const [wastageBy, setWastageBy] = useState("Patron");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [order_id, setOrder_id] = useState("");
    const { foodItems } = useContext(CategoryContext);
    const { orders } = useContext(OrdersContext);
    const notify = useContext(NotificationContext);

    const foodItemsOptions = ["Solid", "Liquid", "Mix"];
    const amountTypeOptions = ["gms", "kgs", "Litres", "Pieces"];
    const wastageByOptions = ["Patron", "Excess cooking"];

    const handleImageUpload = (e) => {
        const img = e.target.files[0];
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
        const selectedFoodItems = foodItems.filter((it) =>
            selectedItems.some((i) => i.foodItem === it.foodItem)
        );

        const dataToPost = {
            order_id,
            foodItemType,
            amountType,
            foodItems: selectedFoodItems,
            amount,
            wastageBy,
            description,
        };

        if (image) {
            const bodyFormData = new FormData();
            bodyFormData.append("file", image);
            const config = { headers: { Accept: "application/json" } };
            try {
                const res = await axios.post("/app/file", bodyFormData, config);
                dataToPost.image = res.data;
            } catch (err) {
                notify(
                    err?.response?.data?.message || "Unable to upload image"
                );
            }
        }

        axios
            .post("/app/logWastage", dataToPost)
            .then((res) => setLogWastageIsOpen(false))
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to log wasgage")
            )
            .finally(() => setLoading(false));
    };

    const handleAdd = () => {
        if (foodItems.length)
            setSelectedItems((prev) => [
                ...prev,
                {
                    foodItem: "",
                    key: getNewId(),
                },
            ]);
    };

    const validateOrderId = () => {
        const orderId =
            orders.find((or) => or.order_id === parseInt(order_id))?.order_id ||
            "";
        setOrder_id(orderId);
    };

    const validateSelectedItems = () => {
        setSelectedItems((prev) => {
            prev.forEach((it) => {
                it.foodItem =
                    foodItems.find((itm) => itm.foodItem === it.foodItem)
                        ?.foodItem || "";
            });
            return [...prev];
        });
    };

    const handleRemove = (key) => {
        setSelectedItems((prev) => prev.filter((it) => it.key !== key));
    };

    useEffect(() => {
        if (foodItems.length)
            setSelectedItems([
                {
                    foodItem: "",
                    key: getNewId(),
                },
            ]);
    }, [foodItems]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="bg-white flex flex-col text-red-500 rounded-xl w-64 z-50 absolute p-8 gap-6"
            >
                <button
                    onClick={() => {
                        setLogWastageIsOpen(true);
                        setIsOpen(false);
                    }}
                    className="text-left font-medium"
                >
                    Log Wastage
                </button>
                <Link
                    onClick={() => setIsOpen(false)}
                    to="/wastage"
                    className="font-medium"
                >
                    Wastage History
                </Link>
            </Modal>

            <Modal
                isOpen={logWastageIsOpen}
                controller={setLogWastageIsOpen}
                className="bg-white flex flex-col rounded-xl z-50 absolute px-20 py-8 gap-6"
                style={{ content: { maxHeight: "90vh" } }}
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setLogWastageIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-4 text-red-500 font-semibold">
                    Log Wastage
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="text-red-500 overflow-y-auto gap-8 flex flex-col hideScrollbar w-96"
                >
                    <div className="flex flex-col">
                        <div className="text-gray-500">Select Order No.</div>
                        <input
                            required
                            className="bg-red-400 placeholder-white rounded-lg p-3 text-white font-medium pl-5 my-2"
                            list="orderList"
                            value={order_id}
                            placeholder="Enter order id"
                            onBlur={validateOrderId}
                            onChange={(e) => setOrder_id(e.target.value)}
                        />
                        <datalist id="orderList">
                            {orders?.map((it) => (
                                <option key={it._id} value={it.order_id} />
                            ))}
                        </datalist>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-gray-500 flex flex-col justify-between">
                            <div className="my-2">
                                Select waste image
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
                                src={previewImage}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-gray-500">
                            Select Food Item Type
                        </div>
                        <div className="text-red-500 flex justify-between">
                            {foodItemsOptions.map((op) => (
                                <button
                                    key={op}
                                    type="button"
                                    onClick={() => setFoodItemType(op)}
                                    className="flex items-center"
                                    placeholder="Enter food item name"
                                >
                                    <span
                                        className={`far fa-${
                                            foodItemType === op ? "dot-" : ""
                                        }circle`}
                                    />
                                    <span className="font-bold ml-3">{op}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-gray-500">Select Food Item</div>
                        <div className="flex flex-col gap-2 text-white">
                            {selectedItems.map((item) => (
                                <div
                                    key={item.key}
                                    className="flex items-center"
                                >
                                    <input
                                        required
                                        list="foodItems"
                                        className="bg-red-400 placeholder-white rounded-md pl-4 py-2 flex-1"
                                        placeholder="Select food item"
                                        value={item.foodItem}
                                        onBlur={validateSelectedItems}
                                        onChange={(e) =>
                                            setSelectedItems((prev) => {
                                                prev.find(
                                                    (it) => it.key === item.key
                                                ).foodItem = e.target.value;
                                                return [...prev];
                                            })
                                        }
                                    />
                                    <div className="flex">
                                        <button
                                            type="button"
                                            onClick={handleAdd}
                                            className="fas fa-plus h-8 w-8 flex-shrink-0 ml-3 bg-red-400 text-white rounded-md"
                                        />
                                        {selectedItems.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(item.key)
                                                }
                                                className="fas fa-times h-8 w-8 flex-shrink-0 ml-2 bg-red-400 text-white rounded-md"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                            <datalist id="foodItems">
                                {foodItems?.map((it) => (
                                    <option key={it._id} value={it.foodItem} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="text-gray-500">Select Amount Type</div>
                        <div className="text-red-500 flex justify-between">
                            {amountTypeOptions.map((op) => (
                                <button
                                    key={op}
                                    type="button"
                                    onClick={() => setAmountType(op)}
                                    className="flex items-center"
                                >
                                    <span
                                        className={`far fa-${
                                            amountType === op ? "dot-" : ""
                                        }circle`}
                                    />
                                    <span className="font-bold ml-3">{op}</span>
                                </button>
                            ))}
                        </div>
                        <input
                            required
                            type="text"
                            className="p-2 border text-black border-red-500 rounded-md"
                            placeholder="Write amount here..."
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div id="browser" className="text-gray-500">
                            Wastage by
                        </div>
                        <div className="text-red-500 flex gap-8">
                            {wastageByOptions.map((op) => (
                                <button
                                    key={op}
                                    type="button"
                                    onClick={() => setWastageBy(op)}
                                    className="flex items-center"
                                >
                                    <span
                                        className={`far fa-${
                                            wastageBy === op ? "dot-" : ""
                                        }circle`}
                                    />
                                    <span className="font-bold ml-3">{op}</span>
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="p-2 border text-black border-red-500 rounded-md"
                            placeholder="Write description here..."
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-red-500 p-2 text-white font-semibold px-10 rounded-md"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};
