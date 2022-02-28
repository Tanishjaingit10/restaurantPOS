/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import Loader from "../Loader";
import { ThemeContext } from "../../context/Theme";
import Select from "react-select";
import CustomButton from "../Common/CustomButton";
import { FiRefreshCcw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CustomTable from "../Common/CustomTable";
import CustomPagination from "../Common/CustomPagination";
import { DownloadTable, PrintTable } from "../Common/download_print";
import Popup from "../Popup";

const Attendance = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [componentLoading, setComponentLoading] = useState(false);
    const [attendanceStatus, setAttendanceStatus] = useState(false);
    const [currAttendance, setCurrAttendance] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [attendanceToShow, setAttendanceToShow] = useState([]);
    const printTable = useRef();

    const theme = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/app/users")
            .then((res) => res.json())
            .then((json) => {
                if (json !== "undefined") {
                    var dict = {};
                    for (var i = 0; i < json?.length; i++) {
                        dict[json[i]["_id"]] = json[i];
                    }
                    setUsers(dict);
                    fetch("/app/attendance")
                        .then((res) => res?.json())
                        .then((json) => {
                            setLoading(false);
                            if (json !== "undefined") setAttendance(json);
                        })
                        .catch((err) => console.error(err))
                        .finally(() => setComponentLoading(false));
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [reload]);

    const updateAttendance = (attendance) => {
        setComponentLoading(true);
        var updatedData = {};
        updatedData["date"] = attendance?.date;
        updatedData["userId"] = attendance?.user_id;
        if (attendance.status === "Shift Not Started") {
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
        fetch(`/app/updateAttendance/${attendance?._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => setReload(!reload))
            .catch((err) => console.log(err))
            .finally(() => setComponentLoading(false));
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
        setAttendanceToShow(attendance.slice(start, start + pageLimit));
    }, [pageNumber, pageLimit]);

    return (
        <div>
            {componentLoading ? <Loader /> : null}
            <div className="flex flex-col w-full">
                <div className="my-2 overflow-x-auto">
                    <div className="py-2 align-middle inline-block min-w-full px-5">
                        <div className="py-4 inline-block w-full">
                            <div className="inline-block w-full">
                                <h1 className="text-lg inline-block font-bold text-gray-600">
                                    Take Attendance
                                </h1>
                                <CustomButton
                                    customStyle={{
                                        backgroundColor: theme.backgroundColor,
                                        float: "right",
                                    }}
                                    title="View Report"
                                    onPress={() => {
                                        navigate("/viewattendance");
                                    }}
                                />
                            </div>
                        </div>
                        <hr />
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
                                                setComponentLoading(true);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <FiRefreshCcw size={22} />
                                        </i>
                                    </div>
                                    <PrintTable printTableRef={printTable} />

                                    {/* <CustomButton
									title="Print"
									customStyle={{ backgroundColor: theme.backgroundColor }}
								/> */}
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
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        attendance?.map((attendance, idx) => {
                                            return (
                                                <tr className="">
                                                    <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {idx +
                                                                1 +
                                                                (pageNumber -
                                                                    1) *
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
                                                                ].fullName
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
                                                                ].email_id
                                                            }
                                                        </div>
                                                    </th>
                                                    <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {attendance.date}
                                                        </div>
                                                    </th>
                                                    <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div
                                                            className="text-base text-gray-500 font-semibold"
                                                            style={{
                                                                color: theme.backgroundColor,
                                                            }}
                                                        >
                                                            {attendance.status}
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
                                                                    attendance.status ===
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
                                        })
                                    )}
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
                                    {loading ? (
                                        <Loader />
                                    ) : attendanceToShow.length > 0 ? (
                                        attendanceToShow.map(
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
                                                                    ].fullName
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
                                                                    ].email_id
                                                                }
                                                            </h5>
                                                        </th>
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <h5 className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    attendance.date
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
                                                                    attendance.status
                                                                }
                                                            </h5>
                                                        </th>
                                                        <th className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
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
                                                                        attendance.status ===
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
                                            <td colspan="6">
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
