
import React, { useState } from "react";
import ReactModal from "react-modal";
import TimePicker from 'react-gradient-timepicker';
import days from '../../days'

function AvailableButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [allTime, setAllTime] = useState(false)
    const [finalAvailable, setFinalAvailable] = useState({})
    
    return (
        <>
            <label htmlFor="Available">Available</label>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                id="Available"
                className="p-3 flex items-center justify-between bg-lightred text-white w-full rounded-md border-gray-300 border outline-none transition duration-150 ease-in-out mb-4"
            >
                Available <span className="fas fa-chevron-down"/>
            </button>

            <ReactModal
                isOpen={isOpen}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(2px)",
                    },
                }}
                contentLabel={"Add Category Modal"}
                className={
                    "flex justify-center absolute z-50 items-center w-screen h-screen"
                }
            >
                <div className="w-7/12 p-10 flex flex-col items-center relative bg-white rounded-xl">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="fas fa-times absolute text-2xl right-6 top-4"
                    />
                    <div className="text-center font-semibold text-3xl mb-6 text-red font-semibold">
                        Available
                    </div>
                    <div className="flex flex-col">
                        <div className="flex mb-4">
                            <input type="radio" className="mt-4" name="Availablity"/>
                            <div className="ml-10">
                                {days.map(day => <Day day={day}/>)}
                            </div>
                        </div>
                        <div>
                            <input type="radio" id="allTime" name="Availablity"/>
                            <label className="ml-10" for="allTime">All Time</label>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="m-3 rounded-lg p-3 px-10 font-medium bg-red text-white">
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    );
}

function Day({day}) {
    const [available, setAvailable] = useState({day:day.day,startTime:"",endTime:""})

    const handleTimeChange = (name,value) => {
        setAvailable(prev=>({...prev,[name]:value}))
    }
    
    return (
        <div className="flex items-center mb-4" id={day.id}>
            <div className="w-40">{day.day}</div>
            <TimePicker
                placeholder={available.startTime || "Start Time"}
                className={`rounded p-2 w-52 ml-6 text-center placeholder-white ${available.startTime && "font-bold"} bg-lightred text-white`}
                onSet={(val) => handleTimeChange("startTime",val.format12)}
            />
            <TimePicker
                placeholder={available.endTime || "End Time"}
                className={`rounded p-2 w-52 ml-6 text-center placeholder-white ${available.endTime && "font-bold"} bg-lightred text-white`}
                onSet={(val) => handleTimeChange("endTime",val.format12)}
            />
        </div>
    )
}


export default AvailableButton;
