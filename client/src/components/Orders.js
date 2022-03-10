/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Popup from "./Popup";
import { ThemeContext } from "../context/Theme";
import CustomButton from "./Common/CustomButton";
import Select from "react-select";
import { FiRefreshCcw } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";
import { materialTheme } from "../styles/clockMaterialTheme";
import { GrClose } from "react-icons/gr";
import CustomTable from "./Common/CustomTable";
import CustomPagination from "./Common/CustomPagination";
import { DownloadTable, PrintTable } from "./Common/download_print";
import OrderDetailComponent from "./Common/orderDetail";
import SpinLoader from "./SpinLoader";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [reload, setReload] = useState(false);
    const [filterOrderStartDate, setFilterOrderStartDate] = useState(
        new Date()
    );
    const [filterOrderStopDate, setFilterOrderStopDate] = useState(new Date());
    const [selectOrderFilter, setSelectOrderFilter] = useState(false);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [cancelledOrders, setCancelledOrders] = useState(0);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [orderDetails, setOrderDetails] = useState({});
    const [ordersToShow, setOrdersToShow] = useState([]);
    const [includeDineIn, setIncludeDineIn] = useState(true);
    const [includeTakeAway, setIncludeTakeAway] = useState(true);
    const theme = useContext(ThemeContext);
    const printTable = useRef();
    const printOrderDetails = useRef();

    useEffect(() => {
        axios
            .get("/app/orders")
            .then((res) => {
                if (res.data) {
                    setOrders(res.data);
                    setLoading(false);

                    var completedOrders = 0;
                    var pendingOrders = 0;
                    var cancelledOrders = 0;
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].payment.orderStatus === "Completed")
                            completedOrders += 1;
                        else if (
                            res.data[i].payment.orderStatus === "Processing" ||
                            res.data[i].payment.orderStatus === "ReadyToServe"
                        )
                            pendingOrders += 1;
                        else if (
                            res.data[i].payment.orderStatus === "Cancelled"
                        )
                            cancelledOrders += 1;
                    }
                    setCompletedOrders(completedOrders);
                    setPendingOrders(pendingOrders);
                    setCancelledOrders(cancelledOrders);
                }
            })
            .catch((err) => console.log("error: ", err))
            .finally(() => setLoading(false));
    }, [reload]);

    const getOrdersByInvoices = (invoices) => {
        setLoading(true);
        axios
            .get(`/app/orderById/${invoices}`)
            .then((res) => {
                if (res.data) setOrders(res.data);
            })
            .catch((err) => console.log("error: ", err))
            .finally(() => setLoading(false));
    };

    const getOrderByStatus = (status) => {
        setLoading(true);
        if (status === "Processing") {
            axios
                .get(`/app/orderByStatus/Processing`)
                .then((res) => {
                    if (res.data) setOrders(res.data);
                })
                .then(() => axios.get(`/app/orderByStatus/ReadyToServe`))
                .then((res) => {
                    if (res.data) setOrders((prev) => [...prev, ...res.data]);
                })
                .catch((err) => console.log("error: ", err))
                .finally(() => setLoading(false));
        } else if (status !== "allOrders") {
            axios
                .get(`/app/orderByStatus/${status}`)
                .then((res) => {
                    if (res.data) setOrders(res.data);
                })
                .catch((err) => console.log("error: ", err))
                .finally(() => setLoading(false));
        } else setReload(!reload);
    };

    const getOrderByDate = (startDate, endDate) => {
        setLoading(true);
        axios
            .get(`/app/orderByDate/${startDate}/${endDate}`)
            .then((res) => {
                if (res.data) setOrders(res.data);
            })
            .catch((err) => console.log("eror: ", err))
            .finally(() => setLoading(false));
    };

    const filteredByOrderType = () => {
        return orders?.filter(
            (or) =>
                (includeDineIn && or?.payment?.orderType === "Dine In") ||
                (includeTakeAway && or?.payment?.orderType === "Take Away")
        );
    };

    useEffect(() => {
        setPageNumber(1);
        setPageLimit(10);
        setOrdersToShow(filteredByOrderType(orders).slice(0, pageLimit));
    }, [orders, includeDineIn, includeTakeAway]);

    useEffect(() => {
        const start = (pageNumber - 1) * pageLimit;
        setOrdersToShow(
            filteredByOrderType(orders).slice(start, start + pageLimit)
        );
    }, [pageNumber, pageLimit, includeDineIn, includeTakeAway]);

    const options = [
        { value: 1, label: "1" },
        { value: 10, label: "10" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
        { value: 200, label: "200" },
    ];

    return (
        <div>
            {loading && <SpinLoader className="fixed top-1/2 right-1/2" />}
            <div className="flex flex-col w-full">
                <div className="overflow-x-auto">
                    <div className="flex h-24 bg-white items-center justify-between border-b-2 border-gray-300">
                        <p className="text-2xl text-gray-500 ml-6 font-bold">
                            Orders Report
                        </p>
                        <div className="inline-block mx-5 rounded w-1/4">
                            <input
                                onChange={(value) => {
                                    if (value.target.value?.length >= 7)
                                        getOrdersByInvoices(value.target.value);
                                    if (value.target.value?.length === 0)
                                        setReload(!reload);
                                }}
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Search for sale: order id"
                            />
                            <GoSearch
                                size={25}
                                className="absolute inline-block mt-4 -ml-8"
                                color="#a5a5a5d1"
                            />
                        </div>
                        <div className="flex flex-row items-center">
                            <button
                                onClick={() => setSelectOrderFilter(true)}
                                className="font-medium bg-red-500 mr-6 py-4 px-6 text-white rounded-md leading-4"
                            >
                                Select Date Range
                            </button>
                            <button
                                onClick={() => {
                                    getOrderByDate(
                                        new Date(
                                            new Date().setDate(
                                                new Date().getDate() - 1
                                            )
                                        )
                                            .toLocaleDateString("pt-br")
                                            .split("/")
                                            .reverse()
                                            .join("-"),
                                        new Date(
                                            new Date().setDate(
                                                new Date().getDate() - 1
                                            )
                                        )
                                            .toLocaleDateString("pt-br")
                                            .split("/")
                                            .reverse()
                                            .join("-")
                                    );
                                }}
                                className="font-medium bg-red-500 mr-6 py-4 px-6 text-white rounded-md leading-4"
                            >
                                Yesterday Orders
                            </button>
                            <button
                                onClick={() => {
                                    getOrderByDate(
                                        new Date()
                                            .toLocaleDateString("pt-br")
                                            .split("/")
                                            .reverse()
                                            .join("-"),
                                        new Date()
                                            .toLocaleDateString("pt-br")
                                            .split("/")
                                            .reverse()
                                            .join("-")
                                    );
                                }}
                                className="font-medium bg-red-500 mr-6 py-4 px-6 text-white rounded-md leading-4"
                            >
                                Today Orders
                            </button>
                        </div>
                    </div>
                    <div className="align-middle inline-block min-w-full px-5">
                        <div className="flex flex-col h-full shadow border-t border-gray-200 sm:rounded-lg mt-8">
                            <div className="flex flex-row justify-between">
                                <div className="my-4">
                                    <h1 className="text-lg inline-block ml-8">
                                        Display
                                    </h1>
                                    <div
                                        style={{ width: "150px" }}
                                        className="inline-block mx-5 rounded"
                                    >
                                        <Select
                                            defaultValue={options[0]}
                                            options={options}
                                            onChange={(value) =>
                                                setPageLimit(value.value)
                                            }
                                        />
                                    </div>
                                    <h1 className="text-lg inline-block">
                                        Records
                                    </h1>
                                </div>
                                <div className="my-4">
                                    <div className="flex flex-row items-center justify-end">
                                        <div className="flex flex-col items-center gap-2">
                                            <div
                                                onChange={(event) => {
                                                    getOrderByStatus(
                                                        event.target.value
                                                    );
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    value="Processing"
                                                    name="orderStatus"
                                                    className="ml-5 mr-3"
                                                />
                                                <span className="text-red-500">
                                                    Pending
                                                </span>
                                                <input
                                                    type="radio"
                                                    value="Completed"
                                                    name="orderStatus"
                                                    className="ml-5 mr-3"
                                                />
                                                <span className="text-green">
                                                    Completed
                                                </span>
                                                <input
                                                    type="radio"
                                                    value="Cancelled"
                                                    name="orderStatus"
                                                    className="ml-5 mr-3"
                                                />
                                                <span className="text-yellow">
                                                    Cancelled
                                                </span>
                                                <input
                                                    type="radio"
                                                    value="allOrders"
                                                    name="orderStatus"
                                                    className="ml-5 mr-3"
                                                    defaultChecked
                                                />
                                                <span className="text-red-500 mr-5">
                                                    All Orders
                                                </span>
                                            </div>
                                            <div className="flex text-red-500 justify-center items-center">
                                                <button
                                                    onClick={() =>
                                                        setIncludeDineIn(
                                                            (e) => !e
                                                        )
                                                    }
                                                    className="mx-2 font-semibold"
                                                >
                                                    <span
                                                        className={`${
                                                            includeDineIn
                                                                ? "fas fa-check-square"
                                                                : "far fa-square"
                                                        } mr-2`}
                                                    />
                                                    Dine In
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setIncludeTakeAway(
                                                            (e) => !e
                                                        )
                                                    }
                                                    className="mx-2 font-semibold"
                                                >
                                                    <span
                                                        className={`${
                                                            includeTakeAway
                                                                ? "fas fa-check-square"
                                                                : "far fa-square"
                                                        } mr-2`}
                                                    />
                                                    Take Away
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-end">
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        theme.backgroundColor,
                                                }}
                                                className="text-white py-2 px-2 rounded-md mx-2 shadow-md"
                                            >
                                                <i
                                                    onClick={() => {
                                                        setReload(!reload);
                                                        setLoading(true);
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <FiRefreshCcw size={22} />
                                                </i>
                                            </div>
                                            <PrintTable
                                                printTableRef={printTable}
                                            />

                                            <DownloadTable
                                                fileName="Orders"
                                                tableId="DownloadTable"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table
                                id="DownloadTable"
                                style={{ display: "none" }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking-wider border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Order ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Sale Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((order) => {
                                        return (
                                            <tr
                                                key={order._id}
                                                className="font-medium "
                                            >
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {new Date(order.time)
                                                            .toLocaleDateString(
                                                                "pt-br"
                                                            )
                                                            .split("/")
                                                            .reverse()
                                                            .join("-")}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {order?.order_id}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {
                                                            order?.payment
                                                                ?.orderType
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        $
                                                        {order?.payment?.total?.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {
                                                            order?.payment
                                                                ?.orderStatus
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <CustomButton
                                                        title="View Order"
                                                        customStyle={{
                                                            backgroundColor:
                                                                theme.backgroundColor,
                                                        }}
                                                        onPress={() => {
                                                            setShowOrderDetails(
                                                                true
                                                            );
                                                            setOrderDetails(
                                                                order
                                                            );
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div ref={printTable}>
                                <CustomTable>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking-wider border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Order ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Sale Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>

                                    {ordersToShow?.length > 0 ? (
                                        ordersToShow?.map((order) => {
                                            return (
                                                <tr
                                                    key={order._id}
                                                    className="font-medium "
                                                >
                                                    <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {new Date(
                                                                order.time
                                                            )
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-")}
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {order.order_id}
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {
                                                                order?.payment
                                                                    ?.orderType
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            $
                                                            {order?.payment?.total?.toFixed(
                                                                2
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {
                                                                order?.payment
                                                                    ?.orderStatus
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                        <CustomButton
                                                            title="View Order"
                                                            customStyle={{
                                                                backgroundColor:
                                                                    theme.backgroundColor,
                                                            }}
                                                            onPress={() => {
                                                                setShowOrderDetails(
                                                                    true
                                                                );
                                                                setOrderDetails(
                                                                    order
                                                                );
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6">
                                                <div className="flex justify-center w-100 my-5">
                                                    <h5
                                                        className="text-xl font-semibold"
                                                        style={{
                                                            color: theme.backgroundColor,
                                                        }}
                                                    >
                                                        No Data Found
                                                    </h5>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </CustomTable>
                            </div>
                        </div>
                        <div className="flex flex-row items-end justify-between my-8">
                            <div>
                                <div className="text-base text-gray-500 font-semibold">
                                    Completed Orders: {completedOrders}
                                </div>
                                <div className="text-base text-gray-500 font-semibold">
                                    Pending: {pendingOrders}
                                </div>
                                <div className="text-base text-gray-500 font-semibold">
                                    Cancelled: {cancelledOrders}
                                </div>
                            </div>
                            <CustomPagination
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                                length={filteredByOrderType(orders)?.length}
                                pageLimit={pageLimit}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {open && (
                <Popup
                    content={
                        <>
                            <p className="pb-4 font-bold text-green">
                                Unable to Load Server
                            </p>
                            <button
                                className="px-10 py-2 rounded"
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                }}
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
            {selectOrderFilter && (
                <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-8 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                            style={{
                                backgroundColor: "rgb(226 226 226 / 20%)",
                            }}
                        ></div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className="w-full flex justify-end">
                                        <GrClose
                                            onClick={() =>
                                                setSelectOrderFilter(false)
                                            }
                                        />
                                    </div>
                                    <div className="w-full flex items-center justify-center"></div>
                                </div>
                                <div className="p-5">
                                    <div className="my-5 w-full">
                                        <MuiPickersUtilsProvider
                                            utils={MomentUtils}
                                        >
                                            <ThemeProvider
                                                theme={materialTheme}
                                            >
                                                <DatePicker
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    label="Start Date"
                                                    value={filterOrderStartDate}
                                                    onChange={(date) => {
                                                        setFilterOrderStartDate(
                                                            new Date(date)
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-")
                                                        );
                                                        getOrderByDate(
                                                            new Date(date)
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-"),
                                                            new Date(
                                                                filterOrderStopDate
                                                            )
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-")
                                                        );
                                                    }}
                                                />
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="my-5 w-full">
                                        <MuiPickersUtilsProvider
                                            utils={MomentUtils}
                                        >
                                            <ThemeProvider
                                                theme={materialTheme}
                                            >
                                                <DatePicker
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    label="End Date"
                                                    value={filterOrderStopDate}
                                                    onChange={(date) => {
                                                        setFilterOrderStopDate(
                                                            new Date(date)
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-")
                                                        );
                                                        getOrderByDate(
                                                            filterOrderStartDate,
                                                            new Date(date)
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-")
                                                        );
                                                    }}
                                                />
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showOrderDetails ? (
                <div className="popup-box" ref={printOrderDetails}>
                    <OrderDetailComponent
                        orderDetails={orderDetails}
                        setShowOrderDetails={setShowOrderDetails}
                        setShowComments={setShowComments}
                    />
                </div>
            ) : null}
            {showComments ? (
                <Popup
                    content={
                        <>
                            <p
                                className="pb-4 font-bold text-xl"
                                style={{ color: theme.backgroundColor }}
                            >
                                Comments
                            </p>
                            <p className="text-gray-500 mb-16">
                                {orderDetails?.comments
                                    ? orderDetails?.comments
                                    : "No comments from customer"}
                            </p>
                            <button
                                className="px-10 py-2 rounded"
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                }}
                                onClick={() => {
                                    setShowComments(false);
                                }}
                            >
                                Done
                            </button>
                        </>
                    }
                    handleClose={() => {
                        setShowComments(false);
                    }}
                />
            ) : null}
        </div>
    );
};

export default Orders;
