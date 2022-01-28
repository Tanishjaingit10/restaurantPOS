import React from "react";

function Split() {
    return (
        <div className="flex" style={{ height: "calc(100vh - 56px)" }}>
            <div className="h-full w-5/12">
                <div className="flex pt-2 flex-col">
                    <div className="flex flex-1 overflow-auto flex-col border-t-2 border-gray-300">
                        <div className="border-2 border-t-0 border-gray-300 h-32 flex-shrink-0"></div>
                        <div className="border-2 border-t-0 border-gray-300 h-32 flex-shrink-0"></div>
                        <div className="border-2 border-t-0 border-gray-300 h-32 flex-shrink-0"></div>
                    </div>
                </div>
                <div className="mt-auto py-8 flex items-center">
                    <div className="bg-lightred text-white w-full text-lg p-8 h-64">
                        <div className="flex justify-between p-2">
                            <div>Subtotal</div>
                            <div>23.25</div>
                        </div>
                        <div className="flex justify-between p-2">
                            <div>Tax</div>
                            <div>0.0</div>
                        </div>
                        <div className="flex justify-between p-2">
                            <div>Discount</div>
                            <div>10.00</div>
                        </div>
                        <div className="flex font-bold justify-between p-2">
                            <div>Total</div>
                            <div>14.00</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full w-7/12"></div>
        </div>
    );
}

export default Split;
