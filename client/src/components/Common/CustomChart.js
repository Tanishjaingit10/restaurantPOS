import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { FiRefreshCcw } from 'react-icons/fi';

const CustomChart = ({children, title, setReload, reload, setComponentLoading, icon}) => {
  const theme = useContext(ThemeContext);

  return (
    <div className="m-5 shadow-xl">
      <div className="px-5 py-4 rounded-t-xl flex flex-row" style={{backgroundColor: "rgb(255, 102, 94)" }}>
        {icon}
        <h5 className="text-xl text-white font-semibold ml-5">{title}</h5>
      </div>
      <div className="flex flex-row justify-between" >
        {children[0]}
        <div className="flex flex-row align-center">
          <div className="">
            {children[1]}
          </div>
          <div
            style={{ backgroundColor: theme.backgroundColor, height: 40 }}
            className="text-white py-2 px-2 rounded-md mx-2 shadow-md mt-4" 
          >
            <i onClick={() => {setReload(!reload); setComponentLoading(true)}} style={{cursor: "pointer"}}><FiRefreshCcw size={22}/></i>
          </div>
        </div>
      </div>
      <div className="rounded-b-xl p-5">
        <div className="flex justify-end">
          {children[2]}
        </div>
        {children[3]}
      </div>
    </div>
  )
}

export default CustomChart