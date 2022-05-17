/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ThemeContext } from "../../context/Theme";
import Select from "react-select";
import CustomButton from "../Common/CustomButton";
import { FiRefreshCcw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CustomTable from "../Common/CustomTable";
import CustomPagination from "../Common/CustomPagination";
import { DownloadTable, PrintTable } from "../Common/download_print";
import Popup from "../Popup";
import SpinLoader from "../SpinLoader";
import { BackendUrl } from "../../config";

const Attendance = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState(false);
    const [currAttendance, setCurrAttendance] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [attendanceToShow, setAttendanceToShow] = useState([]);
    const printTable = useRef();

    const theme = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios(`${BackendUrl}/app/users`)
            .then((res) => {
                if (res?.data) {
                    var dict = {};
                    for (var i = 0; i < res.data?.length; i++)
                        dict[res.data[i]["_id"]] = res.data[i];
                    setUsers(dict);
                    axios
                        .get(`${BackendUrl}/app/attendance`)
                        .then((res) => {
                            setLoading(false);
                            if (res?.data) setAttendance(res.data);
                        })
                        .catch((err) => console.error(err))
                        .finally(() => setLoading(false));
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [reload]);

    const updateAttendance = (attendance) => {
        setLoading(true);
        var updatedData = {};
        updatedData["date"] = attendance?.date;
        updatedData["userId"] = attendance?.user_id;
        if (attendance?.status === "Shift Not Started") {
            updatedData["status"] = "Clocked In";
            updatedData["checkInTime"] = new Date().toLocaleTimeString(
                "en-US",
                { hour12: false }
            );
            updatedData["checkOutTime"] = "N/A";
        } else if (attendance.status === "Clocked In") {
            updatedData["status"] = "Shift Completed";
            updatedData["checkInTime"] = attendance?.checkInTime;
            updatedData["checkOutTime"] = new Date().toLocaleTimeString(
                "en-US",
                { hour12: false }
            );
        }
        axios
            .put(`${BackendUrl}/app/updateAttendance/${attendance?._id}`, updatedData)
            .then((res) => setReload(!reload))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const options = [
        { value: 10, label: "10" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
        { value: 200, label: "200" },
    ];

    useEffect(() => {
        setPageNumber(1);
        setPageLimit(10);
        setAttendanceToShow(attendance?.slice(0, pageLimit));
    }, [attendance]);

    useEffect(() => {
        const start = (pageNumber - 1) * pageLimit;
        setAttendanceToShow(attendance?.slice(start, start + pageLimit));
    }, [pageNumber, pageLimit]);

    return (
        <div>
            {loading && <SpinLoader className="fixed top-1/2 left-1/2" />}
            <div className="flex flex-col w-full">
                <div className="overflow-x-auto">
                    <div className="flex h-24 bg-white items-center justify-between border-b-2 border-gray-300 pr-6">
                        <p className="flex-1 text-2xl text-gray-500 ml-6 font-bold">
                            Take Attendance
                        </p>
                        <button
                            onClick={() => navigate("/viewattendance")}
                            className="font-semibold px-8 leading-4 bg-red-500 mr-6 p-4 text-white rounded-md"
                        >
                            View Report
                        </button>
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
                                        defaultValue={options[0]}
                                        options={options}
                                        onChange={(value) =>
                                            setPageLimit(value?.value)
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
                                                theme?.backgroundColor,
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
                                        fileName="Atendance"
                                        tableId="DownloadTable"
                                    />
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
                                            SL.NO
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            colspan="2"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance?.map((attendance, idx) => {
                                        return (
                                            <tr className="">
                                                <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {idx +
                                                            1 +
                                                            (pageNumber - 1) *
                                                                pageLimit}
                                                    </div>
                                                </th>
                                                <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {
                                                            users[
                                                                attendance[
                                                                    "user_id"
                                                                ]
                                                            ]?.fullName
                                                        }
                                                    </div>
                                                </th>
                                                <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {
                                                            users[
                                                                attendance[
                                                                    "user_id"
                                                                ]
                                                            ]?.email_id
                                                        }
                                                    </div>
                                                </th>
                                                <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                    <div className="text-base text-gray-500 font-semibold">
                                                        {attendance?.date}
                                                    </div>
                                                </th>
                                                <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                    <div
                                                        className="text-base text-gray-500 font-semibold"
                                                        style={{
                                                            color: theme.backgroundColor,
                                                        }}
                                                    >
                                                        {attendance?.status}
                                                    </div>
                                                </th>
                                                <th className="px-1 py-2 whitespace-nowrap border border-gray-400 text-center">
                                                    {attendance.status !==
                                                    "Shift Completed" ? (
                                                        <CustomButton
                                                            customStyle={{
                                                                backgroundColor:
                                                                    theme.backgroundColor,
                                                                fontSize: 14,
                                                                width: 150,
                                                            }}
                                                            title={
                                                                attendance?.status ===
                                                                "Clocked In"
                                                                    ? "Clock Out"
                                                                    : "Clock In"
                                                            }
                                                            onPress={() => {
                                                                updateAttendance(
                                                                    attendance
                                                                );
                                                            }}
                                                        />
                                                    ) : null}
                                                </th>
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
                                            SL.NO
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            colspan="2"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                    {attendanceToShow?.length > 0 ? (
                                        attendanceToShow?.map(
                                            (attendance, idx) => {
                                                return (
                                                    <tr className="">
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <h5 className="text-base text-gray-500 font-semibold">
                                                                {idx +
                                                                    1 +
                                                                    (pageNumber -
                                                                        1) *
                                                                        pageLimit}
                                                            </h5>
                                                        </th>
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <h5 className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    users[
                                                                        attendance[
                                                                            "user_id"
                                                                        ]
                                                                    ]?.fullName
                                                                }
                                                            </h5>
                                                        </th>
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <h5 className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    users[
                                                                        attendance[
                                                                            "user_id"
                                                                        ]
                                                                    ]?.email_id
                                                                }
                                                            </h5>
                                                        </th>
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <h5 className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    attendance?.date
                                                                }
                                                            </h5>
                                                        </th>
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <h5
                                                                className="text-base text-gray-500 font-semibold"
                                                                style={{
                                                                    color: theme.backgroundColor,
                                                                }}
                                                            >
                                                                {
                                                                    attendance?.status
                                                                }
                                                            </h5>
                                                        </th>
                                                        <th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
                                                            {attendance?.status !==
                                                            "Shift Completed" ? (
                                                                <CustomButton
                                                                    customStyle={{
                                                                        backgroundColor:
                                                                            theme.backgroundColor,
                                                                        fontSize: 14,
                                                                        width: 150,
                                                                    }}
                                                                    title={
                                                                        attendance?.status ===
                                                                        "Clocked In"
                                                                            ? "Clock Out"
                                                                            : "Clock In"
                                                                    }
                                                                    onPress={() => {
                                                                        setCurrAttendance(
                                                                            attendance
                                                                        );
                                                                        setAttendanceStatus(
                                                                            true
                                                                        );
                                                                    }}
                                                                />
                                                            ) : null}
                                                        </th>
                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
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
                            length={attendance?.length}
                            pageLimit={pageLimit}
                        />
                    </div>
                </div>
            </div>
            {attendanceStatus && (
                <Popup
                    content={
                        <>
                            <p className="pb-4 font-bold text-red-500">
                                {currAttendance?.status === "Clocked In"
                                    ? "Clock Out"
                                    : "Clock In"}
                            </p>
                            <button
                                className="bg-green px-10 py-2 rounded"
                                onClick={() => {
                                    updateAttendance(currAttendance);
                                    setAttendanceStatus(false);
                                }}
                            >
                                Yes
                            </button>
                        </>
                    }
                    handleClose={() => setAttendanceStatus(false)}
                />
            )}
        </div>
    );
};

export default Attendance;
