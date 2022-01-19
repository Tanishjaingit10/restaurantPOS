import React, { useEffect, useState } from "react";
import TimePicker from "react-gradient-timepicker";
import days from "../../.././days";
import { Modal } from "../../Utils";

function AvailableButton({ state: parentState }) {
    const [isOpen, setIsOpen] = useState(false);
    const [availabilityType, setAvailabilityType] = useState("allTime");
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
            <label htmlFor="Available">Available</label>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                id="Available"
                className="p-3 flex items-center justify-between bg-lightred text-white w-full rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
            >
                {availabilityType === "allTime" ? "All Time" : "Custom"}{" "}
                <span className="fas fa-chevron-down" />
            </button>

            <Modal
                isOpen={isOpen}
                controller={setIsOpen}
                className="px-20 p-10 flex flex-col items-center relative bg-white rounded-xl"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="fas fa-times absolute p-6 text-2xl right-0 top-0 leading-4 rounded-lg"
                />
                <div className="text-center text-3xl mb-6 text-red font-semibold">
                    Available
                </div>
                <div className="flex flex-col">
                    <div className="flex mb-4">
                        <input
                            type="radio"
                            className="mt-4"
                            onChange={(e) => {
                                setAvailabilityType(e.target.value);
                            }}
                            checked={availabilityType === "custom"}
                            name="Availablity"
                            value="custom"
                        />
                        <div className="ml-10">
                            {days.map((day) => (
                                <div key={day.day}>
                                    <SingleDay
                                        finalAvailable={finalAvailable}
                                        day={day}
                                        setFinalAvailable={setFinalAvailable}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <input
                            type="radio"
                            onChange={(e) => {
                                setAvailabilityType(e.target.value);
                            }}
                            checked={availabilityType === "allTime"}
                            id="allTime"
                            name="Availablity"
                            value="allTime"
                        />
                        <label
                            className="ml-10 font-bold text-gray-500"
                            for="allTime"
                        >
                            All Time
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="m-3 rounded-lg p-3 px-10 font-medium bg-red text-white"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

function SingleDay({ day, finalAvailable, setFinalAvailable }) {
    const [available, setAvailable] = useState({
        day: day.day,
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        for (let avail of finalAvailable)
            if (avail.day === day.day) setAvailable(avail);
        // eslint-disable-next-line
    }, []);

    const handleTimeChange = (name, value) => {
        setAvailable((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setFinalAvailable((prev) => {
            let found = 0;
            for (let i = 0; i < prev.length; i++)
                if (prev[i].day === available.day) {
                    prev[i] = available;
                    found = 1;
                }
            if (!found) prev.push(available);
            return prev;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [available]);

    return (
        <div className="flex items-center mb-4">
            <div className="w-40 font-bold text-gray-500">{day.day}</div>
            <TimePicker
                placeholder={available.startTime || "Start Time"}
                className={`rounded p-2 w-52 ml-6 text-center placeholder-white ${
                    available.startTime && "font-bold"
                } bg-lightred text-white`}
                onSet={(val) => handleTimeChange("startTime", val.format12)}
            />
            <TimePicker
                placeholder={available.endTime || "End Time"}
                className={`rounded p-2 w-52 ml-6 text-center placeholder-white ${
                    available.endTime && "font-bold"
                } bg-lightred text-white`}
                onSet={(val) => handleTimeChange("endTime", val.format12)}
            />
        </div>
    );
}

export default AvailableButton;
