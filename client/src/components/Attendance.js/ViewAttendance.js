/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Loader from "../Loader";
import { ThemeContext } from "../../context/Theme";
import Select from "react-select";
import CustomButton from "../Common/CustomButton";
import { FiRefreshCcw } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from "@date-io/moment";
import { materialTheme } from "../../styles/clockMaterialTheme";
import { GrClose } from "react-icons/gr";
import CustomTable from "../Common/CustomTable";
import CustomPagination from "../Common/CustomPagination";
import { DownloadTable, PrintTable } from "../Common/download_print";
import { BackendUrl } from "../../config";

const ViewAttendance = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [componentLoading, setComponentLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [filterAttendanceStartDate, setFilterAttendanceStartDate] = useState(
        new Date()
    );
    const [filterAttendanceStopDate, setFilterAttendanceStopDate] = useState(
        new Date()
    );
    const [selectAttendanceFilter, setSelectAttendanceFilter] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [attendanceToShow, setAttendanceToShow] = useState([]);
    const theme = useContext(ThemeContext);
    const printTable = useRef();

    useEffect(() => {
        axios
            .get(`${BackendUrl}/app/users`)
            .then((res) => {
                if (res?.data) {
                    var dict = {};
                    for (var i = 0; i < res.data.length; i++)
                        dict[res.data[i]["_id"]] = res.data[i];
                    setUsers(dict);
                    return axios
                        .get(`${BackendUrl}/app/attendance`)
                        .then((res) => {
                            if (res?.data) setAttendance(res.data);
                        })
                        .catch((err) => console.error(err))
                        .finally(() => {
                            setLoading(false);
                            setComponentLoading(false);
                        });
                }
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

    const getAttendanceByDate = (startDate, endDate) => {
        setLoading(true);
        axios
            .get(`${BackendUrl}/app/getAttendanceByDate/${startDate}/${endDate}`)
            .then((res) => {
                if (res?.data) setAttendance(res?.data);
            })
            .catch((err) => console.log("1", err))
            .finally(() => setLoading(false));
    };

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
            {componentLoading ? <Loader /> : null}
            <div className="flex flex-col w-full">
                <div className="my-2 overflow-x-auto">
                    <div className="py-2 align-middle inline-block min-w-full px-5">
                        <div className="flex items-center justify-between my-5">
                            <h2 className="font-bold text-2xl text-gray-600">
                                Attendance
                            </h2>
                            <div className="flex flex-row items-center">
                                <CustomButton
                                    title="Select Date Range"
                                    customStyle={{
                                        backgroundColor: theme.backgroundColor,
                                    }}
                                    onPress={() => {
                                        setSelectAttendanceFilter(true);
                                    }}
                                />
                                <CustomButton
                                    title="Yesterday"
                                    customStyle={{
                                        backgroundColor: theme.backgroundColor,
                                    }}
                                    onPress={() => {
                                        getAttendanceByDate(
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
                                />
                                <CustomButton
                                    title="Today"
                                    customStyle={{
                                        backgroundColor: theme.backgroundColor,
                                    }}
                                    onPress={() => {
                                        getAttendanceByDate(
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
                                />
                            </div>
                        </div>
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
                                                        setComponentLoading(
                                                            true
                                                        );
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
                                                fileName="Attendance Report"
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
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Checked In
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Checked Out
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        attendance?.map((attendance, idx) => {
                                            return (
                                                <tr className="font-medium ">
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
                                                            {attendance?.date}
                                                        </div>
                                                    </th>
                                                    <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {
                                                                attendance?.checkInTime
                                                            }
                                                        </div>
                                                    </th>
                                                    <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                        <div className="text-base text-gray-500 font-semibold">
                                                            {
                                                                attendance?.checkOutTime
                                                            }
                                                        </div>
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
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Checked In
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
                                        >
                                            Checked Out
                                        </th>
                                    </tr>
                                    {loading ? (
                                        <Loader />
                                    ) : attendanceToShow?.length > 0 ? (
                                        attendanceToShow?.map(
                                            (attendance, idx) => {
                                                return (
                                                    <tr className="font-medium ">
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
                                                                {
                                                                    attendance?.date
                                                                }
                                                            </div>
                                                        </th>
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    attendance?.checkInTime
                                                                }
                                                            </div>
                                                        </th>
                                                        <th className="px-1 py-3 whitespace-nowrap border border-gray-400 text-center">
                                                            <div className="text-base text-gray-500 font-semibold">
                                                                {
                                                                    attendance?.checkOutTime
                                                                }
                                                            </div>
                                                        </th>
                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td colspan="6">
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
            {selectAttendanceFilter && (
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
                                                setSelectAttendanceFilter(false)
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
                                                    value={
                                                        filterAttendanceStartDate
                                                    }
                                                    onChange={(date) => {
                                                        setFilterAttendanceStartDate(
                                                            new Date(date)
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-")
                                                        );
                                                        getAttendanceByDate(
                                                            new Date(date)
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-"),
                                                            new Date(
                                                                filterAttendanceStopDate
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
                                                    value={
                                                        filterAttendanceStopDate
                                                    }
                                                    onChange={(date) => {
                                                        setFilterAttendanceStopDate(
                                                            new Date(date)
                                                                .toLocaleDateString(
                                                                    "pt-br"
                                                                )
                                                                .split("/")
                                                                .reverse()
                                                                .join("-")
                                                        );
                                                        getAttendanceByDate(
                                                            filterAttendanceStartDate,
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
        </div>
    );
};

export default ViewAttendance;
