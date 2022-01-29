/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";

const ReadyToServe = "ReadyToServe";
const Processing = "Processing";
const Completed = "Completed";

function KotCard({ item, setKots }) {

    const initialItemsStatus = {}
    item.order.forEach(item=>initialItemsStatus[item._id]=item.itemStatus)
    
    const notify = useContext(NotificationContext);
    const [status, setStatus] = useState(item.status);
    const [itemsStatus, setItemsStatus] = useState(initialItemsStatus);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState();
    const [timeTakenToComplete, setTimeTakenToComplete] = useState(
        item.timeTakenToComplete
    );
    const [loading, setLoading] = useState(false);
    const item_id = item._id;
    const late = elapsedTime > estimatedTime;

    const calcEstimatedTime = () => {
        setEstimatedTime(
            item.order.reduce(
                (max, item) =>
                    Math.max(
                        max,
                        itemsStatus[item._id] === Processing
                            ? item.timeToCook || 0
                            : 0
                    ),
                0
            )
        );
    };

    useEffect(() => {
        calcEstimatedTime();
    }, [itemsStatus]);
    

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
        setLoading(true);
        const dataToPost = {
            status: status === Processing ? ReadyToServe : Completed,
            timeTakenToComplete: elapsedTime,
        };
        axios
            .post(`/app/kotStatus/${item_id}`, dataToPost)
            .then(() => {
                if (status === Processing) {
                    setStatus(ReadyToServe);
                    setTimeTakenToComplete(elapsedTime);
                } else
                    setKots((prev) => prev.filter((it) => it._id !== item_id));
            })
            .catch((err) => notify(err?.response?.data?.message || "Error!!"))
            .finally(() => setLoading(false));
    };

    return (
        <div
            className={`${
                late && status === Processing && "border-red text-white"
            } border-2 relative h-72 w-56 bg-white m-9 shadow flex flex-col`}
            key={item._id}
        >
            {loading && <SpinLoader />}
            <div className="h-14 flex">
                <div
                    className={`${
                        status === Processing
                            ? late
                                ? "bg-red"
                                : "bg-yellow-300"
                            : "bg-green text-white"
                    } w-1/2 border border-white h-full flex flex-col items-center justify-center`}
                >
                    <div className="text-xs leading-3">Table</div>
                    <div className="leading-4 font-semibold">
                        {item.tableNumber}
                    </div>
                </div>
                <button
                    onClick={toggleOrderStatus}
                    className={`${
                        status === Processing
                            ? late
                                ? "bg-red"
                                : "bg-yellow-300"
                            : "bg-green text-white"
                    } w-1/2 flex border-white flex-col shadow-md z-10 items-center justify-center border-2 h-full`}
                >
                    <div className="far fa-check-circle text-lg"></div>
                    <div className="text-xs leading-3">
                        {status === Processing ? "Food Ready" : "Serve"}
                    </div>
                </button>
            </div>
            <div className="flex h-10">
                <div
                    className={`${
                        status === Processing && late ? "bg-red" : "bg-gray-200"
                    } flex-1 flex flex-col items-center justify-center border-2 border-white`}
                >
                    <div className="text-xs">K.O.T</div>
                    <div className="leading-4 text-sm font-medium">
                        {item.kotNumber}
                    </div>
                </div>
                <div
                    className={`${
                        status === Processing
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
                        status === Processing && late ? "bg-red" : "bg-gray-200"
                    } flex-1 flex flex-col items-center justify-center border-2 border-white`}
                >
                    <div className="text-xxs">
                        {status === Processing
                            ? "Time Elapsed"
                            : "Time Taken To Complete"}
                    </div>
                    <div className="text-xs leading-3 font-medium">
                        {status === Processing
                            ? `${Math.floor(elapsedTime / 60)
                                  .toString()
                                  .padStart(2, "0")}:${(elapsedTime % 60)
                                  .toString()
                                  .padStart(2, "0")}`
                            : `${Math.floor(timeTakenToComplete / 60)
                                  .toString()
                                  .padStart(2, "0")}:${Math.floor(
                                  timeTakenToComplete % 60
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
                                status === Processing && late && "text-red"
                            } border-b-2 h-6 flex justify-between`}
                        >
                            <SingleItem
                                setItemsStatus={setItemsStatus}
                                item_id={item_id}
                                item={item}
                                status={status}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default KotCard;

function SingleItem({ item, KotStatus, item_id, setItemsStatus }) {
    const [status, setStatus] = useState(item.itemStatus);

    const toggleStatus = () => {
        setStatus((prev) => (prev === Processing ? ReadyToServe : Processing));
    };

    useEffect(() => {
        setItemsStatus(prev=>({...prev,[item._id]:status}))
        axios.post(`/app/kotItemStatus/${item_id}`, {
            itemStatus: status,
            itemId: item._id,
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
                    KotStatus === ReadyToServe && "hidden"
                } transform text-sm text-gray-400 mr-2`}
            />
        </>
    );
}
