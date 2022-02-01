import React, { useState } from "react";
import { Modal } from "../Common/Modal";

function ServiceTaxOverlayButton({
    item,
    serviceTax,
    setServiceTax,
    serviceTaxType,
    setServiceTaxType,
    children,
    ...rest
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(serviceTaxType);
    const [tax, setTax] = useState(serviceTax);

    const handleSubmit = (e) => {
        e.preventDefault();
        setServiceTax(tax);
        setServiceTaxType(type);
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
                className="px-14 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-10 text-red font-semibold">
                    Service Tax
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-10 space-y-8">
                        <div className="flex justify-between w-96">
                            <button
                                onClick={() => setType("percentage")}
                                className="text-red text-lg font-semibold"
                            >
                                <span
                                    className={`mr-3 far fa-${
                                        type === "percentage" ? "dot-" : ""
                                    }circle`}
                                />
                                Percentage
                            </button>
                            <button
                                onClick={() => setType("fixed")}
                                className="text-red text-lg font-semibold"
                            >
                                <span
                                    className={`mr-3 far fa-${
                                        type === "fixed" ? "dot-" : ""
                                    }circle`}
                                />
                                Fixed
                            </button>
                            <input
                                type="number"
                                value={tax}
                                onBlur={() => setTax(tax || 0)}
                                onChange={(e) =>
                                    setTax(parseFloat(e.target.value))
                                }
                                className="border rounded-md text-center w-32 p-2 border-gray-300"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            type="submit"
                            className="bg-red p-2 text-white font-semibold px-10 rounded-md"
                        >
                            Done
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default ServiceTaxOverlayButton;
