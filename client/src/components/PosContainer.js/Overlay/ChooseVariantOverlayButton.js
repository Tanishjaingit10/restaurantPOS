import React, { useEffect, useState } from "react";
import { deepClone, getNewId } from "../../../Utils";
import { Modal } from "../../Common/Modal";

function ChooseVariantOverlayButton({
    item,
    setSelectedItems,
    children,
    ...rest
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [variants, setVariants] = useState(deepClone(item?.finalVariant));

    const handleSubmit = (type) => {
        setSelectedItems((prev) => {
            let temp = [];
            let quantity = item?.key ? 0 : 1;
            let newKey = item?.key;
            const initialFinalVariant = JSON.stringify(item?.finalVariant);
            const newFinalVariant = JSON.stringify(
                type === "withoutAddons" ? item?.finalVariant : variants
            );
            prev.forEach((element) => {
                if (element?._id === item?._id) {
                    const elementFinalVarinat = JSON.stringify(
                        element?.finalVariant
                    );
                    if (
                        elementFinalVarinat === newFinalVariant ||
                        elementFinalVarinat === initialFinalVariant
                    ) {
                        quantity += element.quantity || 0;
                        if (!newKey || element?.key === newKey) {
                            newKey = element?.key;
                            temp.push(deepClone(element));
                        }
                    } else temp.push(element);
                } else temp.push(element);
            });
            const addedItem = deepClone({
                ...item,
                finalVariant:
                    type === "withoutAddons" ? item?.finalVariant : variants,
                quantity,
                key: newKey || getNewId(),
            });
            if (newKey) {
                for (let i = 0; i < temp.length; i++)
                    if (temp[i].key === newKey) temp[i] = addedItem;
            } else temp.push(addedItem);
            if (item?.key) {
                item = addedItem;
            }
            return deepClone(temp);
        });
        setVariants(deepClone(item.finalVariant));
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() =>
                    variants?.length
                        ? setIsOpen((prev) => !prev)
                        : handleSubmit()
                }
                {...rest}
            >
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="animate-scaleUp max-h-screen overflow-y-auto px-10 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red-500 font-semibold">
                    Choose Variant
                </div>
                <div className="mb-10">
                    {variants.map((item) => (
                        <div key={item?._id}>
                            <SingleVariant
                                item={item}
                                setVariants={setVariants}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mb-4 gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-red-500 p-2 text-white font-semibold px-10 rounded-md"
                    >
                        Continue
                    </button>
                    <button
                        onClick={() => handleSubmit("withoutAddons")}
                        className="bg-red-500 p-2 text-white font-semibold px-10 rounded-md"
                    >
                        Continue without add ons
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ChooseVariantOverlayButton;

function SingleVariant({ item, setVariants }) {
    const [variant, setVariant] = useState(item);
    const [quantity, setQuantity] = useState(item.quantity || 0);

    useEffect(() => {
        setVariants((prev) => {
            for (let i = 0; i < prev?.length; i++)
                if (prev[i]._id === variant._id) prev[i] = variant;
            return prev;
        });
        // eslint-disable-next-line
    }, [variant]);

    useEffect(() => {
        setVariant((prev) => ({
            ...prev,
            quantity: quantity || 0,
        }));
    }, [quantity]);

    const handleCheckmark = () => {
        setQuantity((prev) => (prev ? 0 : 1));
    };

    return (
        <div className="flex font-semibold text-red-500 m-2">
            <button
                onClick={handleCheckmark}
                className="w-64 font-semibold pl-4 flex items-center"
            >
                <div
                    className={`${
                        variant.quantity
                            ? "fas fa-check-square"
                            : "far fa-square"
                    } mr-4`}
                />
                {`${variant.variant} / $${variant.price}`}
            </button>
            <div className="flex">
                <div className="border-gray-300 p-1 flex items-center justify-center">
                    <button
                        onClick={() => setQuantity((e) => Math.max(e - 1, 0))}
                        className="fas fa-minus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs"
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(parseFloat(e.target.value))
                        }
                        className="rounded border text-black text-center p-2 w-14 h-8"
                    />
                    <button
                        onClick={() => setQuantity((e) => (e || 0) + 1)}
                        className="fas fa-plus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs"
                    />
                </div>
                <div
                    className={`${
                        variant.quantity ? "font-semibold" : "font-normal"
                    } flex w-32 items-center justify-end pr-4`}
                >
                    {`$${(variant.price * quantity || 0).toFixed(2)}`}
                </div>
            </div>
        </div>
    );
}
