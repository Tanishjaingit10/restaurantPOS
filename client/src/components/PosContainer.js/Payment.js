import React,{useContext} from 'react'
import { PaymentContext } from '../../context/Payment';
import { OrderContext } from '../../context/Cart';
import { CustomerContext } from '../../context/Customer';
import { useHistory } from 'react-router-dom';

const Payment = () => {
    const history = useHistory();
    const [payment, setPayment] = useContext(PaymentContext);
    const [cart, setCart] = useContext(OrderContext);
    const [customer,setCustomer]= useContext(CustomerContext);
    const onPay = async (e)=> {
        e.preventDefault();
        history.push("/finalPay");
        console.log(payment.total);
        const res = await fetch("/app/addOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customer:customer,
                order: cart,
                payment:payment

            })

        });


    }

    const cashPay = (e)=> {
        e.preventDefault();
        history.push("/cashPay");  
    }
   
    const onBack = (e)=> {
        e.preventDefault();
        history.push("/pos");  
    }
    

    return (
        <div className="h-screen justify-items-conter">
             <nav className="bg-gray-400 py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><button onClick={onBack}><i class="fas fa-arrow-left mr-4"></i>Back</button></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">All Payments</div>
                </div>  
                </nav> 
                <div className=" m-20 justify-evenly flex flex-wrap p-6 px-20">
                    <div className="w-72 bg-primary flex flex-col p-4 text-xl font-roboto font-semibold m-4 text-white" onClick={cashPay}>
                       <div className=" py-2 text-center">Cash</div>
                       <div className=" py-2 text-center">Logo</div>
                    </div>
                    <div className="w-72 bg-primary flex flex-col p-4 text-xl font-roboto font-semibold m-4 text-white" onClick={onPay}>
                        <div className=" py-2 text-center">Credit / Debit Card</div>
                       <div className=" py-2 text-center"><i class="far fa-credit-card text-3xl"></i></div>
                    </div>
                    <div className="w-72 bg-primary flex flex-col p-4 text-xl font-roboto font-semibold m-4 text-white"onClick={onPay}>
                       <div className=" py-2 text-center">External Payment</div>
                       <div className=" py-2 text-center">Logo</div>
                    </div>
                    <div className="w-72 bg-primary flex flex-col p-4 text-xl font-roboto font-semibold m-4 text-white">
                        <div className=" py-2 text-center">Pay Later</div>
                       <div className=" py-2 text-center"><i class="far fa-clock text-3xl"></i></div>
                    </div>
                    </div> 
        </div>
    )
}

export default Payment
