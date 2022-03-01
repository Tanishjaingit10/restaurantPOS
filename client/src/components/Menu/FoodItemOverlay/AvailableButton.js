/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TimePicker from "react-gradient-timepicker";
import days from "../../.././days";
import { Modal } from "../../Common/Modal";

const allTime = "allTime";
const custom = "custom";
function AvailableButton({ state: parentState, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);
    const [availabilityType, setAvailabilityType] = useState(allTime);
    const [finalAvailable, setFinalAvailable] = useState([]);

    useEffect(() => {
        setFinalAvailable(parentState.finalAvailable);
        setAvailabilityType(parentState.availabilityType);
        // eslint-disable-next-line
    }, []);

    const handleSubmit = () => {
        parentState.setFinalAvailable(finalAvailable);
        parentState.setAvailabilityType(availabilityType);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                {...rest}
            >
                {availabilityType === "allTime" ? "All Time" : "Custom"}
                <span className="fas fa-chevron-down" />
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="max-h-screen overflow-y-auto px-20 p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red-500 font-semibold">
                    Available
                </div>
                <div className="flex flex-col">
                    <div className="flex mb-4">
                        <div className="mt-2 text-red-500">
                            <button
                                onClick={() => setAvailabilityType(custom)}
                                className={` far fa-${
                                    availabilityType === custom ? "dot-" : ""
                                }circle`}
                            />
                        </div>
                        <div className="ml-4">
                            {days?.map((day) => (
                                <div key={day.day}>
                                    <SingleDay
                                        availType={availabilityType}
                                        finalAvailable={finalAvailable}
                                        day={day}
                                        setFinalAvailable={setFinalAvailable}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setAvailabilityType(allTime)}
                        className="text-red-500 flex items-center w-40"
                    >
                        <div
                            className={` far fa-${
                                availabilityType === allTime ? "dot-" : ""
                            }circle`}
                        />
                        <div className="ml-10 font-bold text-gray-500">
                            All Time
                        </div>
                    </button>
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="m-3 rounded-lg p-3 px-10 font-medium bg-red-500 text-white"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

function SingleDay({ day, finalAvailable, setFinalAvailable, availType }) {
    const [available, setAvailable] = useState({
        day: day.day,
        startTime: "",
        endTime: "",
        checked: false,
    });

    useEffect(() => {
        for (let avail of finalAvailable)
            if (avail?.day === day?.day) setAvailable(avail);
    }, []);

    const handleTimeChange = (name, value) => {
        setAvailable((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setFinalAvailable((prev) => {
            let found = 0;
            for (let i = 0; i < prev?.length; i++)
                if (prev[i].day === available?.day) {
                    prev[i] = available;
                    found = 1;
                }
            if (!found) prev.push(available);
            return prev;
        });
    }, [available]);

    return (
        <div className="flex items-center mb-4">
            <button
                disabled={availType === allTime}
                onClick={() =>
                    setAvailable((e) => ({ ...e, checked: !e?.checked }))
                }
                className="w-40 font-bold text-left relative text-gray-500"
            >
                {availType === custom && (
                    <div
                        className={`${
                            available?.checked
                                ? "fas fa-check-square"
                                : "far fa-square"
                        } text-red-400 absolute left-0 top-1/2 transform -translate-y-1/2`}
                    />
                )}
                <div className="ml-8">{day?.day}</div>
            </button>
            <TimePicker
                placeholder={available?.startTime || "Start Time"}
                className={`rounded p-2 w-52 ml-6 text-center placeholder-white ${
                    available?.startTime && "font-bold"
                } bg-red-400 text-white`}
                onSet={(val) => handleTimeChange("startTime", val?.format12)}
            />
            <TimePicker
                placeholder={available?.endTime || "End Time"}
                className={`rounded p-2 w-52 ml-6 text-center placeholder-white ${
                    available.endTime && "font-bold"
                } bg-red-400 text-white`}
                onSet={(val) => handleTimeChange("endTime", val?.format12)}
            />
        </div>
    );
}

export default AvailableButton;
