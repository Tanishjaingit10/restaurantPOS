import React, { useState, createContext, useEffect } from "react";
import { getNewId } from "../Utils";

export const NotificationContext = createContext();

export const NotificationProvider = (props) => {
    const [notifications, setNotifications] = useState([]);

    const notify = (message) => {
        setNotifications((prev) => [...prev, { key: getNewId(), message }]);
    };

    return (
        <div>
            <div className="fixed w-96 z-50 flex flex-col-reverse right-3 bottom-0">
                {notifications.map((item) => (
                    <div className="w-full" key={item.key}>
                        <SingleNotification
                            item={item}
                            setNotifications={setNotifications}
                        />
                    </div>
                ))}
            </div>
            <NotificationContext.Provider value={notify}>
                {props.children}
            </NotificationContext.Provider>
        </div>
    );
};

const SingleNotification = ({ item, setNotifications }) => {
    const [fade, setFade] = useState(false);
    const deleteNotification = () =>
        setNotifications((prev) => prev.filter((e) => e.key !== item.key));
    useEffect(() => {
        const deleteTimeout = setTimeout(() => deleteNotification(), 5000);
        const fadeTimeout = setTimeout(() => setFade(true), 4000);
        return () => {
            clearTimeout(deleteTimeout);
            clearTimeout(fadeTimeout);
        };
        // eslint-disable-next-line
    }, []);
    return (
        <div
            className={`rounded-xl relative ${
                fade ? "animate-fade" : "animate-left"
            } transform bg-white shadow-md border text-lg font-semibold p-8 pr-12 text-white mb-4`}
        >
            <button
                onClick={deleteNotification}
                className="fas fa-times absolute text-black top-0 right-0 p-5 pt-4 rounded-lg"
            />
            <div className="text-red-500 text-center">
                {typeof (item.message) === "string"
                    ? item.message
                    : <div>{item.message.map((mes, index) => (
                          <div key={index}>{mes}</div>
                      ))}</div>
                }
            </div>
        </div>
    );
};
