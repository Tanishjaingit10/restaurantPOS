import React, { useContext, useState } from "react";
import { NotificationContext } from "../../../context/Notification";
import SpinLoader from "../../SpinLoader";
import { Modal } from "../../Common/Modal";
import axios from "axios";
import { BackendUrl } from "../../../config";

function AuthenticateOverlayButton({
    item,
    title,
    children,
    isAuthenticated,
    setIsAuthenticated,
    callback,
    ...rest
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${BackendUrl}/app/signin`,{email_id:e.target.email.value,password:e.target.password.value})
        .then(()=>{setIsAuthenticated(true);callback();setIsOpen(false)})
        .catch(err=>notify(err?.response?.data?.message||"Unable to Authenticate, Try again"))
        .finally(()=>setLoading(false))
    }

    const notify = useContext(NotificationContext);

    return (
        <>
            <button
                onClick={() => (isAuthenticated ? callback() : setIsOpen(true))}
                {...rest}
            >
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="animate-scaleUp max-h-screen overflow-y-auto px-20 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-10 text-red-500 font-semibold">
                    {title}
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mb-10 space-y-3">
                        <div className="relative">
                            <input
                                name="email"
                                type="text"
                                required
                                className="rounded-md border w-80 p-3"
                                placeholder="Enter User ID"
                            />
                            <div className="<h-3 w-3 text-sm fas fa-user text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="relative">
                            <input
                                name="password"
                                type="password"
                                required
                                className="rounded-md border w-80 p-3"
                                placeholder="Password / Employee Code"
                            />
                            <div className="<h-3 w-3 text-sm fas fa-key text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button className="bg-red-500 p-2 text-white font-semibold px-10 rounded-md">
                            Continue
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default AuthenticateOverlayButton;
