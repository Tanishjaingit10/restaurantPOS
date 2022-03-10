import React from "react";

const CustomTable = ({ children, id }) => {
    return (
        <table className="min-w-full divide-y divide-x divide-gray-200" id={id}>
            <thead className="bg-red-500">{children[0]}</thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {children[1]}
            </tbody>
        </table>
    );
};

export default CustomTable;
