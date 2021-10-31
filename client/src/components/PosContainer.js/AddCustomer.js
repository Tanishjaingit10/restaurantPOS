import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import signup from '../../popup';
import Popup from '../Popup';

const AddCustomer = () => {
    const history = useHistory();
    const [customer, setCustomer] = useState({ name: "", phone: "", mailId: "" });
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const handleInputs = (e) => {

        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setCustomer({ ...customer, [name]: value });
    
    }

    let name, value;
    const handleCustomer = (e) => {
        name = e.target.name;
        value = e.target.value;

        setCustomer({ ...customer, [name]: value });
    }

    const onAdd = ()=> {
        history.push('/pos');
    }

    const addCustomer = async (e) => {
        e.preventDefault();
       
        const { name, phone, mailId } = customer;
        const res = await fetch("/app/addCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, phone, mailId
            })
        });

        if (res.status === 201) {
            let ans = "Customer added successfully";
            setMsg(ans);
            console.log(ans);
            setIsOpen(!isOpen);
         

        }
        else {
            let obj = signup.find((pop) => pop.id === res.status);
            setMsg(obj.title);
            console.log(msg);
            setIsError(!isError);
        }
    }

    return (
        
             <div>
            <div className="bg-white w-full h-full top-0 fixed">
                <nav className="bg-green py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                    <div className="flex flex-wrap items-center">
                        <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/pos"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                        <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">New Customer</div>
                    </div>
                </nav>
                <form className="flex flex-col w-1/3 mx-auto mt-10 font-roboto font-bold text-xl">
                    <div className="flex flex-col py-2">
                        <label htmlFor="name" className="mb-2">Name</label>
                        <input type="text" name="number" value={customer.name} onChange={handleCustomer} className=" border-2 border-black py-2" />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="phone" className="mb-2">Phone no.</label>
                        <input type="phone" name="phone" value={customer.phone} onChange={handleCustomer} className=" border-2 border-black py-2" />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="email" className="mb-2">Mail id</label>
                        <input type="email" name="mailId" value={customer.mailId} onChange={handleCustomer} className=" border-2 border-black py-2" />
                    </div>
                    <button className="bg-green p-2 text-white text-center font-bold px-6 mt-10" onClick={addCustomer}>Done</button>
                </form>
            </div>
            {isError && <Popup
                content={<>

                    <p className="pb-4 text-red font-bold">{msg}</p>
                    <button className="bg-green px-10 py-2" onClick={addCustomer}>Try Again</button>
                </>}
                handleClose={addCustomer}
            />}
            {isOpen && <Popup
                content={<>

                    <p className='pb-4 font-bold text-green'>{msg}</p>
                    <button className="bg-primary px-10 py-2" onClick={onAdd}>Ok</button>
                </>}
                handleClose={onAdd}
            />}
        </div>
        
    )
}

export default AddCustomer
