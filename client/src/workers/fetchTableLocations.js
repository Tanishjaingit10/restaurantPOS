import { WorkerBuilder } from "./WorkerBuilder";

export const fetchTableLocations_worker = WorkerBuilder(() => {
    onmessage = (message) => {
        let url, data;
        if (typeof message.data === "string") url = message.data;
        else {
            url = message?.data?.url;
            data = message.data?.data;
        }
        fetch(url, data)
            .then((res) => res.json())
            .then((res) => postMessage({ success: true, data: res }))
            .catch((err) => postMessage({ success: false, data: err }));
    };
});
