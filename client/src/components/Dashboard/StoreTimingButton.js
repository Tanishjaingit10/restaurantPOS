/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import TimePicker from "react-gradient-timepicker";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";
import days from "../../days";
import { getNewId } from "../../Utils";

function StoreTimingButton() {
    const alwaysOpen = "Always open";
    const noHoursAvailable = "No hours available";
    const permanentlyClosed = "Permanently closed";
    const openDuringselectedHours = "Open During Selected hours";
    const availabilityType = [
        alwaysOpen,
        noHoursAvailable,
        permanentlyClosed,
        openDuringselectedHours,
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState();
    const [selectedHours, setSelectedHours] = useState({});

    const handleSubmit = (availability, selectedHours) => {
        const dataToPost = {
            timings: availability,
        };
        if (selectedHours) dataToPost.selectedHours = selectedHours;
        setLoading(true);
        return axios
            .post("/app/updateStoreInfo", dataToPost)
            .then(() => {})
            .catch((err) => {})
            .finally(() => setLoading(false));
    };

    const handleChange = (avail) => {
        setAvailability(avail);
        handleSubmit(avail);
    };

    useEffect(() => {
        axios.get("/app/getStoreInfo").then((res) => {
            if(res?.data?.timings)
                setAvailability(res.data.timings);
            if(res?.data?.selectedHours)
                setSelectedHours(res.data.selectedHours);
        });
    }, []);

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex m-4 font-semibold mb-8"
            >
                <div className="flex items-center text-red-500">
                    <i className="fas fa-clock" />
                    <div className="ml-2">Store Timing:</div>
                    <div className="mx-2 text-gray-500">{availability}</div>
                    <i className="fas fa-pen text-xs" />
                </div>
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="max-h-screen overflow-y-auto p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-2xl mb-6 text-red-500 font-semibold">
                    Store Timing
                </div>
                <div className="flex flex-col text-red-500 items-start gap-4 mr-12">
                    {availabilityType.map((avail) => (
                        <button
                            key={avail}
                            onClick={() => handleChange(avail)}
                            className="text-lg font-semibold"
                        >
                            <span
                                className={`mr-3 far fa-${
                                    availability === avail ? "dot-" : ""
                                }circle`}
                            />
                            {avail}
                        </button>
                    ))}
                    {availability === openDuringselectedHours ? (
                        <div className="flex flex-col items-center gap-2">
                            {days?.map((day) => (
                                <div key={day?.day}>
                                    <SingleDay
                                        day={day}
                                        selectedHours={selectedHours}
                                        setSelectedHours={setSelectedHours}
                                    />
                                </div>
                            ))}
                            <button
                                onClick={() =>
                                    handleSubmit(availability, selectedHours)
                                }
                                className={`${
                                    availability === openDuringselectedHours ||
                                    "hidden"
                                } px-8 py-1 mt-4 bg-red-500 text-white rounded-md`}
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default StoreTimingButton;

function SingleDay({ day, selectedHours, setSelectedHours }) {
    const [isChecked, setIsChecked] = useState(
        selectedHours[day.day]?.isChecked || false
    );
    const [hours, setHours] = useState(
        selectedHours[day.day]?.hours || [
            {
                startTime: "",
                endTime: "",
                key: getNewId(),
            },
        ]
    );

    const handleTimeChange = (name, value, key) => {
        setHours((prev) => {
            const item = prev.find((it) => it?.key === key);
            item[name] = value;
            return [...prev];
        });
    };

    const addHandler = () => {
        setHours((prev) => [
            ...prev,
            {
                startTime: "",
                endTime: "",
                key: getNewId(),
            },
        ]);
    };

    const handleRemove = (key) => {
        setHours((prev) => prev?.filter((it) => it?.key !== key));
    };

    const handleCheckmark = (updated) => {
        setIsChecked(updated);
        setSelectedHours((prev) => ({
            ...prev,
            [day.day]: { ...prev[day.day], isChecked: updated },
        }));
    };

    useEffect(() => {
        setSelectedHours((prev) => ({
            ...prev,
            [day.day]: { ...prev[day.day], hours },
        }));
    }, [hours]);

    return (
        <div className="flex items-center">
            <div className="flex">
                <button
                    onClick={() => handleCheckmark(!isChecked)}
                    className="w-32 flex justify-start items-center font-bold"
                >
                    <div
                        className={`${
                            isChecked ? "fas fa-check-square" : "far fa-square"
                        } text-red-400 mr-3`}
                    />
                    {day?.day}
                </button>
                <div className="flex flex-col gap-2">
                    {hours.map((avail, index) => (
                        <div key={avail?.key} className="flex">
                            <TimePicker
                                placeholder={avail.startTime || "Opening"}
                                className={`rounded p-1 w-32 ml-6 text-center placeholder-white ${
                                    avail?.startTime && "font-bold"
                                } bg-red-400 text-white`}
                                onSet={(val) =>
                                    handleTimeChange(
                                        "startTime",
                                        val?.format12,
                                        avail?.key
                                    )
                                }
                            />
                            <TimePicker
                                placeholder={avail.endTime || "Closing"}
                                className={`rounded p-1 w-32 ml-6 text-center placeholder-white ${
                                    avail?.endTime && "font-bold"
                                } bg-red-400 text-white`}
                                onSet={(val) =>
                                    handleTimeChange(
                                        "endTime",
                                        val.format12,
                                        avail.key
                                    )
                                }
                            />
                            <div className="w-20 flex">
                                <button
                                    onClick={addHandler}
                                    className="fas fa-plus h-8 w-8 flex-shrink-0 ml-3 bg-red-400 text-white rounded-md"
                                />
                                {hours?.length > 1 && (
                                    <button
                                        onClick={() => handleRemove(avail?.key)}
                                        className="fas fa-times h-8 w-8 flex-shrink-0 ml-2 bg-red-400 text-white rounded-md"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
