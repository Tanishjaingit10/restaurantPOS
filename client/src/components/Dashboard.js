import React, { useState, useEffect } from "react";
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
import Loader from "./Loader";

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

const data = {
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

const Dashboard = () => {
  const [salesDate, setSalesDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [ordersDate, setOrdersDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [customerDate, setCustomerDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [reservationDate, setReservationDate] = useState(new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ));
  const [saleReload, setSaleReload] = useState(false)
  const [orderReload, setOrderReload] = useState(false)
  const [customerReload, setCustomerReload] = useState(false)
  const [reservationReload, setReservationReload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sales, setSales] = useState(data)
  const [orders, setOrders] = useState(data)
  const [customers, setCustomers] = useState(data)
  const [reservations, setReservations] = useState(data)

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

  const Fetchorders = (type) => {
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
        setOrderReload(false)
      }
    })
    .catch((err) => {
      console.error(err)
      setOrderReload(false)
    })
  }  


  useEffect(() => {
    Fetchorders('Total')
  }, [ordersDate, orderReload])

  const getDashboardData = (dataOf, dataType) => {
    if ( dataOf === 'Orders'){
      Fetchorders(dataType)
    }
  }

  return (
    <div className="px-8">
    {console.log(orders)}
      <div className="flex flex-row justify-between">
        <div className="" style={{width: '49%'}}>
          <CustomChart title="Sales" icon={<FaChartBar size={25} color="white"/>}>
            <div className="flex flex-row justify-between">
              <button className="home_chart_btn" >Total Sales</button>
              <button className="home_chart_btn">Dine In</button>
              <button className="home_chart_btn">Take away</button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                InputProps={{
                    disableUnderline: true
                  }}
                  label="Date"
                  value={salesDate}
                  onChange={(date) => {setSalesDate(date); }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <a href="/sales" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            <Bar options={options} data={data} />
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
            <a href="/orders" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            {
              orderReload && orders ? <Loader/> : 
              <Bar options={options} data={orders} />
            }
          </CustomChart>
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="" style={{width: '49%'}}>
          <CustomChart title="Customers" icon={<FaUser color="white" size={25} />}>
            <div className="flex flex-row justify-between">
              <button className="home_chart_btn">Total Sales</button>
              <button className="home_chart_btn">Dine In</button>
              <button className="home_chart_btn">Take away</button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                InputProps={{
                    disableUnderline: true
                  }}
                  label="Date"
                  value={customerDate}
                  onChange={(date) => {setCustomerDate(date); }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <a href="/customers" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            <Bar options={options} data={data} />
          </CustomChart>
        </div>

        <div className="" style={{width: '49%'}}>
          <CustomChart title="Reservations" icon={<FaUser color="white" size={25} />}>
            <div className="flex flex-row justify-between">
              <button className="home_chart_btn">Total Sales</button>
              <button className="home_chart_btn">Dine In</button>
              <button className="home_chart_btn">Take away</button>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={materialTheme}>
                <DatePicker
                InputProps={{
                    disableUnderline: true
                  }}
                  label="Date"
                  value={reservationDate}
                  onChange={(date) => {setReservationDate(date); }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
            <a href="/reservations" className="text-gray-500 font-semibold mb-4"> View Detailed Reports{'>'} </a>
            <Bar options={options} data={data} />
          </CustomChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
