// import React, { useState, useContext, useEffect, createRef } from 'react';
// import { useHistory } from 'react-router-dom';
// import CategoryList from './CategoryList';
// import { OrderContext } from '../../context/Cart';
// import Order from './Order';
// import PaymentSummary from './PaymentSummary';
// import { CustomerContext } from '../../context/Customer';
// import { PaymentContext } from '../../context/Payment';
// const Pos = () => {
//     const [customer, setCustomer] = useContext(CustomerContext);
//     const history = useHistory();
//     const [payment, setPayment] = useContext(PaymentContext);
//     const [list, showList] = useState(false);
//     const [cust, showCust] = useState(false);
//     const [pop, showPop] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [Table, showTable] = useState(false);
//     const [cart] = useContext(OrderContext);
//     const [Cust, setCust] = useState()
//     const [search, setSearch] = useState("");
//     const [displayTable, setdisplayTable] = useState()
//     const typeRef = createRef();
//     const custRef = createRef();
//     const tableRef = createRef();

//     const handleClickOutside = e => {
//         if (typeRef.current && !typeRef.current.contains(e.target)) {
//             showList(false);
//         };
//         if (custRef.current && !custRef.current.contains(e.target)) {
//             showCust(false);

//         };
//         if (tableRef.current && !tableRef.current.contains(e.target)) {
//             showTable(false);
//         }
//     }
//     const getCustomers = async (e)=>{
//         await fetch("/app/customers")
//         .then((res) => res.json())
//         .then((json) =>
//         setCust(
//             json.filter((option) => {
//                 if (search === "")
//                     return option;
//                 else if (option.contact.includes(search)||option.name.toLowerCase().includes(search.toLowerCase())) {
//                     return option;
//                 }
//                 return null;
//             })
//                 .map((option) => {
//                     return (<li className="flex flex-row text-black p-2 relative cursor-pointer" onClick={() => { setCustomer({ name: option.name, contact: option.contact, email: option.email }) }}><div className="flex flex-col" ><p className="text-left">{option.name}</p><p>{option.contact}</p></div><a href={`/customerDetails/${option.contact}`}><i class="fas fa-arrow-right absolute right-0 p-2"></i></a></li>)
//                 })
//         )
//         )
//     }

//     useEffect(() => {
//         getCustomers()
//         //eslint-disable-next-line
//     }, [search])
//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     });

//     const orderSearch = (e) => {
//         e.preventDefault();
//         history.push("/viewOrder");
//     }
//     const openTable = async (e) => {
//         e.preventDefault();
//         showTable(!Table);
//         await fetch(
//             "/app/table")
//             .then((res) => res.json())
//             .then((json) => {
//                 console.log(json)
//                 setdisplayTable(json.map((option) => {
//                     if (option.status === 'Free')
//                         return (<li><button className="py-2 border-b-2 border-t-2 border-black w-full text-left" onClick={handleTable} name="category" value={option.number}>Table {option.number}</button></li>)
//                     return null;
//                 }))
//             })

//     }
//     const handleTable = async (e) => {
//         e.preventDefault();
//         setPayment((prev) => ({ ...prev, table: e.target.value }))
//         showTable(false)
//     }

//     return (
//         <div className="flex flex-row overflow-hidden h-full">
//             <div className="w-3/5 border-r-2 border-primary shadow-2xl overflow-hidden ">
//                 <nav className="bg-primary p-2 mt-0 h-auto top-0 text-2xl text-white font-roboto font-semibold ">
//                     <div className="flex flex-row px-6 justify-items-center">
//                         <div className=" justify-center md:justify-start text-white py-2"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
//                         <div className="flex flex-row w-full mx-24 relative">
//                             <ul className=" text-white text-left" ref={typeRef}>
//                                 <li className="p-2 cursor-pointer" onClick={() => { showList(!list) }}>{payment.orderType}<span><i className="fas fa-chevron-down ml-8 cursor-pointer"></i></span></li>
//                                 {list ? <ul className="absolute bg-primary p-2 text-left text-xl"><li className="border-b-2 border-white py-2 cursor-pointer" onClick={() => { showPop(!pop) }}>Take Away-Ordered Online</li>
//                                     <li className="border-b-2 border-white py-2 cursor-pointer" onClick={() => { setPayment((prev) => ({ ...prev, orderType: 'Take Away' })) }}>Takeaway New</li>
//                                     <li className="border-b-2 border-white py-2 cursor-pointer" onClick={() => { setPayment((prev) => ({ ...prev, orderType: 'Dine In' })) }}>Dine In New</li>
//                                     <li className="py-2 cursor-pointer" onClick={() => { setOpen(!open) }} >Dine In Ordered Online</li></ul> : null}
//                             </ul>
//                             <ul className=" text-white text-left" ref={custRef}>
//                             <li className="ml-10 text-center p-2 cursor-pointer" onClick={() => { showCust(!cust) }}>{customer.name ? customer.name : 'Walk In'}<span><i className="fas fa-chevron-down ml-8 cursor-pointer"></i></span></li>
//                             {cust ? <ul className="absolute top-10 right-0 bg-white mt-4 border-2 shadow-lg w-2/3 font-thin text-lg z-30">
//                                 <li className="bg-primary flex flex-row"><input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="bg-lightprimary py-2 w-full" /><i class="fas fa-search p-2"></i></li>
//                                 {Cust}
//                                 <li className="bg-green py-2 text-center"><a href="/newCustomer">+ New Customer</a></li>
//                             </ul> : null}
//                             </ul>

//                             <div className="absolute text-center py-2 right-0"><i onClick={() => { window.location.reload(false)}} className="fas fa-trash-alt ml-10 cursor-pointer"></i></div>
//                         </div>
//                     </div>
//                 </nav>
//                 <div className="flex flex-col">
// {cart[0] ? <Order /> : <div className="bg-white h-80">
//     <div className="flex flex-col  w-1/3 mx-auto justify-items-center mt-10 space-y-2">
//         <div className=" border-dashed border-2 border-gray-600 w-24 h-24 rounded-lg mx-auto"></div>
//         <p className=" font-bold text-gray-600 text-center">Order is Empty</p>
//         <p className=" text-gray-600 text-center">Add Food items</p>
//     </div>
// </div>}

//                     <PaymentSummary />
//                 </div>
//             </div>
//             <div className="w-2/5 border-l-2 border-primary h-full shadow-2xl">
//                 <CategoryList />
//             </div>

//             {pop && <div className="bg-primary absolute top-16 left-40 p-20">
//                 <div className=" absolute top-0 right-4 text-center cursor-pointer" onClick={() => { showPop(!pop) }} >
//                     <span className=" text-white text-center object-center text-xl">x</span>
//                 </div>
//                 <div className="flex flex-col text-white space-y-2 font-bold w-96 text-xl" >
//                     <label>Enter Order Id</label>
//                     <input type="text" className="py-2 border-black border-2"></input>
//                     <button className="bg-white text-primary py-2 font-bold">Search</button>
//                 </div>
//             </div>}

//             {open && <div className="bg-primary absolute top-16 left-40 p-20 z-30">
//                 <div className=" absolute top-0 right-4 text-center cursor-pointer" onClick={() => { setOpen(!open) }} >
//                     <span className=" text-white text-center object-center text-xl">x</span>
//                 </div>
//                 <div className="flex flex-col text-white space-y-2 font-bold w-96 text-xl" >
//                     <label>Enter Table No.</label>
//                     <ul ref={tableRef} className="bg-white text-black font-normal border-l-2 border-r-2 border-black">
//                         <li className="py-2 border-b-2 border-t-2 border-black" onClick={openTable}>Table {payment.table !== 'N/A' ? payment.table : 'No.'}</li>
//                         {Table ? <>{displayTable}</> : null}
//                     </ul>
//                     <button className="bg-white text-primary py-2 font-bold" onClick={orderSearch}>Search</button>
//                 </div>
//             </div>}
//         </div>
//     )
// }

// export default Pos

import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    nonVegIconImageBase64,
    UncategorizedBgImageBase64,
    vegIconImageBase64,
} from "../../constants";
import { CategoryContext } from "../../context/Category";
import CustomNavBar from "../../items/CustomNavBar";
import ChooseVariantOverlayButton from "./ChooseVariantOverlayButton";
import CommentsOverlayButton from "./CommentsOverlayButton";
import CustomerInfoOverlayButton from "./CustomerInfoOverlayButton";

export default function Pos() {
    const { categories, foodItems, fetchCategories, fetchItems } =
        useContext(CategoryContext);
    const [search, setSearch] = useState("");
    const [orderType, setOrderType] = useState("Dine In");
    const [serviceTax, setServiceTax] = useState(false);
    const [total, setTotal] = useState();
    const [subTotal, setSubTotal] = useState();
    const [paymentMode, setPaymentMode] = useState();
    const [seeBillDetails, setSeeBillDetails] = useState(false);
    const [chargeNoPayment, setChargeNoPayment] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search");
    };

    return (
        <div className="h-screen flex flex-col pt-14">
            <div className="absolute left-0 right-0 top-0">
                <CustomNavBar />
            </div>
            <div className="grid grid-cols-5 h-full">
                <div className="py-6 overflow-auto">
                    <div className="col-span-1 h-full flex flex-col items-center px-4 overflow-auto">
                        <button
                            style={{
                                backgroundImage: `url(${UncategorizedBgImageBase64})`,
                            }}
                            className="rounded-md bg-cover bg-center mb-3 w-full"
                        >
                            <div className="bg-white bg-opacity-80 px-8 py-3 font-bold text-gray-600 text-xl border shadow-md border-black rounded-md">
                                All Items
                            </div>
                        </button>
                        {categories.map((item) => (
                            <button
                                key={item._id}
                                style={{
                                    backgroundImage: `url(${item?.image})`,
                                }}
                                className="rounded-md bg-center mb-3 w-full"
                            >
                                <div className="bg-white bg-opacity-90 px-8 py-3 font-bold text-gray-600 text-xl border shadow-md border-black rounded-md">
                                    {item.category}
                                </div>
                            </button>
                        ))}
                        {foodItems.some(
                            (e) =>
                                !categories.some(
                                    (x) => e.category === x.category
                                )
                        ) && (
                            <button
                                style={{
                                    backgroundImage: `url(${UncategorizedBgImageBase64})`,
                                }}
                                className="rounded-md bg-cover bg-center mb-2 w-full"
                            >
                                <div className="bg-white bg-opacity-80 px-8 py-3 font-bold text-gray-600 text-xl border shadow-md border-black rounded-md">
                                    Uncategorized
                                </div>
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-span-2 border-l border-gray-400 flex flex-col border-r h-full p-4">
                    <form
                        onSubmit={(e) => handleSearch(e)}
                        className="relative mx-5 mb-3 border border-gray-300 rounded-md"
                    >
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="rounded-md p-3 w-full"
                            placeholder="Search for food item...."
                        />
                        <button
                            type="submit"
                            className="fas fa-search text-gray-300 absolute right-4 text-xl top-1/2 transform -translate-y-1/2"
                        />
                    </form>
                    <div className="grid grid-cols-2 overflow-auto p-4">
                        {foodItems.map((item) => (
                            <ChooseVariantOverlayButton
                                item={item}
                                className="text-center font-semibold relative flex-1 rounded-md bg-yellow-100 p-8 m-2 text-xl shadow-md"
                            >
                                <img
                                    className="absolute w-4 top-3 right-3"
                                    src={
                                        item.foodType === "veg"
                                            ? vegIconImageBase64
                                            : nonVegIconImageBase64
                                    }
                                    alt=""
                                />
                                {item.foodItem}
                            </ChooseVariantOverlayButton>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 flex flex-col h-full">
                    <div className="p-4 flex px-10">
                        <button
                            onClick={() => setOrderType("Dine In")}
                            className={`border-2 font-bold mx-3 flex-1 p-2 ${
                                orderType === "Dine In"
                                    ? "text-white bg-red"
                                    : "text-red bg-white"
                            } rounded-md border-red`}
                        >
                            Dine In
                        </button>
                        <button
                            onClick={() => setOrderType("Take Away")}
                            className={`border-2 font-bold mx-3 flex-1 p-2 ${
                                orderType === "Take Away"
                                    ? "text-white bg-red"
                                    : "text-red bg-white"
                            } rounded-md border-red`}
                        >
                            Take Away
                        </button>
                    </div>
                    <div className="flex">
                        <Link
                            to="/tables"
                            className="bg-red flex flex-col items-center justify-center text-white h-14 m-2 border-2 flex-1"
                        >
                            <div className="border h-4 w-4" />
                            <div className="text-xs">5</div>
                        </Link>
                        <CustomerInfoOverlayButton className="bg-red flex flex-col items-center justify-center text-white h-14 my-2 border-2 flex-1">
                            <div className="h-4 w-4 far fa-user" />
                            <div className="text-xs">Coustomer Information</div>
                        </CustomerInfoOverlayButton>
                        <CommentsOverlayButton className="bg-red flex flex-col items-center justify-center text-white h-14 m-2 border-2 flex-1">
                            <div className="h-4 w-4 far fa-sticky-note" />
                            <div className="text-xs">Comments</div>
                        </CommentsOverlayButton>
                    </div>
                    {/* <div className="flex-auto h-0 m-4 overflow-y-auto">
                        <div className="h-14 border border-gray-300 border-l-0 flex">
                            <div className="flex-1 flex items-center">
                                <button class="fas fa-times-circle text-xl text-red p-2"></button>
                                <div className="flex flex-col justify-center">
                                    <div>French Fries</div>
                                    <ChooseVariantOverlayButton className="text-xxs text-blue font-bold">
                                        1x With Variant Option 1 ($0.5)
                                    </ChooseVariantOverlayButton>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="border-r border-l border-gray-300 p-1 flex items-center justify-center">
                                    <button className="fas fa-minus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs" />
                                    <input
                                        type="text"
                                        className="rounded shadow-inner p-2 w-14 h-8"
                                    />
                                    <button className="fas fa-plus rounded border h-8 w-8 flex items-center justify-center text-gray-500 border-gray-300 shadow-sm text-xxs" />
                                </div>
                                <div className="flex items-center justify-center flex-1">
                                    $6.75
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="bg-white h-full flex items-center justify-center">
                        <div className="flex flex-col w-1/3 mx-auto justify-items-center space-y-2">
                            <div className=" border-dashed border-2 border-gray-600 w-24 h-24 rounded-lg mx-auto"></div>
                            <p className=" font-bold text-gray-600 text-center">
                                Order is Empty
                            </p>
                            <p className=" text-gray-600 text-center">
                                Add Food items
                            </p>
                        </div>
                    </div>
                    <div className="mt-auto relative flex-shrink-0">
                        <div className="absolute transform -translate-y-full w-full top-0">
                            <button
                                onClick={() => setSeeBillDetails((e) => !e)}
                                className={`fas fa-caret-${
                                    seeBillDetails ? "down" : "up"
                                } mx-auto flex items-center justify-center px-7 text-white`}
                                style={{ backgroundColor: "#c4c4c4" }}
                            />
                            <div hidden={!seeBillDetails} className="border-">
                                <div
                                    className="h-14 flex items-center justify-between px-4"
                                    style={{ backgroundColor: "#c4c4c4" }}
                                >
                                    <div className="text-white font-semibold">
                                        Discount
                                    </div>
                                    <button className="p-2 text-center w-32 font-semibold rounded-md bg-white">
                                        $10.00
                                    </button>
                                </div>
                                <div
                                    className="h-14 flex items-center justify-between px-4"
                                    style={{ backgroundColor: "#c4c4c4" }}
                                >
                                    <div className="text-white font-semibold">
                                        Service Tax
                                    </div>
                                    <button className="p-2 text-center w-32 font-semibold rounded-md bg-white">
                                        $10.00
                                    </button>
                                </div>
                                <div
                                    className="h-14 flex items-center justify-between px-4"
                                    style={{ backgroundColor: "#c4c4c4" }}
                                >
                                    <div className="text-white font-semibold">
                                        Tip
                                    </div>
                                    <button className="p-2 text-center w-32 font-semibold rounded-md bg-white">
                                        $10.00
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-14 flex items-center px-4 justify-between"
                            style={{ backgroundColor: "#c4c4c4" }}
                        >
                            <div className="flex">
                                <button className="h-10 mr-4 text-white items-center flex font-semibold rounded-md px-14 bg-red">
                                    Split
                                </button>
                                <button
                                    htmlFor="charge"
                                    className="px-2 flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        checked={serviceTax}
                                        className="h-4 w-4"
                                    />
                                    <span className="text-white ml-2 font-semibold">
                                        Add Service Tax
                                    </span>
                                </button>
                            </div>
                            <div className="text-2xl text-right font-bold">
                                {`Total: $${"90.75"}`}
                            </div>
                        </div>
                        <div className="h-14 flex items-center justify-between text-white bg-red">
                            <button
                                onClick={() => setPaymentMode("cash")}
                                className="mx-4 flex items-center"
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={paymentMode === "cash"}
                                    className="h-4 w-4"
                                />
                                <span className="font-semibold mx-4">Cash</span>
                            </button>
                            <button
                                onClick={() => setPaymentMode("card")}
                                className="mx-4 flex items-center"
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={paymentMode === "card"}
                                    className="h-4 w-4"
                                />
                                <span className="font-semibold mx-4">Card</span>
                            </button>
                            <button
                                onClick={() => setPaymentMode("payLater")}
                                className="mx-4 flex items-center"
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={paymentMode === "payLater"}
                                    className="h-4 w-4"
                                />
                                <span className="font-semibold mx-4">
                                    Paylater
                                </span>
                            </button>
                            <button
                                onClick={() => setPaymentMode("online")}
                                className="mx-4 flex items-center"
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={paymentMode === "online"}
                                    className="h-4 w-4"
                                />
                                <span className="font-semibold mx-4">
                                    Online
                                </span>
                            </button>
                        </div>
                        <div
                            className="h-14 flex items-center justify-center"
                            style={{ backgroundColor: "#c4c4c4" }}
                        >
                            <button
                                htmlFor="charge"
                                className="p-2 flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    checked={chargeNoPayment}
                                    className="h-4 w-4"
                                />
                                <span className="text-white mr-5 ml-3 font-semibold">
                                    Charge No Payment
                                </span>
                            </button>
                            <button className="p-2 text-white font-semibold rounded-md w-1/3 mx-2 bg-green">
                                Complete Payment
                            </button>
                        </div>
                        <div className="h-14 bg-white flex items-center justify-center">
                            <button className="p-2 text-white font-semibold rounded-md w-1/4 mx-2 bg-red">
                                Save
                            </button>
                            <button className="p-2 text-white font-semibold rounded-md w-1/4 mx-2 bg-yellow-300">
                                Print Bill
                            </button>
                            <button className="p-2 text-white font-semibold rounded-md w-1/4 mx-2 bg-yellow-300">
                                Genetare KOT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
