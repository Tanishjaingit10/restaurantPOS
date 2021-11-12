import React from 'react'

const Content = () => {
    return (
        <div className="mt-24 overflow-x-hidden flex flex-col w-full px-10">
            <div className="w-full flex flex-wrap mx-auto pl-20 text-white text-3xl text-center font-semibold">
                <a href='/orders' className="bg-green w-64 h-32 m-10 p-2">
                    <p>Lifetime Orders</p>
                    <p className="text-5xl">127</p>
                </a>
                <div className="bg-brown w-64 h-32 m-10 p-2">
                    <p>Today Orders</p>
                    <p className="text-5xl">3</p>
                </div>
                <div className="bg-pink w-64 h-32 m-10 p-2">
                    <p>Today Sale</p>
                    <p className="text-5xl">$127</p>
                </div>
                <a href='/customers' className="bg-blue w-64 h-32 m-10 p-2">
                    <p>Total Customers</p>
                    <p className="text-5xl">5.6k</p>
                </a>
                <div className="bg-yellow w-64 h-32 m-10 p-2">
                    <p>Total Takeaways</p>
                    <p className="text-5xl">65</p>
                </div>
                <div className="bg-red w-64 h-32 m-10 p-2">
                    <p>Total Reservations</p>
                    <p className="text-5xl">46</p>
                </div>
            </div>
        </div>          
    )
}

export default Content
