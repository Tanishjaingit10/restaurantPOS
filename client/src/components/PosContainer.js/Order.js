import React, {useContext, useState, useEffect} from 'react'
import { OrderContext } from '../../context/Auth'

const Order = () => {
    const [cart, setCart] = useContext(OrderContext);
    const [display, setDisplay] = useState();
    const removeVar = (e) => {
      setCart(cart.filter(i => i !== e))
  }
    useEffect(()=>{
     setDisplay(
       cart.map((order)=>{
         return (
          <div className="flex flex-row p-4 border-2 font-roboto">
          <div className=" w-1/3 text-left flex flex-col pl-6">
           <div className="text-lg pb-2">{order.foodItem}</div>
           {order.orderedVariant.map((obj)=>{
             return (
              <div className="text-gray-400 font-semibold text-md">{obj.variant}</div>
             )
           })}
          </div>
          <div className=" w-1/3 text-center flex flex-col">
           <div className="text-lg pb-2">{order.price}</div>
           {order.orderedVariant.map((obj)=>{
             return (
              <div className="text-gray-400 font-semibold text-md">{obj.price}</div>
             )
           })}
          
          </div>
          <div className=" w-1/3 text-center my-auto text-lg">
           {order.subtotal}<span><i onClick={() => { removeVar(order) }} className="far fa-times-circle ml-8"></i></span>
          </div>
        </div>
         )
       })
     )
    },[cart])
    return (
      <>
       {display}
       </>
    )
}

export default Order
