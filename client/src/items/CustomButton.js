import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";

const CustomButton = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{ backgroundColor: theme.backgroundColor }}
      className="text-white py-2 px-10 rounded-md mx-2"
    >
      {props.title}
    </button>
  );
};

export default CustomButton;
