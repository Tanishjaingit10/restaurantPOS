/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import Popup from "./Popup";
import Loader from "./Loader";
import { ThemeContext } from "../context/Theme";
import CustomButton from "./Common/CustomButton";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";
import { useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Select from "react-select";
import { Modal } from "./Common/Modal";
import { materialTheme } from "../styles/clockMaterialTheme";
import QRCode from "react-qr-code";
import { TableUIUrl } from "../config";
import ReactToPdf from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import SpinLoader from "./SpinLoader";
import axios from "axios";
import { NotificationContext } from "../context/Notification";

const Tables = () => {
    const [componentLoading, setComponentLoading] = useState(false);
    const [displayTable, setDisplayTable] = useState([]);
    const [confirmDeleteTable, setConfirmDeleteTable] = useState(false);
    const [Open, setOpen] = useState(false);
    const [deleteTableId, setDeleteTableId] = useState();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [availableTables, setAvailableTables] = useState([]);
    const [allTables, setAllTables] = useState([]);
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [newReservationSuccess, setNewReservationSuccess] = useState(false);
    const [newReservation, setNewReservation] = useState({
        startTime: new Date().toISOString().split("T")[1].split(".")[0],
        endTime: new Date().toISOString().split("T")[1].split(".")[0],
        date: new Date().toISOString().split("T")[0],
    });
    const [position, setPosition] = useState("");
    const [tableName, setTableName] = useState("");
    const [tableLocation, setTableLocation] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [locationIsOpen, setLocationIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const [newTableAdded, setNewTableAdded] = useState(false);
    const [showDeleteTable, setShowDeleteTable] = useState(false);
    const [showDeleteTableLocation, setShowDeleteTableLocation] =
        useState(false);
    const [timeNow, setTimeNow] = useState(Date.now());
    const [clickedTableId, setClickedTableId] = useState("");
    const [qrCodeIsOpen, setQrCodeIsOpen] = useState(false);
    const [qrModalLoading, setQrModalLoading] = useState(false);
    const notify = useContext(NotificationContext);
    const qrCodeRef = useRef(null);
    const linkToTableUI = `${TableUIUrl}/${clickedTableId || "TakeAway"}`;
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        setComponentLoading(true);
        setShowDeleteTable(false);
        axios
            .get(`/app/table`)
            .then((res) => {
                setDisplayTable(res.data);
                var tables = [];
                for (var i = 0; i < res.data.length; i++) {
                    tables.push(res.data[i].number);
                }
                setAllTables(tables);
                setLoading(false);
                setComponentLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setComponentLoading(false);
            });
        axios
            .get("/app/tableLocation")
            .then((res) => {
                if (res?.data) setLocations(res.data);
            })
            .catch((err) =>
                notify(
                    err?.response?.data?.message ||
                        "Unable to fetch table locations"
                )
            );
    }, [reload]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const submitNewReservation = () => {
        setComponentLoading(true);
        axios
            .post(`/app/addReservation`, newReservation)
            .then((res) => {
                setNewReservationSuccess(true);
                setComponentLoading(false);
                setReload(!reload);
            })
            .catch((err) => {
                console.log(err);
                setComponentLoading(false);
            });
    };

    const addTable = () => {
        setComponentLoading(true);
        axios
            .post(`/app/addTable`, {
                number: tableName,
                capacity: maxCapacity,
                location: selectedLocation,
                status: "Free",
            })
            .then((res) => {
                setComponentLoading(false);
                setNewTableAdded(true);
                setReload(!reload);
            })
            .catch((err) => {
                console.log(err);
                setComponentLoading(false);
            });
    };

    const addLocation = () => {
        setComponentLoading(true);
        axios
            .post(`/app/tableLocation`, {
                table_location: tableLocation,
            })
            .then((res) => {
                setReload(!reload);
                notify("Location Added");
                setLocationIsOpen(false);
                setTableLocation("");
            })
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to add location")
            )
            .finally((err) => setComponentLoading(false));
    };

    useEffect(() => {
        getReservationByTime(
            newReservation?.date,
            newReservation?.startTime,
            newReservation?.endTime
        );
    }, [newReservation, allTables]);

    const getReservationByTime = (date, startTime, endTime) => {
        setComponentLoading(true);
        axios
            .get(`/app/getReservationByTime/${date}/${startTime}/${endTime}`)
            .then((res) => {
                var tableList = [];
                var reservedTable = [];
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].table !== undefined)
                        reservedTable.push(res.data[i].table);
                }
                var availableTables = allTables?.filter(function (obj) {
                    return reservedTable.indexOf(obj) === -1;
                });
                for (let i = 0; i < availableTables?.length; i++) {
                    tableList.push({
                        label: availableTables[i],
                        value: availableTables[i],
                    });
                }
                setAvailableTables(tableList);
                setComponentLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setComponentLoading(false);
            });
    };

    function openModal() {
        setIsOpen(true);
    }

    function openLocationModal() {
        setLocationIsOpen(true);
    }

    function closeLocationModal() {
        setLocationIsOpen(false);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const theme = useContext(ThemeContext);
    const deleteTable = async () => {
        axios
            .delete(`/app/removeTable/${deleteTableId}`)
            .then((res) => notify("Table Deleted"))
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to delete table")
            )
            .finally(() => {
                setReload(!reload);
                setOpen(!Open);
            });
    };

    const handleDeleteLocation = (loc) => {
        setComponentLoading(true);
        axios
            .delete(`/app/tableLocation/${loc}`)
            .then(() => {
                setReload((e) => !e);
                notify("Location deleted");
            })
            .catch((err) =>
                notify(
                    err?.response?.data?.message || "Unable to delete location"
                )
            )
            .finally(() => setComponentLoading(false));
    };

    const handleTableClick = (num) => {
        setQrCodeIsOpen(true);
        setClickedTableId(num);
    };

    const selectCustomeStyle = {
        backgroundColor: theme.backgroundColor,
    };

    const print = useReactToPrint({
        content: () => qrCodeRef.current,
        bodyClass: "h-screen w-screen flex items-center justify-center",
    });

    const handleVacateTable = () => {
        setQrModalLoading(true);
        axios
            .get(
                `/app/orderForTable/${
                    displayTable.find((t) => t._id === clickedTableId)?.number
                }`
            )
            .then((res) => notify("Please complete the payment first"))
            .catch((err) => {
                if (err?.response?.data?.message === "Item not found!") {
                    return axios
                        .get(`/app/vacateTable/${clickedTableId}`)
                        .then((res) => {
                            setReload(!reload);
                            setQrCodeIsOpen(false);
                        })
                        .catch((err) =>
                            notify(
                                err?.response?.data?.message ||
                                    "Error.. Try Again"
                            )
                        )
                        .finally(setLoading(false));
                } else
                    notify(err?.response?.data?.message || "Error.. Try Again");
            })
            .finally(() => setQrModalLoading(false));
    };
    return (
        <div className="">
            {componentLoading ? <Loader /> : null}
            <div className="flex flex-row justify-between items-center h-20 px-10 border-b-2 border-gray-300">
                <h2 className="font-semibold text-2xl">Table View</h2>
                <div className="flex flex-row items-center">
                    <div
                        style={{ backgroundColor: theme.backgroundColor }}
                        className="text-white py-2 px-2 rounded-md mx-2"
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
                    <CustomButton
                        title="Actions"
                        customStyle={{ backgroundColor: theme.backgroundColor }}
                        onPress={() => {
                            navigate("/reservations");
                        }}
                    />
                    <button
                        className="bg-yellow-500 text-white py-2 px-10 rounded-md mx-2 font-medium shadow-md"
                        onClick={() => handleTableClick()}
                    >
                        Take Away
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-6 rounded-md mx-2 font-medium shadow-md"
                        onClick={() => setShowDeleteTable(true)}
                    >
                        {"- Delete Table"}
                    </button>
                    <button
                        className="bg-green text-white py-2 px-6 rounded-md mx-2 font-medium shadow-md"
                        onClick={() => openModal()}
                    >
                        {"+ Add Table"}
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md mx-2 font-medium shadow-md"
                        onClick={() => setShowDeleteTableLocation(true)}
                    >
                        {"- Delete Location"}
                    </button>
                    <button
                        className="bg-green text-white py-2 px-4 rounded-md mx-2 font-medium shadow-md"
                        onClick={() => openLocationModal()}
                    >
                        {"+ Add Location"}
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className="max-h-screen overflow-y-auto bg-white py-12 px-20 rounded-xl relative w-1/2 lg:w-1/3"
                    >
                        <button
                            onClick={closeModal}
                            className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                        />
                        <h2
                            style={{ color: theme.backgroundColor }}
                            className="text-2xl font-bold text-center mb-8"
                        >
                            Add New Table
                        </h2>
                        <form>
                            <select
                                name="position"
                                className="font-medium p-4 border-2 w-full text-md rounded-lg text-white mb-4 bg-red-500"
                                style={{ cursor: "pointer" }}
                                onChange={(e) => setPosition(e.target.value)}
                                value={position}
                            >
                                <option className=" border-black border-2 p-2">
                                    Mark Table By Name
                                </option>
                                <option className=" border-black border-2 p-2">
                                    Mark Table By Number
                                </option>
                            </select>
                            <input
                                name="tableName"
                                placeholder="Enter Table Name"
                                type="text"
                                value={tableName}
                                onChange={(e) => setTableName(e.target.value)}
                                className={
                                    "font-medium shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3"
                                }
                            />
                            <input
                                name="maxCapacity"
                                placeholder="Enter Max Capacity"
                                type="text"
                                value={maxCapacity}
                                onChange={(e) => setMaxCapacity(e.target.value)}
                                className={
                                    "font-medium shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3"
                                }
                            />
                            <select
                                name="position"
                                className="font-medium p-4 border-2 w-full text-md rounded-lg text-white my-3 bg-red-500"
                                style={{ cursor: "pointer" }}
                                onChange={(e) =>
                                    setSelectedLocation(e.target.value)
                                }
                                value={selectedLocation}
                            >
                                <option hidden> Select Table Location </option>
                                {locations.map((loc) => (
                                    <option
                                        key={loc._id}
                                        value={loc.table_location}
                                    >
                                        {loc.table_location}
                                    </option>
                                ))}
                            </select>
                            <div className="flex w-full mt-5 justify-center">
                                <CustomButton
                                    title="Done"
                                    customStyle={{
                                        backgroundColor: theme.backgroundColor,
                                    }}
                                    onPress={() => {
                                        closeModal(false);
                                        addTable();
                                    }}
                                />
                            </div>
                        </form>
                    </Modal>
                    <Modal
                        isOpen={locationIsOpen}
                        onRequestClose={closeLocationModal}
                        contentLabel="Example Modal"
                        className="max-h-screen overflow-y-auto bg-white py-12 px-20 rounded-xl relative w-1/2 lg:w-1/3"
                    >
                        <button
                            onClick={closeLocationModal}
                            className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                        />
                        <h2
                            style={{ color: theme.backgroundColor }}
                            className="text-2xl font-bold text-center mb-8"
                        >
                            Add New Location
                        </h2>
                        <div>
                            <input
                                name="tableLocation"
                                placeholder="Enter Location Name"
                                type="text"
                                value={tableLocation}
                                onChange={(e) =>
                                    setTableLocation(e.target.value)
                                }
                                className={
                                    "font-medium shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3"
                                }
                            />
                            <div className="flex w-full mt-5 justify-center">
                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-2 px-10 rounded-md mx-2 font-medium shadow-md"
                                    onClick={() => {
                                        closeModal();
                                        addLocation();
                                    }}
                                >
                                    {"Done"}
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="my-5 ml-10">
                <CustomButton
                    title="+ Table Reservation"
                    customStyle={{ backgroundColor: theme.backgroundColor }}
                    onPress={() => setShowModal(true)}
                />
            </div>
            <Modal
                isOpen={showModal}
                controller={setShowModal}
                className="relative bg-white max-h-screen overflow-y-auto w-1/2 lg:w-1/3 rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="w-full flex items-center justify-center">
                        <h3
                            className="text-3xl font-bold"
                            style={{
                                color: theme.backgroundColor,
                            }}
                        >
                            Reserve Table
                        </h3>
                    </div>
                    <form className="rounded px-8 pt-6 pb-8 mb-4 w-full">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="fullName"
                            >
                                Enter Customer Name
                            </label>
                            <input
                                onChange={(value) =>
                                    setNewReservation((newReservation) => ({
                                        ...newReservation,
                                        fullName: value.target.value,
                                    }))
                                }
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                placeholder="Enter Customer Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="fullName"
                            >
                                Enter Email Id
                            </label>
                            <input
                                onChange={(value) =>
                                    setNewReservation((newReservation) => ({
                                        ...newReservation,
                                        email_id: value.target.value,
                                    }))
                                }
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                placeholder="Enter Email Id"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="fullName"
                            >
                                Enter Phone Number
                            </label>
                            <input
                                onChange={(value) =>
                                    setNewReservation((newReservation) => ({
                                        ...newReservation,
                                        contact: value.target.value,
                                    }))
                                }
                                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fullName"
                                type="text"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                        <div className="my-5 w-full">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <ThemeProvider theme={materialTheme}>
                                    <DatePicker
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        label="Date"
                                        value={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                            setNewReservation(
                                                (newReservation) => ({
                                                    ...newReservation,
                                                    date: date
                                                        .toISOString()
                                                        .split("T")[0],
                                                })
                                            );
                                            getReservationByTime(
                                                date
                                                    .toISOString()
                                                    .split("T")[0],
                                                newReservation.startTime,
                                                newReservation.endTime
                                            );
                                        }}
                                    />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="my-5 w-full">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <ThemeProvider theme={materialTheme}>
                                    <TimePicker
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        clearable
                                        ampm={false}
                                        label="Start Time"
                                        value={startTime}
                                        onChange={(value) => {
                                            setStartTime(value);
                                            setNewReservation(
                                                (newReservation) => ({
                                                    ...newReservation,
                                                    startTime:
                                                        value.format(
                                                            "HH:mm:ss"
                                                        ),
                                                })
                                            );
                                            getReservationByTime(
                                                newReservation.date,
                                                value.format("HH:mm:ss"),
                                                newReservation.endTime
                                            );
                                        }}
                                    />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="my-5 w-full">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <ThemeProvider theme={materialTheme}>
                                    <TimePicker
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        onChange={(value) => {
                                            setEndTime(value);
                                            setNewReservation(
                                                (newReservation) => ({
                                                    ...newReservation,
                                                    endTime:
                                                        value.format(
                                                            "HH:mm:ss"
                                                        ),
                                                })
                                            );
                                            getReservationByTime(
                                                newReservation.date,
                                                newReservation.startTime,
                                                value.format("HH:mm:ss")
                                            );
                                        }}
                                        value={endTime}
                                        clearable
                                        ampm={false}
                                        label="End Time"
                                    />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div
                            style={{ width: "100%" }}
                            className="inline-block rounded"
                        >
                            <Select
                                styles={selectCustomeStyle}
                                defaultValue={availableTables[0]}
                                options={availableTables}
                                maxMenuHeight={130}
                                onChange={(value) =>
                                    setNewReservation((newReservation) => ({
                                        ...newReservation,
                                        table: value.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="flex justify-center mt-8">
                            <CustomButton
                                title="Done"
                                customStyle={{
                                    backgroundColor: theme.backgroundColor,
                                }}
                                onPress={() => {
                                    submitNewReservation();
                                    setShowModal(false);
                                }}
                            />
                        </div>
                    </form>
                </div>
            </Modal>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col">
                    {locations.map((loc) => (
                        <div key={loc._id}>
                            {showDeleteTableLocation ? (
                                <div className="-mb-10 -ml-1 text-red-500">
                                    <MdOutlineDelete
                                        onClick={() =>
                                            handleDeleteLocation(
                                                loc.table_location
                                            )
                                        }
                                        size={25}
                                    />
                                </div>
                            ) : null}
                            <h2 className="mt-8 mb-3 ml-6 font-semibold text-gray-600 text-lg border text-center w-60 p-2 border-gray-500 rounded-md">
                                {loc.table_location}
                            </h2>
                            <div className="flex flex-wrapw-full justify-evenly">
                                <div className="flex flex-row w-full flex-wrap">
                                    {displayTable
                                        .filter(
                                            (table) =>
                                                table.location ===
                                                loc.table_location
                                        )
                                        .map((table) => {
                                            return (
                                                <div key={table._id}>
                                                    {showDeleteTable ? (
                                                        <div className="-mb-10 -ml-1">
                                                            <MdOutlineDelete
                                                                onClick={() => {
                                                                    if (
                                                                        table.status ===
                                                                        "Free"
                                                                    ) {
                                                                        setConfirmDeleteTable(
                                                                            true
                                                                        );
                                                                        setDeleteTableId(
                                                                            table._id
                                                                        );
                                                                    }
                                                                }}
                                                                color={
                                                                    table.status !==
                                                                    "Free"
                                                                        ? "#faaf9a"
                                                                        : theme.backgroundColor
                                                                }
                                                                size={25}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div className="mx-5 text-red-500 flex h-6 items-center justify-center">
                                                        {table.status !==
                                                            "Free" && (
                                                            <>
                                                                <i className="far fa-clock mr-1" />
                                                                <div className="font-semibold">
                                                                    {timeNow -
                                                                        new Date(
                                                                            table.time
                                                                        ).valueOf() >
                                                                        3600000 &&
                                                                        `${Math.floor(
                                                                            (timeNow -
                                                                                new Date(
                                                                                    table.time
                                                                                ).valueOf()) /
                                                                                3600000
                                                                        )
                                                                            .toString()
                                                                            .padStart(
                                                                                2,
                                                                                "0"
                                                                            )}:`}
                                                                    {Math.floor(
                                                                        ((timeNow -
                                                                            new Date(
                                                                                table.time
                                                                            ).valueOf()) /
                                                                            60000) %
                                                                            60
                                                                    )
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}
                                                                    :
                                                                    {Math.floor(
                                                                        ((timeNow -
                                                                            new Date(
                                                                                table.time
                                                                            ).valueOf()) /
                                                                            1000) %
                                                                            60
                                                                    )
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`${
                                                            table.status !==
                                                            "Free"
                                                                ? "text-white bg-red-400"
                                                                : "text-gray-500"
                                                        } m-5 mt-0 rounded border flex items-center justify-center border-red-500`}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleTableClick(
                                                                    table._id
                                                                )
                                                            }
                                                            className="font-bold text-2xl p-8"
                                                        >
                                                            <div className="leading-3">
                                                                {table.number}
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    ))}
                    {displayTable.some(
                        (table) =>
                            !locations.some(
                                (loc) => loc.table_location === table.location
                            )
                    ) && (
                        <div>
                            <h2 className="mt-8 mb-3 ml-6 font-semibold text-gray-600 text-lg border text-center w-60 p-2 border-gray-500 rounded-md">
                                No Location
                            </h2>
                            <div className="flex flex-wrapw-full justify-evenly">
                                <div className="flex flex-row w-full flex-wrap">
                                    {displayTable
                                        .filter(
                                            (table) =>
                                                !locations.some(
                                                    (l) =>
                                                        table.location ===
                                                        l.table_location
                                                )
                                        )
                                        .map((table) => {
                                            return (
                                                <div key={table._id}>
                                                    {showDeleteTable ? (
                                                        <div className="-mb-10 -ml-1">
                                                            <MdOutlineDelete
                                                                onClick={() => {
                                                                    if (
                                                                        table.status ===
                                                                        "Free"
                                                                    ) {
                                                                        setConfirmDeleteTable(
                                                                            true
                                                                        );
                                                                        setDeleteTableId(
                                                                            table._id
                                                                        );
                                                                    }
                                                                }}
                                                                color={
                                                                    table.status !==
                                                                    "Free"
                                                                        ? "#faaf9a"
                                                                        : theme.backgroundColor
                                                                }
                                                                size={25}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div className="mx-5 text-red-500 flex h-6 items-center justify-center">
                                                        {table.status !==
                                                            "Free" && (
                                                            <>
                                                                <i className="far fa-clock mr-1" />
                                                                <div className="font-semibold">
                                                                    {timeNow -
                                                                        new Date(
                                                                            table.time
                                                                        ).valueOf() >
                                                                        3600000 &&
                                                                        `${Math.floor(
                                                                            (timeNow -
                                                                                new Date(
                                                                                    table.time
                                                                                ).valueOf()) /
                                                                                3600000
                                                                        )
                                                                            .toString()
                                                                            .padStart(
                                                                                2,
                                                                                "0"
                                                                            )}:`}
                                                                    {Math.floor(
                                                                        ((timeNow -
                                                                            new Date(
                                                                                table.time
                                                                            ).valueOf()) /
                                                                            60000) %
                                                                            60
                                                                    )
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}
                                                                    :
                                                                    {Math.floor(
                                                                        ((timeNow -
                                                                            new Date(
                                                                                table.time
                                                                            ).valueOf()) /
                                                                            1000) %
                                                                            60
                                                                    )
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`${
                                                            table.status !==
                                                            "Free"
                                                                ? "text-white bg-red-400"
                                                                : "text-gray-500"
                                                        } m-5 mt-0 rounded border flex items-center justify-center border-red-500`}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleTableClick(
                                                                    table._id
                                                                )
                                                            }
                                                            className="font-bold text-2xl p-8"
                                                        >
                                                            <div className="leading-3">
                                                                {table.number}
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {confirmDeleteTable && (
                <Popup
                    content={
                        <>
                            <p className="font-bold text-green">
                                Please confirm to delete the table
                            </p>
                            <button
                                className="mt-10 px-10 py-2 rounded text-white"
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                }}
                                onClick={deleteTable}
                            >
                                Confirm
                            </button>
                        </>
                    }
                    handleClose={() => {
                        setConfirmDeleteTable(false);
                    }}
                />
            )}
            {Open && (
                <Popup
                    content={
                        <>
                            <p className="font-bold text-green">
                                Deleted Successfully
                            </p>
                            <button
                                className="mt-10 px-10 py-2 rounded"
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                }}
                                onClick={() => {
                                    setOpen(!Open);
                                }}
                            >
                                Okay
                            </button>
                        </>
                    }
                    handleClose={() => {
                        setOpen(!Open);
                    }}
                />
            )}
            {newTableAdded && (
                <Popup
                    content={
                        <>
                            <p className="font-bold text-green text-xl">
                                Table added successfully!
                            </p>
                            <button
                                className="mt-10 bg-primary px-10 py-2 shadow-lg"
                                onClick={() => setNewTableAdded(!newTableAdded)}
                            >
                                Okay
                            </button>
                        </>
                    }
                    handleClose={() => {
                        setNewTableAdded(!newTableAdded);
                    }}
                />
            )}
            {newReservationSuccess && (
                <Popup
                    content={
                        <>
                            <p className="font-bold text-green text-xl">
                                Table reservation created!
                            </p>
                            <button
                                className="mt-10 bg-primary px-10 py-2 shadow-lg"
                                onClick={() =>
                                    setNewReservationSuccess(
                                        !newReservationSuccess
                                    )
                                }
                            >
                                Okay
                            </button>
                        </>
                    }
                    handleClose={() => {
                        setNewReservationSuccess(!newReservationSuccess);
                    }}
                />
            )}
            <Modal
                isOpen={qrCodeIsOpen}
                controller={setQrCodeIsOpen}
                className="max-h-screen overflow-y-auto flex flex-col items-center justify-center p-10 rounded-xl absolute bg-white"
            >
                {qrModalLoading && <SpinLoader />}
                <button
                    onClick={() => setQrCodeIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-10 text-red-500 font-semibold">
                    {clickedTableId
                        ? `Table: ${
                              displayTable?.find(
                                  (t) => t._id === clickedTableId
                              )?.number
                          }`
                        : "Take Away"}
                </div>
                <div className="flex gap-8 mb-10">
                    <div ref={qrCodeRef}>
                        <QRCode value={linkToTableUI} />
                    </div>
                    <div className="flex justify-end flex-col gap-6 text-white w-36">
                        <ReactToPdf
                            targetRef={qrCodeRef}
                            filename={`QR_CODE_TABLE_${clickedTableId}.pdf`}
                        >
                            {({ toPdf }) => (
                                <button
                                    className="bg-red-500 p-2 rounded-lg font-semibold"
                                    onClick={toPdf}
                                >
                                    Download
                                </button>
                            )}
                        </ReactToPdf>
                        <button
                            onClick={print}
                            className="bg-red-500 p-2 rounded-lg font-semibold"
                        >
                            Print
                        </button>
                        {!clickedTableId && (
                            <button
                                onClick={() => navigate("/orders")}
                                className="bg-yellow-500 p-2 rounded-lg font-semibold"
                            >
                                View Orders Report
                            </button>
                        )}
                        {clickedTableId &&
                            displayTable.find((t) => t._id === clickedTableId)
                                ?.status !== "Free" && (
                                <button
                                    onClick={handleVacateTable}
                                    className="bg-yellow-500 p-2 rounded-lg font-semibold"
                                >
                                    Vacate Table
                                </button>
                            )}
                        <button
                            onClick={() =>
                                navigate("/pos", {
                                    state: displayTable.find(
                                        (t) => t._id === clickedTableId
                                    )?.number,
                                })
                            }
                            className="bg-green p-2 rounded-lg font-semibold"
                        >
                            {clickedTableId &&
                            displayTable.find((t) => t._id === clickedTableId)
                                ?.status !== "Free"
                                ? "View Table"
                                : "Take Order"}
                        </button>
                    </div>
                </div>
                <a
                    className="text-lg font-medium text-blue-800 underline"
                    target="_blank"
                    href={linkToTableUI}
                    rel="noreferrer"
                >
                    {linkToTableUI}
                </a>
            </Modal>
        </div>
    );
};

export default Tables;
