/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";

const ReadyToServe = "ReadyToServe";
const Processing = "Processing";
const Completed = "Completed";

function KotCard({ item, setKots }) {
    const getAllItemsStatus = () =>
        item.order.reduce(
            (obj, item) => ({ ...obj, [item._id]: item?.itemStatus }),
            {}
        );

    const notify = useContext(NotificationContext);
    const [status, setStatus] = useState(item.status);
    const [itemsStatus, setItemsStatus] = useState(getAllItemsStatus());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState();
    const [timeTakenToComplete, setTimeTakenToComplete] = useState(
        item?.timeTakenToComplete
    );
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const card_id = item?._id;
    const late = elapsedTime > estimatedTime;

    useEffect(() => setStatus(item?.status), [item?.status]);
    useEffect(
        () => setTimeTakenToComplete(item?.timeTakenToComplete),
        [item?.timeTakenToComplete]
    );

    const calcEstimatedTime = (itemsStatus) => {
        const est = item.order.reduce(
            (max, item) =>
                Math.max(
                    max,
                    itemsStatus[item._id] === Processing ? item?.time || 0 : 0
                ),
            0
        );
        if (est === 0) toggleOrderStatus(ReadyToServe);
        setEstimatedTime(est);
    };

    const calcElapsedTime = () => {
        const elapsedTime = Math.floor(
            (Date.now() - new Date(item?.time).getTime()) / 1000
        );
        setElapsedTime(elapsedTime);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            calcElapsedTime();
        }, 1000);
        calcEstimatedTime(itemsStatus);
        return () => clearInterval(interval);
    }, []);

    const toggleOrderStatus = (newStatus) => {
        setLoading(true);
        const dataToPost = {
            status: newStatus,
            timeTakenToComplete: elapsedTime,
        };
        axios
            .post(`/app/kotStatus/${card_id}`, dataToPost)
            .then(() => {
                setStatus(newStatus);
                if (newStatus === ReadyToServe)
                    setTimeTakenToComplete(elapsedTime);
                else if (newStatus === Completed)
                    setKots((prev) =>
                        prev?.filter((it) => it?._id !== card_id)
                    );
            })
            .catch((err) => notify(err?.response?.data?.message || "Error!!"))
            .finally(() => setLoading(false));
    };

    return (
        <div
            className={`${
                late && status === Processing && "border-red-500 text-white"
            } border-2 relative h-72 w-56 bg-white m-9 shadow flex flex-col`}
            key={item?._id}
        >
            {loading && <SpinLoader />}
            <div className="h-14 flex">
                <div
                    className={`${
                        status === Processing
                            ? late
                                ? "bg-red-500"
                                : "bg-yellow-300"
                            : "bg-green text-white"
                    } w-1/2 border border-white h-full flex flex-col items-center justify-center`}
                >
                    <div className="text-xs leading-3">
                        {item?.tableNumber ? "Table" : "Take Away"}
                    </div>
                    <div className="leading-4 font-semibold">
                        {item?.tableNumber}
                    </div>
                </div>
                <button
                    onClick={() =>
                        toggleOrderStatus(
                            status === Processing ? ReadyToServe : Completed
                        )
                    }
                    className={`${
                        status === Processing
                            ? late
                                ? "bg-red-500"
                                : "bg-yellow-300"
                            : "bg-green text-white"
                    } w-1/2 flex border-white flex-col shadow-md items-center justify-center border-2 h-full`}
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
                        status === Processing && late
                            ? "bg-red-500"
                            : "bg-gray-200"
                    } flex-1 flex flex-col items-center justify-center border-2 border-white`}
                >
                    <div className="text-xs">K.O.T</div>
                    <div className="leading-4 text-sm font-medium">
                        {item?.kotNumber}
                    </div>
                </div>
                <div
                    className={`${
                        status === Processing
                            ? late
                                ? "bg-red-500"
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
                        status === Processing && late
                            ? "bg-red-500"
                            : "bg-gray-200"
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
                    {item?.order?.map((item) => (
                        <div
                            key={item._id}
                            className={`${
                                status === Processing && late && "text-red-500"
                            } border-b-2`}
                        >
                            <SingleItem
                                calcEstimatedTime={calcEstimatedTime}
                                toggleOrderStatus={toggleOrderStatus}
                                setItemsStatus={setItemsStatus}
                                card_id={card_id}
                                item={item}
                                status={status}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {(item?.comments?.length || false) && item.comments.length !== 0 && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={`${
                        status === Processing
                            ? late
                                ? "bg-red-500"
                                : "bg-yellow-300"
                            : "bg-green text-white"
                    } p-1 border-t flex items-center justify-center font-medium m-0.5`}
                >
                    View Comments
                </button>
            )}
            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="max-h-screen overflow-y-auto rounded-xl relative py-10 px-20 text-lg bg-white"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                {item?.comments}
            </Modal>
        </div>
    );
}

export default KotCard;

function SingleItem({
    item,
    KotStatus,
    card_id,
    setItemsStatus,
    toggleOrderStatus,
    calcEstimatedTime,
}) {
    const [status, setStatus] = useState(item.itemStatus);
    useEffect(() => setStatus(item.itemStatus), [item.itemStatus]);

    const toggleStatus = (newStatus) => {
        setStatus(newStatus);
        axios.post(`/app/kotItemStatus/${card_id}`, {
            itemStatus: newStatus,
            itemId: item._id,
        });
        setItemsStatus((itemsStatus) => {
            let allWereReady = true;
            for (const item in itemsStatus)
                if (itemsStatus[item] === Processing) allWereReady = false;
            if (allWereReady) toggleOrderStatus(Processing);
            const newItemsStatus = { ...itemsStatus, [item._id]: newStatus };
            let allReady = true;
            for (const item in newItemsStatus)
                if (newItemsStatus[item] === Processing) allReady = false;
            if (allReady) toggleOrderStatus(ReadyToServe);
            else calcEstimatedTime(newItemsStatus);
            return newItemsStatus;
        });
    };

    let deleteHistory = [];
    if (item?.deleted?.length) {
        let total =
            item.quantity + item.deleted.reduce((sum, num) => sum + num, 0);
        item.deleted.forEach((num) => {
            deleteHistory.push(total);
            total -= num;
        });
    }
    return (
        <>
            {deleteHistory.length !== 0 &&
                deleteHistory.map((num, index) => (
                    <div
                        key={index}
                        className="line-through h-6 pl-2 text-xs flex items-center"
                    >
                        <div className="mr-2">{num}</div>
                        <div>{item.foodItem}</div>
                    </div>
                ))}
            {item.quantity !== 0 && (
                <>
                    <div className="h- flex justify-between">
                        <div className="ml-2 text-xs flex items-center">
                            <div className="mr-2">{item.quantity}</div>
                            {item.foodItem}
                        </div>
                        <button
                            onClick={() =>
                                toggleStatus(
                                    status === Processing
                                        ? ReadyToServe
                                        : Processing
                                )
                            }
                            className={`fas fa-toggle-on ${
                                status === ReadyToServe
                                    ? "text-green"
                                    : "rotate-180"
                            } ${
                                KotStatus === ReadyToServe && "hidden"
                            } transform text-sm text-gray-400 mr-2`}
                        />
                    </div>
                    {item?.orderedVariant?.map((it) => (
                        <div
                            key={it?._id}
                            className="text-xxs ml-6"
                            style={{ fontSize: "0.6rem" }}
                        >{`${it.quantity}x ${it.variant}`}</div>
                    ))}
                </>
            )}
        </>
    );
}
