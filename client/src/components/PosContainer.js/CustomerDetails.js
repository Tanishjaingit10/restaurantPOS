import React from 'react'

const CustomerDetails = () => {
    return (
        <div className="h-screen justify-items-conter">
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
            <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/pos"><i className="fas fa-arrow-left mr-4"></i>Back</a></div>
           <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">Customer Details</div>
           </div>
            </nav>
            <div className="flex flex-row h-screen">
            <div className="h-screen border-r-2 border-primary w-1/5 flex flex-col font-roboto py-4">
                <div className="flex flex-col my-2 px-6">
                    <label>Name</label>
                    <p className="text-primary text-xl font-semibold">Customer name</p>
                </div>
                <div className="flex flex-col my-2 px-6">
                    <label>Phone</label>
                    <p className="text-primary text-xl font-semibold">+1234536378</p>
                </div>
                <div className="flex flex-col my-2 px-6">
                    <label>Email address</label>
                    <p className="text-primary text-xl font-semibold">name@gmail.com</p>
                </div>
                <div className="bg-primary text-white py-4 my-2 text-xl text-center font-semibold">Edit</div>
            </div>
            <div className="flex flex-col w-4/5 relative">
                 <div>
                     Table
                 </div>
                 <div className="border-t-2 border-primary w-full absolute top-96">
                     <button className="bg-green text-white py-2 text-xl w-96 mx-auto">Done</button>
                 </div>
            </div>
            </div>
        </div>
    )
}

export default CustomerDetails
