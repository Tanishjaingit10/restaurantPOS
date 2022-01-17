import React, { useState } from "react";
import ReactModal from "react-modal";

function ItemInfoButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-center rounded-md bg-yellow-100 p-8 m-2 text-xl shadow-md"
            >
                French Fries
            </button>

            <ReactModal
                isOpen={isOpen}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(2px)",
                    },
                }}
                contentLabel={"Add Category Modal"}
                className={
                    "flex justify-center absolute z-50 items-center w-screen h-screen"
                }
            >
                <div className="w-5/12 h-5/6 p-10 flex flex-col items-center relative bg-white rounded-xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fas fa-times absolute text-2xl right-6 top-4"
                    />
                    <div className="text-center font-semibold text-3xl mb-6 text-red font-semibold">
                        Food Item - French Fries
                    </div>
                    <div className="w-2/3">
                        <div className="flex justify-center mt-6">
                            <button className="rounded-lg p-3 w-40 font-medium m-4 bg-red text-white">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    );
}

export default ItemInfoButton;