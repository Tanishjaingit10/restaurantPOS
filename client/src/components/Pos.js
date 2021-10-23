import React from 'react'

const Pos = () => {
    return (
        <div className="flex flex-row h-full">
            <div className="w-2/3 border-r-2 border-primary h-full shadow-2xl">
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
            <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
           <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">Menu</div>
           </div>
            </nav>
            Hello
            </div>
            <div className="w-1/3 border-l-2 border-primary h-full shadow-2xl">
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl">
                <div className="flex flex-wrap items-center">
            <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white ml-4"><a href="/home"><i className="fas fa-home font-semibold"></i></a></div>
           <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2 pl-40 font-semibold">Menu</div>
           </div>
            </nav> 
            Hello
            </div> 
        </div>
    )
}

export default Pos
