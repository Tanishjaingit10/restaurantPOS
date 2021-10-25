import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import signup from '../popup';
import Popup from './Popup';

const TableForm = () => {
    const history = useHistory();
    const [Table, setTable] = useState({ number: "", capacity: "", location: "", image: "", status:"Free" });
    const [img, setImg] = useState();
    const [imageStatus, setImageStatus] = useState('Upload');
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    };

    const handleInputs = (e) => {

        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setTable({ ...Table, [name]: value });
        setTable({ ...Table, ["status"]: Table.status });
        if (name === 'image')
            setImageStatus('Image Uploaded')

    }

    let name, value;
    const handleTable = (e) => {
        name = e.target.name;
        value = e.target.value;

        setTable({ ...Table, [name]: value });
    }

    const onAdd = ()=> {
        history.push('/tables');
    }

    const addTable = async (e) => {
        e.preventDefault();
       
        const { number, capacity, location, image, status } = Table;
        console.log(status);
        const res = await fetch("/app/addTable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                number, capacity, location, image, status
            })
        });

        const data = await res.json();
        console.log(res.status);
        console.log(Table);

        if (res.status === 201) {
            let ans = "Table added successfully";
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
                        <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/tables"><i class="fas fa-arrow-left mr-4"></i>Back</a></div>
                        <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">Add Table</div>
                    </div>
                </nav>
                <form className="flex flex-col w-1/3 mx-auto mt-10 font-roboto font-bold text-xl">
                    <div className="flex flex-col py-2">
                        <label htmlFor="number" className="mb-2">Enter New Number of Table</label>
                        <input type="text" name="number" value={Table.number} onChange={handleTable} className=" border-2 border-black py-2" />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="capacity" className="mb-2">Maximum Capacity of People</label>
                        <input type="text" name="capacity" value={Table.capacity} onChange={handleTable} className=" border-2 border-black py-2" />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="location" className="mb-2">Location</label>
                        <input type="text" name="location" value={Table.location} onChange={handleTable} className=" border-2 border-black py-2" />
                    </div>
                    <div className="flex flex-row bg-white space-x-4">
                        <div className="flex flex-col w-2/3 space-y-2">
                            <label className="">Image</label>
                            <div className="border-gray-200 border-2 py-2"><input type="file" accept="image/*" name="image-upload" id="input" onChange={imageHandler} /></div>

                            <button className="bg-primary text-white py-2 font-bold cursor-pointer" name="image" value={img} onClick={handleInputs}>{imageStatus}</button>
                        </div>
                        <div className=" w-1/3 border-primary border-2 img-holder"><img src={img} className="image" alt="" id="img" className="img" /></div>
                    </div>
                    <button className="bg-green p-2 text-white text-center font-bold px-6 mt-10" onClick={addTable}>Done</button>
                </form>
            </div>
            {isError && <Popup
                content={<>

                    <p className="pb-4 text-red font-bold">{msg}</p>
                    <button className="bg-green px-10 py-2" onClick={addTable}><a href="">Try Again</a></button>
                </>}
                handleClose={addTable}
            />}
            {isOpen && <Popup
                content={<>

                    <p className='pb-4 font-bold text-green'>{msg}</p>
                    <button className="bg-primary px-10 py-2" onClick={onAdd}><a href="">Ok</a></button>
                </>}
                handleClose={onAdd}
            />}
        </div>
    )
}

export default TableForm
