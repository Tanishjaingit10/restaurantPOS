import React, { useState } from 'react'

const Tables = () => {
    const [show, setShow] = useState(false);
    const [Table, setTable] = useState({ number: "", capacity: "", location: "", image: "" });
    const [img, setImg] = useState();
    const [imageStatus, setImageStatus] = useState('Upload')

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        console.log({ img })
    };

    const handleInputs = (e) => {

        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setTable({ ...Table, [name]: value });
        if (name === 'image')
            setImageStatus('Image Uploaded')

    }

    let name, value;
    const handleTable = (e) => {
        name = e.target.name;
        value = e.target.value;
        console.log(name)
        console.log(value)
        setTable({ ...Table, [name]: value });
    }

    const addTable = ()=> {
        setShow(!show);
    }

    return (
        <div>
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">Tables</div>
                </div>
            </nav>
            <div className="flex flex-col">
                <div className="flex flex-wrap">
                <div className="flex flex-col bg-red">
                    <div className="flex flex-row bg-primary">
                         <img></img>
                         <div></div>
                    </div>
                    <div className="flex flex-row bg-blue"></div>
                </div>
                </div>
                <button className="bg-green" onClick={() => { setShow(!show) }}>Add Table</button>
            </div>
            {show && <div className="bg-white w-full h-full top-0 fixed">
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
            </div>}
        </div>
    )
}

export default Tables
