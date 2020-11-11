/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from "theme-ui";
import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { Link } from "gatsby";
import { Button, Flex, Text, Box } from "rebass";
import { IoMdStats } from "react-icons/io";
import * as d3 from "d3";

import './SignalAnimation.css';

// TODO: refactor this mess jesus christ


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





function generateNormalSamples(n=10) {

  var gen = d3.randomNormal(0, 1);
  // var sample = gen(n);
  // return sample.map((d) => ({ x: d }));

  let data = [];
  for (let i = 0; i < n; i++) {
    data.push({x: gen()});
  }
  return data;
};

function makeBins(n) {

  // var data = generateUniformSamples(n);
  var data = generateNormalSamples(n);
  
  var ticks = d3.range(-2.7, 2.7, 0.6);
  
  var histogram = d3.histogram()
    .value(function(d) { return d.x; })
    .domain([-2.7, 2.69])
    .thresholds(ticks);
  var bins = histogram(data);
  // console.log(bins);
  var binCounts = bins.map((arr) => arr.length);
  
  return binCounts;
};

const WIDTH = 600;
const WIDTH_PAD = 4;
const HEIGHT = 150;
const HEIGHT_PAD = 10;
const INNER_HEIGHT = HEIGHT - (2 * HEIGHT_PAD);
// var BAR_WIDTH = 24;
// var BAR_GAP = 8;

function preprocess(data) {
  // data = d3.shuffle([...data]);s
  return data.map((d, i) => ({ id: i, value: d }));
}

function y(d, scale) {
  return HEIGHT - scale(d.value);
}

function height(d, scale) {
  return scale(d.value);
}

const SAMPLE_SIZE = 200;
var binCounts = makeBins(SAMPLE_SIZE);
var histData = preprocess(binCounts);


const generateDataset = () => (
  Array(10).fill(0).map(() => ([
    Math.random() * 80 + 10,
    Math.random() * 35 + 10,
  ]))
);


var rangeScale = d3.scaleLinear().domain([0, d3.max(binCounts)]).range([0, INNER_HEIGHT]);
console.log(rangeScale(binCounts[4]));


const generateBinCounts = () => {
  var binCounts = makeBins(SAMPLE_SIZE);

  binCounts = binCounts.map((d) => {
    if (d <= 1) {
      return 1;
    } else {
      return d;
    }
  })

  var rangeScale = d3.scaleLinear().domain([0, d3.max(binCounts)]).range([0, INNER_HEIGHT]);
  var scaledBinCounts = binCounts.map((d) => rangeScale(d));

  return scaledBinCounts;
}

const generateRangeScale = (data) => {
  var rangeScale = d3.scaleLinear().domain([0, d3.max(data)]).range([0, INNER_HEIGHT]);
  return rangeScale;
}


function gaussianNoise(n, mu=0, sigma=1, clip=true) {
  let gen = d3.randomNormal(mu, sigma);
  let data = [];
  for (let i = 0; i < n; i++) {
    let sample = gen();
    // apply clipping at 2.5*sigma
    if (clip === true) {
      let bound = 2.5*sigma;
      if (sample > bound) {
        sample = bound;
      } else if (sample < -bound) {
        sample = -bound;
      }
    }  
    data.push(sample);
  }
  return data;
}


// kernel should be odd and length checked, scaled. etc.
// same with input array
// args to keep/not keep boundary points?
// for now returns array of same length
function convolve1D(arr, kernel=[0.2, 0.2, 0.2, 0.2, 0.2]) {
  /* 1-dimensional convolution with fixed size kernel */
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
  let y = x.map(el => (Math.sin((0.017 * el) - 1)) );
  let noise = gaussianNoise(y.length, mu, sigma)
  let noisyY = y.map((el, i) => (el + noise[i]))
  let smoothedY = convolve1D(noisyY);

  let rangeScale = d3.scaleLinear().domain([d3.min(noisyY), d3.max(noisyY)]).range([0, INNER_HEIGHT]);
  let domainScale = d3.scaleLinear().domain([d3.min(x), d3.max(x)]).range([0, WIDTH]);
  let scaledY = y.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
  let scaledNoisyY = noisyY.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
  let scaledSmoothedY = smoothedY.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
  let scaledX = x.map((d) => domainScale(d));

  return {x: scaledX, y: scaledY, noisyY: scaledNoisyY, smoothedY: scaledSmoothedY};
}


// let data = generateSignalData(500);

// const makePolyline = (y) => {
//   let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
//   let coordsString = coords.join(" ");
//   // let coords2 = data.x.map((d, i) => (d.toString() + "," + data.noisyY[i].toString())).join(" ");
//   console.log(coordsString);
//   return <polyline points={coordsString} fill="none" stroke="#9459d4" strokeWidth="1" className="othersquiggle" opacity={0.9} />
// }

// const makePolylineAnimated = (y) => {
//   let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
//   let coordsString = coords.join(" ");
//   // let coords2 = data.x.map((d, i) => (d.toString() + "," + data.noisyY[i].toString())).join(" ");
//   console.log(coordsString);
//   return <polyline points={coordsString} fill="none" stroke="#E57780" strokeWidth="5" className="squiggle" opacity={0.9} />
// }

// const makePolylineAnimated2 = (y) => {
//   let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
//   let coordsString = coords.join(" ");
//   // let coords2 = data.x.map((d, i) => (d.toString() + "," + data.noisyY[i].toString())).join(" ");
//   console.log(coordsString);
//   return <polyline points={coordsString} fill="none" stroke="#E57780" strokeWidth="1.5" className="othersquiggle2" opacity={0.9} />
// }


const generatePolyline = (y, data, strokeColor, strokeWidth, className) => {
  let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
  let coordsString = coords.join(" ");
  return <polyline points={coordsString} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} className={className} opacity={0.9} />
}


const generateSignalSVG = () => {
  let noiseColor = "#9459D4";
  let smoothColor = "#E57780";
  // object with multiple arrays
  let data = generateSignalData(500);
  // let data = generateSignalData(700);
  return (
    <svg viewBox={ "0 0 " + WIDTH.toString() + " " + HEIGHT.toString() }>
        { generatePolyline(data.noisyY, data, noiseColor, "1", "othersquiggle") }
        { generatePolyline(data.smoothedY, data, smoothColor, "1.5", "othersquiggle2") }
        { generatePolyline(data.y, data, smoothColor, "5", "squiggle") }
    </svg>
  )
}



const Viz = () => {

  const [data, setData] = useState(
    generateSignalSVG()
  );

  const [showAnimation, setShowAnimation] = useState(true);

  const handleClick = useCallback(() => {
    // setData(generateSignalData(500));
    // setData(makeSVGComponent());
    setShowAnimation(false);
    setData(generateSignalSVG());
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
    <Box width={["100vw", "80vw", "60vw"]} px={2} paddingBottom={2} onClick={handleClick}>
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
    <Flex sx={{justifyContent: "center"}}>

    <Viz />
    
    </Flex>
  );
}

export default SignalAnimation;
