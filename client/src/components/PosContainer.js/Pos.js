import React, { useState, useContext, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryList from './CategoryList';
import { OrderContext } from '../../context/Cart';
import Order from './Order';
import PaymentSummary from './PaymentSummary';
import { CustomerContext } from '../../context/Customer';
import { PaymentContext } from '../../context/Payment';
const Pos = () => {
    const [customer, setCustomer] = useContext(CustomerContext);
    const history = useHistory();
    const [payment, setPayment] = useContext(PaymentContext);
    const [list, showList] = useState(false);
    const [cust, showCust] = useState(false);
    const [pop, showPop] = useState(false);
    const [open, setOpen] = useState(false);
    const [Table, showTable] = useState(false);
    const [cart] = useContext(OrderContext);
    const [Cust, setCust] = useState()
    const [search, setSearch] = useState("");
    const [displayTable, setdisplayTable] = useState()
    const typeRef = createRef();
    const custRef = createRef();
    const tableRef = createRef();

    const handleClickOutside = e => {
        if (typeRef.current && !typeRef.current.contains(e.target)) {
            showList(false);
        };
        if (custRef.current && !custRef.current.contains(e.target)) {
            showCust(false);

        };
        if (tableRef.current && !tableRef.current.contains(e.target)) {
            showTable(false);
        }
    }
    const getCustomers = async (e)=>{
        await fetch("/app/customers")
        .then((res) => res.json())
        .then((json) =>
        setCust(
            json.filter((option) => {
                if (search === "")
                    return option;
                else if (option.contact.includes(search)||option.name.includes(search)) {
                    return option;
                }
                return null;
            })
                .map((option) => {
                    return (<li className="flex flex-row text-black p-2 relative cursor-pointer" onClick={() => { setCustomer({ name: option.name, contact: option.contact, email: option.email }) }}><div className="flex flex-col" ><p className="text-left">{option.name}</p><p>{option.contact}</p></div><a href={`/customerDetails/${option.contact}`}><i class="fas fa-arrow-right absolute right-0 p-2"></i></a></li>)
                })
        ) 
        )
    }


    useEffect(() => {
        getCustomers()
        //eslint-disable-next-line
    }, [search])
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    const orderSearch = (e) => {
        e.preventDefault();
        history.push("/viewOrder");
    }
    const openTable = async (e) => {
        e.preventDefault();
        showTable(!Table);
        await fetch(
            "/app/table")
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setdisplayTable(json.map((option) => {
                    if (option.status === 'Free')
                        return (<li><button className="py-2 border-b-2 border-t-2 border-black w-full text-left" onClick={handleTable} name="category" value={option.number}>Table {option.number}</button></li>)
                    return null;
                }))
            })

    }
    const handleTable = async (e) => {
        e.preventDefault();
        setPayment((prev) => ({ ...prev, table: e.target.value }))
        showTable(false)
    }

    return (
        <div className="flex flex-row overflow-hidden h-full">
            <div className="w-3/5 border-r-2 border-primary shadow-2xl overflow-hidden ">
                <nav className="bg-primary p-2 mt-0 h-auto top-0 text-2xl text-white font-roboto font-semibold ">
                    <div className="flex flex-row px-6 justify-items-center">
                        <div className=" justify-center md:justify-start text-white py-2"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
                        <div className="flex flex-row w-full mx-24 relative">
                            <ul className=" text-white text-left" ref={typeRef}>
                                <li className="p-2 cursor-pointer" onClick={() => { showList(!list) }}>{payment.orderType}<span><i className="fas fa-chevron-down ml-8 cursor-pointer"></i></span></li>
                                {list ? <ul className="absolute bg-primary p-2 text-left text-xl"><li className="border-b-2 border-white py-2 cursor-pointer" onClick={() => { showPop(!pop) }}>Take Away-Ordered Online</li>
                                    <li className="border-b-2 border-white py-2 cursor-pointer" onClick={() => { setPayment((prev) => ({ ...prev, orderType: 'Take Away' })) }}>Takeaway New</li>
                                    <li className="border-b-2 border-white py-2 cursor-pointer" onClick={() => { setPayment((prev) => ({ ...prev, orderType: 'Dine In' })) }}>Dine In New</li>
                                    <li className="py-2 cursor-pointer" onClick={() => { setOpen(!open) }} >Dine In Ordered Online</li></ul> : null}
                            </ul>
                            <ul className=" text-white text-left" ref={custRef}>
                            <li className="ml-10 text-center p-2 cursor-pointer" onClick={() => { showCust(!cust) }}>{customer.name ? customer.name : 'Walk In'}<span><i className="fas fa-chevron-down ml-8 cursor-pointer"></i></span></li>
                            {cust ? <ul className="absolute top-10 right-0 bg-white mt-4 border-2 shadow-lg w-2/3 font-thin text-lg z-30">
                                <li className="bg-primary flex flex-row"><input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="bg-lightprimary py-2 w-full" /><i class="fas fa-search p-2"></i></li>
                                {Cust}
                                <li className="bg-green py-2 text-center"><a href="/newCustomer">+ New Customer</a></li>
                            </ul> : null} 
                            </ul>

                            <div className="absolute text-center py-2 right-0"><i onClick={() => { window.location.reload(false)}} className="fas fa-trash-alt ml-10 cursor-pointer"></i></div>
                        </div>
                    </div>
                </nav>
                <div className="flex flex-col">
                    {cart[0] ? <Order /> : <div className="bg-white h-80">
                        <div className="flex flex-col  w-1/3 mx-auto justify-items-center mt-10 space-y-2">
                            <div className=" border-dashed border-2 border-gray-600 w-24 h-24 rounded-lg mx-auto"></div>
                            <p className=" font-bold text-gray-600 text-center">Order is Empty</p>
                            <p className=" text-gray-600 text-center">Add Food items</p>
                        </div>
                    </div>}

                    <PaymentSummary />
                </div>
            </div>
            <div className="w-2/5 border-l-2 border-primary h-full shadow-2xl">
                <CategoryList />
            </div>

            {pop && <div className="bg-primary absolute top-16 left-40 p-20">
                <div className=" absolute top-0 right-4 text-center cursor-pointer" onClick={() => { showPop(!pop) }} >
                    <span className=" text-white text-center object-center text-xl">x</span>
                </div>
                <div className="flex flex-col text-white space-y-2 font-bold w-96 text-xl" >
                    <label>Enter Order Id</label>
                    <input type="text" className="py-2 border-black border-2"></input>
                    <button className="bg-white text-primary py-2 font-bold">Search</button>
                </div>
            </div>}

            {open && <div className="bg-primary absolute top-16 left-40 p-20 z-30">
                <div className=" absolute top-0 right-4 text-center cursor-pointer" onClick={() => { setOpen(!open) }} >
                    <span className=" text-white text-center object-center text-xl">x</span>
                </div>
                <div className="flex flex-col text-white space-y-2 font-bold w-96 text-xl" >
                    <label>Enter Table No.</label>
                    <ul ref={tableRef} className="bg-white text-black font-normal border-l-2 border-r-2 border-black">
                        <li className="py-2 border-b-2 border-t-2 border-black" onClick={openTable}>Table {payment.table !== 'N/A' ? payment.table : 'No.'}</li>
                        {Table ? <>{displayTable}</> : null}
                    </ul>
                    <button className="bg-white text-primary py-2 font-bold" onClick={orderSearch}>Search</button>
                </div>
            </div>}
        </div>
    )
}

export default Pos
