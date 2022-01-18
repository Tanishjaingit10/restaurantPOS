import React, { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import AvailableButton from "./AvailableButton";
import VariantButton from "./VariantButton";
import axios from "axios";
import { CategoryContext } from "../../context/Category";

function AddFoodItemButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [foodItem, setFoodItem] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("00:00:00");
    const [availability] = useState("Yes");
    const [availabilityType, setAvailabilityType] = useState("allTime");
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("non-veg");
    const [finalVariant, setFinalVariant] = useState([]);
    const [finalAvailable, setFinalAvailable] = useState([]);
    const [image] = useState(null);
    const [listOfCategory, setListOfCategory] = useState([]);

    const { fetchItems } = useContext(CategoryContext);

    useEffect(() => {
        axios.get("/app/category").then((res) => setListOfCategory(res.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
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
            image,
            finalVariant,
            finalAvailable,
        };
        axios
            .post("/app/addItem", postData)
            .then((res) => {
                fetchItems();
                setIsOpen(false);
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="mr-6 p-4 text-white rounded-md leading-4 bg-green"
            >
                + Add Food Item
            </button>
            <ReactModal
                isOpen={isOpen}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(2px)",
                    },
                }}
                ariaHideApp={false}
                contentLabel={"Add Category Modal"}
                className={
                    "flex justify-center absolute z-50 items-center w-screen h-screen"
                }
            >
                <div className="w-7/12 p-4 flex flex-col items-center relative bg-white rounded-xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fas fa-times absolute text-2xl right-6 top-4"
                    />
                    <div className="text-center text-3xl m-3 text-red font-semibold">
                        Add Food Item
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex-1 mx-4 px-5 py-2">
                            <label htmlFor="foodItem">Item Name</label>
                            <input
                                name="foodItem"
                                type="text"
                                value={foodItem}
                                onChange={(e) => setFoodItem(e.target.value)}
                                placeholder="Enter Name of Food Item"
                                className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
                            />
                            <label htmlFor="Description">Description</label>
                            <input
                                id="Description"
                                name="Description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter Food Item Discription"
                                className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
                            />
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
                                className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
                            />
                            <AvailableButton
                                state={{
                                    finalAvailable,
                                    setFinalAvailable,
                                    availabilityType,
                                    setAvailabilityType,
                                }}
                            />
                            <label htmlFor="Discount">Discount (00.00)</label>
                            <input
                                name="Discount"
                                type="text"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                placeholder="Discount (00.00)"
                                className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
                            />
                        </div>
                        <div className="flex-1 mx-4 px-5 py-2">
                            <VariantButton
                                state={{ finalVariant, setFinalVariant }}
                            />
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
                                className=" p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
                            />
                            <label htmlFor="category">Category</label>
                            <select
                                name="category"
                                className="p-3 bg-lightred text-white w-full rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="none" selected={category}>
                                    Uncategorized
                                </option>

                                {listOfCategory.map((option) => (
                                    <option
                                        value={option.value}
                                        className="bg-lightred"
                                        key={option._id}
                                    >
                                        {option.category}
                                    </option>
                                ))}
                            </select>
                            <div className="my-3 py-2">
                                <div className="text-gray-500 text-lg">
                                    Food Type:
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-1 p-2">
                                        <input
                                            type="radio"
                                            onChange={(e) =>
                                                setFoodType(e.target.value)
                                            }
                                            checked={foodType==="non-veg"}
                                            name="veg"
                                            value="non-veg"
                                        />
                                        <label
                                            className="ml-3 text-red font-bold"
                                            htmlFor="non-veg"
                                        >
                                            Non-Veg
                                        </label>
                                    </div>
                                    <div className="flex-1 p-2">
                                        <input
                                            type="radio"
                                            onChange={(e) =>
                                                setFoodType(e.target.value)
                                            }
                                            checked={foodType==="veg"}
                                            name="veg"
                                            value="veg"
                                        />
                                        <label
                                            className="ml-3 text-green font-bold"
                                            htmlFor="veg"
                                        >
                                            Veg
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleSubmit}
                            className="rounded-lg p-3 w-40 font-medium m-4 bg-red text-white"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </ReactModal>
        </>
    );
}

export default AddFoodItemButton;
