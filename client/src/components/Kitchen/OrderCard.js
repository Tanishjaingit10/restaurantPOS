/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";

const ReadyToServe = "Ready to Serve";
const Processing = "Processing";

function OrderCard({ item, fetchOrders }) {
    const notify = useContext(NotificationContext);
    const [orderStatus, setOrderStatus] = useState(item.payment.orderStatus);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState();
    const [timeTakenToComplete, setTimeTakenToComplete] = useState(
        item.payment.timeTakenToComplete
    );
    const [loading, setLoading] = useState(false);
    const order_id = item.order_id;
    const late = elapsedTime > estimatedTime;

    const calcEstimatedTime = () => {
        setEstimatedTime(
            item.order.reduce(
                (max, item) =>
                    Math.max(
                        max,
                        item.itemStatus === Processing
                            ? item.timeToCook || 0
                            : 0
                    ),
                0
            )
        );
    };

    const calcElapsedTime = () => {
        setElapsedTime(
            Math.floor((Date.now() - new Date(item.time).getTime()) / 1000)
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            calcElapsedTime();
        }, 1000);
        calcEstimatedTime();
        return () => clearInterval(interval);
    }, []);

    const toggleOrderStatus = () => {
        setOrderStatus((prev) => {
            if (prev === ReadyToServe) {
                setLoading(true);
                axios
                    .delete(`/app/order/${order_id}`)
                    .then(() => fetchOrders())
                    .catch(() => notify("Unable to delete order"))
                    .finally(() => setLoading(false));
                setOrderStatus(ReadyToServe);
            } else {
                setLoading(true);
                axios
                    .post(`/app/orderReady/${order_id}`, {
                        timeTakenToComplete: elapsedTime,
                    })
                    .catch((err) => notify("Unable to update order status"))
                    .finally(() => setLoading(false));
                setTimeTakenToComplete(elapsedTime);
                setOrderStatus(ReadyToServe);
            }
        });
    };

    return (
        <div
            className={`${
                late && orderStatus === Processing && "border-red text-white"
            } border-2 relative h-72 w-56 bg-white m-9 shadow flex flex-col`}
            key={item._id}
        >
            {loading && <SpinLoader />}
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
                    onClick={toggleOrderStatus}
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
                        {order_id}
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
                    <div className="text-xs leading-3 font-medium">{`${Math.floor(
                        estimatedTime / 60
                    )
                        .toString()
                        .padStart(2, "0")}:${Math.floor(estimatedTime % 60)
                        .toString()
                        .padStart(2, "0")}`}</div>
                    <div className="text-xxs">MM:SS</div>
                </div>
                <div
                    className={`${
                        orderStatus === Processing && late
                            ? "bg-red"
                            : "bg-gray-200"
                    } flex-1 flex flex-col items-center justify-center border-2 border-white`}
                >
                    <div className="text-xxs">
                        {orderStatus === Processing
                            ? "Time Elapsed"
                            : "Time Taken To Complete"}
                    </div>
                    <div className="text-xs leading-3 font-medium">
                        {orderStatus === Processing
                            ? `${Math.floor(elapsedTime / 60)
                                  .toString()
                                  .padStart(2, "0")}:${(elapsedTime % 60)
                                  .toString()
                                  .padStart(2, "0")}`
                            : `${Math.floor(timeTakenToComplete / 60)
                                  .toString()
                                  .padStart(2, "0")}:${Math.floor(
                                  timeTakenToComplete
                              )
                                  .toString()
                                  .padStart(2, "0")}`}
                    </div>
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
                            <SingleItem
                                calcEstimatedTime={calcEstimatedTime}
                                order_id={order_id}
                                item={item}
                                orderStatus={orderStatus}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderCard;

function SingleItem({ item, orderStatus, order_id, calcEstimatedTime }) {
    const [status, setStatus] = useState(item.itemStatus);

    const toggleStatus = () => {
        setStatus((prev) => (prev === Processing ? ReadyToServe : Processing));
        calcEstimatedTime();
    };

    useEffect(() => {
        axios.post(`/app/orderItemStatus/${order_id}`, {
            itemStatus: status,
            item: item,
        });
    }, [status]);

    return (
        <>
            <div className="ml-2 text-xs flex items-center">
                <div className="mr-2">{item.quantity}</div>
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
