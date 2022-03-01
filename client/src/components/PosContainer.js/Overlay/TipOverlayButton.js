import React, { useState } from "react";
import { Modal } from "../../Common/Modal";

function TipOverlayButton({ tip, setTip, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [tipp, setTipp] = useState(tip);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTip(tipp);
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
                className="max-h-screen overflow-y-auto px-14 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-10 text-red-500 font-semibold">
                    Tip
                </div>
                <form form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-10 space-y-8">
                        <div className="flex justify-center w-64">
                            <input
                                name="tip"
                                type="number"
                                defaultValue={tip}
                                onBlur={() => setTipp(tipp || 0)}
                                onChange={(e) =>
                                    setTipp(parseFloat(e.target.value))
                                }
                                className="border rounded-md text-center w-32 p-2 border-gray-300"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-red-500 p-2 text-white font-semibold px-10 rounded-md"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default TipOverlayButton;
