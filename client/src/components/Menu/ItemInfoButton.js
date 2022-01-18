import axios from "axios";
import React, { useContext, useState } from "react";
import ReactModal from "react-modal";
import { nonVegIconImageBase64, vegIconImageBase64 } from "../../constants";
import { CategoryContext } from "../../context/Category";
import EditFoodItemButton from "./EditFoodItemButton";

function ItemInfoButton({ item, deleteFoodItem }) {
    const [isOpen, setIsOpen] = useState(false);
    const { fetchItems } = useContext(CategoryContext);

    const handleDelete = () => {
        axios
            .delete(`/app/removeItem/${item._id}`)
            .then((res) => {
                fetchItems();
                setIsOpen(false);
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <div className="flex pr-4 h-full">
            <button
                onClick={handleDelete}
                className={`far fa-trash-alt mt-2 h-6 text-red ${
                    deleteFoodItem || "hidden"
                }`}
            />
            <button
                onClick={() => setIsOpen(true)}
                className="text-center relative flex-1 rounded-md bg-yellow-100 p-8 m-2 text-xl shadow-md"
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
                <div className="w-1/2 h-5/6 p-10 flex flex-col items-center relative bg-white rounded-xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fas fa-times absolute text-2xl right-6 top-4"
                    />
                    <div className="text-center text-3xl mb-6 text-red font-semibold">
                        Food Item - {item.foodItem}
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="grid grid-cols-3 w-full">
                            <div className="col-span-2">
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Item Name
                                    </div>
                                    <div className="text-lg">
                                        {item.foodItem}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Item Description
                                    </div>
                                    <div className="text-lg">
                                        {item.description}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Time To Cook (ETA)
                                    </div>
                                    <div className="text-lg">{item.time}</div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Available
                                    </div>
                                    <div className="">
                                        {item.availabilityType === "allTime"
                                            ? "All Time"
                                            : item.finalAvailable
                                                  .filter(
                                                      (day) =>
                                                          day.startTime &&
                                                          day.endTime
                                                  )
                                                  .map((day) => (
                                                      <div
                                                          key={day.day}
                                                          className="flex"
                                                      >
                                                          <div className="w-28">
                                                              {day.day}
                                                          </div>{" "}
                                                          | {day.startTime} -{" "}
                                                          {day.endTime}
                                                      </div>
                                                  ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Discount
                                    </div>
                                    <div className="text-lg">
                                        {item.discount}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Variant
                                    </div>
                                    {item.finalVariant.map((variant) => (
                                        <div
                                            className="text-lg"
                                            key={variant._id}
                                        >
                                            {variant.variant} / ${variant.price}
                                        </div>
                                    ))}
                                </div>
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Item Unit Price
                                    </div>
                                    <div className="text-lg">${item.price}</div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Category
                                    </div>
                                    <div className="text-lg">
                                        {item.category || "Uncategorized"}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-gray-500 text-sm">
                                        Food Type
                                    </div>
                                    <div className="text-lg flex items-center">
                                        <div>
                                            {item.foodType === "veg"
                                                ? "Veg"
                                                : "Non - Veg"}
                                        </div>
                                        <img
                                            className="w-4 object-scale-down ml-6"
                                            src={
                                                item.foodType === "veg"
                                                    ? vegIconImageBase64
                                                    : nonVegIconImageBase64
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 w-40 font-medium mx-2 bg-red text-white"
                            >
                                Menu
                            </button>
                            <button
                                onClick={handleDelete}
                                className="rounded-lg p-2 w-40 font-medium mx-2 bg-red text-white"
                            >
                                - Delete Food Item
                            </button>
                            <EditFoodItemButton item={item} />
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}

export default ItemInfoButton;
