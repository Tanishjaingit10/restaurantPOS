/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import SpinLoader from "./SpinLoader";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { Modal } from "./Common/Modal";
import { materialTheme } from "../styles/clockMaterialTheme";
import QRCode from "react-qr-code";
import { BackendUrl, TableUIUrl } from "../config";
import ReactToPdf from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { NotificationContext } from "../context/Notification";
import { formatDate } from "../Utils";
import { fetchTables_worker } from "../workers/fetchTables";
import { fetchTableLocations_worker } from "../workers/fetchTableLocations";

const Tables = () => {
    const Tables_URL = `${BackendUrl}/app/table`;
    const TableLocations_URL = `${BackendUrl}/app/tableLocation`;
    const [displayTable, setDisplayTable] = useState([]);
    const [confirmDeleteTable, setConfirmDeleteTable] = useState(false);
    const [deleteTableId, setDeleteTableId] = useState();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [availableTables, setAvailableTables] = useState([]);
    const [allTables, setAllTables] = useState([]);

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

    const [position, setPosition] = useState("");
    const [tableName, setTableName] = useState("");
    const [tableLocation, setTableLocation] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [locationIsOpen, setLocationIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const [showDeleteTable, setShowDeleteTable] = useState(false);
    const [showDeleteTableLocation, setShowDeleteTableLocation] =
        useState(false);
    const [timeNow, setTimeNow] = useState(Date.now());
    const [clickedTableId, setClickedTableId] = useState("");
    const [qrCodeIsOpen, setQrCodeIsOpen] = useState(false);
    const [qrModalLoading, setQrModalLoading] = useState(false);
    const notify = useContext(NotificationContext);
    const theme = useContext(ThemeContext);
    const qrCodeRef = useRef(null);
    const linkToTableUI = `${TableUIUrl}/${clickedTableId || "TakeAway"}`;
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const location = useLocation();
    
    const resetReservationStates = () => {
        setSelectedDate(new Date());
        setSelectedStartTime(new Date());
        setSelectedEndTime(new Date());
        setFullName("");
        setEmail_id("");
        setContact("");
        setTable("");
    };

    useEffect(() => {
        setLoading(true);
        setShowDeleteTable(false);
        setShowDeleteTableLocation(false);
        Promise.all([axios.get("/app/table"), axios.get("/app/tableLocation")])
            .then(([res1, res2]) => {
                setDisplayTable(res1.data);
                const tab = res1.data.find(t=>t.number === location.state)
                if(location.state)handleTableClick(tab._id)
                setAllTables(res1?.data?.map((t) => t.number));
                if (res2?.data) setLocations(res2.data);
            })
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to fetch tables")
            )
            .finally(() => setLoading(false));
    }, [reload]);

    fetchTables_worker.onmessage = (message) => {
        if (message?.data?.success) {
            setDisplayTable(message.data?.data);
            setAllTables(message.data?.data?.map((t) => t.number));
        }
    };

    fetchTableLocations_worker.onmessage = (message) => {
        if (message?.data?.success) {
            if (message.data?.data) setLocations(message.data?.data);
        }
    };

    useEffect(() => {
        const fetchTablesInterval = setInterval(() => {
            fetchTables_worker.postMessage(Tables_URL);
            fetchTableLocations_worker.postMessage(TableLocations_URL);
        }, 3000);
        return () => clearInterval(fetchTablesInterval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const submitNewReservation = (e) => {
        e.preventDefault();
        if (startTime > endTime) {
            notify("End time is less than start time");
            return;
        }
        const newReservation = {
            startTime,
            endTime,
            date,
            fullName,
            email_id,
            contact,
            table,
        };
        setLoading(true);
        axios
            .post(`/app/addReservation`, newReservation)
            .then(() => {
                notify("Table reservation created!");
                setReload(!reload);
                setShowModal(false);
                resetReservationStates();
            })
            .catch((err) => {
                notify(
                    err?.response?.data?.message ||
                        "Unable to create reservation"
                );
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    const addTable = () => {
        setLoading(true);
        axios
            .post(`/app/addTable`, {
                number: tableName,
                capacity: maxCapacity,
                location: selectedLocation,
                status: "Free",
            })
            .then((res) => {
                notify("Table Added");
                setReload(!reload);
            })
            .catch((err) => {
                console.log(err.response);
                notify(err?.response?.data?.message || "Unable to add Table");
            })
            .finally(() => setLoading(false));
    };

    const addLocation = () => {
        setLoading(true);
        axios
            .post(`/app/tableLocation`, {
                table_location: tableLocation,
            })
            .then(() => {
                setReload(!reload);
                notify("Location Added");
                setLocationIsOpen(false);
                setTableLocation("");
            })
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to add location")
            )
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        getReservationByTime(date, startTime, endTime);
    }, [selectedDate, selectedStartTime, selectedEndTime]);

    const getReservationByTime = (date, startTime, endTime) => {
        setLoading(true);
        axios
            .get(`/app/getReservationByTime/${date}/${startTime}/${endTime}`)
            .then((res) => {
                setAvailableTables(
                    allTables.filter(
                        (t) => !res.data?.some((tab) => tab.table === t)
                    )
                );
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
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

    const deleteTable = async () => {
        axios
            .delete(`/app/removeTable/${deleteTableId}`)
            .then((res) => notify("Table Deleted"))
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable to delete table")
            )
            .finally(() => {
                setReload(!reload);
            });
    };

    const handleDeleteLocation = (loc) => {
        setLoading(true);
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
            .finally(() => setLoading(false));
    };

    const handleTableClick = (num) => {
        setQrCodeIsOpen(true);
        setClickedTableId(num);
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
            .then(() => notify("Please complete the payment first"))
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
        <div>
            {loading && <SpinLoader className="fixed top-1/2 right-1/2" />}
            <div className="flex flex-row justify-between items-center h-24 px-6 border-b-2 border-gray-300">
                <p className="text-2xl text-gray-500 font-bold">Table View</p>
                <div className="flex flex-row items-center">
                    <button
                        onClick={() => setReload(!reload)}
                        className="font-medium leading-4 bg-red-500 mr-6 p-4 text-white rounded-md"
                    >
                        <div
                            className={`fas fa-sync-alt${
                                loading ? " animate-spin" : ""
                            }`}
                        />
                    </button>
                    <button
                        className="font-medium mr-6 py-4 px-6 text-white rounded-md leading-4 bg-yellow-500"
                        onClick={() => handleTableClick()}
                    >
                        Take Away
                    </button>
                    <button
                        className="font-medium mr-6 py-4 px-6 text-white rounded-md leading-4 bg-red-500"
                        onClick={() => setShowDeleteTable((e) => !e)}
                    >
                        {"- Delete Table"}
                    </button>
                    <button
                        className="font-medium mr-6 py-4 px-6 text-white rounded-md leading-4 bg-green"
                        onClick={() => openModal()}
                    >
                        {"+ Add Table"}
                    </button>
                    <button
                        className="font-medium bg-red-500 mr-6 py-4 px-6 text-white rounded-md leading-4"
                        onClick={() => setShowDeleteTableLocation((e) => !e)}
                    >
                        {"- Delete Location"}
                    </button>
                    <button
                        className="font-medium bg-green py-4 px-6 text-white rounded-md leading-4"
                        onClick={() => openLocationModal()}
                    >
                        {"+ Add Location"}
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        className="animate-scaleUp max-h-screen overflow-y-auto bg-white py-12 px-20 rounded-xl relative w-1/2 lg:w-1/3"
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
                        className="animate-scaleUp max-h-screen overflow-y-auto bg-white py-12 px-20 rounded-xl relative w-1/2 lg:w-1/3"
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
            <div className="my-5 ml-6 flex gap-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-500 p-4 leading-4 rounded-md font-medium text-white px-8"
                >
                    + Table Reservation
                </button>
                <Link
                    to="/reservations"
                    className="bg-red-500 p-4 leading-4 rounded-md font-medium text-white px-8"
                >
                    View Reservations
                </Link>
            </div>
            <Modal
                isOpen={showModal}
                controller={setShowModal}
                onAfterOpen={() =>
                    getReservationByTime(date, startTime, endTime)
                }
                className="animate-scaleUp relative bg-white max-h-screen overflow-y-auto rounded-xl pt-4 px-6"
                style={{ content: { maxHeight: "95vh" } }}
            >
                <button
                    onClick={() => setShowModal(false)}
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
                        onSubmit={submitNewReservation}
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
                                className="bg-red-500 rounded-md py-2 px-14 font-medium text-white"
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            {
                <div className="flex flex-col">
                    {locations?.map((loc) => (
                        <div key={loc._id} className="relative">
                            {showDeleteTableLocation ? (
                                <div className="text-red-500 cursor-pointer absolute top-8 -left-1">
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
                            <h2 className="shadow-md mt-8 mb-3 ml-6 font-semibold text-gray-600 text-lg border text-center w-60 p-2 border-gray-500 rounded-md">
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
                                                <div
                                                    key={table._id}
                                                    className="relative"
                                                >
                                                    {showDeleteTable && (
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
                                                            className="absolute top-5 -left-1"
                                                            color={
                                                                table.status !==
                                                                "Free"
                                                                    ? "#faaf9a"
                                                                    : theme.backgroundColor
                                                            }
                                                            size={25}
                                                        />
                                                    )}
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
                                                        } shadow-md m-5 mt-0 rounded-md border flex items-center justify-center border-red-500`}
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
                    {displayTable?.some(
                        (table) =>
                            !locations?.some(
                                (loc) => loc.table_location === table.location
                            )
                    ) && (
                        <div>
                            <h2 className="shadow mt-8 mb-3 ml-6 font-semibold text-gray-600 text-lg border text-center w-60 p-2 border-gray-500 rounded-md">
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
                                                <div
                                                    key={table._id}
                                                    className="relative"
                                                >
                                                    {showDeleteTable ? (
                                                        <div className="absolute top-5 -left-1">
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
                                                        } shadow-md m-5 mt-0 rounded-md border flex items-center justify-center border-red-500`}
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
            }
            <Modal
                isOpen={confirmDeleteTable}
                controller={setConfirmDeleteTable}
                className="animate-scaleUp max-h-screen overflow-y-auto flex flex-col items-center justify-center p-20 rounded-xl absolute bg-white"
            >
                <button
                    onClick={() => setConfirmDeleteTable(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <p className="text-lg">Please confirm to delete the table.</p>
                <button
                    className="mt-12 px-10 py-2 rounded text-white"
                    style={{
                        backgroundColor: theme.backgroundColor,
                    }}
                    onClick={() => {
                        deleteTable();
                        setConfirmDeleteTable(false);
                    }}
                >
                    Confirm
                </button>
            </Modal>
            <Modal
                isOpen={qrCodeIsOpen}
                controller={setQrCodeIsOpen}
                className="animate-scaleUp max-h-screen overflow-y-auto flex flex-col items-center justify-center p-10 rounded-xl absolute bg-white"
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
