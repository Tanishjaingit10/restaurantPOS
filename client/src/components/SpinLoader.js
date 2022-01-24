import React from "react";

function SpinLoader({ className }) {
    return (
        <div className={(className || "absolute top-1/2 left-1/2") + " z-50 "}>
            <div className="h-0 w-0 relative">
                <div className="p-2 absolute top-0 border left-0 transform -translate-y-1/2 -translate-x-1/2 rounded-full h-14 w-14 bg-white shadow-md">
                    <div
                        className="h-full w-full rounded-full border-solid border-4 border-red animate-spin"
                        style={{ borderTopColor: "transparent" }}
                    />
                </div>
                <div className="p-2 absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 rounded-full h-14 w-14 bg-white shadow-md">
                    <div
                        className="h-full w-full rounded-full border-solid border-4 border-red animate-spin"
                        style={{ borderTopColor: "transparent" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SpinLoader;
