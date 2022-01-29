/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { getNewId } from "./Utils";

function Test() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div>{getNewId()}</div>
        </div>
    );
}

export default Test;
