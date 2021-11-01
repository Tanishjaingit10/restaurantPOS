import React, {useContext} from 'react'
import { PaymentContext } from '../../context/Payment';

const PaymentSummary = () => {
    const [payment, setPayment] = useContext(PaymentContext);
    
    return (
        <div>
            <div className="bg-gray-300 flex flex-col">
                        <div className="flex flex-col mx-20 p-4 px-8 text-xl font-roboto text-gray-600">
                            <div className="relative py-4"><label className="">Subtotal</label><span className="absolute right-0">{payment.subTotal}</span></div>
                            <div className="relative py-4"><label className="">Tax</label><span className="absolute right-0">{payment.tax}</span></div>
                            <div className="relative py-4"><label className="">Discount</label><span className="absolute right-0">{payment.discount}%</span></div>
                            <div className="relative py-4 font-bold"><label className="">Total</label><span className="absolute right-0">${payment.total}</span></div>
                        </div>
                        <div className="flex flex-row w-full text-white text-xl font-roboto">
                            <button className="bg-primary w-1/2 py-4 font-bold"><a href="/payments">All Payments</a></button>
                            <button className="bg-green w-1/2 py-4 font-bold"><a href="/cash">Cash</a></button>
                        </div>
                        <div className="flex flex-row w-full text-xl font-roboto">
                            <button className=" w-1/2 py-4 font-bold border-r-2">Drawer</button>
                            <button className=" w-1/2 py-4 font-bold"><a href="/discount">Discount</a></button>
                        </div>
                    </div>
        </div>
    )
}

export default PaymentSummary
