import React from 'react'

const Payment = () => {
    return (
        <div className="h-screen justify-items-conter">
             <nav className="bg-gray-400 py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/pos"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 ml-8 font-semibold">All Payments</div>
                </div>  
                </nav> 
                <div className=" m-20 justify-evenly flex flex-wrap p-6 px-20">
                    <div className="w-72 bg-primary flex flex-col p-4 text-xl font-roboto font-semibold m-4 text-white">
                      <a href="/cash">  <div className=" py-2 text-center">Cash</div>
                       <div className=" py-2 text-center">Logo</div></a>
                    </div>
                    <div className="w-72 bg-primary flex flex-col p-4 text-xl font-roboto font-semibold m-4 text-white">
                        <a href="/finalPay"><div className=" py-2 text-center">Credit / Debit Card</div>
                       <div className=" py-2 text-center"><i class="far fa-credit-card text-3xl"></i></div></a>
                    </div>
                    <div className="w-72 bg-primary flex flex-col p-4 text-xl font-roboto font-semibold m-4 text-white">
                       <a href="finalPay"> <div className=" py-2 text-center">External Payment</div>
                       <div className=" py-2 text-center">Logo</div></a>
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
