import React from "react";

const CustomChart = ({children, title, icon}) => {

  return (
    <div className="my-5 shadow-xl w-full">
      <div className="px-5 py-4 rounded-t-xl flex flex-row" style={{backgroundColor: "rgb(255, 102, 94)" }}>
        {icon}
        <h5 className="text-xl text-white font-semibold ml-5">{title}</h5>
      </div>
      <div className="flex flex-row justify-between" >
        {children[0]}
      </div>
      <div className="rounded-b-xl p-5">
        <div className="flex justify-end">
          {children[3]}
        </div>
        <div>
          {children[4]}
          {children[5]}
        </div>
      </div>
    </div>
  )
}

export default CustomChart