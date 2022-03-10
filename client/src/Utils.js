import structuredClone from "@ungap/structured-clone";
import uuid from "react-uuid";
import axios from "axios";

export const deepClone = structuredClone;
export const getNewId = uuid;

// Date to 2021-10-24 16:21:23 (yyyy-mm-dd hh:mm:ss)
export const formatDate = (date) => {
    return (
        [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, "0"),
            date.getDate().toString().padStart(2, "0"),
        ].join("-") +
        " " +
        [
            date.getHours().toString().padStart(2, "0"),
            date.getMinutes().toString().padStart(2, "0"),
            date.getSeconds().toString().padStart(2, "0"),
        ].join(":")
    );
};

// HH:MM:SS to Date
export const timeToDate = (time) => {
    return new Date(formatDate(new Date()).split(" ")[0] + " " + time);
};

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err?.response?.data?.stack)
            console.log(
                "** Server Error **",
                err?.response?.data,
                err?.response?.data?.stack
            );
        return Promise.reject(err);
    }
);
