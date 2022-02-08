import axios from "axios";
import React, { useContext, useState } from "react";
import { nonVegIconImageBase64, vegIconImageBase64 } from "../../constants";
import { CategoryContext } from "../../context/Category";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";
import FoodItemOverlayButton from "./FoodItemOverlayButton";

function ItemInfoButton({ item, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { fetchItems } = useContext(CategoryContext);
    const notify = useContext(NotificationContext);

    const handleDelete = () => {
        setLoading(true);
        axios
            .delete(`/app/removeItem/${item._id}`)
            .then(async () => {
                notify(`Item Deleted: ${item.foodItem}`);
                setIsOpen(false);
                fetchItems();
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
                className="w-1/2 p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && (
                    <SpinLoader className="absolute left-1/2 top-1/2" />
                )}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
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
                                <div className="text-lg">{item.foodItem}</div>
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
                                                      </div>
                                                      {` | ${day.startTime} - ${day.endTime}`}
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
                                <div className="text-lg">{item.discount}</div>
                            </div>
                            <div className="mb-4">
                                <div className="text-gray-500 text-sm">
                                    Variant
                                </div>
                                {item.finalVariant.map((variant) => (
                                    <div className="text-lg" key={variant._id}>
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
                        <FoodItemOverlayButton
                            item={item}
                            className="rounded-lg p-2 w-40 font-medium mx-2 bg-green text-white"
                        >
                            + Edit Food Item
                        </FoodItemOverlayButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ItemInfoButton;
