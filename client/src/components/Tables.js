import React, { useState, useEffect } from 'react';

const Tables = () => {
    const [displayTable, setDisplayTable] = useState();
    let code;
    const loadTables = async ()=>{
        await fetch(
            "/app/table")
            .then((res) => res.json())
            .then((json) => {
                console.log(json) 
                setDisplayTable(json.map((obj,index) => {
                    if(index%3==0)
                        code = "#BE2D19";
                    else if(index%3==1)
                       code = "#1DBE19";
                    else
                       code = "#e58f55";
                      return (  <div className="flex flex-col w-96 mx-4">
                        <div className="flex flex-row">
                            <div className="w-1/2 bg-gray-400 "><img src={obj.image} className="w-full h-32"/></div>
                            <div className="w-1/2 bg-pink flex flex-col text-xl font-roboto">
                                <button className="w-full bg-lightprimary text-primary py-2 font-bold h-1/2">Reorder</button>
                                <button className="w-full bg-primary text-white py-2 font-bold h-1/2">Remove</button>
                            </div>
                        </div>
                        <div className="flex flex-col text-white p-4 text-lg font-roboto" style={{backgroundColor:code}}>
                            <div className="relative font-semibold"><label>Table : {obj.number}</label><span className="absolute right-0">{obj.status}</span></div>
                            <div className="relative font-semibold"><label>Person : {obj.capacity}</label><span className="absolute right-0">{obj.location}</span></div>
                        </div>
                        <div className="relative rounded-full -top-6 bg-white w-10 h-10 mx-auto shadow-lg text-red text-center text-xl" style={{color:code}}><i className="fas fa-chevron-down mt-2"></i></div>
                    </div>
                       ) 
                })  )
            })
    }

    useEffect(() => {
        loadTables();
    }, [])
   
    return (
        <div>
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
                    <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">Tables</div>
                </div>
            </nav>
            <div className="flex flex-col">
                <div className="flex flex-wrap p-8 w-full justify-evenly">
                    {displayTable}
                    {/* <div className="flex flex-col w-96 mx-4">
                        <div className="flex flex-row bg-primary">
                            <div className="w-1/2 bg-gray-400">Hello</div>
                            <div className="w-1/2 bg-pink flex flex-col text-lg font-roboto">
                                <button className="w-full bg-lightprimary text-primary py-2 font-bold">Reorder</button>
                                <button className="w-full bg-primary text-white py-2 font-bold">Remove</button>
                            </div>
                        </div>
                        <div className="flex flex-col bg-red text-white p-4 text-lg font-roboto">
                            <div className="relative font-semibold"><label>Table : 1</label><span className="absolute right-0">Occupied</span></div>
                            <div className="relative font-semibold"><label>Person : 4</label><span className="absolute right-0">East Wing</span></div>
                        </div>
                        <div className="relative rounded-full -top-4 bg-white w-8 h-8 mx-auto shadow-lg text-red text-center"><i className="fas fa-chevron-down mt-2"></i></div>
                    </div> */}
                    {/* <div className="flex flex-col w-96 mx-4">
                        <div className="flex flex-row bg-primary">
                            <div className="w-1/2 bg-gray-400">Hello</div>
                            <div className="w-1/2 bg-pink flex flex-col text-lg font-roboto">
                                <button className="w-full bg-lightprimary text-primary py-2 font-bold">Reorder</button>
                                <button className="w-full bg-primary text-white py-2 font-bold">Remove</button>
                            </div>
                        </div>
                        <div className="flex flex-col bg-red text-white p-4 text-lg font-roboto">
                            <div className="relative font-semibold"><label>Table : 1</label><span className="absolute right-0">Occupied</span></div>
                            <div className="relative font-semibold"><label>Person : 4</label><span className="absolute right-0">East Wing</span></div>
                        </div>
                        <div className="relative rounded-full -top-4 bg-white w-8 h-8 mx-auto shadow-lg text-red text-center"><i className="fas fa-chevron-down mt-2"></i></div>
                    </div>
                    <div className="flex flex-col w-96 mx-4">
                        <div className="flex flex-row bg-primary">
                            <div className="w-1/2 bg-gray-400">Hello</div>
                            <div className="w-1/2 bg-pink flex flex-col text-lg font-roboto">
                                <button className="w-full bg-lightprimary text-primary py-2 font-bold">Reorder</button>
                                <button className="w-full bg-primary text-white py-2 font-bold">Remove</button>
                            </div>
                        </div>
                        <div className="flex flex-col bg-red text-white p-4 text-lg font-roboto">
                            <div className="relative font-semibold"><label>Table : 1</label><span className="absolute right-0">Occupied</span></div>
                            <div className="relative font-semibold"><label>Person : 4</label><span className="absolute right-0">East Wing</span></div>
                        </div>
                        <div className="relative rounded-full -top-4 bg-white w-8 h-8 mx-auto shadow-lg text-red text-center"><i className="fas fa-chevron-down mt-2"></i></div>
                    </div> */}
                   
                    
                </div>
                <button className="bg-green w-80 mx-auto py-2 text-white font-roboto font-bold text-lg"><a href="/addTable">Add Table</a></button>
            </div>
          
          
            
        </div>
    )
}

export default Tables
