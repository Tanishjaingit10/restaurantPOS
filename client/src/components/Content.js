import React, { useEffect, useState } from 'react'
var todayDate = new Date()
todayDate = todayDate.toISOString().split('T')[0]
let total = [];
let customers;
const Content = () => {
    const [orders, setOrders] = useState({ lifetimeOrders: 0, todayOrders: 0, todaySale: 0, totalCustomers: 0, takeaways: 0, reservations: 0 })
    const loadOrders = async () => {
        if (!orders.lifetimeOrders) {
            await fetch("/app/orders")
                .then((res) => res.json())
                .then((json) => {
                    total = json;
                    setOrders({ ...orders, 'lifetimeOrders': json.length })
                }
                )
        }

    }
    const todayOrders = async () => {
        let c = 0;
        if (total)
            total.forEach((obj, i) => {
                if (obj.time.toLocaleString().split("T")[0] === todayDate)
                    c++;
            })
        setOrders({ ...orders, 'todayOrders': c })
    }
    const loadCustomers = async () => {
        if (!orders.totalCustomers)
            await fetch("/app/customers")
                .then((res) => res.json())
                .then((json) => {
                    customers = json;
                    setOrders({ ...orders, 'totalCustomers': json.length })
                })
    }
    useEffect(() => {
        loadOrders()
        todayOrders()
    }, [total])
    useEffect(() => {
        loadCustomers()
    }, [customers])
    return (
        <div className="mt-24 overflow-x-hidden flex flex-col w-full px-10">
            <div className="w-full flex flex-wrap mx-auto pl-20 text-white text-3xl text-center font-semibold">
                <a href='/orders' className="bg-green w-64 h-32 m-10 p-2">
                    <p>Lifetime Orders</p>
                    <p className="text-5xl">{orders.lifetimeOrders}</p>
                </a>
                <a href='/todayOrders' className="bg-brown w-64 h-32 m-10 p-2">
                    <p>Today Orders</p>
                    <p className="text-5xl">{orders.todayOrders}</p>
                </a>
                <a href='/todaySale' className="bg-pink w-64 h-32 m-10 p-2">
                    <p>Today Sale</p>
                    <p className="text-5xl">$127</p>
                </a>
                <a href='/customers' className="bg-blue w-64 h-32 m-10 p-2">
                    <p>Total Customers</p>
                    <p className="text-5xl">4</p>
                </a>
                <a href='/takeaways' className="bg-yellow w-64 h-32 m-10 p-2">
                    <p>Total Takeaways</p>
                    <p className="text-5xl">5</p>
                </a>
                <a href='/reservations' className="bg-red w-64 h-32 m-10 p-2">
                    <p>Total Reservations</p>
                    <p className="text-5xl">0</p>
                </a>
            </div>
        </div>
    )
}

export default Content
