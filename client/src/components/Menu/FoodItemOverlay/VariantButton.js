import React, { useEffect, useState } from "react";
import { getNewId } from "../../../Utils";
import { Modal } from "../../Common/Modal";

function VariantButton({ state: parentState }) {
    const variantTemplate = {
        variant: "",
        description: "",
        price: "",
        key: "",
    };
    const [isOpen, setIsOpen] = useState(false);
    const [finalVariant, setFinalVariant] = useState([]);

    useEffect(
        () => {
            let tempVar = parentState.finalVariant;
            for (let i = 0; i < tempVar.length; i++)
                tempVar[i]["key"] = getNewId();
            setFinalVariant(tempVar);
        },
        // eslint-disable-next-line
        []
    );

    const handleAddVariant = () => {
        setFinalVariant((prev) => {
            prev = [...prev, { ...variantTemplate, key: getNewId() }];
            return prev;
        });
    };

    const handleSubmit = () => {
        parentState.setFinalVariant(finalVariant);
        setIsOpen(false);
    };

    return (
        <>
            <label htmlFor="itemVariant">Variant</label>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                id="itemVariant"
                className="p-3 flex items-center justify-between bg-lightred text-white w-full rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
            >
                <span>Variant ({finalVariant.length})</span>{" "}
                <span className="fas fa-chevron-down" />
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="w-7/12 p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    Variant
                </div>
                <div className="w-full">
                    {finalVariant.map((item) => (
                        <span key={item.key}>
                            <SingleVariant
                                item={item}
                                setFinalVariant={setFinalVariant}
                            />
                        </span>
                    ))}
                    <div className="flex justify-center">
                        <button
                            onClick={handleAddVariant}
                            type="submit"
                            className="m-3 rounded-lg p-3 px-10 font-medium bg-green text-white"
                        >
                            + Add Variant
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="m-3 rounded-lg p-3 px-10 font-medium bg-red text-white"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default VariantButton;

function SingleVariant({ setFinalVariant, item }) {
    const [variant, setVariant] = useState();

    const handleVariantChange = (val, name) => {
        setVariant((prev) => ({ ...prev, [name]: val }));
    };

    const handleDelete = () => {
        setFinalVariant((prev) => prev.filter((e) => e.key !== item.key));
    };

    useEffect(() => {
        setVariant(item);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFinalVariant((prev) => {
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].key === variant?.key) {
                    prev[i] = variant;
                }
            }
            return prev;
        });
        // eslint-disable-next-line
    }, [variant]);

    return (
        <div className="flex items-center justify-between">
            <input
                type="text"
                value={variant?.variant}
                onChange={(e) => handleVariantChange(e.target.value, "variant")}
                placeholder="Enter Variant Name"
                className="m-3 p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
            />
            /
            <input
                type="text"
                value={variant?.price}
                onChange={(e) => handleVariantChange(e.target.value, "price")}
                placeholder="Variant Unit Price (00.00)"
                className="m-3 p-3 w-full text-gray-600 rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out"
            />
            <button
                onClick={handleDelete}
                type="submit"
                className="m-3 rounded-lg p-3 px-10 font-medium bg-red text-white"
            >
                Delete
            </button>
        </div>
    );
}
