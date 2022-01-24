import React,{ useContext, useEffect, useState} from 'react'
import { PaymentContext } from '../../context/Payment'
import { OrderContext } from '../../context/Cart';
import { CustomerContext } from '../../context/Customer';
import { useHistory } from 'react-router-dom';
import Popup from '../Popup';
const CashPay = () => {
    const history = useHistory();
    const [payment] = useContext(PaymentContext);
    const [cart] = useContext(OrderContext);
    const [customer]= useContext(CustomerContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [msg, setMsg] = useState("");
    const fetchData = async () => {
        fetch("/app/addOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customer: customer,
                order: cart,
                payment: payment

            })


        }).then(function (res) {
            if (res.status === 201 || res.status === 200) {
                // let obj = signup.find((pop) => pop.id === res.status);
                setMsg('Successful');
                setIsOpen(!isOpen);
            }
            else {
                // let obj = signup.find((pop) => pop.id === res.status);
                setMsg('Failed');
                console.log(msg);
                setIsError(!isError);

            }

        });


    }
    useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, [payment])

    const onReceipt=(e)=>{
        console.log(1)
        e.preventDefault();
        history.push('/receipt')
    }
    
    return (
        <div>
            <nav className="bg-gray-400 py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/pos"><i className="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">Paid By Cash</div>
                </div>  
                </nav> 
                <div className="flex flex-col p-8">
        <div className="flex flex-col p-6 w-96 mx-auto font-roboto">
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-full">
          <div className="text-center font-semibold">Amount Due</div>
          <div className="text-center mt-2 text-3xl">${payment.total}</div>
          </div>
          <div className="flex flex-col w-full">
          <div className="text-center font-semibold">Change Due</div>
          <div className="text-center mt-2 text-3xl text-primary">0</div>
          </div>
          
          </div>
          <div className="flex flex-col mt-8 space-y-4">
          <div className="bg-green text-center text-white text-xl py-4 font-semibold font-roboto" onClick = {onReceipt}>Print Receipt</div>
          <button className="bg-green text-center text-white text-xl py-4 font-semibold font-roboto">Email Receipt</button>
          <button className="bg-green text-center text-white text-xl py-4 font-semibold font-roboto">Text Receipt</button>
          </div>
        </div>
        </div>
        {isOpen && <Popup
                content={<>

                    <p className='pb-4 font-bold text-green'>{msg}</p>
                    <button className="bg-primary px-10 py-2" onClick={fetchData}>Ok</button>
                </>}
                handleClose={fetchData}
            />}
            {isError && <div className="popup-box">
                <div className="box text-center py-16">
                    <div className=" absolute top-0 right-4 text-center cursor-pointer" onClick={() => { history.push("/pos") }} >
                        <span className=" text-gray-400 text-center object-center text-xl">x</span>
                    </div>
                    <p className="pb-4 font-roboto text-lg font-semibold text-green">
                        Order Failed!</p>
                    <button className="bg-green px-10 py-2 font-roboto text-white text-lg" onClick={() => { history.push("/pos"); }}>Ok</button>
                </div>
            </div>}
        </div>
    )
}

export default CashPay
