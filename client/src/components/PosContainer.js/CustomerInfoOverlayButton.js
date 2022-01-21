import React, { useContext, useState } from "react";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Utils";

function CustomerInfoOverlayButton({ item, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tables, setTables] = useState([]);

    const [tableNumber, setTableNumber] = useState();

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
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    Customer Information
                </div>
                <div className="mb-10">
                    <div className="border m-3 items-center px-4 flex text-gray-400 border-gray-300 w-80 rounded-md h-12">
                        Stone Augustine
                    </div>
                    <div className="border m-3 items-center px-4 flex text-gray-400 border-gray-300 w-80 rounded-md h-12">
                        +91-XXXXX-XXXXX
                    </div>
                    <div className="border m-3 items-center px-4 flex text-gray-400 border-gray-300 w-80 rounded-md h-12">
                        XXXXXXXXX@gmail.com
                    </div>
                    <div className="border m-3 items-center px-4 flex text-gray-400 border-gray-300 w-80 rounded-md h-12">
                        40, Windhaven, CA
                    </div>
                    <select
                        name="category"
                        className="border m-3 items-center px-4 flex text-white bg-lightred w-80 rounded-md h-12"
                        onChange={(e) => {}}
                        value={""}
                    >
                        <option value="" className="bg-lightred" selected={""}>
                            Table No.3
                        </option>
                    </select>
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

export default CustomerInfoOverlayButton;
