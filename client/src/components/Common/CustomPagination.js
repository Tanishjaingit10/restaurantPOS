import React, { useState, useEffect, useContext, useRef } from "react";
import '../../styles/paginagtion.css';

const CustomPagination = ({pageNumber, setPageNumber, updatePageBtnDict, pageList, paginagtionBtn, incriment, setIncriment }) => {

  return(
  <div className="flex items-end justify-end my-8">
    <div className="mt-8">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
        <button href="#" disabled={pageNumber === 1 ? true : false} onClick={() => {setPageNumber((pageNumber) => pageNumber - 1); updatePageBtnDict('prev'); if (incriment >= 1 ) setIncriment((incriment) => incriment - 1)}} className="relative inline-flex items-center px-8 py-2 rounded border text-sm font-medium mx-1 pagination_btn">
          Previous
        </button>
        {
          pageList.slice(0 + incriment, 5 + incriment).map((i, idx) => {
            return (
              <button href="#"  id={"pagBtn" + String(i)} onClick={() => {setPageNumber(i); updatePageBtnDict(i)}} className={paginagtionBtn[i] ? "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn" + paginagtionBtn[i] : "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium mx-1 rounded pagination_btn"}>
                {i}
              </button>
            )
          })
        }
        <button href="#" disabled={pageNumber === pageList[pageList.length -1] ? true : false} onClick={() => {setPageNumber((pageNumber) => pageNumber + 1); updatePageBtnDict('next'); if (pageList.length - incriment > 5 ) setIncriment((incriment) => incriment + 1)}} className="relative inline-flex items-center px-8 py-2 rounded border border-red-600 bg-white text-sm font-medium mx-1 pagination_btn">
          Next
        </button>
      </nav>
    </div>
  </div>
  )
}

export default CustomPagination