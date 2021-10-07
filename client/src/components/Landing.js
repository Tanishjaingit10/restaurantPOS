import React from 'react'

const Landing = () => {
    return (
        <div>
            <div className="bg-gray-800 h-2/3 w-full absolute">
                <div className="flex flex-col">
                <div><p className="inline text-white font-bold py-10 text-4xl align-middle">Welcome to my Restaurant</p></div>
                <div className="inline ">
                    <button className="bg-white text-gray-800 font-bold p-2 rounded-lg mx-10"><a href="/signup">SignUp</a></button>
                    <button className="bg-white text-gray-800 font-bold p-2 rounded-lg mx-10"><a href="/login">Login</a></button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
