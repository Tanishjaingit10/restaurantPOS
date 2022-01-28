import React, { useState, useEffect, useContext, useRef } from "react";
import Loader from "./Loader";
import Popup from "./Popup";
import { ThemeContext } from "../context/Theme";
import CustomButton from "./Common/CustomButton";
import Select from 'react-select';
import { FiRefreshCcw } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {ThemeProvider} from "@material-ui/styles";
import MomentUtils from '@date-io/moment';
import {materialTheme} from '../styles/clockMaterialTheme';
import { GrClose } from 'react-icons/gr';
import CustomTable from './Common/CustomTable';
import CustomPagination from './Common/CustomPagination';
import { DownloadTable, PrintTable } from './Common/download_print';

const TakeAwayOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [pageLimit, setPageLimit] = useState(10);
	const [reload, setReload] = useState(false)
	const [pageList, setPageList] = useState([])
	const [paginagtionBtn, setPaginagtionBtn] = useState({}) 
	const [componentLoading, setComponentLoading] = useState(false)
	const [filterOrderStartDate, setFilterOrderStartDate] = useState(new Date())
	const [filterOrderStopDate, setFilterOrderStopDate] = useState(new Date())
	const [selectOrderFilter, setSelectOrderFilter] = useState(false)
	const [completedOrders, setCompletedOrders] = useState(0)
	const [pendingOrders, setPendingOrders] = useState(0)
	const [cancelledOrders, setCancelledOrders] = useState(0)
  const [incriment, setIncriment] = useState(0)
  const theme = useContext(ThemeContext);
  const printTable = useRef();

	useEffect(() => {
    setPageList([])
		fetch("/app/getTakeAwayOrders")
		.then((res) => res.json())
		.then((json) => {
			if (json !== "undefined") {
				setOrders(json);
				console.log(json)
				setComponentLoading(false)
				setLoading(false)
        var completedOrders = 0;
        var pendingOrders = 0;
        var cancelledOrders = 0;
        
				for (let i = 0; i < json.length; i++) {
					if (json[i].payment.orderStatus.replace(/\s+/g, '').toLowerCase() === 'readytoserve') {
            completedOrders += 1;
					}
					else if (json[i].payment.orderStatus === 'Processing') {
            pendingOrders += 1;
					}
					else if (json[i].payment.orderStatus === 'Cancelled') {
            cancelledOrders += 1;
					}
				}
        setCompletedOrders(completedOrders)
        setPendingOrders(pendingOrders)
        setCancelledOrders(cancelledOrders)
				var dict = {}
				var len = json.length
				for (var i = 0; i < len/pageLimit; i++) {
					setPageList((pageList) => [...pageList, i+1])
				}
				dict[1] = 'Active'
				setPaginagtionBtn(dict)
				setPageNumber(1)
				setPageLimit(10)
			}
		})
		.catch((err) => {
			setLoading(false);
			console.log("error: ", err);
			setPageNumber(1)
			setPageLimit(10)
		});
}, [reload])

	const getOrdersByInvoices = (invoices) => {
		setComponentLoading(true)
		fetch(`/app/orderById/${invoices}`)
		.then((res) => res.json())
		.then((json) => {
			if (json !== "undefined") {
				setOrders(json);
				setComponentLoading(false)
				setPageNumber(1)
				setPageLimit(10)
			}
		})
		.catch((err) => {
			setComponentLoading(false);
			console.log("error: ", err);
			setPageNumber(1)
			setPageLimit(10)
		});
	}	

	const getOrderByStatus = (status) => {
		setLoading(true)
		if (status !== 'allOrders') {
			fetch(`/app/orderByStatus/${status}`)
			.then((res) => res.json())
			.then((json) => {
				if (json !== "undefined") {
					setOrders(json);
					setLoading(false)
					setPageNumber(1)
					setPageLimit(10)
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log("error: ", err);
				setPageNumber(1)
				setPageLimit(10)
			});
		}
		else{
			setReload(!reload)
		}
	}

	const getOrderByDate = (startDate, endDate) => {
		setLoading(true)
		fetch(`/app/orderByDate/${startDate}/${endDate}`)
		.then((res) => res.json())
		.then((json) => {
			if (json !== "undefined") {
				setOrders(json);
				setLoading(false)
				setPageNumber(1)
				setPageLimit(10)
			}
		})
		.catch((err) => {
			setLoading(false);
			console.log("eror: ", err);
			setPageNumber(1)
			setPageLimit(10)
		});
	}

	const options = [
		{ value: 10, label: '10' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' },
		{ value: 200, label: '200' }
	]

	const updatePageList = (pageLimit) => {
		setPageLimit(pageLimit)
		var pageList = []
		for (var i = 0; i < orders.length/pageLimit; i++) {
			pageList.push(i+1)
		}
		setPageList(pageList)
	}

	const updatePageBtnDict = (state) => {
		var pageDict = paginagtionBtn; 
		var updatePageDict = pageDict; 
		updatePageDict[pageNumber] = ''; 
		if (state === 'prev')
			updatePageDict[pageNumber - 1] = 'Active'; 
		else
			updatePageDict[pageNumber + 1] = 'Active'; 
		setPaginagtionBtn(updatePageDict)
	}
  
  return (
    <div>
		{console.log(componentLoading)}
			{ componentLoading ?
			<Loader /> : null }
      <div className="flex flex-col w-full">
				<div className="my-2 overflow-x-auto">
					<div className="py-2 align-middle inline-block min-w-full px-5">
					<div className="flex items-center justify-between my-5">
          <div className="flex flex-row px-5 w-1/2">
						<h2 className="font-bold text-2xl text-gray-600">Orders Report</h2>
						<div className="inline-block mx-5 rounded w-1/2">
							<input onChange={(value) => {if (value.target.value.length >= 7) getOrdersByInvoices(value.target.value); if (value.target.value.length === 0) setReload(!reload)}} className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search for sale: order id"/>
							<GoSearch size={25} className="absolute inline-block mt-4 -ml-8" color="#a5a5a5d1"/>
						</div>
          </div>
						<div className="flex flex-row items-center">
							<CustomButton
								title="Select Data Range"
								customStyle={{ backgroundColor: theme.backgroundColor }}
								onPress={() => {setSelectOrderFilter(true)}}
							/>
							<CustomButton
								title="Yesterday Orders"
								customStyle={{ backgroundColor: theme.backgroundColor }}
								onPress={() => {getOrderByDate(new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}}
							/>
							<CustomButton
								title="Today Orders"
								customStyle={{ backgroundColor: theme.backgroundColor }}
								onPress={() => {getOrderByDate(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}}
							/>
						</div>
					</div>
					<div className="flex flex-col h-full shadow border-t border-gray-200 sm:rounded-lg mt-8">
						<div className="flex flex-row justify-between">
							<div className="my-4">
								<h1 className="text-lg inline-block ml-8">Display</h1>
								<div style={{width: '150px'}} className="inline-block mx-5 rounded">
									<Select
										defaultValue={options[0]}
										options={options}
										onChange={(value) => updatePageList(value.value)}
									/>
								</div>
								<h1 className="text-lg inline-block">Records</h1>
							</div>
							<div className="my-4">
								<div className="flex flex-row items-center justify-end">
									<div className="flex flex-row items-center justify-end">
										<div
											style={{ backgroundColor: theme.backgroundColor }}
											className="text-white py-2 px-2 rounded-md mx-2 shadow-md"
										>
											<i onClick={() => {setReload(!reload); setComponentLoading(true)}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
										</div>
										{/* <CustomButton
											title="Print"
											customStyle={{ backgroundColor: theme.backgroundColor }}
										/> */}
                    <PrintTable printTableRef={printTable} />

                    <DownloadTable fileName="Orders" tableId="DownloadTable" />
									</div> 
								</div> 
							</div>
						</div>
            <table id="DownloadTable" style={{display: 'none'}}>
              <thead>
              <tr>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking-wider border"
									>
										Date
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Order ID
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Sale Type
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Amount
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Status
									</th>
									<th
										scope="col" colspan="2" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Action
									</th>
								</tr>
              </thead>
              <tbody>
              { 
									loading ? <Loader /> :
									orders.map(order => {
										return (
                      <tr className="font-medium ">
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{new Date(order.time).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{order.order_id}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{order.payment.orderType}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">${order.payment.total}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{order.payment.orderStatus}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<CustomButton
													title="View Order"
													customStyle={{ backgroundColor: theme.backgroundColor }}
												/>
                        <CustomButton
													title="Action"
													customStyle={{ backgroundColor: theme.backgroundColor }}
												/>
											</td>
										</tr>
									)
								})
								}
              </tbody>
            </table>
            <div  ref={printTable}>
             <CustomTable>
              <tr>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking-wider border"
									>
										Date
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Order ID
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Sale Type
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Amount
									</th>
									<th
										scope="col" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Status
									</th>
									<th
										scope="col" colspan="2" className="px-6 py-4 text-center text-xl font-semibold text-white tracking border"
									>
										Action
									</th>
								</tr>
						
							{loading ? <Loader /> : 
                orders.slice((pageNumber - 1)*pageLimit, ((pageNumber - 1)*pageLimit + pageLimit)).length > 0 ?
								orders.slice((pageNumber - 1)*pageLimit, ((pageNumber - 1)*pageLimit + pageLimit)).map(order => {
									return (
										<tr className="font-medium ">
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{new Date(order.time).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{order.order_id}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{order.payment.orderType}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">${order.payment.total}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<div className="text-base text-gray-500 font-semibold">{order.payment.orderStatus}</div>
											</td>
											<td className="px-1 py-1 whitespace-nowrap border border-gray-400 text-center">
												<CustomButton
													title="View Order"
													customStyle={{ backgroundColor: theme.backgroundColor }}
												/>
                        <CustomButton
													title="Action"
													customStyle={{ backgroundColor: theme.backgroundColor }}
												/>
											</td>
										</tr>
									)
                  }) : 
                  <tr>
                    <td colspan="6" >
                      <div className="flex justify-center w-100 my-5">
                        <h5 className="text-xl font-semibold" style={{color: theme.backgroundColor}}>No Data Found</h5>
                      </div>
                    </td>
                  </tr>
                  }
							</CustomTable>
              </div>
					</div>
					<div className="flex flex-row items-end justify-between my-8">
						<div>
						<div className="text-base text-gray-500 font-semibold">Completed Orders: {completedOrders}</div>
						<div className="text-base text-gray-500 font-semibold">Pending: {pendingOrders}</div>
						<div className="text-base text-gray-500 font-semibold">Cancelled: {cancelledOrders}</div>
						</div>
            <CustomPagination pageNumber={pageNumber} setPageNumber={setPageNumber} updatePageBtnDict={updatePageBtnDict} pageList={pageList} paginagtionBtn={paginagtionBtn} incriment={incriment} setIncriment={setIncriment}/>
					</div>
				</div>
			</div>
		</div>
      {open && (
        <Popup
          content={
            <>
              <p className="pb-4 font-bold text-green">Unable to Load Server</p>
              <button
                className="bg-primary px-10 py-2"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Try Again
              </button>
            </>
          }
          handleClose={() => {
            setOpen(false);
          }}
        />
      )}
			{selectOrderFilter && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="flex items-end justify-center min-h-screen pt-4 px-8 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 bg-opacity-75 transition-opacity" aria-hidden="true" style={{backgroundColor: 'rgb(226 226 226 / 20%)'}}></div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div className="">
									<div className="w-full flex justify-end">
										<GrClose onClick={() => setSelectOrderFilter(false)}/>
									</div>
									<div className="w-full flex items-center justify-center">
									</div>
								</div>
            <div className="p-5">
              <div className="my-5 w-full">
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<ThemeProvider theme={materialTheme}>
										<DatePicker
											InputProps={{
													disableUnderline: true
												}}
												label="Start Date"
												value={filterOrderStartDate}
												onChange={(date) => {setFilterOrderStartDate(new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); getOrderByDate(new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), new Date(filterOrderStopDate).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) )}}
											/>
									</ThemeProvider>
								</MuiPickersUtilsProvider>
							</div>
							<div className="my-5 w-full">
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<ThemeProvider theme={materialTheme}>
										<DatePicker
											InputProps={{
													disableUnderline: true
												}}
												label="End Date"
												value={filterOrderStopDate}
												onChange={(date) => {setFilterOrderStopDate(new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); getOrderByDate(filterOrderStartDate, new Date(date).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}}
											/>
									</ThemeProvider>
								</MuiPickersUtilsProvider>
							</div>
            </div>
						</div>
						</div>
					</div>
				</div>
      )}
		</div>
  );
};

export default TakeAwayOrders;
