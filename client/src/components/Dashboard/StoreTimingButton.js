import axios from "axios";
import React, { useEffect, useState } from "react";
import TimePicker from "react-gradient-timepicker";
import SpinLoader from "../SpinLoader";
import { Modal } from "../Common/Modal";
import days from "../../days";
import { getNewId } from "../../Utils";

function StoreTimingButton() {
    const alwaysOpen = "Always open";
    const noHoursAvailable = "No hours available";
    const permanentlyClosed = "Permanently closed";
    const selectedHours = "Open During Selected hours";
    const availabilityType = [
        alwaysOpen,
        noHoursAvailable,
        permanentlyClosed,
        selectedHours,
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState(alwaysOpen);

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex m-4 font-semibold mb-8"
            >
                <div className="flex items-center text-red">
                    <i className="fas fa-clock" />
                    <div className="ml-2">Store Timing:</div>
                    <div className="mx-2 text-gray-500">{availability}</div>
                    <i className="fas fa-pen text-xs" />
                </div>
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                {loading && <SpinLoader />}
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-2xl mb-6 text-red font-semibold">
                    Store Timing
                </div>
                <div className="flex flex-col text-red items-start gap-4 mr-12">
                    {availabilityType.map((avail) => (
                        <button
                            key={avail}
                            onClick={() => setAvailability(avail)}
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
                    {availability === selectedHours ? (
                        <div className="flex flex-col items-center gap-2">
                            {days.map((day) => (
                                <div key={day.day}>
                                    <SingleDay
                                        // finalAvailable={finalAvailable}
                                        day={day}
                                        // setFinalAvailable={setFinalAvailable}
                                    />
                                </div>
                            ))}
                            <button className="px-8 py-1 mt-4 bg-red text-white rounded-md">
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

function SingleDay({ day, finalAvailable, setFinalAvailable }) {
    const [available, setAvailable] = useState([
        {
            day: day.day,
            startTime: "",
            endTime: "",
            key: getNewId(),
        },
    ]);

    const handleTimeChange = (name, value) => {
        setAvailable((prev) => ({ ...prev, [name]: value }));
    };

    const addHandler = () => {
        setAvailable((prev) => [
            ...prev,
            {
                day: day.day,
                startTime: "",
                endTime: "",
                key: getNewId(),
            },
        ]);
    };

    return (
        <div className="flex items-center">
            <div className="flex">
                <div className="w-24 font-bold">{day.day}</div>
                <div className="flex flex-col gap-2">
                    {available.map((avail, index) => (
                        <div key={avail.key} className="flex">
                            <TimePicker
                                placeholder={avail.startTime || "Opening"}
                                className={`rounded p-1 w-32 ml-6 text-center placeholder-white ${
                                    avail.startTime && "font-bold"
                                } bg-lightred text-white`}
                                onSet={(val) =>
                                    handleTimeChange("startTime", val.format12)
                                }
                            />
                            <TimePicker
                                placeholder={avail.endTime || "Closing"}
                                className={`rounded p-1 w-32 ml-6 text-center placeholder-white ${
                                    avail.endTime && "font-bold"
                                } bg-lightred text-white`}
                                onSet={(val) =>
                                    handleTimeChange("endTime", val.format12)
                                }
                            />
                            <div className="w-20 flex">
                                <button
                                    onClick={addHandler}
                                    className="fas fa-plus h-8 w-8 flex-shrink-0 ml-3 bg-lightred text-white rounded-md"
                                />
                                {index !== 0 && (
                                    <button
                                        onClick={()=>setAvailable(prev=>prev.filter(it=>it.key!==avail.key))}
                                        className="fas fa-times h-8 w-8 flex-shrink-0 ml-2 bg-lightred text-white rounded-md"
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
