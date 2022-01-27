// import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useContext } from "react";
import ReactToPrint from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useReactToPrint } from 'react-to-print';
import { ThemeContext } from "../../context/Theme";

const DownloadTable = ({fileName, tableId}) => {
  return(
    <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className="text-white py-2 px-10 rounded-md mx-2 font-medium shadow-md downloadTable"
      table={tableId}
      filename={fileName}
      sheet={fileName}
      buttonText="Download"/>
  )
}

const PrintTable = ({printTableRef, children, onPress, setOnPrint}) => {
  const theme = useContext(ThemeContext);
  console.log(printTableRef, children);
  
  return (

  <ReactToPrint
    trigger={() => <button
      style={{backgroundColor: theme.backgroundColor}}
      className="text-white py-2 px-10 rounded-md mx-2 font-medium shadow-md" onClick={() => setOnPrint('on-')}
    >
      Print
    </button>}
    content={() => printTableRef.current}
  />
  )
}

export { DownloadTable, PrintTable }