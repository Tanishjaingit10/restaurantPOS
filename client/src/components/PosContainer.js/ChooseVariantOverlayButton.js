import React, { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../context/Notification";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Utils";

function ChooseVariantOverlayButton({ item, children, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [variants, setVariants] = useState([
        {
            _id: Math.random(),
            variant: "Variant Option 1",
            price: 0.05,
            quantity: 0,
        },
        {
            _id: Math.random(),
            variant: "Variant Option 1",
            price: 0.05,
            quantity: 0,
        },
        {
            _id: Math.random(),
            variant: "Variant Option 1",
            price: 0.05,
            quantity: 0,
        },
    ]);

    const notify = useContext(NotificationContext);

    return (
        <>
            <button onClick={() => setIsOpen((prev) => !prev)} {...rest}>
                {children}
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="px-10 py-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    Choose Variant
                </div>
                <div className="mb-10">
                    {variants.map((item) => (
                        <div key={item._id}>
                            <SingleVariant
                                variant={item}
                                setVariants={setVariants}
                            />
                        </div>
                    ))}
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

export default ChooseVariantOverlayButton;

function SingleVariant({ variant, setVariants }) {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        console.log("rendered");
    }, []);

    useEffect(() => {
        setVariants((prev) => {
            for (let i = 0; i < prev.length; i++)
                if (prev[i]._id === variant._id) prev[i].quantity = quantity;
            return prev;
        });
        // eslint-disable-next-line
    }, [quantity]);

    return (
        <div className="flex font-semibold text-red m-2">
            <div className="w-64 pl-4 flex items-center">{`${variant.variant} / $${variant.price}`}</div>
            <div className="flex">
                <div className="border-gray-300 p-1 flex items-center justify-center">
                    <button
                        onClick={() => setQuantity((e) => Math.max(e - 1, 0))}
                        className="fas fa-minus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs"
                    />
                    <input
                        onChange={(e) =>
                            setQuantity(Math.max(e.target.value, 0))
                        }
                        type="text"
                        min={0}
                        value={quantity}
                        className="rounded border text-black text-center p-2 w-14 h-8"
                    />
                    <button
                        onClick={() => setQuantity((e) => e + 1)}
                        className="fas fa-plus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs"
                    />
                </div>
                <div className="flex w-32 items-center justify-end pr-4">
                    {`$${(variant.price*quantity).toFixed(2)}`}
                </div>
            </div>
        </div>
    );
}
