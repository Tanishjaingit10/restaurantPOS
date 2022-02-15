/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PaymentMethodOverlayButton from "./PaymentMethodOverlayButton";

function SingleInput({ item, amountDue, setPartList }) {
    const [amount, setAmount] = useState(item.amount);
    const [paid, setPaid] = useState(item.paid);
    const [method, setMethod] = useState(item.method);

    useEffect(() => setAmount(item.amount), [item.amount]);
    useEffect(() => setPaid(item.paid), [item.paid]);
    useEffect(() => {
        setPartList((prev) => {
            const temp = prev.find((it) => it.key === item.key);
            temp.amount = amount;
            temp.paid = paid;
            temp.method = method;
            return [...prev];
        });
    }, [amount, paid]);

    return (
        <div className="flex justify-center my-3">
            <select
                onChange={(e) => setMethod(e.target.value)}
                className="p-3 w-1/4 mx-2 bg-red-400 text-white rounded-md"
                value={method}
            >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
            </select>
            <div
                className={`text-lg w-1/6 border mx-2 ${
                    paid ? "text-gray-500 bg-gray-50" : "border-gray-400"
                } rounded-md flex items-center justify-center`}
            >
                ${(amount || 0).toFixed(2)}
            </div>
            <PaymentMethodOverlayButton
                item={item}
                method={method}
                amountDue={amountDue}
                setPaid={setPaid}
                setAmount={setAmount}
                onClick={() => setPaid(true)}
                className={`${
                    paid ? "bg-red-200" : "bg-red-500"
                } rounded-lg p-2 my-1 mx-2 w-40 font-medium text-white`}
            >
                Charge
            </PaymentMethodOverlayButton>
            <button
                onClick={() => setPaid(false)}
                className={`${
                    paid ? "bg-red-500" : "bg-red-200"
                } rounded-lg p-2 my-1 mx-2 w-40 font-medium text-white`}
            >
                Void
            </button>
        </div>
    );
}

export default SingleInput;
