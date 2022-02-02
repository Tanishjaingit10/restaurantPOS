import React, { useState } from "react";
import { Modal } from "../Common/Modal";

function PaymentMethodOverlayButton({ item, children, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const [amountString, setAmountString] = useState("");
    const enterAmount = (s) => {
        let i = amountString.indexOf(".");
        if (amountString === "" && s === "0");
        else if (amountString === "" && s === ".") setAmountString("0.");
        else if (i !== -1 && s === "00" && i === amountString.length - 2)
            enterAmount("0");
        else if (i === -1 || i !== amountString.length - 3)
            setAmountString((e) => e + s);
    };

    const quickEnter = (amt) => {
        let i = amountString.indexOf(".");
        i = i === -1 ? amountString.length : i;
        setAmountString(
            ((parseInt(amountString) || 0) + amt).toString() +
                amountString.substring(i)
        );
    };
    const handleSubmit = () => {
        // const amount = parseFloat(amountString !== "" ? amountString : 0);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={className}
            >
                {children}
            </button>
            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="py-8 px-12 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl m-3 text-red font-semibold">
                    Payment By Cash
                </div>
                <div className="flex mb-8 flex-col items-center font-bold text-gray-600 m-4 gap-2">
                    <div className="text-xl">Amount Due</div>
                    <div className="text-3xl">$0.00</div>
                </div>
                <div className="w-full p-2 mb-1 bg-gray-200 flex justify-between text-sm font-semibold text-gray-600 rounded-md">
                    <div className="mx-2 mb-1">
                        <div>Amount</div>
                        <div>tendered</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-2xl text-gray-600 font-bold">
                            ${amountString === "" ? "0.00" : amountString}
                        </div>
                        <button
                            onClick={() => setAmountString("")}
                            className="fas fa-times-circle text-xl text-red p-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-1 mb-3">
                    <button className="rounded-lg py-2 w-36 font-medium bg-lightred text-white">
                        Exact
                    </button>
                    <button
                        onClick={() => quickEnter(10)}
                        className="rounded-lg py-2 w-36 font-medium bg-lightred text-white"
                    >
                        $10.00
                    </button>
                    <button
                        onClick={() => quickEnter(50)}
                        className="rounded-lg py-2 w-36 font-medium bg-lightred text-white"
                    >
                        $50.00
                    </button>
                    {[...Array(9)].map((item, index) => (
                        <button
                            onClick={() => enterAmount((index + 1).toString())}
                            className="rounded-lg py-2 w-36 font-medium bg-gray-200"
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => enterAmount("0")}
                        className="rounded-lg py-2 w-36 font-medium bg-gray-200"
                    >
                        0
                    </button>
                    <button
                        onClick={() => enterAmount("00")}
                        className="rounded-lg py-2 w-36 font-medium bg-gray-200"
                    >
                        00
                    </button>
                    <button
                        onClick={() =>
                            setAmountString((prev) =>
                                prev === ""
                                    ? prev
                                    : prev.slice(0, prev.length - 1)
                            )
                        }
                        className="rounded-lg py-2 w-36 font-medium flex justify-center items-center bg-gray-200"
                    >
                        <button className="fas fa-backspace" />
                    </button>
                    <div />
                    <button
                        onClick={() => enterAmount(".")}
                        className="rounded-lg py-2 w-36 font-medium bg-gray-200"
                    >
                        .
                    </button>
                </div>
                <button
                    onClick={handleSubmit}
                    className="rounded-lg py-2 my-1 mx-2 w-36 font-medium bg-red text-white"
                >
                    Continue
                </button>
            </Modal>
        </>
    );
}

export default PaymentMethodOverlayButton;
