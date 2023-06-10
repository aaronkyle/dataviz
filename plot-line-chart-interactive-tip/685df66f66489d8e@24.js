function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Plot: Line chart, interactive tip</h1><a href="/plot">Observable Plot</a> › <a href="/@observablehq/plot-gallery">Gallery</a></div>

# Line chart, interactive tip`
)}

function _2(Plot,aapl){return(
Plot.lineY(aapl, {x: "Date", y: "Close", tip: true}).plot({y: {grid: true}})
)}

function _3(md){return(
md`The above code uses the tip [mark option](https://observablehq.com/plot/features/marks#mark-options); the code can be written more explicitly with a [tip mark](https://observablehq.com/plot/marks/tip) and a [pointer transform](https://observablehq.com/plot/interactions/pointer):`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["Plot","aapl"], _2);
  main.variable(observer()).define(["md"], _3);
  return main;
}
