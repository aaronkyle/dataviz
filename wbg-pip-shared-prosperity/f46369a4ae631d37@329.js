function _1(md){return(
md`# World Bank | [PIP](https://pip.worldbank.org/home) - Shared Prosperity`
)}

function _2(md){return(
md`---`
)}

function _3(md){return(
md`**[Shared prosperity (SP)](https://pip.worldbank.org/shared-prosperity)** measures the extent to which economic growth is inclusive by focusing on household consumption or income growth among the poorest population rather than on total growth. It is defined as the annualized growth rate in the average consumption or income per capita of the poorest 40 percent (the bottom 40) of the population in a country.[ Learn More.](https://www.worldbank.org/en/topic/poverty/brief/global-database-of-shared-prosperity)

* Download the [October 2022 - What’s New Brief](https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099538510212224540/idu0eba67121024b3048190919f062cb62d8e561)
* Download the latest data in [xls](https://thedocs.worldbank.org/en/doc/5dbd9221744a4585003923bd68eef6d0-0350012022/original/GPSP-and-Median-Income-AM2022.xlsx) or [PDF](https://thedocs.worldbank.org/en/doc/a4d8915407e6f87697248b4ed5b63c68-0350012022/original/GPSP-and-Median-income-2014-2019-AM2022.pdf)
* Download [historical data](https://thedocs.worldbank.org/en/doc/fef0cce51baddcce8ae9a47541d59d3b-0350012022/original/GPSP-and-Median-Income-Historical-AM-2022.xlsx)`
)}

function _4(Plot,projection,rotate,inset,countries,focus_view,annualized_growth_median_country_name_map){return(
Plot.plot({
  projection: {type: projection, rotate: rotate, inset, domain: countries.features.find((d) => d.properties.name === focus_view)},
  height: 400,
  marks: [
    Plot.geo(countries, { stroke: "grey", strokeOpacity: 0.2, fill: (d) => annualized_growth_median_country_name_map.get(d.properties.name), fillOpacity: 0.5}),

        Plot.dot(countries.features, 
        Plot.centroid({
          // stroke: (d) => annualized_growth_median_country_name_map.get(d.properties.name),     
          strokeOpacity : 0.01,
          channels: {
                  "Country: " : { value: (d) => d.properties.name },
                  "Annualized Growth Rate (%): " : { value: (d) => annualized_growth_median_country_name_map.get(d.properties.name), scale: "r" }
                },
               tip: true,
             })),
        Plot.sphere({stroke: "grey"}),
        Plot.graticule({stroke: "brown", strokeOpacity: 0.03})
  ],
  color: {
    scheme: "spectral", // Change color scheme
    unknown: "#ddd", 
    // type: "linear", // Linear scale for color progression
    legend: true, // Add the legend
    label: "Annualized Growth Rate (Bottom 40%)",
    // percent: true, // Convert value to a percent (from a proportion)
    // domain: [0, 100]
  },
})
)}

function _5(md){return(
md`---`
)}

function _focus_view(Inputs,annualized_growth_median_country_name_map){return(
Inputs.select(["Select", ...Array.from(annualized_growth_median_country_name_map.keys()).filter(element => element !== "a. Based on real mean per capita consumption or income measured at 2017 Purchasing Power Parity (PPP) using the Poverty and Inequality Platform (http://pip.worldbank.org/). For some countries means are not reported due to grouped and/or confidential data. b. The annualized growth rate is computed as (Mean in year 2/Mean in year 1)^(1/(Reference Year 2 - Reference Year 1)) - 1 c. Refers to the year in which the underlying household survey data were collected and, in cases for which the data collection period bridged two calendar years, the first year in which data were collected is reported. The initial year refers to the nearest survey collected 5 years before the most recent survey available, only surveys collected between 3 and 7 years before the most recent survey are considered. The final year refers to the most recent survey available between 2017 and 2021. d. Denotes whether the data reported is based on consumption (c) or income (i) data. Capital letters indicate that grouped data were used. e. Covers urban areas only. h. Poverty and Inequality Platform's What's New note.").sort()], {label: "Focus Country"})
)}

function _projection(Inputs){return(
Inputs.select(["equal-earth",
"equirectangular",
"orthographic",
"stereographic",
"mercator",
"transverse-mercator",
"azimuthal-equal-area",
"azimuthal-equidistant",
"conic-conformal",
"conic-equal-area",
"conic-equidistant",
"gnomonic",], {value: "stereographic", label: "Change Projection"})
)}

function _inset(Inputs){return(
Inputs.range([0, -1800], {
  value: 0,
  step: 100,
  label: "Zoom"
})
)}

function _rotate(Inputs){return(
Inputs.form([
  Inputs.range([-360, 360], {value: 0, step: 1, label: "Rotate λ (yaw)"}),
  Inputs.range([-180, 180], {value: 0, step: 1, label: "Rotate φ (pitch)"}),
  Inputs.range([-360, 360], {value: 0, step: 1, label: "Rotate γ (roll)"})
])
)}

function _10(md){return(
md`---`
)}

function _11(Plot,gpspAndMedianIncomeAm2022_name_correction){return(
Plot.plot({
  marginLeft: 140,
  color: { legend: false, scheme: "BrBG", type: "ordinal" },
  marks: [
    Plot.barX(gpspAndMedianIncomeAm2022_name_correction.slice(0, gpspAndMedianIncomeAm2022_name_correction.length - 1), 
              {x: "Annualized growth - Bottom 40%", 
               y: "Country", 
               fill: "Annualized growth - Bottom 40%", 
               inset: 0.5,
               tip: true, }),
    Plot.ruleX([0])
  ]
})
)}

function _12(md){return(
md`---`
)}

function _gpspAndMedianIncomeAm2022_table(__query,gpspAndMedianIncomeAm2022,invalidation){return(
__query(gpspAndMedianIncomeAm2022,{from:{table:"gpspAndMedianIncomeAm2022"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"gpspAndMedianIncomeAm2022")
)}

async function _gpspAndMedianIncomeAm2022(FileAttachment){return(
(await FileAttachment("GPSP-and-Median-Income-AM2022.xlsx").xlsx()).sheet("2017 ICP", {range: "A6:", headers: true}).map(
  ({"Region" : Region,
    "Code" : Code,
    "Country" : Country,
    "Periodc" : Periodc,
    "Typed" : Typed,
    "%": annualized_growth_bottom_40_percent,
     "%_" : annualized_growth_median, 
     "%__" : annualized_growth_total_population, 
     "$ a day (PPP)" : baseline_bottom_40_percent, 
     "$ a day (PPP)_" : baseline_growth_median, 
     "$ a day (PPP)__" : baseline_growth_total_population, 
     "$ a day (PPP)___" : most_recent_year_bottom_40_percent, 
     "$ a day (PPP)____" : most_recent_year_growth_median,
     "$ a day (PPP)_____" : most_recent_year_growth_total_population,
     "PPP year" : PPP_year,
     "Survey reference CPI year (Baseline)" : Survey_reference_CPI_year_Baseline,
     "Survey reference CPI year (most recent year)" : Survey_reference_CPI_year_most_recent_year}) => ({

    "Region" : Region,
    "Code" : Code,
    "Country" : Country,
    "Periodc" : Periodc,
    "Typed" : Typed,
     "Annualized growth - Bottom 40%" : annualized_growth_bottom_40_percent,
     "Annualized growth in mean consumption or income per capita - Median %" : annualized_growth_median, 
     "Annualized growth in mean consumption or income per capita - Total Population %" : annualized_growth_total_population, 
     "Baseline - Bottom 40%, $ a day (PPP)" : baseline_bottom_40_percent, 
     "Baseline - Median, $ a day (PPP)" : baseline_growth_median, 
     "Baseline - Total Population, $ a day (PPP)" : baseline_growth_total_population, 
     "Most recent year - Bottom 40%, $ a day (PPP)" : most_recent_year_bottom_40_percent, 
     "Most recent year - Median, $ a day (PPP)" : most_recent_year_growth_median,
     "Most recent year - Total Population, $ a day (PPP)" : most_recent_year_growth_total_population,
     "PPP year" : PPP_year,
     "Survey reference CPI year (Baseline)" : Survey_reference_CPI_year_Baseline,
     "Survey reference CPI year (most recent year)" : Survey_reference_CPI_year_most_recent_year}))
)}

function _gpspAndMedianIncomeAm2022_name_correction(gpspAndMedianIncomeAm2022)
{for (let i = 0; i < gpspAndMedianIncomeAm2022.length; i++) {
  if (gpspAndMedianIncomeAm2022[i].Country === 'Chinah') {
    gpspAndMedianIncomeAm2022[i].Country = 'China';
    break; // If you only need to update the first occurrence, you can break the loop here
  }
}

return gpspAndMedianIncomeAm2022;}


function _annualized_growth_median(gpspAndMedianIncomeAm2022){return(
new Map(gpspAndMedianIncomeAm2022.map(({Country, "Annualized growth - Bottom 40%" : annualized_growth_bottom_40_percent}) => [Country, annualized_growth_bottom_40_percent]))
)}

function _annualized_growth_median_country_name_map(annualized_growth_median)
{for (const [key, value] of annualized_growth_median) {
  if (key === "Chinah") {
    annualized_growth_median.set("China", value);
    annualized_growth_median.delete(key);
  }
 else if (key === "United States") {
    annualized_growth_median.set("United States of America", value);
    annualized_growth_median.delete(key);
  } 
 else if (key === "Lao PDR") {
    annualized_growth_median.set("Laos", value);
    annualized_growth_median.delete(key);
  } 
 else if (key === "Czech Republic") {
    annualized_growth_median.set("Czechia", value);
    annualized_growth_median.delete(key);
  } 
 else if (key === "Kyrgyz Republic") {
    annualized_growth_median.set("Kyrgyzstan", value);
    annualized_growth_median.delete(key);
  } 
 else if (key === "Russian Federation") {
    annualized_growth_median.set("Russia", value);
    annualized_growth_median.delete(key);
  } 
   else if (key === "Slovak Republic") {
    annualized_growth_median.set("Slovakia", value);
    annualized_growth_median.delete(key);
  } 
   else if (key === "Türkiye") {
    annualized_growth_median.set("Turkey", value);
    annualized_growth_median.delete(key);
  } 
   else if (key === "Egypt, Arab Rep.") {
    annualized_growth_median.set("Egypt", value);
    annualized_growth_median.delete(key);
  } 
   else if (key === "Iran, Islamic Rep.") {
    annualized_growth_median.set("Iran", value);
    annualized_growth_median.delete(key);
  } 
   else if (key === "North Macedonia") {
    annualized_growth_median.set("Macedonia", value);
    annualized_growth_median.delete(key);
  } 
}
 return annualized_growth_median
}


function _countries(topojson,world){return(
topojson.feature(world, world.objects.countries)
)}

function _world(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["GPSP-and-Median-Income-AM2022.xlsx", {url: new URL("./files/d4487c5b367fef62772926d4e08ad804a8330983e1af843d028bb0ffeec2b5fb6cabac626093cb6dfeb5e98fa051ac2c3f74fd7039fa4b04c9bc9635a9da9be6.xlsx", import.meta.url), mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", toString}],
    ["countries-50m.json", {url: new URL("./files/f4afb2d49f0b38843f6d74521b33d41f371246e1acd674ed78016dca816cb1d262b7c54b95d395a4dad7fba5d58ed19db2944698360d19483399c79565806794.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["Plot","projection","rotate","inset","countries","focus_view","annualized_growth_median_country_name_map"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof focus_view")).define("viewof focus_view", ["Inputs","annualized_growth_median_country_name_map"], _focus_view);
  main.variable(observer("focus_view")).define("focus_view", ["Generators", "viewof focus_view"], (G, _) => G.input(_));
  main.variable(observer("viewof projection")).define("viewof projection", ["Inputs"], _projection);
  main.variable(observer("projection")).define("projection", ["Generators", "viewof projection"], (G, _) => G.input(_));
  main.variable(observer("viewof inset")).define("viewof inset", ["Inputs"], _inset);
  main.variable(observer("inset")).define("inset", ["Generators", "viewof inset"], (G, _) => G.input(_));
  main.variable(observer("viewof rotate")).define("viewof rotate", ["Inputs"], _rotate);
  main.variable(observer("rotate")).define("rotate", ["Generators", "viewof rotate"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Plot","gpspAndMedianIncomeAm2022_name_correction"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("gpspAndMedianIncomeAm2022_table")).define("gpspAndMedianIncomeAm2022_table", ["__query","gpspAndMedianIncomeAm2022","invalidation"], _gpspAndMedianIncomeAm2022_table);
  main.variable(observer("gpspAndMedianIncomeAm2022")).define("gpspAndMedianIncomeAm2022", ["FileAttachment"], _gpspAndMedianIncomeAm2022);
  main.variable(observer("gpspAndMedianIncomeAm2022_name_correction")).define("gpspAndMedianIncomeAm2022_name_correction", ["gpspAndMedianIncomeAm2022"], _gpspAndMedianIncomeAm2022_name_correction);
  main.variable(observer("annualized_growth_median")).define("annualized_growth_median", ["gpspAndMedianIncomeAm2022"], _annualized_growth_median);
  main.variable(observer("annualized_growth_median_country_name_map")).define("annualized_growth_median_country_name_map", ["annualized_growth_median"], _annualized_growth_median_country_name_map);
  main.variable(observer("countries")).define("countries", ["topojson","world"], _countries);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  return main;
}
