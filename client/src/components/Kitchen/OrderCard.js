/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const ReadyToServe = "Ready to Serve";
const Processing = "Processing";

function OrderCard({ item }) {
    let late = false;

    const [orderStatus, setOrderStatus] = useState(item.payment.orderStatus);
    
    const toggelOrderStatus = () => {
        setOrderStatus((prev) =>
            prev === Processing ? ReadyToServe : Processing
        );
    };

    return (
        <div
            className={`${
                late && orderStatus === Processing && "border-red text-white"
            } border-2 h-72 w-56 bg-white m-9 shadow flex flex-col`}
            key={item._id}
        >
            <div className="h-14 flex">
                <div
                    className={`${
                        orderStatus === Processing
                            ? late
                                ? "bg-red"
                                : "bg-yellow-300"
                            : "bg-green text-white"
                    } w-1/2 border border-white h-full flex flex-col items-center justify-center`}
                >
                    <div className="text-xs leading-3">Table</div>
                    <div className="leading-4 font-semibold">
                        {item.payment.table}
                    </div>
                </div>
                <button
                    onClick={toggelOrderStatus}
                    className={`${
                        orderStatus === Processing
                            ? late
                                ? "bg-red"
                                : "bg-yellow-300"
                            : "bg-green text-white"
                    } w-1/2 flex border-white flex-col shadow-md z-10 items-center justify-center border-2 h-full`}
                >
                    <div className="far fa-check-circle text-lg"></div>
                    <div className="text-xs leading-3">
                        {orderStatus === Processing ? "Food Ready" : "Serve"}
                    </div>
                </button>
            </div>
            <div className="flex h-10">
                <div
                    className={`${
                        orderStatus === Processing && late
                            ? "bg-red"
                            : "bg-gray-200"
                    } flex-1 flex flex-col items-center justify-center border-2 border-white`}
                >
                    <div className="text-xs">K.O.T</div>
                    <div className="leading-4 text-sm font-medium">
                        {item.order_id}
                    </div>
                </div>
                <div
                    className={`${
                        orderStatus === Processing
                            ? late
                                ? "bg-red"
                                : "bg-gray-200"
                            : "hidden"
                    } flex-1 flex flex-col items-center justify-center border-2 border-white`}
                >
                    <div className="text-xxs">E.T.A.</div>
                    <div className="text-xs leading-3 font-medium">02:30</div>
                    <div className="text-xxs">MM:SS</div>
                </div>
                <div
                    className={`${
                        orderStatus === Processing && late
                            ? "bg-red"
                            : "bg-gray-200"
                    } flex-1 flex flex-col items-center justify-center border-2 border-white`}
                >
                    <div className="text-xxs">{orderStatus===Processing?"Time Elapsed":"Time Taken To Complete"}</div>
                    <div className="text-xs leading-3 font-medium">{orderStatus===Processing?`02:30`:"02:00"}</div>
                    <div className="text-xxs">MM:SS</div>
                </div>
            </div>
            <div className="overflow-auto flex-1">
                <div>
                    {item.order.map((item) => (
                        <div
                            key={item._id}
                            className={`${
                                orderStatus === Processing && late && "text-red"
                            } border-b-2 h-6 flex justify-between`}
                        >
                            <SingleItem item={item} orderStatus={orderStatus} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderCard;

function SingleItem({ item, orderStatus }) {
    const [status, setStatus] = useState(item.itemStatus);

    const toggleStatus = () => {
        setStatus((prev) => (prev === Processing ? ReadyToServe : Processing));
    };

    return (
        <>
            <div className="ml-2 text-xs flex items-center">
                <div className="mr-2">1</div>
                <div className="">{item.foodItem}</div>
            </div>
            <button
                onClick={toggleStatus}
                className={`fas fa-toggle-on ${
                    status === ReadyToServe ? "text-green" : "rotate-180"
                } ${
                    orderStatus === ReadyToServe && "hidden"
                } transform text-sm text-gray-400 mr-2`}
            />
        </>
    );
}
