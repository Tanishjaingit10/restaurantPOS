/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import SpinLoader from "./SpinLoader";
import CustomButton from "./Common/CustomButton";
import { ThemeContext } from "../context/Theme";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { GoSearch } from "react-icons/go";
import Select from "react-select";
import { FiRefreshCcw } from "react-icons/fi";
import { materialTheme } from "../styles/clockMaterialTheme";
import CustomTable from "./Common/CustomTable";
import CustomPagination from "./Common/CustomPagination";
import { DownloadTable, PrintTable } from "./Common/download_print";
import { Modal } from "./Common/Modal";
import { formatDate, timeToDate } from "../Utils";
import { NotificationContext } from "../context/Notification";

const AllReservations = () => {
    const [allReservations, setAllReservations] = useState([]);
    const [editReservationModal, setEditReservationModal] = useState(false);
    const [editReservSuccess, setEditReservationSuccess] = useState(false);
    const [warnDeleteReserve, setWarnDeleteReserve] = useState(false);
    const [deleteReservSuccess, setDeleteReservSuccess] = useState(false);
    const [availableTables, setAvailableTables] = useState([]);
    const [allTables, setAllTables] = useState([]);
    const [showDate, setShowDate] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const date = formatDate(selectedDate).split(" ")[0];
    const startTime = formatDate(selectedStartTime).split(" ")[1];
    const endTime = formatDate(selectedEndTime).split(" ")[1];
    const [fullName, setFullName] = useState("");
    const [email_id, setEmail_id] = useState("");
    const [contact, setContact] = useState("");
    const [table, setTable] = useState("");
    const [itemId, setItemId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [reload, setReload] = useState(false);
    const [onPrint, setOnPrint] = useState("");
    const [reservationsToShow, setReservationsToShow] = useState([]);
    const theme = useContext(ThemeContext);
    const notify = useContext(NotificationContext);
    const [dateFilter, setDateFilter] = useState(null);

    const printTable = useRef();

    const setReservationStates = (reservation) => {
        setSelectedDate(new Date(reservation?.date));
        setSelectedStartTime(timeToDate(reservation?.start_time));
        setSelectedEndTime(timeToDate(reservation?.end_time));
        setFullName(reservation?.fullName);
        setEmail_id(reservation?.email_id);
        setContact(reservation?.contact);
        setTable(reservation?.table);
        setItemId(reservation?._id);
    };

    useEffect(() => {
        axios
            .get("/app/allReservations")
            .then((res) => setAllReservations(res.data))
            .catch((err) =>
                notify(
                    err?.response?.data?.message ||
                        "Unable to fetch reservations"
                )
            )
            .finally(() => {
                setLoading(false);
            });
        axios
            .get(`/app/table`)
            .then((res) => {
                var tables = [];
                for (var i = 0; i < res.data?.length; i++) {
                    tables.push(res.data[i].number);
                }
                setAllTables(tables);
            })
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to fetch tables")
            )
            .finally(() => setLoading(false));
    }, [reload]);

    const getReservationByTime = (date, startTime, endTime, itemId) => {
        setLoading(true);
        axios
            .get(
                `/app/getReservationByTime/${date}/${startTime}/${endTime}/${itemId}`
            )
            .then((res) =>
                setAvailableTables(
                    allTables.filter(
                        (t) => !res.data?.some((tab) => tab.table === t)
                    )
                )
            )
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const getReservationByTable = (table) => {
        axios
            .get(`/app/getReservationByTable/${table}`)
            .then((res) => setAllReservations(res.data))
            .catch((err) => console.log(err));
    };

    const getDayReservations = (date) => {
        setLoading(true);
        axios
            .get(`/app/getReservationsDate/${date}`)
            .then((res) => setAllReservations(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const deleteReservations = (reservationId) => {
        axios
            .delete(`app/removeReservation/${reservationId}`)
            .then(() => {
                setDeleteReservSuccess(true);
                setReload(!reload);
            })
            .catch((err) => console.log(err));
    };

    const submitEditReservation = (e) => {
        e.preventDefault();
        const dataToPost = {
            _id: itemId,
            fullName,
            email_id,
            contact,
            table,
            startTime,
            endTime,
            date,
        };
        axios
            .put(`/app/editReservation/${itemId}`, dataToPost)
            .then((res) => {
                setEditReservationSuccess(true);
                setReload(!reload);
                setEditReservationModal(false);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getReservationByTime(date, startTime, endTime, itemId);
    }, [selectedDate, selectedStartTime, selectedEndTime]);

    useEffect(() => {
        setPageNumber(1);
        setPageLimit(10);
        setReservationsToShow(allReservations.slice(0, pageLimit));
    }, [allReservations]);

    useEffect(() => {
        const start = (pageNumber - 1) * pageLimit;
        setReservationsToShow(allReservations.slice(start, start + pageLimit));
    }, [pageNumber, pageLimit]);

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
                        <div className="flex items-center flex-1 justify-between">
                            <p className="text-2xl text-gray-500 ml-6 font-bold">
                                Reservations
                            </p>
                            <div className="rounded relative">
                                <input
                                    onChange={(value) => {
                                        getReservationByTable(
                                            value.target.value
                                        );
                                    }}
                                    className="mx-auto w-96 border-gray-300 appearance-none border rounded-md py-4 px-3 text-gray-700 leading-tight"
                                    placeholder="Search for table no."
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
                                    onClick={() => setShowDate(true)}
                                    className="font-medium leading-4 bg-red-500 mr-6 p-4 px-8 text-white rounded-md"
                                >
                                    Select Date
                                </button>
                                <Modal
                                    isOpen={showDate}
                                    controller={setShowDate}
                                    className="animate-scaleUp max-h-screen overflow-y-auto bg-white rounded-xl relative shadow-md"
                                >
                                    <button
                                        onClick={() => setShowDate(false)}
                                        className="z-10 fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg text-white"
                                    />
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <ThemeProvider theme={materialTheme}>
                                            <DatePicker
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                variant="static"
                                                label="Date"
                                                value={dateFilter}
                                                onChange={(date) => {
                                                    setDateFilter(date);
                                                    getDayReservations(
                                                        date
                                                            .toISOString()
                                                            .split("T")[0]
                                                    );
                                                    setShowDate(false);
                                                }}
                                            />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </Modal>
                                <button
                                    onClick={() => {
                                        getDayReservations(
                                            new Date(
                                                Date.now() + 24 * 60 * 60 * 1000
                                            )
                                                .toISOString()
                                                .split("T")[0]
                                        );
                                    }}
                                    className="font-medium leading-4 bg-red-500 mr-6 p-4 px-8 text-white rounded-md"
                                >
                                    Tomorrow
                                </button>
                                <button
                                    onClick={() => {
                                        getDayReservations(
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        );
                                    }}
                                    className="font-medium leading-4 bg-red-500 mr-6 p-4 px-8 text-white rounded-md"
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
                                        onChange={(value) => {
                                            setPageLimit(value.value);
                                        }}
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
                                                setLoading(true);
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
                                        onPrint={onPrint}
                                        setOnPrint={setOnPrint}
                                    />
                                </div>
                            </div>
                            <div className={"print-source"}>
                                <CustomTable id="DownloadTable">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking-wider border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Start Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            End Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Table No. /<br />
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Customer Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Phone
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Email ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                    {allReservations?.map((reservation) => {
                                        return (
                                            <tr key={reservation._id}>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {
                                                            reservation.date.split(
                                                                "T"
                                                            )[0]
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {reservation.start_time}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {reservation.end_time}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {reservation.table}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {reservation.fullName}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {reservation.contact}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {reservation.email_id}
                                                    </div>
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        <CustomButton
                                                            customStyle={{
                                                                backgroundColor:
                                                                    theme.backgroundColor,
                                                                fontSize: 14,
                                                            }}
                                                            title="Cancel"
                                                            onPress={() => {
                                                                setWarnDeleteReserve(
                                                                    true
                                                                );
                                                                setItemId(
                                                                    reservation._id
                                                                );
                                                            }}
                                                        />
                                                        <CustomButton
                                                            customStyle={{
                                                                backgroundColor:
                                                                    theme.backgroundColor,
                                                                fontSize: 14,
                                                            }}
                                                            title="Edit"
                                                            onPress={() => {
                                                                setEditReservationModal(
                                                                    true
                                                                );
                                                                setReservationStates(
                                                                    reservation
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </CustomTable>
                            </div>
                            <div ref={printTable}>
                                <CustomTable>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking-wider border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Start Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            End Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Table No. /<br />
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Customer Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Phone
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Email ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-2 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                    {reservationsToShow.length > 0 ? (
                                        reservationsToShow.map(
                                            (reservation) => {
                                                return (
                                                    <tr key={reservation._id}>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    reservation.date.split(
                                                                        "T"
                                                                    )[0]
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    reservation.start_time
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    reservation.end_time
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    reservation.table
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    reservation.fullName
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    reservation.contact
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    reservation.email_id
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                <CustomButton
                                                                    customStyle={{
                                                                        backgroundColor:
                                                                            theme.backgroundColor,
                                                                        fontSize: 14,
                                                                    }}
                                                                    title="Cancel"
                                                                    onPress={() => {
                                                                        setWarnDeleteReserve(
                                                                            true
                                                                        );
                                                                        setItemId(
                                                                            reservation._id
                                                                        );
                                                                    }}
                                                                />
                                                                <CustomButton
                                                                    customStyle={{
                                                                        backgroundColor:
                                                                            theme.backgroundColor,
                                                                        fontSize: 14,
                                                                    }}
                                                                    title="Edit"
                                                                    onPress={() => {
                                                                        setEditReservationModal(
                                                                            true
                                                                        );
                                                                        setReservationStates(
                                                                            reservation
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan="8">
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
                        <CustomPagination
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            length={allReservations.length}
                            pageLimit={pageLimit}
                        />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={editReservationModal}
                controller={setEditReservationModal}
                onAfterOpen={() =>
                    getReservationByTime(date, startTime, endTime, itemId)
                }
                className="animate-scaleUp relative bg-white max-h-screen overflow-y-auto rounded-xl pt-4"
                style={{ content: { maxHeight: "95vh" } }}
            >
                <button
                    onClick={() => setEditReservationModal(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="pt-5">
                    <div className="w-full flex items-center justify-center">
                        <h3
                            className="text-3xl font-semibold"
                            style={{
                                color: theme.backgroundColor,
                            }}
                        >
                            Reserve Table
                        </h3>
                    </div>
                    <form
                        onSubmit={submitEditReservation}
                        className="rounded px-8 pt-6 pb-8 mb-4 w-full"
                    >
                        <div className="flex gap-8">
                            <div className="w-80">
                                <div className="my-5 w-full">
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <ThemeProvider theme={materialTheme}>
                                            <DatePicker
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                label="Date"
                                                value={selectedDate}
                                                onChange={(date) =>
                                                    setSelectedDate(date)
                                                }
                                            />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="my-5 w-full">
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <ThemeProvider theme={materialTheme}>
                                            <TimePicker
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                clearable
                                                ampm={false}
                                                label="Start Time"
                                                value={selectedStartTime}
                                                onChange={(value) =>
                                                    setSelectedStartTime(value)
                                                }
                                            />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="my-5 w-full">
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <ThemeProvider theme={materialTheme}>
                                            <TimePicker
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                clearable
                                                ampm={false}
                                                label="End Time"
                                                value={selectedEndTime}
                                                onChange={(value) =>
                                                    setSelectedEndTime(value)
                                                }
                                            />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                            <div className="w-80">
                                <div className="mb-2">
                                    <label
                                        className="block text-gray-700"
                                        htmlFor="fullName"
                                    >
                                        Customer Name
                                    </label>
                                    <input
                                        required
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                        className="appearance-none border rounded-md border-gray-300 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="fullName"
                                        type="text"
                                        placeholder="Enter Customer Name"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        className="rounded-md border-gray-300 block text-gray-700"
                                        htmlFor="email"
                                    >
                                        Email Id
                                    </label>
                                    <input
                                        required
                                        value={email_id}
                                        onChange={(e) =>
                                            setEmail_id(e.target.value)
                                        }
                                        className="rounded-md border-gray-300 appearance-none border w-full py-3 px-3 text-gray-700 leading-tight"
                                        id="email"
                                        type="email"
                                        placeholder="Enter Email Id"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        className="block text-gray-700"
                                        htmlFor="contact"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        required
                                        value={contact}
                                        onChange={(e) =>
                                            setContact(e.target.value)
                                        }
                                        className="rounded-md border-gray-300 appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="contact"
                                        type="tel"
                                        placeholder="Enter Phone Number"
                                    />
                                </div>
                                <div
                                    style={{ width: "100%" }}
                                    className="inline-block rounded"
                                >
                                    <label className="block text-gray-700">
                                        Table Number
                                    </label>
                                    <input
                                        required
                                        list="availableTables"
                                        value={table}
                                        onChange={(e) =>
                                            setTable(e.target.value)
                                        }
                                        onBlur={(e) =>
                                            setTable(
                                                availableTables.find(
                                                    (it) =>
                                                        it === e.target.value
                                                ) || ""
                                            )
                                        }
                                        placeholder="Enter Table Number"
                                        className="rounded-md border-gray-300 appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <datalist id="availableTables">
                                        {availableTables.map((t) => (
                                            <option key={t} value={t} />
                                        ))}
                                    </datalist>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="bg-red-500 rounded-md py-2 px-8 font-medium text-white"
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={editReservSuccess}
                controller={setEditReservationSuccess}
                className="animate-scaleUp relative bg-white max-h-screen overflow-y-auto rounded-xl p-14 flex flex-col items-center"
            >
                <button
                    onClick={() => setEditReservationSuccess(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <p className="text-xl">
                    Table reservation updated successfully!
                </p>
                <button
                    className="mt-10 bg-red-500 rounded-md font-medium text-white px-10 py-2"
                    onClick={() => setEditReservationSuccess(false)}
                >
                    Okay
                </button>
            </Modal>
            <Modal
                isOpen={warnDeleteReserve}
                controller={setWarnDeleteReserve}
                className="animate-scaleUp relative bg-white max-h-screen overflow-y-auto rounded-xl p-14 flex flex-col items-center"
            >
                <button
                    onClick={() => setWarnDeleteReserve(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <p className="text-xl">Confirm before Deleting Reservation</p>
                <button
                    className="mt-10 bg-red-500 rounded-md font-medium text-white px-10 py-2"
                    onClick={() => {
                        setWarnDeleteReserve(false);
                        deleteReservations(itemId);
                    }}
                >
                    Delete
                </button>
            </Modal>
            <Modal
                isOpen={deleteReservSuccess}
                controller={setDeleteReservSuccess}
                className="animate-scaleUp relative bg-white max-h-screen overflow-y-auto rounded-xl p-14 flex flex-col items-center"
            >
                <button
                    onClick={() => setDeleteReservSuccess(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <p className="text-xl">Table reservation deleted!</p>
                <button
                    className="mt-10 bg-red-500 rounded-md font-medium text-white px-10 py-2"
                    onClick={() => setDeleteReservSuccess(false)}
                >
                    Okay
                </button>
            </Modal>
        </div>
    );
};

export default AllReservations;
