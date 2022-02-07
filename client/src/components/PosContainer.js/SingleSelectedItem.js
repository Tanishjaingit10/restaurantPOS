/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ChooseVariantOverlayButton from "./Overlay/ChooseVariantOverlayButton";

function SingleSelectedItem({ item, setSelectedItems }) {
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(()=>{
        if(item.quantity!==0)
        setQuantity(item.quantity)
    },[item.quantity])

    useEffect(() => {
        setSelectedItems((prev) => {
            prev = prev.map((itm) => {
                if (itm === item) itm.quantity = quantity || 0;
                return itm;
            });
            return prev;
        });
    }, [quantity]);

    const itemPrice =
        (item.finalVariant.reduce(
            (sum, variant) =>
                sum +
                (variant.isSelected ? variant.price * variant.quantity : 0),
            0
        ) +
            item.price-(item.discount||0)) *
        quantity;

    return (
        <div className="border border-gray-300 border-l-0 border-t-0 flex">
            <div className="flex-1 flex items-center">
                <button
                    onClick={() =>
                        setSelectedItems((prev) => {
                            return prev.filter((it) => it !== item);
                        })
                    }
                    className="fas fa-times-circle text-xl text-red p-2"
                />
                <ChooseVariantOverlayButton
                    item={item}
                    setSelectedItems={setSelectedItems}
                    className="flex my-2 flex-col justify-center"
                >
                    <div className="flex-1">{item.foodItem}</div>
                    <div className="flex-1 text-xxs text-blue font-bold">
                        {item.finalVariant.map((variant) => {
                            if (variant.isSelected && variant.quantity)
                                return `${variant.quantity}x With ${variant.variant} ($${variant.price})`;
                            return "";
                        })}
                    </div>
                </ChooseVariantOverlayButton>
            </div>
            <div className="flex-1 flex">
                <div className="border-r border-l border-gray-300 p-1 flex items-center justify-center">
                    <button
                        disabled={quantity===0}
                        onClick={() => setQuantity((e) => Math.max(e - 1, 1))}
                        className="fas fa-minus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs"
                    />
                    <input
                        type="number"
                        value={quantity}
                        onBlur={()=>setQuantity(quantity||1)}
                        onChange={(e) =>
                            setQuantity(parseFloat(e.target.value))
                        }
                        className="rounded text-center shadow-inner p-2 w-14 h-8"
                    />
                    <button
                        onClick={() => setQuantity((e) => (e || 0) + 1)}
                        className="fas fa-plus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs"
                    />
                </div>
                <div className="flex items-center justify-center flex-1">
                    ${(itemPrice || 0).toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default SingleSelectedItem;
