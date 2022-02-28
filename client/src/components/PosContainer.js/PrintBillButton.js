/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { NotificationContext } from "../../context/Notification";
import { Modal } from "../Common/Modal";
import SpinLoader from "../SpinLoader";

function PrintBillButton({ children, order_id, className }) {
    const componentToPrint = useRef();
    const notify = useContext(NotificationContext);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({});

    const print = useReactToPrint({
        content: () => componentToPrint.current,
        bodyClass: "h-screen w-screen flex items-center justify-center",
    });

    const printTheBill = () => {
        setLoading(true);
        axios
            .get(`/app/orderById/${order_id}`)
            .then((res) => {
                if (res?.data[0]?.payment?.status === "Completed") {
                    setIsOpen(true);
                    setOrder(res.data[0]);
                } else notify("Please Complete The Payment First");
            })
            .catch((err) => console.log(err))
            .finally(setLoading(false));
    };

    useEffect(() => {
        print();
    }, [order]);

    return (
        <>
            <button
                onClick={() =>
                    order_id
                        ? printTheBill(true)
                        : notify("Please Generate KOT First")
                }
                className={className}
            >
                {children}
            </button>
            {loading && <SpinLoader className="fixed top-1/2 left-1/2" />}
            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                contentRef={(el) => (componentToPrint.current = el)}
                className="p-2 flex flex-col w-96 items-center relative bg-white"
            >
                <div className="text-2xl my-2">RESTAURANT</div>
                <div className="border-2 border-dotted h-0 w-full border-gray-700" />
                <div className="text-sm my-2 flex flex-col items-center">
                    <div>24/28, M.G Marg, Civil Lines,</div>
                    <div>Prayagraj 211001 (U.P.)</div>
                    <div>Email: info@restaurant</div>
                </div>
                <div className="border-b-2 my-3 relative border-dashed h-0 w-full border-gray-400">
                    <div className="px-3 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                        INVOICE
                    </div>
                </div>
                <div className="flex justify-between text-sm w-full mb-3">
                    <div className="flex flex-col items-start">
                        <div>Order ID: {order?.order_id}</div>
                        <div>
                            {order?.payment?.table
                                ? `Table: ${order?.payment?.table}`
                                : "Take Away"}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div>
                            Date: {new Date(order?.time).toLocaleDateString()}
                        </div>
                        <div>
                            Time: {new Date(order?.time).toLocaleTimeString()}
                        </div>
                    </div>
                </div>
                <div className="border-t border-dashed h-0 w-full border-gray-400" />
                <table className="w-full mb-2">
                    <tr className="font-normal grid grid-cols-6 mt-1 pb-1 border-b border-dashed w-full border-gray-400">
                        <th className="font-normal col-span-3 text-left">
                            ITEMS
                        </th>
                        <th className="font-normal text-center">QTY</th>
                        <th className="font-normal text-right">PRICE</th>
                        <th className="font-normal text-right">TOTAL</th>
                    </tr>
                    {order?.order?.map((item) => (
                        <tr key={item?._id} className="text-sm grid grid-cols-6">
                            <td className="col-span-3 text-left">
                                {item?.foodItem.toUpperCase()}
                            </td>
                            <td className="text-center">
                                {item?.quantity || 0}
                            </td>
                            <td className="text-right">
                                {(
                                    item?.price - (item?.discount || 0) || 0
                                ).toFixed(2)}
                            </td>
                            <td className="text-right">
                                {(item?.subtotal || 0).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </table>
                <div className="border-t my-1 border-dashed h-0 w-full border-gray-400" />
                <div className="border-t my-1 border-dashed h-0 w-full border-gray-400" />
                <div className=" flex w-full justify-between text-sm">
                    <div>SUBTOTAL</div>
                    <div>{`$ ${(order?.payment?.subTotal || 0).toFixed(
                        2
                    )}`}</div>
                </div>
                <div className=" flex w-full justify-between text-sm">
                    <div>GST</div>
                    <div>{`$ ${(order?.payment?.tax || 0).toFixed(2)}`}</div>
                </div>
                <div className="flex w-full justify-between text-sm">
                    <div>DISCOUNT</div>
                    <div>{`$ ${(order?.payment?.discount || 0).toFixed(
                        2
                    )}`}</div>
                </div>
                {order?.payment?.tip ? (
                    <div className="flex w-full justify-between text-sm">
                        <div>TIP</div>
                        <div>{`$ ${(order?.payment?.tip || 0).toFixed(
                            2
                        )}`}</div>
                    </div>
                ) : (
                    <></>
                )}
                <div className="flex w-full justify-between text-2xl font-medium">
                    <div>TOTAL</div>
                    <div>{`$ ${(order?.payment?.total || 0).toFixed(2)}`}</div>
                </div>
                <div className="border-t my-1 border-dashed h-0 w-full border-gray-400" />
                <div className="border-t my-1 border-dashed h-0 w-full border-gray-400" />
                <div className="border-2 border-dotted h-0 w-full border-gray-700" />
                <div className="my-4 w-full text-sm flex items-center justify-center">
                    <div className="leading-3">*</div>
                    <div className="mx-2 transform -translate-y-0.5">
                        Thank you for dining with us
                    </div>
                    <div className="leading-0">*</div>
                </div>
                <div className="border-2 border-dotted h-0 w-full mb-8 border-gray-700" />
            </Modal>
        </>
    );
}

export default PrintBillButton;
