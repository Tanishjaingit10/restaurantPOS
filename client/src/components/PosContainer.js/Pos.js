import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryList from './CategoryList';
import { OrderContext } from '../../context/Cart';
import Order from './Order';
import PaymentSummary from './PaymentSummary';
import { CustomerContext } from '../../context/Customer';
import { CategoryContext } from '../../context/Category';

let customers = [];
const Pos = () => {
    const [customer, setCustomer] = useContext(CustomerContext);
    const history = useHistory();
    const [list, showList] = useState(false);
    const [cust, showCust] = useState(false);
    const [pop, showPop] = useState(false);
    const [open, setOpen] = useState(false);
    const [Table, showTable] = useState(false);
    const [cart, setCart] = useContext(OrderContext);
    const [category,setCategory]= useContext(CategoryContext)
    const [Cust, setCust] = useState()
    const [search, setSearch]=useState("");
    const customerList = async (e) => {
        const res = await fetch('/app/customers').then((res) => res.json())
            .then((json) => {
                customers = json;
            })
    }

    const custList = async (e) => {
                setCust(
                    customers.filter((option)=>{
                        if(search =="")
                            return option;
                        else if(option.contact.includes(search)){
                            return option;
                        }
                    })
                    .map((option) => {
                        return (<li className="flex flex-row text-black p-2 relative cursor-pointer" onClick={() => { setCustomer({name:option.name, contact: option.contact, email: option.email}) }}><div className="flex flex-col" ><p className="text-left">{option.name}</p><p>{option.contact}</p></div><a href={`/customerDetails/${option.contact}`}><i  class="fas fa-arrow-right absolute right-0 p-2"></i></a></li>)
                    })
                )}
                
    useEffect(() => {
        customerList();
    })
    useEffect(() => {
        custList()
        
    },[search,customers])

    const orderSearch = (e)=> {
        e.preventDefault();
        history.push("/viewOrder");
    }

    return (
        <div className="flex flex-row h-full">
            <div className="w-3/5 border-r-2 border-primary h-full shadow-2xl">
                <nav className="bg-primary p-2 mt-0 h-auto top-0 text-2xl text-white font-roboto font-semibold">
                    <div className="flex flex-row px-6 justify-items-center">
                        <div className=" justify-center md:justify-start text-white py-2"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
                        <div className="flex flex-row w-full mx-24 relative">
                            <ul className=" text-white text-left">
                                <li className="p-2 cursor-pointer"  onClick={() => { showList(!list) }}>Order New<span><i className="fas fa-chevron-down ml-8 cursor-pointer"></i></span></li>
                                {list ? <ul className="absolute bg-primary p-2 text-left text-xl"><li className="border-b-2 border-white py-2 cursor-pointer" onClick={() => { showPop(!pop) }}>Take Away-Ordered Online</li>
                                    <li className="border-b-2 border-white py-2 cursor-pointer">Takeaway New</li>
                                    <li className="border-b-2 border-white py-2 cursor-pointer">Dine In New</li>
                                    <li className="py-2 cursor-pointer" onClick={() => { setOpen(!open) }}>Dine In Ordered Online</li></ul> : null}
                            </ul>
                            <div className="ml-10 text-center p-2 cursor-pointer" onClick={() => { showCust(!cust) }}>{customer.name? customer.name:'Walk In'}<span><i className="fas fa-chevron-down ml-8 cursor-pointer"></i></span></div>
                                {cust ? <ul className="absolute top-10 right-0 bg-white mt-4 border-2 shadow-lg w-2/3 font-thin text-lg">
                                    <li className="bg-primary flex flex-row"><input value = {search} onChange={(e)=>setSearch(e.target.value)} type="text" className="bg-lightprimary py-2 w-full" /><i class="fas fa-search p-2"></i></li>
                                    {Cust}
                                    <li className="bg-green py-2 text-center"><a href="/newCustomer">+ New Customer</a></li>
                                </ul> : null}
                            
                            <div className="absolute text-center py-2 right-0"><i onClick={()=>{setCustomer([])}} className="fas fa-trash-alt ml-10 cursor-pointer"></i></div>
                        </div>
                    </div>
                </nav>
                <div className="flex flex-col">
                    {cart[0] ?<Order/> : <div className="bg-white h-96">
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
                {/* <nav className="bg-primary p-2 mt-0 h-auto top-0 text-2xl text-white font-roboto font-bold justify-items-center">
                    <div className="border-b-2 border-white px-4 mx-6"><i class="fas fa-search"></i> <input type="type"  className=" bg-primary focus:outline-none text-white text-lg py-2 mx-10" />
                    </div>
                </nav>

                <div className="w-full p-2 mx-auto font-roboto font-bold bg-white pb-4 h-full">
                    <div className="flex flex-wrap justify-evenly px-6 mt-4"> */}
                      <CategoryList />
                    {/* </div>
                   
                </div> */}

              

            </div>

            {pop && <div className="bg-primary absolute top-16 left-40 p-20">
            <div className=" absolute top-0 right-4 text-center cursor-pointer" onClick={()=>{showPop(!pop)}} >
                    <span className=" text-white text-center object-center text-xl">x</span>
                    </div>
                <div className="flex flex-col text-white space-y-2 font-bold w-96 text-xl" >
                    <label>Enter Order Id</label>
                    <input type="text" className="py-2 border-black border-2"></input>
                    <button className="bg-white text-primary py-2 font-bold">Search</button>
                </div>
            </div>}

            {open && <div className="bg-primary absolute top-16 left-40 p-20">
            <div className=" absolute top-0 right-4 text-center cursor-pointer" onClick={()=>{setOpen(!open)}} >
                    <span className=" text-white text-center object-center text-xl">x</span>
                    </div>
                <div className="flex flex-col text-white space-y-2 font-bold w-96 text-xl" >
                    <label>Enter Table No.</label>
                    <ul className="bg-white text-black font-normal border-l-2 border-r-2 border-black">
                        <li onClick={() => { showTable(!Table) }} className="py-2 border-b-2 border-t-2 border-black">Table 1</li>
                        {Table ? <><li className="py-2 border-b-2 border-black">Table 2</li>
                            <li className="py-2 border-b-2 border-black">Table 2</li>
                            <li className="py-2 border-b-2 border-black">Table 4</li></> : null}
                    </ul>
                    <button className="bg-white text-primary py-2 font-bold" onClick={orderSearch}>Search</button>
                </div>
            </div>}
        </div>
    )
}

export default Pos
