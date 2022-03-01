/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NotificationContext } from "../context/Notification";
import { getNewId } from "../Utils";
import { Modal } from "./Common/Modal";
import PrintBillButton from "./PosContainer.js/PrintBillButton";
import SpinLoader from "./SpinLoader";
import SingleInput from "./Split/SingleInput";

function Split() {
    const notify = useContext(NotificationContext);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [splitInto, setSplitInto] = useState(2);
    const [partList, setPartList] = useState([]);
    const [order, setOrder] = useState({});
    const [amountDue, setAmountDue] = useState(0);
    const [paymentDoneOverlayIsOpen, setPaymentDoneOverlayIsOpen] =
        useState(false);

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

    useEffect(() => {
        resize(partList, splitInto);
        const dueAmount =
            order?.payment?.total -
            partList.reduce(
                (sum, item) => sum + (item.paid ? item.amount || 0 : 0),
                0
            );
        distributeEqually(dueAmount, partList);
        setPartList([...partList]);
    }, [splitInto, order?.payment?.total]);

    useEffect(() => {
        setAmountDue(calculateAmountDue());
    }, [partList]);

    const distributeEqually = (dueAmount, partList) => {
        let unpaidLeft = partList.reduce(
            (sum, item) => sum + (item.paid ? 0 : 1),
            0
        );
        partList.forEach((item) => {
            if (!item.paid) {
                const amt =
                    Math.floor(dueAmount / unpaidLeft) +
                    (dueAmount % unpaidLeft > 1 ? 1 : 0);
                item.amount = amt;
                dueAmount -= amt;
                unpaidLeft--;
            }
        });
        if (dueAmount && partList.find((item) => !item.paid))
            partList.find((item) => !item.paid).amount += dueAmount;
    };

    const calculateAmountDue = () => {
        const total = order?.payment?.total || 0;
        const done = partList.reduce((sum, item) => sum + item.amount || 0, 0);
        const left = total - done;
        return left;
    };

    const resize = (array, newSize) => {
        while (newSize > array.length)
            array.push({
                amount: 0,
                key: getNewId(),
                paid: false,
                method: "cash",
            });
        array.length = newSize;
    };

    const handleProcess = () => {
        if (amountDue || partList.some((item) => !item.paid)){
            const msg = ["Please Clear The Due Amount."]
            if(amountDue<0)msg.push(`Given amount is $${-amountDue} more than due amount.`)
            else if(amountDue>0)msg.push(`Given amount is $${amountDue} less than due amount.`)
            notify(msg)
        }
        else {
            setLoading(true);
            axios
                .post(`/app/makePayment/${order?.order_id}`, {
                    mode: "split",
                })
                .then((res) => setPaymentDoneOverlayIsOpen(true))
                .catch((err) => console.log(err.response))
                .finally(() => setLoading(false));
        }
    };

    return (
        <div className="flex" style={{ height: "calc(100vh - 56px)" }}>
            {loading && <SpinLoader />}
            <div className="h-full flex flex-col pt-4 w-5/12">
                <div className="flex flex-auto overflow-auto flex-col">
                    <div className="flex flex-col border-gray-300">
                        {order?.order?.map((item, index) => (
                            <div
                                key={item._id}
                                className={`${
                                    index && "border-t-0"
                                } border-2 font-semibold flex py-5 items-center border-gray-300 flex-shrink-0`}
                            >
                                {item.quantity !== 0 && (
                                    <div className="pl-3 text-lg">
                                        {item.quantity}x
                                    </div>
                                )}
                                <div className="flex flex-col w-2/3">
                                    <div className="flex mb-2 text-gray-700 text-lg">
                                        <div className="w-3/4 px-4">
                                            {item.foodItem}
                                        </div>
                                        <div className="w-1/4 text-center">
                                            $
                                            {(
                                                item.price -
                                                (item.discount || 0)
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                    {item.orderedVariant.map((variant) => (
                                        <div
                                            key={variant._id}
                                            className="flex my-1 font-bold text-xs text-gray-400"
                                        >
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
                    <div className="bg-red-400 text-white w-full text-lg p-8 h-72">
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
                        {Boolean(order?.payment?.tip) && (
                            <div className="flex justify-between p-2">
                                <div>Tip</div>
                                <div>
                                    {order?.payment?.tip?.toFixed(2) || "0.00"}
                                </div>
                            </div>
                        )}
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
                    <div className="text-2xl font-bold text-red-500">
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
                        <div key={item.key}>
                            <SingleInput
                                setPartList={setPartList}
                                amountDue={amountDue}
                                setAmountDue={setAmountDue}
                                item={item}
                            />
                        </div>
                    ))}
                </div>
                <div className="h-32 my-10 flex items-center justify-center">
                    <button
                        onClick={handleProcess}
                        className="bg-red-500 rounded-lg p-2 my-1 mx-2 w-40 font-medium text-white"
                    >
                        Process
                    </button>
                    <Modal
                        isOpen={paymentDoneOverlayIsOpen}
                        controller={setPaymentDoneOverlayIsOpen}
                        className="py-8 max-h-screen overflow-y-auto px-12 flex flex-col items-center relative bg-white rounded-xl"
                    >
                        <button
                            onClick={() => setPaymentDoneOverlayIsOpen(false)}
                            className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                        />
                        <div className="text-center text-3xl m-3 text-red-500 font-semibold">
                            Payment Completed
                        </div>
                        <div className="flex gap-8">
                            <div className="flex mb-8 flex-col items-center font-bold text-gray-600 m-4 gap-2">
                                <div className="text-xl">Amount Tendered</div>
                                <div className="text-3xl">
                                    ${(order?.payment?.total || 0).toFixed(2)}
                                </div>
                            </div>
                            <div className="flex mb-8 flex-col items-center font-bold text-gray-600 m-4 gap-2">
                                <div className="text-xl">Change Due</div>
                                <div className="text-3xl">
                                    ${(amountDue || 0).toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <PrintBillButton
                                order_id={order?.order_id}
                                className="rounded-lg py-2 my-1 w-36 font-medium bg-red-500 text-white"
                            >
                                Print Receipt
                            </PrintBillButton>
                            <button
                                onClick={() => {
                                    setPaymentDoneOverlayIsOpen(false);
                                }}
                                className="rounded-lg py-2 my-1 mx-2 w-36 font-medium bg-red-500 text-white"
                            >
                                Email Receipt
                            </button>
                            <button
                                onClick={() => {
                                    setPaymentDoneOverlayIsOpen(false);
                                }}
                                className="rounded-lg py-2 my-1 w-36 font-medium bg-red-500 text-white"
                            >
                                Text Receipt
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Split;
