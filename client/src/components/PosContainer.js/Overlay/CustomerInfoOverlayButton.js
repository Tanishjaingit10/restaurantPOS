/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../../context/Notification";
import SpinLoader from "../../SpinLoader";
import { Modal } from "../../Common/Modal";
import axios from "axios";

function CustomerInfoOverlayButton({
    item,
    children,
    customer,
    currentTable,
    setCurrentTable,
    setCustomer,
    orderType,
    pickupTime,
    setPickupTime,
    ...rest
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState();
    const [tempPickupTime, setTempPickupTime] = useState(
        pickupTime || new Date(Date.now()).toJSON().substring(0, 16)
    );

    const notify = useContext(NotificationContext);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/app/table")
            .then((res) => {
                if (res?.data) setTables(res.data);
            })
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to fetch tables")
            )
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setTable(currentTable);
    }, [tables]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCustomer({
            name: e.target?.name?.value,
            email: e.target?.email?.value,
            contact: e.target?.contact?.value,
        });
        if (e?.target?.table?.value) setCurrentTable(e.target?.table?.value);
        if (tempPickupTime) setPickupTime(tempPickupTime);
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsOpen((prev) => !prev)} {...rest}>
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="max-h-screen overflow-y-auto px-20 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red-500 font-semibold">
                    Customer Information
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-10">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={customer?.name}
                            placeholder="Customer Name"
                            className="border mb-1 items-center px-4 flex border-gray-300 w-80 rounded-md h-12"
                        />
                        <label htmlFor="contact">Contact</label>
                        <input
                            type="tel"
                            id="contact"
                            defaultValue={customer?.contact}
                            placeholder="Contact Number"
                            className="border mb-1 items-center px-4 flex border-gray-300 w-80 rounded-md h-12"
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            defaultValue={customer?.email}
                            placeholder="Email address"
                            className="border mb-1 items-center px-4 flex border-gray-300 w-80 rounded-md h-12"
                        />
                        {orderType === "Dine In" ? (
                            <>
                                <label htmlFor="table">Table Number</label>
                                <select
                                    id="table"
                                    name="table"
                                    className="border items-center px-4 flex text-white bg-red-400 w-80 rounded-md h-12"
                                    onChange={(e) => setTable(e.target.value)}
                                    value={table}
                                >
                                    {tables
                                        .filter(
                                            (table) => table?.status === "Free"
                                        )
                                        .map((table) => (
                                            <option
                                                key={table?._id}
                                                value={table?.number}
                                                className="bg-red-400"
                                            >
                                                Table: {table?.number}
                                            </option>
                                        ))}
                                </select>
                            </>
                        ) : (
                            <>
                                <label htmlFor="pickupTime">
                                    Pickup Time (DD-MM-YYYY HH:MM)
                                </label>
                                <input
                                    required
                                    id="pickupTime"
                                    type="datetime-local"
                                    value={tempPickupTime}
                                    onChange={(e) =>
                                        setTempPickupTime(e.target?.value)
                                    }
                                    className="border items-center px-4 flex text-white bg-red-400 w-80 rounded-md h-12"
                                />
                            </>
                        )}
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-red-500 p-2 text-white font-semibold px-10 rounded-md"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default CustomerInfoOverlayButton;
