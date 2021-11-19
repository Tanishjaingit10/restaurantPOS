import React from 'react'

const ClockInOut = () => {
    return (
        <div>
             <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl ">
        <div className="text-center w-full relative">
          <div className=" text-white ml-4 absolute left-4">
            <a href="/attendance">
              <i className="fas fa-arrow-left mr-4"/>Back
            </a>
          </div>
          <div className="text-white px-2  font-semibold">
           Clock In / Out
          </div>
        </div>
      </nav>
      <div className="mt-20">
            <form className="w-1/2 md:w-1/3 mx-auto py-10 font-bold font-roboto text-lg">
                <div className="shadow-2xl">
                <div className="bg-primary px-6 pt-4">
                <label className="text-left text-white">Enter User Id</label>
                        <input
                        name="email_id"
                        type="email"
                        // value={email_id}
                        // onChange={(e) => setEmail(e.target.value)}
                        className={"w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"}
                        />
                </div>
               
                <div className="bg-primary px-6 pb-4">
                <label className="text-white text-left">Password / Employee Code</label>
                        <input
                            name="password"
                            type="password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                           className={"w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"}
                        />
                </div>
                </div>
                <div className="bg-white w-full my-6">
                    <button className="bg-green w-full py-4 text-white font-semibold text-2xl focus:outline-none"
                      value="Login"
                    /*onClick={loginUser}*/ type="submit">Clock In</button>
                </div>
                {/* <p className="text-center">New User ? <a href="/" className="underline">Sign Up</a></p> */}
            </form>
        </div>
        {/* {isOpen && <Popup
      content={<>
       
        <p className="pb-4 text-red font-bold">{msg}</p>
        <button className="bg-green px-10 py-2" onClick={loginUser}>Try Again</button>
      </>}
      handleClose={loginUser}
    />} */}
        </div>
    )
}

export default ClockInOut
