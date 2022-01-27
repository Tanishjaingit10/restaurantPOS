/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// import Countdown from "react-countdown";
// import Loader from "./Loader";
// import Popup from "./Popup";
// import { useDebounce, useDebouncedCallback } from "use-debounce";
import CustomNavBar from "./Common/CustomNavBar";
import { ThemeContext } from "../context/Theme";
import OrderCard from "./Kitchen/OrderCard";
import { NotificationContext } from "../context/Notification";
import SpinLoader from "./SpinLoader";

// let arr = new Array(1000000).fill(false);
// let stat = new Array(1000000).fill(false);
// let len = 0;
const Kitchen = () => {
    // const [orders, setOrders] = useState();
    // const [loading, setLoading] = useState(true);
    // const [open, setOpen] = useState(false);
    // const [rows, setRows] = useState(false);
    // const getOrders = async () => {
    //     await fetch("/app/orders")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json !== "undefined") {
    //                 len = json.length;
    //                 console.log("json=>", json);
    //                 setOrders(
    //                     json.slice(0, rows ? len : 4).map((option, index) => {
    //                         setLoading(false);
    //                         var date = new Date(option.time);
    //                         arr[index] = date.getTime();
    //                         return (
    //                             <tr className="font-medium">
    //                                 <td className="bg-secondary py-2 text-center border-2">
    //                                     {option.order_id}
    //                                 </td>
    //                                 <td className="bg-secondary py-2 text-center border-2">
    //                                     {option.payment.orderType}
    //                                 </td>
    //                                 <td className="bg-secondary py-2 text-center border-2">
    //                                     {option.payment.table}
    //                                 </td>
    //                                 <td className="bg-secondary py-2 text-center border-2">
    //                                     {
    //                                         option.time
    //                                             .toLocaleString()
    //                                             .split("T")[1]
    //                                             .split(".")[0]
    //                                     }
    //                                 </td>
    //                                 <td className="bg-secondary py-2 text-center border-2">
    //                                     <Countdown
    //                                         onComplete={() =>
    //                                             showStatus(option, index)
    //                                         }
    //                                         date={
    //                                             arr[index] +
    //                                             option.payment.timeToCook *
    //                                                 60000
    //                                         }
    //                                         renderer={renderer}
    //                                     />
    //                                 </td>
    //                                 <td className="bg-secondary py-2 text-center">
    //                                     {stat[index]
    //                                         ? "Ready to serve"
    //                                         : option.payment.orderStatus}
    //                                 </td>
    //                             </tr>
    //                         );
    //                     })
    //                 );
    //             }
    //         })
    //         .catch((err) => {
    //             setLoading(false);
    //             console.log("1", err);
    //             setOpen(!open);
    //         });
    // };
    // const showMore = (e) => {
    //     setLoading(true);

    //     setRows(!rows);
    // };
    // useEffect(() => {
    //     getOrders();
    // }, [rows]);

    // const showStatus = async (option, index) => {
    //     const { customer, order, payment, time, order_id } = option;
    //     payment.orderStatus = "Ready to Serve";
    //     stat[index] = true;
    //     await fetch(`/app/updateOrder/${option._id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             customer,
    //             order,
    //             payment,
    //             time,
    //             order_id,
    //         }),
    //     });
    // };
    // const renderer = ({ hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //         // Render a completed state
    //         return <span>Time Over</span>;
    //     } else {
    //         // Render a countdown
    //         return (
    //             <span>
    //                 {hours}:{minutes}:{seconds}
    //             </span>
    //         );
    //     }
    // };

    const theme = useContext(ThemeContext);
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const notify = useContext(NotificationContext);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/app/orders")
            .then((res) => setOrders(res.data))
            .catch((err) => notify(err?.response?.data?.message || "Error!!"))
            .finally(() => setLoading(false));
    }, []);

    const handleRefresh = async () => {
        setRefreshLoading(true);
        axios
            .get("/app/orders")
            .then((res) => {
                notify("Orders Updated");
                setOrders(res.data);
            })
            .catch((err) => notify(err?.response?.data?.message || "Error !!"))
            .finally(() => setRefreshLoading(false));
    };

    return (
        <>
            <div className="flex flex-col">
                {loading && <SpinLoader className="fixed top-1/2 right-1/2" />}
                <div className="flex h-24 items-center justify-between border-b-2 border-gray-300">
                    <p className="text-2xl text-gray-500 ml-6 font-bold ">
                        Kitchen Dashboard
                    </p>
                    <button
                        onClick={handleRefresh}
                        className="bg-red mr-6 p-4 leading-4 text-white rounded-md"
                        style={{ backgroundColor: theme.backgroundColor }}
                    >
                        <div
                            className={`${
                                refreshLoading && "animate-spin"
                            } rounded-full fas fa-sync-alt`}
                        />
                    </button>
                </div>
                <div className="grid grid-cols-5 items-center justify-center">
                    {orders.map((item) => (
                        <OrderCard item={item} />
                    ))}
                </div>
            </div>

            {/* <div className="h-screen justify-items-conter overflow-hidden">
                <CustomNavBar />
                <div className="flex flex-col h-screen">
                    <div className="h-3/4 overflow-y-scroll">
                        <table className="w-full">
                            <thead>
                                <tr className="">
                                    <th className="p-2 border-2 bg-lightprimary">
                                        Order Id#
                                    </th>
                                    <th className="p-2 border-2 bg-lightprimary">
                                        Order Type
                                    </th>
                                    <th className="p-2 border-2 bg-lightprimary">
                                        Table No.
                                    </th>
                                    <th className="p-2 border-2 bg-lightprimary">
                                        Order Time
                                    </th>
                                    <th className="p-2 border-2 bg-lightprimary">
                                        Remaining Time
                                    </th>
                                    <th className="p-2 border-2 bg-lightprimary">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{loading ? <Loader /> : orders}</tbody>
                        </table>
                    </div>
                    <button
                        className="bg-green w-96 mx-auto py-4 text-lg font-roboto font-semibold text-white"
                        onClick={showMore}
                    >
                        {rows ? "Show Less" : "Show More"}
                    </button>
                </div>
                {open && (
                    <Popup
                        content={
                            <>
                                <p className="pb-4 font-bold text-green">
                                    Unable to Load Server
                                </p>
                                <button
                                    className="bg-primary px-10 py-2"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    Try Again
                                </button>
                            </>
                        }
                        handleClose={() => {
                            setOpen(false);
                        }}
                    />
                )}
            </div> */}
        </>
    );
};

export default Kitchen;
