import React, { useState } from "react";
import PaymentMethodOverlayButton from "./PaymentMethodOverlayButton";

function SingleInput({ item }) {
    const [amount, setAmount] = useState(item.amount);
    const [paid, setPaid] = useState(item.paid);

    return (
        <div className="flex justify-center my-3">
            <select className="p-3 w-1/4 mx-2 bg-lightred text-white rounded-md">
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
            </select>
            <div
                className={`text-lg w-1/6 border mx-2 ${
                    paid ? "text-gray-500 bg-gray-50" : "border-gray-400"
                } rounded-md flex items-center justify-center`}
            >${amount.toFixed(2)}</div>
            <PaymentMethodOverlayButton
                onClick={() => setPaid(true)}
                className={`${
                    paid ? "bg-fadered" : "bg-red"
                } rounded-lg p-2 my-1 mx-2 w-40 font-medium bg-red text-white`}
            >
                Charge
            </PaymentMethodOverlayButton>
            <button
                onClick={() => setPaid(false)}
                className={`${
                    paid ? "bg-red" : "bg-fadered"
                } rounded-lg p-2 my-1 mx-2 w-40 font-medium text-white`}
            >
                Void
            </button>
        </div>
    );
}

export default SingleInput;