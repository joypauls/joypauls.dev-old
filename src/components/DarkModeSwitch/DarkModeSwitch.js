import React, {useState} from "react";
import DarkModeToggle from "react-dark-mode-toggle";
// import NightModeToggle from "./NightModeToggle.js"

const DarkModeSwitch = (props) => {
  // const [colorMode, setColorMode] = useState("default");

  // // const isDarkMode = colorMode === 'dark';
  const handleChange = (isChecked) => {
    props.onChangeColorMode(isChecked)
    // setColorMode(isChecked === true ? "dark" : "default");
  };

  return (
    <DarkModeToggle
      // onChange={ handleToggle }
      onChange={ handleChange }
      checked={ props.colorMode == "dark" }
      size={ 80 }
      speed={ 2 }
    />
  );
};

export default DarkModeSwitch;
