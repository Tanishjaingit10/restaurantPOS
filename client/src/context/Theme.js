import React, { useState } from "react";

const ThemeContext = React.createContext("light");

function ThemeProvider(props) {
  const theme = {
    backgroundColor: "rgba(229, 73, 65, 1)",
    textColor: "white",
    tableBackground: "rgba(229, 73, 65, 0.5)",
  };
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
