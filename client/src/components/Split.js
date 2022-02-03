/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NotificationContext } from "../context/Notification";
import { getNewId } from "../Utils";
import SpinLoader from "./SpinLoader";
import SingleInput from "./Split/SingleInput";

function Split() {
    const notify = useContext(NotificationContext);
    const location = useLocation();
    const [splitInto, setSplitInto] = useState(2);
    const [partList, setPartList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});

    console.log(location.state)
    console.log(order)

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/app/orderById/${location.state}`)
            .then((res) => setOrder(res.data[0]))
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable To Fetch Data")
            )
            .finally(() => setLoading(false));
    }, [location.state]);

    const resize = (array, newSize) => {
        while (newSize > array.length)
            array.push({ amount: 0, key: getNewId(), paid: false });
        array.length = newSize;
        return [...array];
    };

    useEffect(() => {
        setPartList((prev) => resize(prev, splitInto || 1));
    }, [splitInto]);

    return (
        <div className="flex" style={{ height: "calc(100vh - 56px)" }}>
            {loading && <SpinLoader />}
            <div className="h-full flex flex-col pt-4 w-5/12">
                <div className="flex flex-auto overflow-auto flex-col">
                    <div className="flex flex-col border-gray-300">
                        {order?.order?.map((item, index) => (
                            <div
                                className={`${
                                    index && "border-t-0"
                                } border-2 font-semibold flex py-5 items-center border-gray-300 flex-shrink-0`}
                            >
                                <div className="flex flex-col w-2/3">
                                    <div className="flex mb-2 text-gray-700 text-lg">
                                        <div className="w-3/4 px-4">
                                            {`${item.quantity}x ${item.foodItem}`}
                                        </div>
                                        <div className="w-1/4 text-center">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                    {item.orderedVariant.map((variant) => (
                                        <div className="flex my-1 font-bold text-xs text-gray-400">
                                            <div className="w-3/4 px-4">
                                                {`${variant.quantity}x With ${variant.variant}`}
                                            </div>
                                            <div className="w-1/4 text-center">
                                                $
                                                {(
                                                    variant.price *
                                                    variant.quantity
                                                ).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-1/3 flex items-center justify-end text-gray-700 text-lg pr-8 p-3">
                                    ${item.subtotal.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-auto py-8 flex items-center">
                    <div className="bg-lightred text-white w-full text-lg p-8 h-72">
                        <div className="flex justify-between p-2">
                            <div>Subtotal</div>
                            <div>
                                {order?.payment?.subTotal?.toFixed(2) || "0.00"}
                            </div>
                        </div>
                        <div className="flex justify-between p-2">
                            <div>Tax</div>
                            <div>
                                {order?.payment?.tax?.toFixed(2) || "0.00"}
                            </div>
                        </div>
                        <div className="flex justify-between p-2">
                            <div>Discount</div>
                            <div>
                                {order?.payment?.discount?.toFixed(2) || "0.00"}
                            </div>
                        </div>
                        <div className="flex justify-between p-2">
                            <div>Tip</div>
                            <div>
                                {order?.payment?.tip?.toFixed(2) || "0.00"}
                            </div>
                        </div>
                        <div className="flex font-bold justify-between p-2">
                            <div>Total</div>
                            <div>
                                {order?.payment?.total?.toFixed(2) || "0.00"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full flex flex-col w-7/12 p-10">
                <div className="m-4 px-6 flex items-center justify-between">
                    <div className="text-2xl font-bold text-red">
                        Split Payment Into
                    </div>
                    <div className="flex">
                        <button
                            onClick={() =>
                                setSplitInto((e) => Math.max(e - 1, 1))
                            }
                            className="border border-gray-300 rounded-sm flex items-center justify-center h-12 w-12 fas fa-minus"
                        />
                        <input
                            type="number"
                            value={splitInto}
                            onBlur={() => setSplitInto(splitInto || 1)}
                            onChange={(e) =>
                                setSplitInto(parseFloat(e.target.value))
                            }
                            className="shadow h-12 text-2xl rounded-sm text-center w-20"
                        />
                        <button
                            onClick={() => setSplitInto((e) => (e || 0) + 1)}
                            className="border border-gray-300 rounded-sm flex items-center justify-center h-12 w-12 fas fa-plus"
                        />
                    </div>
                </div>
                <div className="flex-auto overflow-auto h-0 mt-16">
                    {partList.map((item) => (
                        <div key={item._id}>
                            <SingleInput item={item} />
                        </div>
                    ))}
                </div>
                <div className="h-32 my-10 flex items-center justify-center">
                    <button className="bg-red rounded-lg p-2 my-1 mx-2 w-40 font-medium text-white">
                        Process
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Split;
