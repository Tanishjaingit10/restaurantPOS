import React,{ useContext} from 'react'
import { PaymentContext } from '../../context/Payment'

const CashPay = () => {
    const [payment, setPayment] = useContext(PaymentContext)
    return (
        <div>
            <nav className="bg-gray-400 py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/pos"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Paid By Cash</div>
                </div>  
                </nav> 
                <div className="flex flex-col p-8">
        <div className="flex flex-col p-6 w-96 mx-auto font-roboto">
          <div className="text-center font-semibold">Amount Due</div>
          <div className="text-center mt-2 text-3xl">${payment.total}</div>
          <div className="flex flex-col mt-8 space-y-4">
          <button className="bg-green text-center text-white text-xl py-4 font-semibold font-roboto">Print Receipt</button>
          <button className="bg-green text-center text-white text-xl py-4 font-semibold font-roboto">Email Receipt</button>
          <button className="bg-green text-center text-white text-xl py-4 font-semibold font-roboto">Text Receipt</button>
          </div>
        </div>
        </div>
        </div>
    )
}

export default CashPay
