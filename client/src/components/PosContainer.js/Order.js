import React, {useContext,useEffect} from 'react'
import { OrderContext } from '../../context/Auth'

const Order = () => {
    const [cart, setCart] = useContext(OrderContext)
    useEffect(() => {
      console.log(cart)
    }, [cart])
  
    return (
        <div className="flex flex-row p-4 border-2 font-roboto">
          <div className=" w-1/3 text-left flex flex-col pl-6">
           <div className="text-lg pb-2">Food Item Name</div>
           <div className="text-gray-400 font-semibold text-md">Variant</div>
          </div>
          <div className=" w-1/3 text-center flex flex-col">
           <div className="text-lg pb-2">Price</div>
           <div className="text-gray-400 font-semibold text-md">Variant Price</div>
          </div>
          <div className=" w-1/3 text-center my-auto text-lg">
           Subtotal<span><i className="far fa-times-circle ml-8"></i></span>
          </div>
        </div>
    )
}

export default Order
