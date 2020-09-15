/** @jsx jsx */
import { jsx } from "theme-ui";
import { useColorMode } from "theme-ui";
import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { Link } from "gatsby";
// import { rhythm, scale } from "../utils/typography";
import { Button, Flex, Text, Box } from "rebass";
import { IoMdStats } from "react-icons/io";

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

const WIDTH = 500;
const WIDTH_PAD = 4;
const HEIGHT = 200;
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

// BAR_WIDTH = Math.floor((WIDTH - (2 * WIDTH_PAD)) / binCounts.length) - BAR_GAP



// class Placeholder extends React.Component {

//   constructor(props) {
//     super(props);
    
//     // initialize array of hexData in state
//     this.state = {  };
//   }

//   componentDidMount() {
//       // D3 Code to create the chart
//       // using this._rootNode as container

//       // this.hist = d3.select(this._rootNode).append("svg")
//       //   .attr("width", WIDTH)
//       //   .attr("height", HEIGHT)
//       //   .append("g");

//       var hist = d3.select("#d3-svg")
//         .attr("width", WIDTH)
//         .attr("height", HEIGHT)
//         .append("g");

//       const t = d3.transition()
//         .duration(1000)
//         .transition()
//         .ease(d3.easeBackInOut);

//       const bar = hist.selectAll("g").data(histData, d => d.id);
//       // EXIT section
//       bar.exit().remove();

//       console.log(bar)
    
//       var scale = d3.scaleLinear().domain([0, d3.max(binCounts)]).range([0, INNER_HEIGHT]);

//       // UPDATE section
//       bar.transition(t).attr(
//         "transform", 
//         (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d, scale)})`
//       );

//       bar.select("rect").transition(t).attr("height", (d) => (height(d, scale)));
      
//       // ENTER section
//       const barEnter = bar.enter()
//         .append("g")
//         .attr(
//           "transform", 
//           (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${INNER_HEIGHT})`
//         );
    
//       barEnter
//         // .transition(t)
//         .attr(
//           "transform", 
//           (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d, scale)})`
//         );
      
//       const rect = barEnter.append("rect")
//           .attr("x", 0)
//           .attr("y", 0)
//           .attr("width", BAR_WIDTH)
//           .attr("height", 0);
      
//       rect.attr("height", (d) => (height(d, scale)));
//   }

//   shouldComponentUpdate() {
//       // Prevents component re-rendering
//       return false;
//   }

//   // _setRef(componentNode) {
//   //     this._rootNode = componentNode;
//   // }

//   render() {
//     // return <svg ref={(elem) => { this.svg = elem; }} />;
//     return <svg id="d3-svg"></svg>;
//   }
// }


// const generateDataset = () => (
//   Array(10).fill(0).map(() => ([
//     Math.random() * 80 + 10,
//     Math.random() * 35 + 10,
//   ]))
// );

// const Placeholder = () => {

//   const [dataset, setDataset] = useState(
//     generateDataset()
//   );

//   useInterval(() => {
//     const newDataset = generateDataset();
//     setDataset(newDataset);
//   }, 2000);

//   return (
//     <svg viewBox="0 0 100 50">
//       {dataset.map(([x, y], i) => (
//         <circle
//           cx={x}
//           cy={y}
//           r="3"
//         />
//       ))}
//     </svg>
//   );
// }


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






// function originalSignal(n=10) {
//   let x = [...Array(n).keys()];
//   let y = x.map(el => (Math.sin((0.017 * el) - 1)) );
//   let data = [];
//   for (let i = 0; i < n; i++) {
//       data.push({x: x[i], y: y[i]});
//   }
//   return data;
// }

function gaussianNoise(n, mu=0, sigma=1) {
  let gen = d3.randomNormal(mu, sigma);
  let data = [];
  for (let i = 0; i < n; i++) {
      data.push(gen());
  }
  return data;
}

function noisifySignal(arr, mu=0, sigma=1) {
  let noise = gaussianNoise(arr.length, mu, sigma)
  let noisySignal = arr.map((el, i) => ({x: el.x, y: el.y + noise[i]}))
  return noisySignal;
}




// set the dimensions and margins of the graph




// var data = simpleRandomWalk()

// var data2 = simpleRandomWalk()

// var originalData = originalSignal(n=500);
// var noisyData = noisifySignal(originalData);


// var data_array = [];
// var min = [];
// var max = [];
// for (let i = 1; i < 10; i++) {
//     let data = simpleRandomWalk()
  
//     // let y = data.forEach(function(el) {
//     //     return el.y;
//     // });

//     min.push(d3.min(data, function(d) { return d.y; }));
//     max.push(d3.max(data, function(d) { return d.y; }));

//     data_array.push(data);
// }


// // Scale the range of the data
// x.domain(d3.extent(originalData, function(d) { return d.x; }));
// y.domain([d3.min(noisyData, function(d) { return d.y; }), d3.max(noisyData, function(d) { return d.y; })]);




// // Add the valueline paths
// data_array.forEach(function(el) {
//     svg.append("path")
//     .data([el])
//     .attr("class", "line")
//     .attr("d", valueline);
// });

// // define the line
// var valueline = d3.line()
//   .x(function(d) { return x(d.x); })
//   .y(function(d) { return y(d.y); });


// // Add the valueline paths
// svg.append("path")
//   .data([originalData])
//   .attr("class", "line")
//   .attr("d", valueline);

// svg.append("path")
//   .data([noisyData])
//   .attr("class", "line")
//   .attr("d", valueline);

function generateSignalData(n=10, mu=0, sigma=1) {
  let x = [...Array(n).keys()];
  let y = x.map(el => (Math.sin((0.017 * el) - 1)) );
  let noise = gaussianNoise(y.length, mu, sigma)
  let noisyY = y.map((el, i) => (el + noise[i]))

  let rangeScale = d3.scaleLinear().domain([d3.min(noisyY), d3.max(noisyY)]).range([0, INNER_HEIGHT]);
  let domainScale = d3.scaleLinear().domain([d3.min(x), d3.max(x)]).range([0, WIDTH]);
  let scaledY = y.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
  let scaledNoisyY = noisyY.map((d) => (HEIGHT - rangeScale(d) - HEIGHT_PAD));
  let scaledX = x.map((d) => domainScale(d));

  return {x: scaledX, y: scaledY, noisyY: scaledNoisyY};
}


let data = generateSignalData(500);

const makePolyline = (y) => {
  let coords = data.x.map((d, i) => (d.toString() + "," + y[i].toString()));
  let coordsString = coords.join(" ");
  // let coords2 = data.x.map((d, i) => (d.toString() + "," + data.noisyY[i].toString())).join(" ");
  console.log(coordsString);
  return <polyline points={coordsString} fill="none" stroke="black" />
}

// makePolyline(10);


const barStyle = {
  fill: "#8b32eb", 
  fillOpacity: 0.5,
  stroke: "#8b32eb",
  strokeWidth: "0",
  // rx: 2,
}


const Viz = () => {

  // const [data, setData] = useState(
  //   generateBinCounts()
  // );

  // const handleClick = useCallback(() => {
  //   setData(generateBinCounts());
  // })

  // const [rangeScale, setRangeScale] = useState(
  //   generateRangeScale(data)
  // );

  // useInterval(() => {
  //   const newDataset = generateDataset();
  //   setDataset(newDataset);
  // }, 2000);

  return (
    <Fragment>
    <Flex style={{ justifyContent: "center" }}>
      <svg width={ WIDTH.toString() } height={ HEIGHT.toString() }>
        { makePolyline(data.noisyY) }
        { makePolyline(data.y) }
      </svg>
    </Flex>
    </Fragment>
  );
}

const SignalAnimation = () => {

  return (
    <Fragment>

    <Viz />
    
    </Fragment>
  );
}

export default SignalAnimation;
