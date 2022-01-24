import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";

function AuthenticateOverlayButton({ item, title, children, ...rest }) {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("fixed");
    const [amount, setAmount] = useState(0);
    const [coupon, setCoupon] = useState("");

    const notify = useContext(NotificationContext);

    return (
        <>
            <button onClick={() => setIsOpen((prev) => !prev)} {...rest}>
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="px-20 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-10 text-red font-semibold">
                    {title}
                </div>
                <div className="mb-10 space-y-3">
                    <div className="relative">
                        <input
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            type="text"
                            className="rounded-md border w-80 p-3"
                            placeholder="Enter User ID"
                        />
                        <div className="<h-3 w-3 text-sm fas fa-user text-red absolute right-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <div className="relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="rounded-md border w-80 p-3"
                            placeholder="Password / Employee Code"
                        />
                        <div className="<h-3 w-3 text-sm fas fa-key text-red absolute right-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <button className="bg-red p-2 text-white font-semibold px-10 rounded-md">
                        Continue
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default AuthenticateOverlayButton;
