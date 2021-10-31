import React, {useContext} from 'react'
import { OrderContext } from '../../context/Auth'

const Order = () => {
    const [cart, setCart] = useContext(OrderContext)
    console.log("hello");
    return (
        <div className="flex flex-col">
            Hello
            {cart.foodItem}
        </div>
    )
}

export default Order
