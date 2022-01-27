import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme";

const CustomTable = ({ children, id }) => {
  const theme = useContext(ThemeContext);
  
  return(
    <table className="min-w-full divide-y divide-x divide-gray-200" id={id}>
      <thead style={{ backgroundColor: theme.backgroundColor }}>
        {children[0]}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {children[1]}
      </tbody>
    </table>
  )
}

export default CustomTable
