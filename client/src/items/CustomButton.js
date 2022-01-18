import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";

const CustomButton = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={props.customStyle}
      className="text-white py-2 px-10 rounded-md mx-2 font-medium shadow-md"
      onClick={props.onPress}
    >
      {props.title}
    </button>
  );
};

export default CustomButton;
