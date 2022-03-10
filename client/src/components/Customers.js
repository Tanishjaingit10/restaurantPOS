/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from "react";
import Loader from "./Loader";
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
import Popup from "./Popup";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [componentLoading, setComponentLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [selectOrderFilter, setSelectOrderFilter] = useState(false);
    const [filterOrderStartDate, setFilterOrderStartDate] = useState(
        new Date()
    );
    const [filterOrderStopDate, setFilterOrderStopDate] = useState(new Date());
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [orderDetails, setOrderDetails] = useState({});
    const [customersToShow, setCustomersToShow] = useState([]);
    const theme = useContext(ThemeContext);
    const printTable = useRef();
    const printOrderDetails = useRef();

    useEffect(() => {
        fetch("/app/customers")
            .then((res) => res.json())
            .then((json) => {
                if (json !== "undefined") setCustomers(json);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setLoading(false);
                setComponentLoading(false);
            });
    }, [reload]);

    const options = [
        { value: 10, label: "10" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
        { value: 200, label: "200" },
    ];

    const getCustomerByValue = (value) => {
        setComponentLoading(true);
        fetch(`/app/getCustomerByValue/${value}`)
            .then((res) => res.json())
            .then((json) => setCustomers(json))
            .catch((err) => console.log(err))
            .finally(() => setComponentLoading(false));
    };

    const getDayCustomers = (startDate, endDate) => {
        setLoading(true);
        fetch(`/app/getCustomerByDate/${startDate}/${endDate}`)
            .then((res) => res.json())
            .then((json) => setCustomers(json))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const getOrderById = (id) => {
        setComponentLoading(true);
        fetch(`/app/orderById/${id}`)
            .then((response) => response.json())
            .then((json) => {
                if (json !== undefined && json.length > 0)
                    setOrderDetails(json[0]);
                setShowOrderDetails(true);
            })
            .catch((err) => console.log(err))
            .finally(() => setComponentLoading(false));
    };

    useEffect(() => {
        setPageNumber(1);
        setPageLimit(10);
        setCustomersToShow(customers.slice(0, pageLimit));
    }, [customers]);

    useEffect(() => {
        const start = (pageNumber - 1) * pageLimit;
        setCustomersToShow(customers.slice(start, start + pageLimit));
    }, [pageNumber, pageLimit]);

    return (
        <div>
            {componentLoading ? <Loader /> : null}
            <div className="flex flex-col w-full">
                <div className="overflow-x-auto">
                    <div className="flex h-24 bg-white items-center justify-between border-b-2 border-gray-300 px-6">
                        <div className="w-1/2 flex items-center justify-between">
                            <p className="text-2xl text-gray-500 font-bold">
                                Customers
                            </p>
                            <div className="w-96 mx-5 rounded relative">
                                <input
                                    onChange={(value) => {
                                        if (value.target.value.length > 0)
                                            getCustomerByValue(
                                                value.target.value
                                            );
                                        if (value.target.value.length === 0)
                                            setReload(!reload);
                                    }}
                                    className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Search for customer name/ phone/ email."
                                />
                                <GoSearch
                                    size={25}
                                    className="absolute inline-block mt-4 -ml-8"
                                    color="#a5a5a5d1"
                                />
                            </div>
                        </div>
                        <div className="inline-block w-1/2">
                            <div className="flex flex-row items-center justify-end">
                                <button
                                    onClick={() => setSelectOrderFilter(true)}
                                    className="font-medium bg-red-500 mr-6 py-4 px-6 text-white rounded-md leading-4"
                                >
                                    Select Date
                                </button>
                                {selectOrderFilter ? (
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
                                                    backgroundColor:
                                                        "rgb(226 226 226 / 20%)",
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
                                                                    setSelectOrderFilter(
                                                                        false
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="w-full flex items-center justify-center"></div>
                                                    </div>
                                                    <div className="p-5">
                                                        <div className="my-5 w-full">
                                                            <MuiPickersUtilsProvider
                                                                utils={
                                                                    MomentUtils
                                                                }
                                                            >
                                                                <ThemeProvider
                                                                    theme={
                                                                        materialTheme
                                                                    }
                                                                >
                                                                    <DatePicker
                                                                        InputProps={{
                                                                            disableUnderline: true,
                                                                        }}
                                                                        label="Start Date"
                                                                        value={
                                                                            filterOrderStartDate
                                                                        }
                                                                        onChange={(
                                                                            date
                                                                        ) => {
                                                                            setFilterOrderStartDate(
                                                                                new Date(
                                                                                    date
                                                                                )
                                                                                    .toLocaleDateString(
                                                                                        "pt-br"
                                                                                    )
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .reverse()
                                                                                    .join(
                                                                                        "-"
                                                                                    )
                                                                            );
                                                                            getDayCustomers(
                                                                                new Date(
                                                                                    date
                                                                                )
                                                                                    .toLocaleDateString(
                                                                                        "pt-br"
                                                                                    )
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .reverse()
                                                                                    .join(
                                                                                        "-"
                                                                                    ),
                                                                                new Date(
                                                                                    filterOrderStopDate
                                                                                )
                                                                                    .toLocaleDateString(
                                                                                        "pt-br"
                                                                                    )
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .reverse()
                                                                                    .join(
                                                                                        "-"
                                                                                    )
                                                                            );
                                                                        }}
                                                                    />
                                                                </ThemeProvider>
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                        <div className="my-5 w-full">
                                                            <MuiPickersUtilsProvider
                                                                utils={
                                                                    MomentUtils
                                                                }
                                                            >
                                                                <ThemeProvider
                                                                    theme={
                                                                        materialTheme
                                                                    }
                                                                >
                                                                    <DatePicker
                                                                        InputProps={{
                                                                            disableUnderline: true,
                                                                        }}
                                                                        label="End Date"
                                                                        value={
                                                                            filterOrderStopDate
                                                                        }
                                                                        onChange={(
                                                                            date
                                                                        ) => {
                                                                            setFilterOrderStopDate(
                                                                                new Date(
                                                                                    date
                                                                                )
                                                                                    .toLocaleDateString(
                                                                                        "pt-br"
                                                                                    )
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .reverse()
                                                                                    .join(
                                                                                        "-"
                                                                                    )
                                                                            );
                                                                            getDayCustomers(
                                                                                filterOrderStartDate,
                                                                                new Date(
                                                                                    date
                                                                                )
                                                                                    .toLocaleDateString(
                                                                                        "pt-br"
                                                                                    )
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .reverse()
                                                                                    .join(
                                                                                        "-"
                                                                                    )
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
                                ) : null}
                                <button
                                    onClick={() =>
                                        getDayCustomers(
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
                                        )
                                    }
                                    className="font-medium bg-red-500 mr-6 py-4 px-6 text-white rounded-md leading-4"
                                >
                                    Yesterday
                                </button>
                                <button
                                    onClick={() =>
                                        getDayCustomers(
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
                                        )
                                    }
                                    className="font-medium bg-red-500 mr-6 py-4 px-6 text-white rounded-md leading-4"
                                >
                                    Today
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="align-middle inline-block min-w-full px-5">
                        <div className="shadow overflow-hidden border-t border-gray-200 sm:rounded-lg mt-8">
                            <div className="inline-block w-1/2 my-4">
                                <h1 className="text-lg inline-block ml-8">
                                    Display
                                </h1>
                                <div
                                    style={{ width: "150px" }}
                                    className="inline-block mx-5 rounded"
                                >
                                    <Select
                                        defaultValue={pageLimit}
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
                            <div className="inline-block w-1/2 my-4">
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
                                                setComponentLoading(true);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <FiRefreshCcw size={22} />
                                        </i>
                                    </div>
                                    <PrintTable printTableRef={printTable} />
                                    <DownloadTable
                                        fileName="Reservations"
                                        tableId="DownloadTable"
                                    />
                                </div>
                            </div>

                            <div className="print-source">
                                <CustomTable id="DownloadTable">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Customer Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Email Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Orders
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Paid
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        customers
                                            .slice(
                                                (pageNumber - 1) * pageLimit,
                                                (pageNumber - 1) * pageLimit +
                                                    pageLimit
                                            )
                                            .map((customer) => {
                                                return (
                                                    <tr>
                                                        <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    customer.date.split(
                                                                        "T"
                                                                    )[0]
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {customer.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    customer.contact
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {customer.email}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    customer.num_orders
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {customer.total_amount_spent?.toFixed(
                                                                    2
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <CustomButton
                                                                title="View Order"
                                                                customStyle={{
                                                                    backgroundColor:
                                                                        theme.backgroundColor,
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                    )}
                                </CustomTable>
                            </div>

                            <div ref={printTable}>
                                <CustomTable>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Customer Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Email Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Orders
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Paid
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                    {loading ? (
                                        <Loader />
                                    ) : customersToShow.length > 0 ? (
                                        customersToShow.map((customer) => {
                                            return (
                                                <tr>
                                                    <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {
                                                                customer.date.split(
                                                                    "T"
                                                                )[0]
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {customer.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {customer.contact}
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {customer.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {
                                                                customer.num_orders
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {
                                                                customer.total_amount_spent
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
                                                                getOrderById(
                                                                    customer.order_id
                                                                );
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colspan="7">
                                                <div className="flex justify-center w-100 mt-5">
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
                            <CustomPagination
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                                length={customers.length}
                                pageLimit={pageLimit}
                            />
                        </div>
                    </div>
                </div>
            </div>

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
                                {orderDetails.comments
                                    ? orderDetails.comments
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

export default Customers;
