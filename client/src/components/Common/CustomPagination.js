import React from "react";
import "../../styles/paginagtion.css";

const CustomPagination = ({ pageNumber, setPageNumber, length, pageLimit }) => {
    const numberOfPages = Math.ceil(length / pageLimit);
    let pageList = [];
    for (let i = pageNumber - 4; i < pageNumber + 5; i++) {
        if (0 < i && i <= numberOfPages)
            pageList.push([Math.abs(pageNumber - i), i]);
    }
    pageList = pageList
        .sort()
        .slice(0, 5)
        .map((x) => x[1])
        .sort((a, b) => (a > b ? 1 : -1));

    return (
        <div
            className={`${
                numberOfPages < 2 && "hidden"
            } flex items-end justify-end my-8`}
        >
            <div className="mt-8">
                <nav
                    className="relative z-0 inline-flex rounded-md"
                    aria-label="Pagination"
                >
                    <button
                        disabled={pageNumber === 1}
                        onClick={() => setPageNumber((e) => e - 1)}
                        className="relative shadow inline-flex items-center px-8 py-2 rounded border text-sm font-medium mx-1 pagination_btn"
                    >
                        Previous
                    </button>
                    {pageList.map((num) => (
                        <NumberButton
                            number={num}
                            active={pageNumber === num}
                            setPageNumber={setPageNumber}
                        />
                    ))}
                    {pageList[pageList.length - 1] !== numberOfPages && (
                        <>
                            {pageList[pageList.length - 1] !==
                                numberOfPages - 1 && (
                                <i className="fa-solid fa-ellipsis flex items-end text-red-500 leading-3" />
                            )}
                            <NumberButton
                                number={numberOfPages}
                                active={pageNumber === numberOfPages}
                                setPageNumber={setPageNumber}
                            />
                        </>
                    )}
                    <button
                        disabled={pageNumber === numberOfPages}
                        onClick={() => setPageNumber((e) => e + 1)}
                        className="shadow relative inline-flex items-center px-8 py-2 rounded border border-red-500-600 bg-white text-sm font-medium mx-1 pagination_btn"
                    >
                        Next
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default CustomPagination;

function NumberButton({ number, active, setPageNumber }) {
    return (
        <button
            onClick={() => setPageNumber(number)}
            className={`${
                active ? "bg-red-500 text-white" : "text-red-500 "
            } z-10 shadow border-red-500 hover:bg-red-500 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded`}
        >
            {number}
        </button>
    );
}
