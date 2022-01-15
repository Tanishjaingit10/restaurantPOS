import React from "react";

function OrderCard({order}) {
    console.log(order)
    return (
        <div className="border-2 h-72 w-56 m-9 shadow" key={order._id}>
            <div className="w-full h-14 flex">
                <div className="w-1/2 border h-full flex flex-col items-center justify-center">
                    <div className="text-xs leading-3">Table</div>
                    <div className="leading-4 font-semibold">{order.payment.table}</div>
                </div>
                <button className="w-1/2 flex flex-col shadow-md z-20 items-center justify-center border h-full">
                    <div className="far fa-check-circle text-lg"></div>
                    <div className="text-xs leading-3">Food Ready</div>
                </button>
            </div>
            <div className="flex h-10">
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-white bg-gray-200">
                    <div className="text-xxs">K.O.T</div>
                    <div className="leading-4 font-medium">{order.order_id}</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-white bg-gray-200">
                    <div className="text-xxs">E.T.A.</div>
                    <div className="text-xs leading-3 font-medium">02:30</div>
                    <div className="text-xxs">MM:SS</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-white bg-gray-200">
                    <div className="text-xxs">Time Elapsed</div>
                    <div className="text-xs leading-3 font-medium">02:30</div>
                    <div className="text-xxs">MM:SS</div>
                </div>
            </div>

            <div>
                {
                    order.order.map(item=>(
                        <div className="border-b-2 h-6 flex justify-between">
                            <div className="ml-2 text-xs flex items-center">
                                <div className="mr-2">1</div>
                                <div className="">{item.foodItem}</div>
                            </div>
                            <button className="fas fa-toggle-on rotate-180 transform text-sm text-gray-400 mr-2"></button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default OrderCard;
