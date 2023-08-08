import define1 from "./369418c199de0b44@179.js";

function _1(md){return(
md`# Natural breaks
## revisiting the Fisher-Jenks natural breaks classification method
  
Natural breaks is a clustering method for 1-dimensional numeric data. Pass an array of values, a number of classes *k*, and obtain thresholds to separate the values into *k* classes. The method optimizes for total intra-class variance, making the classes as homogeneous as possible.
<br>In this notebook, we look at the history and implementations of this method. We conclude that the best choice currently is to use **ckmeans** (from simple-statistics). We add two utilities: one for **round breaks** ([#round](#round)), the other to select a good value for **k** ([#selectk](#selectk)), and end with an example of a **choropleth** map depicting **log**-scaled values.

---`
)}

function _2(md){return(
md`Let’s begin with a concrete example, with numbers coming from three different random generators:`
)}

function _numbers(d3)
{
  const k = [
    d3.randomNormal.source(d3.randomLcg(40))(2, 0.5),
    d3.randomNormal.source(d3.randomLcg(41))(3, 0.3),
    d3.randomNormal.source(d3.randomLcg(42))(4, 0.2)
  ];
  return Float64Array.from({ length: 250 }, (_, i) => k[i % 3]());
}


function _4(md){return(
md`When we look at the distribution of these numbers, the three peaks are unmistakable.`
)}

function _5(Plot,numbers){return(
Plot.plot({
  height: 120,
  y: { zero: true },
  x: { domain: [0.25, 4.7] },
  marks: [
    Plot.areaY(
      numbers,
      Plot.windowY(
        4,
        Plot.binX(
          { y: "count", filter: null },
          {
            thresholds: 50,
            fill: "currentColor",
            fillOpacity: 0.1,
            curve: "monotone-x",
            domain: [0.3, 4.8]
          }
        )
      )
    ),
    Plot.lineY(
      numbers,
      Plot.windowY(
        4,
        Plot.binX(
          { y: "count", filter: null },
          {
            thresholds: 50,
            curve: "monotone-x",
            domain: [0.3, 4.8]
          }
        )
      )
    ),
    Plot.dotX(
      numbers,
      Plot.dodgeY({
        fill: "currentColor",
        r: 2.5
      })
    ),
    Plot.ruleY([0])
  ]
})
)}

function _6(md){return(
md`The **natural breaks** is a way to split the data back into three categories, just by looking at that distribution. If we know we want 3 categories, Jenks’ algorithm returns:`
)}

function _cuts(simple,numbers){return(
simple.jenks(numbers, 3)
)}

function _8(md){return(
md`Visually:`
)}

function _9(Plot,numbers,showOrigin,cuts){return(
Plot.plot({
  marginLeft: 40,
  height: 120,
  y: { zero: true },
  x: { domain: [0.25, 4.7] },
  marks: [
    Plot.areaY(
      numbers,
      Plot.windowY(
        4,
        Plot.binX(
          { y: "count", filter: null },
          {
            thresholds: 50,
            fill: showOrigin ? (d, i) => "abc"[i % 3] : "currentColor",
            fillOpacity: 0.1,
            curve: "monotone-x",
            domain: [0.3, 4.8]
          }
        )
      )
    ),
    Plot.lineY(
      numbers,
      Plot.windowY(
        4,
        Plot.binX(
          { y: "count", filter: null },
          {
            thresholds: 50,
            curve: "monotone-x",
            domain: [0.3, 4.8]
          }
        )
      )
    ),
    Plot.dotX(
      numbers,
      Plot.dodgeY({
        fill: showOrigin ? (d, i) => "abc"[i % 3] : "currentColor",
        r: 2.5
      })
    ),
    Plot.ruleY([0]),
    Plot.tickX(cuts.slice(1, -1), {
      x: Plot.identity,
      stroke: "red",
      strokeWidth: 2,
      inset: -3
    })
  ]
})
)}

function _10(md){return(
md`Is this making a good job — does it allow to recover the underlying classes? Reveal the colors:`
)}

function _showOrigin(Inputs){return(
Inputs.toggle({ label: "Color by origin" })
)}

function _12(tex,md){return(
md`## Algorithms and implementations

The method was described by George F. Jenks in his 1977 paper [see the [#references](#references) section], together with a Fortran implementation adapted from John A. Hartigan’s implementation of 1975. It is also known as Fisher-Jenks, because Jenks’ paper references Walter D. Fisher’s method (itself described in a 1958 paper) as being the best for grouping data.

In 2013, Tom MacWright [dug into the 1977 paper](https://macwright.com/2013/02/18/literate-jenks.html) and translated Jenks’ implementation in JavaScript (one could say “ported”, but the effort was more about making it readable, than just making it work). That method was added to _MacWright et al._’s [simple-statistics](https://simple-statistics.github.io/) library, then it was removed in version 6 (probably because there is a more efficient way to get to the same result, see below), then added again in version 7 (probably because of its historic importance) [aside: the documentation for the library is still trailing at v6, which makes the situation a bit confusing].

The limitations of the algorithm are obvious when you have lots of values. Its time complexity is in ${tex`\mathcal{O}(k\ n^2)`} where *k* is the number of classes, and *n* the number of values. In concrete terms, we can’t reasonably use it to classify more than a few thousand numbers.

Maarten Hilferink worked on those limitations for [GeoDMS](https://www.geodms.nl/CalcNaturalBreaks), and came up with a much faster algorithm, with a time complexity of ${tex`\mathcal{O}(k\ n\ log\ n)`} implemented in C++, and ported [to JavaScript](https://github.com/pschoepf/naturalbreaks/blob/master/src/main/javascript/JenksFisher.js) in 2015 by Philipp Schoepf. In our tests, we saw that this implementation can stomach up to 110,000 numbers and return their breaks in 100ms (for comparison, simple statistics’ implementation of Jenks’ can only process 4,000 points in the same time frame).

However, an alternative to natural breaks is *k*-means (implemented in simple-statistics with the _ckmeans_ algorithm). ckmeans leads (most of the time) _exactly_ to the same solution as Fisher-Jenks’, and easily scales to dozens of millions of values. It has the same time complexity as Schoepf’s, and comparable timings — for 110,000 numbers, simple statistics’s _ckmeans_ needs 200ms; for a million numbers, 2.1s.

> *For all these reasons, to compute natural breaks, just forget about Jenks’ method, and use simple statistics’ implementation of **ckmeans**.*`
)}

function _round(md){return(
md`### Addendum 1: round breaks.

One thing that bothers me with this method is that the boundaries of the classes are ugly — in the sense that the values returned are the lower bound of each cluster, which we can’t use for labelling, since they might have many decimal places. To create a legend, we want to round the values — but the rounding might be either too loose (and we’d get spurious decimal places), or too strict, and we’d get classes ranging “from x to x”. A better approach is to choose the roundest number that separates the lowest point from a class from the highest point in the preceding class — thus giving just enough precision to distinguish the classes:`
)}

function _roundBreaks(d3,simple){return(
(numbers, k) =>
  d3.pairs(simple.ckmeans(numbers, k)).map(([low, hi]) => {
    const p = 10 ** Math.floor(1 - Math.log10(hi.at(0) - low.at(-1)));
    return Math.floor(((hi.at(0) + low.at(-1)) / 2) * p) / p;
  })
)}

function _15(roundBreaks,numbers){return(
roundBreaks(numbers, 3)
)}

function _16(Plot,numbers,roundBreaks){return(
Plot.plot({
  marginLeft: 40,
  x: { domain: [0.25, 4.7] },
  marginTop: 36,
  marginBottom: 45,
  marks: [
    Plot.tickX(numbers, { strokeOpacity: 0.3 }),
    Plot.tickX(roundBreaks(numbers, 3), {
      x: Plot.identity,
      stroke: "red",
      strokeWidth: 2,
      inset: -3
    }),
    Plot.tip(roundBreaks(numbers, 3), {
      x: Plot.identity,
      anchor: "bottom",
      dy: -16,
      stroke: "red"
    })
  ]
})
)}

function _selectk(md){return(
md`## Addendum 2: selecting *k*

`
)}

function _18(md){return(
md`Instead of asking for _k_ = 3 classes, we could have asked for more granularity, say, _k_ = 7, as shown below. (Note that the 7 classes are not subsets of the classes obtained for *k* = 3.)`
)}

function _19(Plot,numbers,roundBreaks){return(
Plot.plot({
  marginLeft: 40,
  x: { domain: [0.25, 4.7] },
  marginTop: 36,
  marginBottom: 45,
  marks: [
    Plot.tickX(numbers, { strokeOpacity: 0.3 }),
    Plot.tickX(roundBreaks(numbers, 7), {
      x: Plot.identity,
      stroke: "red",
      strokeWidth: 2,
      inset: -3
    }),
    Plot.tip(roundBreaks(numbers, 7), {
      x: Plot.identity,
      anchor: "bottom",
      dy: -16,
      stroke: "red"
    })
  ]
})
)}

function _20(tex,md){return(
md`The higher *k* is, the less generality we have, at the risk of “overfitting” the data. The lower *k* is, the less it explains. A good selection tool is the **human brain**: the analyst can build on her knowledge of the data to identify the best number of clusters; the cartographer can select *k* so that the map looks good, or prints well.

Some people claim that, unless the data is obviously clustered, the ideal number of classes is ${tex`\left \lceil{2 + 3.5 * \log_{10}{N}}\right \rceil`}; for 100 data points, this would be *K* = 9. Other people prefer ${tex`\sqrt{N/2}`} (for 100 points, this gives *K*=7). Or, you can follow Waldo Tobler and say that each geographic unit gets its own specific color, but then you’re not doing clustering at all…`
)}

function _21(md){return(
md`We can also get a little help from the machine. The **elbow** method is a common rule-of-thumb method. We compute the intra-class variance for each *k*, and when it’s low enough compared to the total variance, then say it’s fine. In cartography, you’ll usually don’t want to have *k* greater than 7 or 8, because that’s the maximum number of colors or shades that are easy to distinguish; and you rarely want only 2 classes. But how to choose *k* between 3, 4, 5, 6… ?`
)}

function _22(md){return(
md`Let’s implement the elbow method:`
)}

function _variances(d3,simple,numbers){return(
d3.range(1, 20)
  .map((k) => ({
    k,
    intra_sum_squares: d3.sum(simple.ckmeans(numbers, k), (v) => d3.variance(v))
  }))
)}

function _24(Plot,variances){return(
Plot.plot({
  height: 200,
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(variances, { x: "k", y: "intra_sum_squares", marker: true })
  ]
})
)}

function _25(md){return(
md`In this case, the two “elbows” are *k* = 3 and *k* = 12. They’re easier to spot with a logarithmic *y* scale.`
)}

function _26(Plot,variances){return(
Plot.plot({
  height: 200,
  y: { type: "log", grid: true },
  marks: [
    Plot.lineY(variances, { x: "k", y: "intra_sum_squares", marker: true }),
    Plot.dot(variances, {
      x: "k",
      y: "intra_sum_squares",
      filter: (d) => d.k === 3 || d.k === 12,
      r: 7,
      stroke: "red"
    })
  ]
})
)}

function _27(md){return(
md`We can score each point according to its “elbowiness”, that is the angle between two consecutive segments:`
)}

function _elbowiness(d3,simple){return(
(numbers) => {
  const intrass = [
    {},
    ...d3
      .range(1, 15)
      .map((k) =>
        k === 1
          ? d3.variance(numbers)
          : d3.sum(simple.ckmeans(numbers, k), (v) => d3.variance(v))
      )
  ];
  return d3
    .range(0, intrass.length - 1)
    .map((k) =>
      k < 2
        ? NaN
        : Math.log(intrass[k - 1]) +
          Math.log(intrass[k + 1]) -
          2 * Math.log(intrass[k])
    );
}
)}

function _29(md){return(
md`And the best value for *k* can be selected by taking the highest angle, maybe with a penalty for higher values of *k*, since we’d rather use the simpler of two good solutions:`
)}

function _autoK(d3,elbowiness){return(
(numbers) =>
  d3.maxIndex(elbowiness(numbers), (score, k) => score / (1 + Math.sqrt(k)))
)}

function _31(autoK,numbers){return(
autoK(numbers)
)}

function _32(md){return(
md`Alternatively, we could offer a choice between the top three solutions:`
)}

function _chooseK(elbowiness,numbers,d3,Inputs,md)
{
  const e = elbowiness(numbers);
  const goodK = d3
    .sort(d3.range(e.length), (k) => -e[k] / (1 + Math.sqrt(k)))
    .slice(0, 3);
  return Inputs.radio(d3.sort(goodK), {
    label: md`Number of clusters`,
    value: goodK[0]
  });
}


function _34(Plot,numbers,roundBreaks,chooseK){return(
Plot.plot({
  marginLeft: 40,
  x: { domain: [0.25, 4.7] },
  marginTop: 36,
  marginBottom: 45,
  marks: [
    Plot.tickX(numbers, { strokeOpacity: 0.3 }),
    Plot.tickX(roundBreaks(numbers, chooseK), {
      x: Plot.identity,
      stroke: "red",
      strokeWidth: 2,
      inset: -3
    }),
    Plot.tip(roundBreaks(numbers, chooseK), {
      x: Plot.identity,
      anchor: "bottom",
      dy: -16,
      stroke: "red"
    })
  ]
})
)}

function _recommandations(md){return(
md`---
### Jenks’ recommandations

Jenks’ 1977 paper begins with several recommandations for choropleth maps:
1. Use standardized data
2. Subdivide the data into a limited number of classes
3. Use colors or patterns that are visually related
4. Strive for simplicity
5. Select the method of data classification with care

Point 1 refers to normalizing, by taking _e.g._ GDP **per capita**, agricultural yield **per hectare**, etc. My way of expressing this is that, _when two regions have the same color, joining them into a single unit should not change their color._ If the data is additive (GDP, total production, population), then you should _not_ use a choropleth, and instead consider proportional symbols.

Point 5 considers “external” vs. “internal classification” procedures. Fisher’s method (natural breaks) is “external”, in the sense that it doesn’t know about the geographic distribution of the value. An “internal” grouping procedure would consider some form of continuity over the territory.`
)}

function _36(md){return(
md`#### Choosing the metric

As an optimization technique, the natural breaks rely on variance, which itself is based on a linear space: we compute the _difference_ between a value and the _mean_ of the group value. When the source data is not linear, consider projecting it to a linear space instead. Typically, monetary values should be compared through their ratio rather than through their difference; this implies that the whole analysis has a chance to be better if we work with the logarithm of the value. Here’s an example, using GDP per capita:`
)}

function _gdp(FileAttachment){return(
FileAttachment("gdp-per-capita-worldbank.csv")
  .csv()
  .then((data) =>
    data
      .filter((d) => d.Year === "2021")
      .map((d) => ({
        country: d.Code,
        gdp_per_capita:
          +d["GDP per capita, PPP (constant 2017 international $)"]
      }))
  )
)}

function _38(Plot,gdp){return(
Plot.plot({
  zero: true,
  marginBottom: 40,
  marks: [
    Plot.tickX(gdp, {
      x: "gdp_per_capita",
      channels: { country: "country" },
      tip: true
    })
  ]
})
)}

function _39(md){return(
md`The natural breaks computed on the raw values clump all the poorest countries together, and end up finely classifying only the richest countries (the elbow method recommends 6 classes):`
)}

function _k_gdp(autoK,gdp){return(
autoK(gdp.map((d) => d.gdp_per_capita))
)}

function _41(Plot,gdp,roundBreaks,k_gdp){return(
Plot.plot({
  marginTop: 40,
  x: { type: "log" },
  marks: [
    Plot.tickX(gdp, {
      x: "gdp_per_capita",
      channels: { country: "country" },
      tip: true
    }),
    Plot.tickX(
      roundBreaks(
        gdp.map((d) => d["gdp_per_capita"]),
        k_gdp
      ),
      { stroke: "red", strokeWidth: 2, inset: -3 }
    )
  ]
})
)}

function _42(md){return(
md`However, if we also research the natural breaks in a projected space (*i.e.* with a log scale), the classification we get is much more balanced across the spectrum. The elbow method recommends 4 classes:`
)}

function _k_gdp_log(Inputs,autoK,gdp){return(
Inputs.range([2, 10], {
  label: "# classes",
  step: 1,
  value: autoK(gdp.map((d) => Math.log(d.gdp_per_capita)))
})
)}

function _44(Plot,gdp,roundBreaksLog,k_gdp_log){return(
Plot.plot({
  marginTop: 40,
  x: { type: "log" },
  marks: [
    Plot.tickX(gdp, {
      x: "gdp_per_capita",
      channels: { country: "country" },
      tip: true
    }),
    Plot.tickX(
      roundBreaksLog(
        gdp.map((d) => d["gdp_per_capita"]),
        k_gdp_log
      ),
      { stroke: "red", strokeWidth: 2, inset: -3 }
    ),
    Plot.tip(
      roundBreaksLog(
        gdp.map((d) => d["gdp_per_capita"]),
        k_gdp_log
      ),
      {
        x: Plot.identity,
        stroke: "red",
        anchor: "bottom",
        dy: -16
      }
    )
  ]
})
)}

function _45(gdp,Plot,roundBreaksLog,k_gdp_log,countries)
{
  const values = new Map(gdp.map((d) => [d.country, d.gdp_per_capita]));
  return Plot.plot({
    color: {
      legend: true,
      scheme: "Cool",
      type: "threshold",
      domain: roundBreaksLog(
        gdp.map((d) => d["gdp_per_capita"]),
        k_gdp_log
      ),
      width: Math.sqrt(k_gdp_log) * 100,
      tickFormat: (d) => d / 1000,
      label: "GDP per capita (dollars, thousands)",
      unknown: "#ccc"
    },
    projection: "equal-earth",
    marks: [
      Plot.geo(
        countries,
        Plot.centroid({
          fill: (d) => values.get(d.properties.a3),
          stroke: "white",
          title: (d) => `${d.properties.a3}\n${values.get(d.properties.a3)}`,
          strokeWidth: 0.5,
          tip: true
        })
      ),
      Plot.sphere()
    ]
  });
}


function _46(md){return(
md`To get the nice (roundish) breaks in the original (dollars) space (because: who cares about rounded logarithms), we need to adapt the _roundBreaks_ function a bit:`
)}

function _roundBreaksLog(d3,simple){return(
(numbers, k) =>
  d3
    .pairs(
      simple.ckmeans(
        numbers.map((d) => Math.log(d)),
        k
      )
    )
    .map(([low, hi]) => {
      const a = Math.exp(hi.at(0));
      const b = Math.exp(low.at(-1));
      const p = 10 ** Math.floor(1 - Math.log10(a - b));
      return Math.floor(((a + b) / 2) * p) / p;
    })
)}

function _breaks(roundBreaksLog,gdp,k_gdp_log){return(
roundBreaksLog(
  gdp.map((d) => d["gdp_per_capita"]),
  k_gdp_log
)
)}

function _50(md){return(
md`Interacting with the possibilities above, the cartographer might prefer even rounder values — and use, maybe, thresholds at 3,000, 7,000 and 25,000 dollars.`
)}

function _references(md){return(
md`---
### References

* Walter D. Fisher, “On grouping for maximum homogeneity,” 1958 ([PDF](http://csiss.ncgia.ucsb.edu/SPACE/workshops/2004/SAC/files/fisher.pdf)).
* Waldo R. Tobler, “Choropleth maps without class intervals”, 1973 ([PDF](http://csiss.ncgia.ucsb.edu/SPACE/workshops/2007/UCSB/docs/Choropleths.pdf)).
* John A. Hartigan, _Clustering Algorithms_, 1975.
* George F. Jenks, “Optimal data classification for choropleth maps”, 1977. (PDF, not available online, you have to _ask a friend_)!
* Haizhou Wang and Mingzhou Song, “Ckmeans.1d.dp: Optimal k-means Clustering in One Dimension by Dynamic Programming”, 2011 ([PDF](https://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf)).
* Tom MacWright, “Literate Jenks Natural Breaks and How The Idea Of Code is Lost”, 2013 ([web](https://macwright.com/2013/02/18/literate-jenks.html)).
* Maarten Hilferink, [CalcNaturalBreaks](https://www.geodms.nl/CalcNaturalBreaks) algorithm, date?
* Philipp Schoepf, [JS port of CalcNaturalBreaks](https://github.com/pschoepf/naturalbreaks/blob/master/src/main/javascript/JenksFisher.js), 2015.`
)}

function _52(md){return(
md`---
*lib*`
)}

function _simple(require){return(
require("simple-statistics@7")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["gdp-per-capita-worldbank.csv", {url: new URL("./files/e9ec86937a8a498ce5e41080b14bf0c9b03a227d7d091f35a2657dcc9a87205087eadac04bb9277e6dda548be0f537d6b5a0c1dcc91d29db6cdb8d7f3929cac0.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("numbers")).define("numbers", ["d3"], _numbers);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot","numbers"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("cuts")).define("cuts", ["simple","numbers"], _cuts);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Plot","numbers","showOrigin","cuts"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof showOrigin")).define("viewof showOrigin", ["Inputs"], _showOrigin);
  main.variable(observer("showOrigin")).define("showOrigin", ["Generators", "viewof showOrigin"], (G, _) => G.input(_));
  main.variable(observer()).define(["tex","md"], _12);
  main.variable(observer("round")).define("round", ["md"], _round);
  main.variable(observer("roundBreaks")).define("roundBreaks", ["d3","simple"], _roundBreaks);
  main.variable(observer()).define(["roundBreaks","numbers"], _15);
  main.variable(observer()).define(["Plot","numbers","roundBreaks"], _16);
  main.variable(observer("selectk")).define("selectk", ["md"], _selectk);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["Plot","numbers","roundBreaks"], _19);
  main.variable(observer()).define(["tex","md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("variances")).define("variances", ["d3","simple","numbers"], _variances);
  main.variable(observer()).define(["Plot","variances"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["Plot","variances"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("elbowiness")).define("elbowiness", ["d3","simple"], _elbowiness);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("autoK")).define("autoK", ["d3","elbowiness"], _autoK);
  main.variable(observer()).define(["autoK","numbers"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof chooseK")).define("viewof chooseK", ["elbowiness","numbers","d3","Inputs","md"], _chooseK);
  main.variable(observer("chooseK")).define("chooseK", ["Generators", "viewof chooseK"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","numbers","roundBreaks","chooseK"], _34);
  main.variable(observer("recommandations")).define("recommandations", ["md"], _recommandations);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("gdp")).define("gdp", ["FileAttachment"], _gdp);
  main.variable(observer()).define(["Plot","gdp"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("k_gdp")).define("k_gdp", ["autoK","gdp"], _k_gdp);
  main.variable(observer()).define(["Plot","gdp","roundBreaks","k_gdp"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("viewof k_gdp_log")).define("viewof k_gdp_log", ["Inputs","autoK","gdp"], _k_gdp_log);
  main.variable(observer("k_gdp_log")).define("k_gdp_log", ["Generators", "viewof k_gdp_log"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","gdp","roundBreaksLog","k_gdp_log"], _44);
  main.variable(observer()).define(["gdp","Plot","roundBreaksLog","k_gdp_log","countries"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("roundBreaksLog")).define("roundBreaksLog", ["d3","simple"], _roundBreaksLog);
  const child1 = runtime.module(define1);
  main.import("countries", child1);
  main.variable(observer("breaks")).define("breaks", ["roundBreaksLog","gdp","k_gdp_log"], _breaks);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("references")).define("references", ["md"], _references);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("simple")).define("simple", ["require"], _simple);
  return main;
}
