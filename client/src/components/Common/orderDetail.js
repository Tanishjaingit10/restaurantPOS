import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../context/Theme";
import { GrClose } from 'react-icons/gr';
import { DownloadOrderDetail, PrintOrderDetail } from './download_print';

const OrderDetailComponent = ({orderDetails, setShowOrderDetails, setShowComments}) => {
  const theme = useContext(ThemeContext);
  const printOrderDetails = useRef();
  const orderTotalDiv = useRef();

  const boxStyle = {
      position: 'relative',
      margin: 'auto',
      margirTop: 'calc(100vh - 70vh - 2px)',
      background: '#fff',
      borderRadius: '4px',
      border: '1px solid #999',
      width: '70vw',
      overflow: 'auto'
  }
  return (
    <div className="flex align-center" style={{height: '100vh'}}>
      <div className="p-5 h-full" style={boxStyle} ref={printOrderDetails}>
      {
        orderDetails.order_id ? <>
        <div className="flex flex-row">
          <div style={{backgroundColor: theme.tableBackground}} className="p-8 text-white w-1/3" ref={orderTotalDiv}>
            <p className="text-sm">Order ID</p>
            <h5 className="mb-3">{orderDetails.order_id}</h5>
            <p className="text-sm">Order Type</p>
            <h5 className="mb-3">{orderDetails.payment.orderType}</h5>
            <p className="text-sm">Table Name/ No</p>
            <h5 className="mb-3">{orderDetails.payment.table}</h5>
            <p className="text-sm">Order Date | Time</p>
            <h5 className="mb-3">{new Date(orderDetails.time).toLocaleString('en-GB', { timeZone: 'UTC' })}</h5>
            <p className="text-sm">Phone</p>
            <h5 className="mb-3">{orderDetails.customer.contact}</h5>
            <p className="text-sm">Email Address</p>
            <h5 className="mb-3">{orderDetails.customer.email}</h5>
            <p className="text-sm">Payment Status</p>
            <h5 className="mb-3">{orderDetails.payment.status ? orderDetails.payment.status : 'Incomplete'}</h5>
            <p className="text-sm">Order Status</p>
            <h5 className="mb-3">{orderDetails.payment.orderStatus}</h5>
          </div>
          <div className="p-0 w-2/3">
            <div className="flex flex-row justify-between">
              <h4 className="text-3xl font-bold p-5" style={{color: theme.backgroundColor}}>Order ID: {orderDetails.order_id}</h4>
              <GrClose onClick={() => setShowOrderDetails(false)} size={25} style={{cursor: "pointer"}}/>
            </div>
            <div style={{height: orderTotalDiv.current ? `calc(100vh - ${orderTotalDiv.current.clientHeight})px - 50px` : 430, overflowY: 'scroll'}}>
            {
              orderDetails.order.map((order, idx) => {
                return(
                  <div className="flex flex-row justify-between p-5 border" key={idx}>
                    <div className="w-2/3">
                    <div className="flex flex-row justify-between text-xl mb-3 font-semibold">
                      <h4 className="">{order.foodItem}</h4>
                      <h4 className="">${order.price}</h4>
                    </div>
                    {
                      order.orderedVariant.map((variant, idx) => {
                        return (
                          <div className="flex flex-row justify-between text-md text-gray-400 font-bold mb-1" key={idx}>
                            <p>{variant.quantity}x {variant.variant}</p>
                            <p>${variant.price}</p>
                          </div>
                        )
                      })
                    }
                    
                    </div>
                    <div className="text-xl font-semibold flex align-center justify-center"> 
                      <p>${order.subtotal}</p>
                    </div>
                  </div>
                )
              })
            }     
            </div>        
          </div>
        </div>
        <div className="flex flex-row" style={{backgroundColor: theme.tableBackground}}>
          <div className="flex flex-col w-1/3 pb-3">
            <div className="flex justify-center my-1">
              <button style={{color: theme.backgroundColor, backgroundColor: 'white', width: 200}} className="px-5 py-3 rounded" onClick={() => setShowComments(true)}>
                Comments
              </button>
            </div>
            <div className="flex justify-center my-1">
              <PrintOrderDetail printOrderDetailRef={printOrderDetails} />
            </div>
            <div className="flex justify-center my-1">
              <DownloadOrderDetail fileName="Order Detail" orderDetailref={printOrderDetails}/>
            </div>
          </div>
          <div className="w-2/3 text-white text-lg font-semibold">
            <div className="flex flex-row w-full justify-between px-5 my-2">
              <h5>Subtotal</h5>
              <h5>${orderDetails.payment.subTotal}</h5>
            </div>
            <div className="flex flex-row w-full justify-between px-5 my-2">
              <h5>Tax</h5>
              <h5>${orderDetails.payment.tax}</h5>
            </div>
            <div className="flex flex-row w-full justify-between px-5 my-2">
              <h5>Discount</h5>
              <h5>${orderDetails.payment.discount}</h5>
            </div>
            <div className="flex flex-row w-full justify-between px-5 my-2 text-xl font-bold">
              <h5>Total</h5>
              <h5>${orderDetails.payment.total}</h5>
            </div>
          </div>
        </div>
        </> : 
        <div className="flex justify-center align-center text-xl text-red-600 h-full my-auto">
          <div>
            Data could not be retrieved
          </div>
        </div>
      }

      </div>
    </div>
  )
}

export default OrderDetailComponent