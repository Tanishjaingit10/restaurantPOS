/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/Theme";
import { NotificationContext } from "../context/Notification";
import SpinLoader from "./SpinLoader";
import KotCard from "./Kitchen/KotCard";

const Kitchen = () => {
    const theme = useContext(ThemeContext);
    const [kots, setKots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const notify = useContext(NotificationContext);

    const fetchKots = async () => {
        return axios
            .get("/app/getIncompleteKot")
            .then((res) => setKots(res.data))
            .catch((err) => notify(err?.response?.data?.message || "Error!!"));
    };

    useEffect(() => {
        setLoading(true);
        fetchKots().finally(() => setLoading(false));
    }, []);

    const handleRefresh = async () => {
        setRefreshLoading(true);
        axios
            .get("/app/getIncompleteKot")
            .then((res) => {
                notify("Orders Updated");
                setKots(res.data);
            })
            .catch((err) => notify(err?.response?.data?.message || "Error !!"))
            .finally(() => setRefreshLoading(false));
    };

    return (
        <>
            <div className="flex flex-col">
                {loading && <SpinLoader className="fixed top-1/2 right-1/2" />}
                <div className="flex h-24 items-center justify-between border-b-2 border-gray-300">
                    <p className="text-2xl text-gray-500 ml-6 font-bold ">
                        Kitchen Dashboard
                    </p>
                    <button
                        onClick={handleRefresh}
                        className="bg-red mr-6 p-4 leading-4 text-white rounded-md"
                        style={{ backgroundColor: theme.backgroundColor }}
                    >
                        <div
                            className={`${
                                refreshLoading && "animate-spin"
                            } rounded-full fas fa-sync-alt`}
                        />
                    </button>
                </div>
                {kots.length ? (
                    <div className="grid grid-cols-5 items-center justify-center">
                        {kots.map((item) => (
                            <div key={item._id}>
                                <KotCard setKots={setKots} item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-40 flex items-center justify-center font-semibold text-gray-400">
                        No Incomplete Orders
                    </div>
                )}
            </div>
        </>
    );
};

export default Kitchen;
