import React, { useContext, useState } from "react";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";

function CustomerInfoOverlayButton({ item, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tables, setTables] = useState([]);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    const [tableNumber, setTableNumber] = useState();

    const notify = useContext(NotificationContext);

    const handleSubmit = (e) => {
        e.preventDefault()
    };

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
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    Customer Information
                </div>
                <form onSubmit={e=>handleSubmit(e)}>
                    <div className="mb-10">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            placeholder="Customer Name"
                            className="border mb-1 items-center px-4 flex border-gray-300 w-80 rounded-md h-12"
                        />
                        <label htmlFor="contact">Contact</label>
                        <input
                            type="tel"
                            id="contact"
                            value={contact}
                            onChange={(e)=>setContact(e.target.value)}
                            placeholder="Contact Number"
                            className="border mb-1 items-center px-4 flex border-gray-300 w-80 rounded-md h-12"
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value = {email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Email address"
                            className="border mb-1 items-center px-4 flex border-gray-300 w-80 rounded-md h-12"
                        />
                        <label htmlFor="tableNumber">Table Number</label>
                        <select
                            id="tableNumber"
                            className="border items-center px-4 flex text-white bg-lightred w-80 rounded-md h-12"
                            onChange={(e) => {setTableNumber(e.target.value)}}
                            value={tableNumber}
                        >
                            <option
                                value="Table No.3"
                                className="bg-lightred"
                                selected={""}
                            >
                                Table No.3
                            </option>
                        </select>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button type="submit" className="bg-red p-2 text-white font-semibold px-10 rounded-md">
                            Continue
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default CustomerInfoOverlayButton;
