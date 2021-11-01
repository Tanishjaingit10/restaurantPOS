import React, { useState,useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import signup from '../../popup';
import Popup from '../Popup';

const AddCustomer = () => {
    const history = useHistory();
    const [customer, setCustomer] = useState({ name: "", contact: "", email: "" });
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);
    const { id } = useParams();
    let name, value;
    const loadCustomer = async () => {
        console.log(id)
        await fetch(`/app/customer/${id}`).then((res) => res.json())
            .then((json) => {
                console.log(json)
                setCustomer(json)
            })
    }
    useEffect(() => {
        if (id)
            loadCustomer();
    }, [id])
    const handleCustomer = (e) => {
        name = e.target.name;
        value = e.target.value;
        console.log(name)
        console.log(value)
        setCustomer({ ...customer, [name]: value });
    }

    const onAdd = () => {
        if(id)
            history.push(`/customerDetails/${id}`);
        else 
            history.push('/pos');
    }

    const addCustomer = async (e) => {
        e.preventDefault();
        const { name, contact, email } = customer;
        let res;
        if (id) {
            res = await fetch(`/app/updateCustomer/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, contact, email
                })

            });

        }
        else {
            res = await fetch("/app/addCustomer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, contact, email
                })
            });

        }

        if (res.status === 201||res.status===200) {
            let obj = signup.find((pop) => pop.id === res.status);
            setMsg(obj.title);
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
                        <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href={id?`/customerDetails/${id}`:"/pos"}><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                        <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">{id ? 'Edit Customer' : 'New Customer'}</div>
                    </div>
                </nav>
                <form className="flex flex-col w-1/3 mx-auto mt-10 font-roboto font-bold text-xl">
                    <div className="flex flex-col py-2">
                        <label htmlFor="name" className="mb-2">Name</label>
                        <input type="text" name="name" value={customer.name} onChange={handleCustomer} className=" border-2 border-black py-2" />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="phone" className="mb-2">Phone no.</label>
                        <input type="phone" name="contact" value={customer.contact} onChange={handleCustomer} className=" border-2 border-black py-2" />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="email" className="mb-2">Mail id</label>
                        <input type="email" name="email" value={customer.email} onChange={handleCustomer} className=" border-2 border-black py-2" />
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
