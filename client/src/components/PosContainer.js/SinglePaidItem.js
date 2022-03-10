import React, { useState } from "react";

export default function SinglePaidItem({ item }) {
    const [showAmount, setShowAmount] = useState(false);
    return (
        <div className="border border-gray-300 border-l-0 border-t-0 flex">
            <div className="flex-1 flex items-center">
                <div className="fas fa-circle-check text-xl text-green p-2" />
                <div className="flex my-2 flex-col justify-center">
                    <div className="flex-1">{item?.foodItem}</div>
                    <div className="flex-1 flex flex-col items-start text-xxs text-blue-800 font-bold">
                        {item?.orderedVariant
                            ?.filter((v) => v?.quantity)
                            ?.map((variant) => (
                                <div
                                    key={variant._id}
                                >{`${variant?.quantity}x With ${variant?.variant} ($${variant?.price})`}</div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex">
                <div className="border-r border-l border-gray-300 w-32 p-1 flex items-center justify-center">
                    {item?.quantity}
                </div>
                <div className="flex items-center justify-center flex-1">
                    {showAmount ? (
                        <div className="text-green font-bold">
                            {`$${(
                                item?.price -
                                (item?.discount || 0) +
                                item?.orderedVariant?.reduce(
                                    (sum, v) =>
                                        sum +
                                        (v?.quantity || 0) * (v?.price || 0),
                                    0
                                )
                            ).toFixed(2)}`}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAmount(true)}
                            className="text-green font-bold"
                        >
                            Paid
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
