// import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useContext } from "react";
import ReactToPrint from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { ThemeContext } from "../../context/Theme";
import ReactToPdf from "react-to-pdf";

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
  console.log(printTableRef);
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

const DownloadOrderDetail = ({fileName, orderDetailref}) => {
  const theme = useContext(ThemeContext);
  return(
    <ReactToPdf targetRef={orderDetailref} filename="div-blue.pdf" scale={0.7}>
        {({toPdf}) => (
            <button onClick={toPdf} className="py-2 px-5 rounded" style={{color: theme.backgroundColor, backgroundColor: 'white', width: 200}}>Download</button>
        )}
    </ReactToPdf>
  )
}

const PrintOrderDetail = ({printOrderDetailRef}) => {
  const theme = useContext(ThemeContext);
  console.log(printOrderDetailRef);
  return (
  <ReactToPrint
    trigger={() => <button
      className="py-2 px-5 rounded" style={{color: theme.backgroundColor, backgroundColor: 'white', width: 200}}
    >
      Print Invoice
    </button>}
    content={() => printOrderDetailRef.current}
  />
  )
}

export { DownloadTable, PrintTable, DownloadOrderDetail, PrintOrderDetail }