/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { useColorMode } from "theme-ui";
import { React, useState, Fragment } from "react";
import { Link } from "gatsby";
// import { rhythm, scale } from "../utils/typography";
import { Button, Flex, Text, Box } from "rebass";
import { IoMdStats } from "react-icons/io";

// import ModeSwitch from "./ModeSwitch/ModeSwitch.js";
import DarkModeSwitch from "./DarkModeSwitch/DarkModeSwitch.js";

import SignalAnimation from "./SignalAnimation/SignalAnimation.js";

import BLMBanner from "./banner.js";


const NavButton = ({ variant = "primary", ...props }) => {
  return (
    <Button 
      {...props} 
      sx={{
        appearance: "none",
        display: "inline-block",
        textAlign: "center",
        fontSize: "medium",
        border: "2px solid",
        borderRadius: 3,
        margin: "5px",
        variant: `buttons.${variant}`,
      }}
    >
      { props.text }
    </Button>
  )
};

const NavLink = ({ variant="nav", href="/", text="" }) => {
  return (
    <Link
      sx={{ variant: variant, marginRight: 2 }}
      href={href}
    >
      {text}
    </Link>
  )
};

const MainHeader = ({...props}) => {
  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding="1rem"
      >
        <Box sx={{ margin: "1rem", }} width={[ 1/2, 1/2, 1/2 ]}>
          <h3 sx={{ display: "flex", alignItems: "center", color: "text", }}>
            <IoMdStats sx={{color: "secondary"}} size="2rem" style={{ marginRight: "1rem" }}/>
            <Link style={{ boxShadow: "none", color: "inherit", textDecoration: "none" }} to={"/"}>
              { props.title }
            </Link>
          </h3>
          {/* <h5 style={{ marginTop: 0, color: "inherit" }}>
            { props.description }
          </h5> */}
        </Box>
        {/* <ModeSwitch mode={ props.colorMode } handleToggle={ () => props.setColorMode(props.nextColorMode) } /> */}
        <Flex width={[ 1/2, 1/2, 1/2 ]} alignItems="center" justifyContent="flex-end">
          {/* <NavButton text="Categories" /> */}
          <Box>
            <NavLink text="Categories" href="/" />
            <NavLink text="About" href="/" />
          {/* <DarkModeSwitch colorMode={ props.colorMode } onChangeColorMode={ props.onChangeColorMode } /> */}
          </Box>
          {/* <Box> */}
            <DarkModeSwitch colorMode={ props.colorMode } onChangeColorMode={ props.onChangeColorMode } />
          {/* </Box> */}
        </Flex>
      </Flex>
      {/* <Flex alignItems="center" justifyContent="center" marginBottom="5rem">
        <NavButton text="Categories" />
        <NavButton text="Visualizations" />
        <NavButton text="About" />
      </Flex> */}
    </div>
  );
};

const PageHeader = ({...props}) => {
  return (
    <h3 sx={{ marginTop: 0, color: "text" }}>
      <Link style={{ boxShadow: `none`, color: `inherit`, }} to={`/`}>
        { props.title }
      </Link>
    </h3>
  );
};

const Footer = () => {
  return (
    <h5 sx={{ color: "text" }}>
      { "made with ❤ by " }
      <a href="https://github.com/joypauls">joypauls</a>
    </h5>
  );
};

const Layout = ({ location, title, description, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  // component state
  const [colorMode, setColorMode] = useColorMode();
  // const nextColorMode = colorMode === 'default' ? 'dark' : 'default';

  // const isDarkMode = colorMode === 'dark' ? true : false;

  // const [colorMode, setColorMode] = useState("default");

  // const isDarkMode = colorMode === 'dark';

  // const handleChange = (isChecked) => {
  //   setColorMode(isChecked === true ? "dark" : "default");
  // };

  // takes a bool
  const handleDarkMode = (isDark) => {
    let mode = isDark === true ? 'dark' : 'default';
    setColorMode(mode);
  };

  if (location.pathname === rootPath) {
    // TODO: make this more elegant
    header = (
      <MainHeader 
        title={title} 
        description={description} 
        // colorMode={colorMode} 
        colorMode={colorMode}
        // nextColorMode={nextColorMode} 
        // handleChange={handleChange}  
        // setColorMode={setColorMode}
        onChangeColorMode={handleDarkMode}
      />
    );
  } else {
    header = (
      <PageHeader title={title} />
    );
  }
  return (
    <Fragment>
      {/* <BLMBanner /> */}
      <Styled.root>
        
        <header>{header}</header>

        <SignalAnimation />
        
        <main sx={{ display: "flex", flexDirection: "column", color: "text" }}>
          { children }
        </main>
        
        <hr />
        
        <footer>
          <Footer />
        </footer>
      
      </Styled.root>
    </Fragment>
  );
}

export default Layout;
