import structuredClone from "@ungap/structured-clone";
import uuid from "react-uuid";
import axios from "axios";

export const deepClone = structuredClone;
export const getNewId = uuid;

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log(
            "** Server Error **",
            err?.response?.data,
            err?.response?.data?.stack
        );
    }
);
