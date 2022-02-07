import React from 'react';
import Loading from '.././assets/Images/loading.gif'

const Loader = () => {
    return (
        <div className=" w-full absolute">
            <img src={Loading} alt="" className="mx-auto w-52 h-52 mt-28" />
        </div>
    )
}

export default Loader
