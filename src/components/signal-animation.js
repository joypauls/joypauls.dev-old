/** @jsx jsx */
import { jsx } from "theme-ui";
import { ThemeProvider } from 'theme-ui'
import { theme } from '../gatsby-plugin-theme-ui/index'
// import { useColorMode } from "theme-ui";
import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
// import { Link } from "gatsby";
// import { rhythm, scale } from "../utils/typography";
import { Button, Flex, Text, Box } from "theme-ui";
// import { IoMdStats } from "react-icons/io";

// import { select, selectAll } from 'd3-selection';

// import { scaleLinear } from 'd3-scale';
// import { randomNormal } from "d3-random";

// import { select, selectAll } from 'd3-selection';

import * as d3 from "d3";

// import { select, selectAll } from 'd3-selection';
// import transition from 'd3-transition';
// import { scaleLinear, range } from 'd3-scale';
// import { randomNormal } from "d3-random";
// import { histogram } from "d3-array";


import './signal-animation.css';


// TODO: refactor this mess jesus christ


const WIDTH = 600;
const WIDTH_PAD = 10;
const INNER_WIDTH = WIDTH - (2 * WIDTH_PAD);
const HEIGHT = 100;
const HEIGHT_PAD = 10;
const INNER_HEIGHT = HEIGHT - (2 * HEIGHT_PAD);



// import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}





// // kernel needs to be odd and length checked, scaled. etc.
// function smoother
function convolve1D(arr, kernel=[0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]) {
  let n = arr.length;
  let offset = Math.floor(kernel.length / 2)
  let newArr = [...arr];
  for (let i = offset; i < (n-offset); i++) {
    // iterate over original array and pass kernel over creating new array
    let window = 0;
    for (let j = (i-offset); j < (i+offset+1); j++) {
      let kernelIdx = j-(i-offset);
      window = window+((arr[j]-window)/(kernelIdx+1));
    }
    newArr[i] = window;
  }
  return newArr;
}

function generateSignalData(n=10, mu=0, sigma=1) {
  let x = [...Array(n).keys()];
  let y = x.map(el => (
    Math.sin((0.017 * el) - 1)) 
  );
  let yPrime = x.map(el => -1 * (Math.sin((0.017 * el) - 1)) );
  // let yPrime = x.map(el => 
  //   (Math.sin((0.017 * el + .5) - 1))
  // );


//   let noise = gaussianNoise(y.length, mu, sigma)
//   let noisyY = y.map((el, i) => (el + noise[i]))
//   let smoothedY = convolve1D(noisyY);

  let rangeScale = d3.scaleLinear().domain([d3.min(y), d3.max(y)]).range([0, INNER_HEIGHT]);
  let domainScale = d3.scaleLinear().domain([d3.min(x), d3.max(x)]).range([0, INNER_WIDTH]);
  let scaledY = y.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
  let scaledYPrime = yPrime.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
//   let scaledNoisyY = noisyY.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
//   let scaledSmoothedY = smoothedY.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
  let scaledX = x.map((d) => (WIDTH - domainScale(d) - WIDTH_PAD));

  return {x: scaledX, y: scaledY, yPrime: scaledYPrime};
}


let data = generateSignalData(500);

// // noisiest
// const makePolyline = (y) => {
//   let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
//   let coordsString = coords.join(" ");
//   // let coords2 = data.x.map((d, i) => (d.toString() + "," + data.noisyY[i].toString())).join(" ");
// //   console.log(coordsString);
//   return <polyline sx={{stroke: "tagBackground"}} points={coordsString} fill="none" strokeWidth="1" className="othersquiggle" opacity={1} />
// }

// smooothed noise
const makePrimaryLine = (y, animated) => {
  let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
  let coordsString = coords.join(" ");
  // let coords2 = data.x.map((d, i) => (d.toString() + "," + data.noisyY[i].toString())).join(" ");
//   console.log(coordsString);
  return <polyline sx={{stroke: "tagBackground", strokeLinecap: "round"}} pathLength="100" points={coordsString} fill="none" strokeWidth="15" className="primaryLine" opacity={0.8} />
}

// smooothed noise
const makeSecondaryLine = (y, animated) => {
    let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
    let coordsString = coords.join(" ");
    // let coords2 = data.x.map((d, i) => (d.toString() + "," + data.noisyY[i].toString())).join(" ");
  //   console.log(coordsString);
    return <polyline sx={{stroke: "heading", strokeLinecap: "round"}} pathLength="100" points={coordsString} fill="none" strokeWidth="15" className="secondaryLine" opacity={0.8} />
  }


const makeSVGComponent = () => {
  let data = generateSignalData(700, 0, 1.1);
  return (
    <svg viewBox={ "0 0 " + WIDTH.toString() + " " + HEIGHT.toString() }>
        {/* { makePolyline(data.noisyY) } */}
        {/* { makePolylineAnimated2(data.smoothedY) } */}
        { makePrimaryLine(data.y) }
        { makeSecondaryLine(data.yPrime) }
    </svg>
  )
}



const Viz = () => {

  const [data, setData] = useState(
    makeSVGComponent()
  );

  const [showAnimation, setShowAnimation] = useState(true);

  const handleClick = useCallback(() => {
    // setData(generateSignalData(500));
    // setData(makeSVGComponent());
    setShowAnimation(false);
    setData(makeSVGComponent());
    setShowAnimation(true);
  });

  // const [rangeScale, setRangeScale] = useState(
  //   generateRangeScale(data)
  // );

  // useInterval(() => {
  //   const newDataset = generateDataset();
  //   setDataset(newDataset);
  // }, 2000);

  return (
    <Box mx={[0, 3, 6]} px={2} paddingBottom={2} onClick={handleClick} flex={1} alignSelf="center">
      { showAnimation ? data : <div></div> }
      {/* <svg viewBox={ "0 0 " + WIDTH.toString() + " " + HEIGHT.toString() }>
        { makePolyline(data.noisyY) }
        { makePolylineAnimated(data.y) }
      </svg> */}
    </Box>
  );
}

const SignalAnimation = () => {

  return (
    <Flex sx={{justifyContent: "center", flexDirection: "column",flex: 1}}>
      <Viz/>
    </Flex>
  );
}

export default SignalAnimation;
