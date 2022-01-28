import React, { useState, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CustomChart from './Common/CustomChart';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {ThemeProvider} from "@material-ui/styles";
import { FaChartBar, FaClipboardList, FaUser } from 'react-icons/fa';
import {createTheme} from "@material-ui/core";
import Loading from '../images/loading.gif'
import { ThemeContext } from "../context/Theme";
import { FiRefreshCcw } from 'react-icons/fi';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const labels = ['12:00am-4:00am', '4:00am-8:00am', '8:00am-12:00pm', '12:00pm-4:00pm', '4:00pm-8:00pm', '8:00pm-12:00am'];
const backgroundColor = ['rgb(255, 99, 132)', 'rgb(75, 192, 192)']

const initData = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: [],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

const Loader = () => {
  return (
    <div className="py-12 flex justify-center absolute" style={{width: '40%', backgroundColor: 'transparent'}}>
      <img src={Loading} alt="" style={{height: 150, width: 150}} />
    </div>
  )
}


const Dashboard = () => {
  const [salesDate, setSalesDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [ordersDate, setOrdersDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [customersDate, setCustomersDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [reservationsDate, setReservationsDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [saleReload, setSaleReload] = useState(false)
  const [orderReload, setOrderReload] = useState(false)
  const [customerReload, setCustomerReload] = useState(false)
  const [reservationReload, setReservationReload] = useState(false)
  const [saleLoad, setSaleLoad] = useState(false)
  const [orderLoad, setOrderLoad] = useState(false)
  const [customerLoad, setCustomerLoad] = useState(false)
  const [reservationLoad, setReservationLoad] = useState(false)
  const [sales, setSales] = useState(initData)
  const [orders, setOrders] = useState(initData)
  const [customers, setCustomers] = useState(initData)
  const [reservations, setReservations] = useState(initData)
  const theme = useContext(ThemeContext);

 const materialTheme = createTheme({
	overrides: {
		MuiFormControl: {
			root: {
					width: '100%',
			}
		},
    MuiInputLabel: {
      root: {
        display: 'none',
      }
    },
			MuiPickersToolbar: {
				root: {
					width: '100%',
				},
					toolbar: {
							backgroundColor: "rgba(229, 73, 65, 1)",
					},
			},
			MuiPickersCalendarHeader: {
					switchHeader: {
							backgroundColor: "white",
							color: "rgba(229, 73, 65, 1)",
					},
			},
			MuiPickersDay: {
				root: {
					color: "rgba(229, 73, 65, 1)",
					"&$disabled": {
						color: "rgba(229, 73, 65, 1)",
					},
					"&$selected": {
						backgroundColor: "rgba(229, 73, 65, 1)",
					},
				},
				today: {
					color: "rgba(229, 73, 65, 1)",
				},
			},
			MuiPickersModalDialog: {
				dialogAction: {
					color: "rgba(229, 73, 65, 1)",
				},
			},
			MuiOutlinedInput: {
				root: {
					"& $notchedOutline": {
						borderColor: "rgba(229, 73, 65, 1)",
						borderWidth: "1px",
					},
					"&:hover $notchedOutline": {
						borderColor: "rgba(229, 73, 65, 1)",
						borderWidth: "1px",
					},
					"&$focused $notchedOutline": {
						borderColor: "rgba(229, 73, 65, 1)",
						borderWidth: "1px",
					},
			},
			input: {
				borderColor: "rgba(229, 73, 65, 1)",
			},
		},
		MuiInputBase: {
			root: {
				backgroundColor: "rgba(229, 73, 65, 1)",
				color: 'white',
				padding: '5px',
				borderRadius: '5px'
        }
      }
    },
  });

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        labels: {
          font: {
            size: 10
          }
        }
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
        }
      },
        stacked: true,
      },
      y: {
        ticks: {
          font: {
            size: 10,
          }
        },
        stacked: true,
      },
    },
  };

  const FetchOrders = (type) => {
    fetch(`/app/getDashboardOrder/${type}/${ordersDate}`)
    .then((res) => res.json())
    .then((json) =>
    {
      console.log(json)
      if (json !== "undefined") {
        var orderData = {
          labels: labels,
          datasets: [],
        }
        for (var i = 0; i < json.length; i++) {
          orderData['datasets'].push({
            label: json[i].label,
            data: json[i].data,
            backgroundColor: backgroundColor[i]
          })
        }
        console.log(orderData)
        setOrders(orderData)
        setOrderLoad(false)
      }
    })
    .catch((err) => {
      console.error(err)
      setOrderLoad(false)
    })
  }  

  const FetchSales = (type) => {
    fetch(`/app/getDashboardSales/${type}/${salesDate}`)
    .then((res) => res.json())
    .then((json) =>
    {
      console.log(json)
      if (json !== "undefined") {
        var salesData = {
          labels: labels,
          datasets: [],
        }
        for (var i = 0; i < json.length; i++) {
          salesData['datasets'].push({
            label: json[i].label,
            data: json[i].data,
            backgroundColor: backgroundColor[i]
          })
        }
        console.log(salesData)
        setSales(salesData)
        setSaleLoad(false)
      }
    })
    .catch((err) => {
      console.error(err)
      setSaleLoad(false)
    })
  }  

  const FetchReservations = (type) => {
    fetch(`/app/getDashboardReservation/${type}/${reservationsDate}`)
    .then((res) => res.json())
    .then((json) =>
    {
      if (json !== "undefined") {
        var reservationData = {
          labels: labels,
          datasets: [],
        }
        for (var i = 0; i < json.length; i++) {
          if (type === 'Dine In' && json[i]['label'] === 'Dine In') {
            reservationData['datasets'].push({
              label: json[i].label,
              data: json[i].data,
              backgroundColor: backgroundColor[i]
            })
          }
          else if (type === 'Take Away' && json[i]['label'] === 'Take Away') {
            reservationData['datasets'].push({
              label: json[i].label,
              data: json[i].data,
              backgroundColor: backgroundColor[i]
            })
          }
          else if ( type === 'Total' ) {
            reservationData['datasets'].push({
              label: json[i].label,
              data: json[i].data,
              backgroundColor: backgroundColor[i]
            })
          }
        }
        setReservations(reservationData)
        setReservationLoad(false)
      }
    })
    .catch((err) => {
      console.error(err)
      setReservationLoad(false)
    })
  }  

  const FetchCustomers = (type) => {
    fetch(`/app/getDashboardCustomer/${type}/${customersDate}`)
    .then((res) => res.json())
    .then((json) =>
    {
      if (json !== "undefined") {
        var customerData = {
          labels: labels,
          datasets: [],
        }
        for (var i = 0; i < json.length; i++) {
          if (type === 'Dine In' && json[i]['label'] === 'Dine In') {
            customerData['datasets'].push({
              label: json[i].label,
              data: json[i].data,
              backgroundColor: backgroundColor[i]
            })
          }
          else if (type === 'Take Away' && json[i]['label'] === 'Take Away') {
            customerData['datasets'].push({
              label: json[i].label,
              data: json[i].data,
              backgroundColor: backgroundColor[i]
            })
          }
          else if ( type === 'Total' ) {
            customerData['datasets'].push({
              label: json[i].label,
              data: json[i].data,
              backgroundColor: backgroundColor[i]
            })
          }
        }
        setCustomers(customerData)
        setCustomerLoad(false)
      }
    })
    .catch((err) => {
      console.error(err)
      setCustomerLoad(false)
    })
  }  

  useEffect(() => {
    setReservations(initData)
    FetchReservations('Total')
    setReservationReload(false)
  }, [reservationsDate, reservationReload ])

  useEffect(() => {
    setSales(initData)
    FetchSales('Total')
    setCustomerReload(false)
  }, [salesDate, saleReload])

  useEffect(() => {
    setOrders(initData)
    FetchOrders('Total')
    setOrderReload(false)
  }, [ordersDate, orderReload])

  useEffect(() => {
    setCustomers(initData)
    FetchCustomers('Total')
    setCustomerReload(false)
  }, [customersDate, customerReload])

  const getDashboardData = (dataOf, dataType) => {
    if ( dataOf === 'Orders'){
      setOrders(initData)
      setOrderLoad(true)
      FetchOrders(dataType)
    }
    else if (dataOf === 'Sales'){
      setSales(initData)
      setSaleLoad(true)
      FetchSales(dataType)
    }
    else if (dataOf === 'Reservations'){
      setReservations(initData)
      setReservationLoad(true)
      FetchReservations(dataType)
    }
    else if (dataOf === 'Cutomers'){
      setCustomers(initData)
      setCustomerLoad(true)
      FetchCustomers(dataType)
    }
  }


  return (
    <div className="px-8">
      <div className="flex flex-row justify-between">
        <div className="" style={{width: '49%'}}>
          <CustomChart title="Sales" icon={<FaChartBar size={25} color="white"/>}>
            <div className="flex flex-row justify-between">
              <button className="home_chart_btn" onClick={() => {getDashboardData('Sales', 'Total', salesDate)}}>Total Sales</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Sales', 'Dine In', salesDate)}}>Dine In</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Sales', 'Take Away', salesDate)}}>Take away</button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                InputProps={{
                    disableUnderline: true
                  }}
                  label="Date"
                  value={salesDate}
                  onChange={(date) => {setSalesDate(date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <div
              style={{ backgroundColor: theme.backgroundColor, height: 40 }}
              className="text-white py-2 px-2 rounded-md mx-2 shadow-md mt-4" 
            >
              <i onClick={() => {setSaleReload(true); FetchSales('Total'); setSalesDate(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
            </div>
            <a href="/sales" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            {
              saleReload || saleLoad ? <Loader/> : null
            }
            <Bar options={options} data={sales} />
          </CustomChart>
        </div>

        <div className="" style={{width: '49%'}}>
          <CustomChart title="Orders" icon={<FaClipboardList color="white" size={25} />}>
            <div className="flex flex-row justify-between">
              <button className="home_chart_btn" onClick={() => {getDashboardData('Orders', 'Total', ordersDate)}}>Total Sales</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Orders', 'Dine In', ordersDate)}}>Dine In</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Orders', 'Take Away', ordersDate)}}>Take away</button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                InputProps={{
                    disableUnderline: true
                  }}
                  label="Date"
                  value={ordersDate}
                  onChange={(date) => {setOrdersDate(date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <div
              style={{ backgroundColor: theme.backgroundColor, height: 40 }}
              className="text-white py-2 px-2 rounded-md mx-2 shadow-md mt-4" 
            >
              <i onClick={() => {setOrderReload(true); FetchOrders('Total'); setOrdersDate(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
            </div>
            <a href="/orders" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            {
              orderReload || orderLoad ? <Loader/> : null
            }
            <Bar options={options} data={orders} />
          </CustomChart>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="" style={{width: '49%'}}>
          <CustomChart title="Customers" icon={<FaUser color="white" size={25} />}>
            <div className="flex flex-row justify-between">
              <button className="home_chart_btn" id="totalCust" onClick={() => {getDashboardData('Customers', 'Total', customersDate)}}>Total Sales</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Customers', 'Dine In', customersDate)}}>Dine In</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Customers', 'Take away', customersDate)}}>Take away</button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                InputProps={{
                    disableUnderline: true
                  }}
                  label="Date"
                  value={customersDate}
                  onChange={(date) => {setCustomersDate(date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <div
              style={{ backgroundColor: theme.backgroundColor, height: 40 }}
              className="text-white py-2 px-2 rounded-md mx-2 shadow-md mt-4" 
            >
              <i onClick={() => {setCustomerReload(true); FetchCustomers('Total'); setCustomersDate(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
            </div>
            <a href="/customers" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            {
              customerReload || customerLoad ? <Loader/> : null
            }
            <Bar options={options} data={customers} />
          </CustomChart>
        </div>

        <div className="" style={{width: '49%'}}>
        {console.log(reservationReload)}
          <CustomChart title="Reservations" icon={<FaUser color="white" size={25} />}>
            <div className="flex flex-row justify-between">
              <button className="home_chart_btn" onClick={() => {getDashboardData('Reservations', 'Total', reservationsDate)}}>Total Sales</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Reservations', 'Dine In', reservationsDate)}}>Dine In</button>
              <button className="home_chart_btn" onClick={() => {getDashboardData('Reservations', 'Take Away', reservationsDate)}}>Take away</button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                InputProps={{
                    disableUnderline: true
                  }}
                  label="Date"
                  value={reservationsDate}
                  onChange={(date) => {setReservationsDate(date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )); }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <div
              style={{ backgroundColor: theme.backgroundColor, height: 40 }}
              className="text-white py-2 px-2 rounded-md mx-2 shadow-md mt-4" 
            >
              <i onClick={() => {setReservationReload(true); FetchReservations('Total'); setReservationsDate(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ))}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
            </div>
            <a href="/reservations" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            {
              reservationReload || reservationLoad ? <Loader/> : null
            }
            <Bar options={options} data={reservations} />
          </CustomChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
