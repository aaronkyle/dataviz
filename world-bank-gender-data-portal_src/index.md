# World Bank Gender Data Portal | [Assets](https://genderdata.worldbank.org/topics/assets)

The World Bank's [Gender Data Portal](https://genderdata.worldbank.org/) makes the latest gender statistics accessible through compelling narratives and data visualizations to improve the understanding of gender data and facilitate analyses that inform policy choices.

The complete record of Gender Data is available for download in [`.csv`](https://databank.worldbank.org/data/download/Gender_Stats_CSV.zip) and[ Excel](https://databank.worldbank.org/data/download/Gender_Stats_EXCEL.zip) formats as well as being accessible by [API](https://genderdata.worldbank.org/help#access).<sup>[*](https://genderdata.worldbank.org/help/#access)</sup> Users can access the full dataset, or data for specific indicators within an indicator group, as well as for specific countries, regions, and topics.

---

## Objective

This notebook examines the [topic](https://genderdata.worldbank.org/#explore-topics) of [Assets](https://genderdata.worldbank.org/topics/assets). We will walk through how to load in `asset` data and will reproduce the visualizations on the [topic summary page](https://genderdata.worldbank.org/topics/assets).

<!--- -->

```js
// toc("h2, h3")
```

```js
// This is a little helper function used to generate the Table of Contents
//import {toc} from '@categorise/toc'
```

---

## Data Access

The Data Portal offers users a few ways to access [Assets](https://genderdata.worldbank.org/topics/assets/) data, including a [list of all asset indicators](https://genderdata.worldbank.org/indicators/#assets),  [`.csv` file downloads](https://genderdata.worldbank.org/data/download/zips/assets.zip) and API access via [Databank](https://databank.worldbank.org/source/gender-statistics).  The the topic page is also available as [`.pdf`](https://genderdata.worldbank.org/data/download/pdfs/topics/assets.pdf).

Let's use the [D3.js delimiter-separated value](https://github.com/d3/d3-dsv) module to load in the `.csv` file.

```js
const assets = display(await FileAttachment("./data/Assets.csv").csv({typed: true}))
```

---

## Initial Explorations

Before we jump into the visualizations, let's get to know our data:

<!--A quick way to explore the dataset is to use [Observable's data table cell](https://observablehq.com/@observablehq/data-table-cell). Here it is:-->

```js
view(Inputs.table(assets))
```

The table view immediately shows us that each data entry consists of just ${[...new Set(assets.flatMap(obj => Object.keys(obj)))].length} variables, namely:

<ul>${Object.keys(assets[0]).sort().map(key => html`<li>${key}`)}</ul>

There are ${year_group.length} years covered in the data set.

```js
const year_group = display([... new Set(d3.flatGroup(assets, d => d["Year"]))])
```

And there are ${countries_group.length} unique entries returned under the 'countries' variable.   

```js
const countries_group = display(d3.flatGroup(assets, d => d["Country Name"]))
```

${countries_group.length} sounds pretty high, so let's take a closer look by grouping first by country, and then by indicator (which has the lovely effect of also helping us discover more how indicators are reported across countries).

While we aren't pulling these out programmatically, spotting the extra `country` entries is pretty quick just by reading the country grouping above. The 'extras' are higher-level aggregations offered for our convenience:

```{langauge:JavaScript}
  "Arab World" 
  "East Asia & Pacific" 
  "East Asia & Pacific (excluding high income)" 
  "Euro area" 
  "Europe & Central Asia" 
  "Europe & Central Asia (excluding high income)" 
  "High income" 
  "Latin America & Caribbean " 
  "Latin America & Caribbean (excluding high income)"
  "LMY" 
  "Low income" 
  "Lower middle income" 
  "Middle East & North Africa" 
  "Middle East & North Africa (excluding high income)"
  "MIC" 
  "North America" 
  "OECD members" 
  "South Asia" 
  "Sub-Saharan Africa " 
  "Sub-Saharan Africa (excluding high income)"
  "Upper middle income"
  "World"
```

Our data are also comprised of ${indicators_group.length} unique indicators.

```js
const indicators_group = display([... new Set(d3.flatGroup(assets, d => d["Indicator Name"]))])
```

Not all indicators have values for each year, and not all countries have historically reported all values.

Grouping first by indicator, then by year, we see which indicators have greater or fewer observations across time.

```js echo
const indicators_group_year = [... new Set(d3.flatGroup(assets, d => d["Indicator Name"], d => d["Year"]))]
```

Let's identify which indicator has the most observations for a single year:

```js
const indicators_group_year_max = display((() => {
let maxObservations = 0;
let indicatorWithMostObservations;

for (const entry of indicators_group_year) {
  const observations = entry[2].length;
  if (observations > maxObservations) {
    maxObservations = observations;
    indicatorWithMostObservations = entry[0];
  }
}

return {
  "Indicator with the most observations in a single year": indicatorWithMostObservations,
  "Greatest number of observations in a single year": maxObservations
}
})())
```

And the fewest:

```js
const indicators_group_year_min = display((() => {
let minObservations = Infinity;
let indicatorWithFewestObservations;

for (const entry of indicators_group_year) {
  const observations = entry[2].length;
  if (observations < minObservations) {
    minObservations = observations;
    indicatorWithFewestObservations = entry[0];
  }
}

return {
  "Indicator with the fewest observations in a single year": indicatorWithFewestObservations,
  "Least number of observations in a single year (>0)": minObservations
};
})())
```

Grouping another way, first by indicator and then by country, helps us to see which indicators have been tracked most regularly across countries and regions.

```js echo
const indicators_group_year_country =  [... new Set(d3.flatGroup(assets, d => d["Indicator Name"], d => d["Country Name"]))]
```

```js echo
const indicators_group_year_country_max = display((() => {
let maxObservations = 0;
let indicatorWithMostObservations;

for (const entry of indicators_group_year_country) {
  const observations = entry[2].length;
  if (observations > maxObservations) {
    maxObservations = observations;
    indicatorWithMostObservations = entry[0];
  }
}

return {
  "Indicator with the most observations for a single country or region": indicatorWithMostObservations,
  "Greatest number of observations for a single country or region": maxObservations
}
})())
```

```js
const indicators_group_year_country_min = display((() => {
let minObservations = Infinity;
let indicatorWithFewestObservations;

for (const entry of indicators_group_year_country) {
  const observations = entry[2].length;
  if (observations < minObservations) {
    minObservations = observations;
    indicatorWithFewestObservations = entry[0];
  }
}

return {
  "Indicator with the fewest observations for a single country or region": indicatorWithFewestObservations,
  "Least number of observations for a single country or region": minObservations
};
})())
```

Fantastic!  With just a few simple pivot-style transformations, we are learning quite a lot about our data. 

---

## Reproducing Visualizations

Now let's have a look at how the World Bank showcases the `assets` dataset.  

---

### Account ownership at a financial institution or with a mobile-money-service provider by sex and income group

Here's the first visualization on the [`Assets` topic summary](https://genderdata.worldbank.org/topics/assets) page:

```js
const mobile_money_account_by_sex = await FileAttachment("/data/mobile_money_account_by_sex.png").image()
```

```js
(await FileAttachment("/data/mobile_money_account_by_sex.png")).image()
```

This visualization shows \``account ownership at a financial institution or with a mobile-money-service provider by sex and income group`\`. Data are a weighted average, aggregated and faceted by economy (the income group classification for each country). The visualization helps to compare the male and female values for each region and across regions.  

As we discovered in reviewing the data for [`countries_group`](https://observablehq.com/d/7fb248de83bc0ad4#countries_group), above, the source [`assets`](https://observablehq.com/d/7fb248de83bc0ad4#assets) data file already contains aggregated regional vales. 

```js
const aggregated_economies = display(assets.filter(asset => [
  'High income',
  'Upper middle income',
  'Lower middle income',
  'Low income'
].includes(asset['Country Name'])))
```

We can filter down our `assets` data to focus just on those indicators of interest for our visualization namely `FX.OWN.TOTL.FE.ZS` (Account ownership at a financial institution or with a mobile-money-service provider, female (% of population ages 15+) and `FX.OWN.TOTL.MA.ZS'` (Account ownership at a financial institution or with a mobile-money-service provider, male (% of population ages 15+).  Also, because we wish to easily distinguish values by sex, we'll add an additional column to help make this distinction.

```js echo
const aggregated_account_ownership = assets.filter(asset => {
  const countryNameMatch = [
  'High income',
  'Upper middle income',
  'Lower middle income',
  'Low income'
]
    // This bit refines our search for specfic indicators
  .includes(asset['Country Name']);
  const indicatorCodeMatch = [
  'FX.OWN.TOTL.FE.ZS',
  'FX.OWN.TOTL.MA.ZS'
].includes(asset['Indicator Code']);
  return countryNameMatch && indicatorCodeMatch;
})
    // This bit adds an additional column as a helper, called 'Sex' (for lack of a better word)
    // We use it because it can be dizzying to look at just the indicator codes.
  .map(asset => {
  const Sex = asset['Indicator Code'] === 'FX.OWN.TOTL.FE.ZS' ? 'Female' : 'Male';
  return { Sex, ...asset };
})
```

Before we plot the data, let's quickly review our filtered results and anticipate surprises.  <!--For this, let's use the data table cell.-->

```js
view(Inputs.table(aggregated_account_ownership))
```

The table view shows us that we have data for multiple years.  As we create a dot plot similar to the one on the [Gender Portal `Assets` page](https://genderdata.worldbank.org/topics/assets), which plots values for men and women as dots along a shared access and connects them with a line between each point, we can facet by year.

```js echo
Plot.plot({
  marginLeft: 150,
  width,
  color: { range: ["orange", "purple"] },
  fx: { tickFormat: "d" },
  x: { domain: [0, 100], ticks: 5 },
  fy: {domain:  ["Low income","Lower middle income", "Upper middle income", "High income"] },
  marks: [
    Plot.frame(),
    Plot.ruleY(
      aggregated_account_ownership,
      Plot.groupZ(
        { x1: "min", x2: "max" },
        { x1: "Value", x2: "Value", y: null, fx: "Year", fy: "Country Name" }
      )
    ),
    Plot.dotX(
      aggregated_account_ownership,
      Plot.groupX(
        { x: "mean" },
        { x: "Value", fill: "Sex", r: 5, fx: "Year", fy: "Country Name", tip: true, }
      )
    )
  ]
})
```

It looks like the visualization on the `Assets` page focuses on values from the most recent year. Here's a recreation of that chart:

---


```html echo
<span style="font-family: Andes, Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 1;">
    Account ownership at a financial institution</br>
    or with a mobile-money-service provider</br>
    by sex and income group
</span>
${Plot.plot({
  marginLeft: 150,
  width: width*0.9,
  height: width*0.4,
  color: { range: ["orange", "purple"], legend: true },
  fx: { tickFormat: "d" },
  x: { domain: [0, 100], ticks: 5 },
  fy: {domain:  ["Low income","Lower middle income", "Upper middle income", "High income"] },
  marks: [
    Plot.frame({ strokeOpacity: 0.2 }),
    Plot.ruleY(
      aggregated_account_ownership.filter(d => d.Year === 2017),
      Plot.groupZ(
        { x1: "min", x2: "max" },
        { x1: "Value", x2: "Value", y: null, fx: "Year", fy: "Country Name" }
      )
    ),
    Plot.dotX(
      aggregated_account_ownership.filter(d => d.Year === 2017),
      Plot.groupX(
        { x: "mean" },
        { x: "Value", fill: "Sex", r: 9, fx: "Year", fy: "Country Name", tip: {
              format: {
                Sex: true,
                Value: true,
                fx: false,
                fy: true,
              }
            }, }
      )
    )
  ]
})}
<br/>
<span style="font-family: Andes, Arial, sans-serif;">
    <sub>Source: <a href="https://genderdata.worldbank.org/topics/assets">World Bank</a></sub>
</span>
```

---

Splendid. We have effectively reproduced the visualization.  Of course, there's still some room for improvement, but let's keep up the momentum and turn our attention to the next chart.

---

### Saved any money in the past year by sex and income group

The second visualization on the [`Assets` topic summary](https://genderdata.worldbank.org/topics/assets) page compares the percent of population above age 15 that saved any money in the past year.

```js
const saved_money_last_year_by_sex = await FileAttachment("./data/saved_money_last_year_by_sex.png").image()
```

```js
(await FileAttachment("./data/saved_money_last_year_by_sex.png")).image()
```

Reproducing this visualization is a very similar process to our first exercise: just focus on our target indicator and economies.

```js echo
const aggregated_money_savings_last_year = assets.filter(asset => {
  const countryNameMatch = [
  'High income',
  'Upper middle income',
  'Lower middle income',
  'Low income'
]
    // This bit refines our search for specfic indicators
  .includes(asset['Country Name']);
  const indicatorCodeMatch = [
  'fin18.t.d.1',
  'fin18.t.d.2'
].includes(asset['Indicator Code']);
  return countryNameMatch && indicatorCodeMatch;
})
    // This bit adds an additional column as a helper, called 'Sex' (for lack of a better word)
    // We use it because it can be dizzying to look at just the indicator codes.
  .map(asset => {
  const Sex = asset['Indicator Code'] === 'fin18.t.d.2' ? 'Female' : 'Male';
  return { Sex, ...asset };
})
```

Before visualizing, let's again have a quick review of the data.

```js
view(Inputs.table(aggregated_money_savings_last_year))
```

We again have data for multiple years.  Let's first plot a simple stacked bar chart with facets for the two years represented in the dataset for the sake of comparison.

```js echo
Plot.plot({
  marginLeft: 150,
  width: width*0.9,
  height: 300,
  color: { range: ["orange", "purple", "#ccc"], legend: true,  },
  y: {domain:  ["Low income","Lower middle income", "Upper middle income", "High income"] },
  marks: [
    Plot.frame({ strokeOpacity: 0.2 }),
    Plot.barX(aggregated_money_savings_last_year, {
      fy: "Year",
      x1: "Value",
      sort: "Value", reverse: true,
      y: "Country Name",
      fill: "Sex",
      tip: {
              format: {
                Sex: true,
                Value: true,
                y: false,
                x2: false,
                fy: false,
              }
            },
    }),
    Plot.ruleX([0])
  ]
})
```

The values are fairly close between 2014 and 2017, although the reported number of women saving money in 'upper middle income' countries appears to have gone down significantly.  Also, the values being returned by the [`assets`](https://observablehq.com/d/7fb248de83bc0ad4#assets) dataset are not the same as those shown in the official visualizations.  _This may be something to inquire into later._

For now, it's time to try to recreate the World Bank visualization.

Let's first filter the data to focus on the most recent year (2017):

```js echo
const aggregated_money_savings_last_year_2017 = aggregated_money_savings_last_year.filter(d => d.Year === 2017);
```

And next, let's render the chart:

---

```html echo
<table>
  <tr>
   <td>
    <br/>
    <br/>
    <br/>
    <br/>
     <span style="font-family: Andes, Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 1; padding-right:40px;">
    Saved any money <br/>in the past year <sub>(2017)</sub>
</span>
<br/>
<span style="font-family: Andes, Arial, sans-serif;">
    <sub>Source: <a href="https://genderdata.worldbank.org/topics/assets">World Bank</a></sub>
</span>
    </td>
        <td>
${Plot.plot({
  marginLeft: 0,
  marginTop: 20,
  height: 140,
  width: 500,
  color: { range: ["orange", "purple"], legend: true },
  facet: {
    data: aggregated_money_savings_last_year_2017,
    x: (d) => !["Low income", "Upper middle income"].includes(d["Country Name"]),
    y: (d) => !["Low income", "Lower middle income"].includes(d["Country Name"])
  },
  x: {axis: null, domain: [0, 100]},
  y: {axis: null},
  fx: {axis: null},
  fy: {axis: null, paddingInner: 0.4},
  marks: [
    //Plot.frame(),
    Plot.text(aggregated_money_savings_last_year_2017, Plot.selectFirst({
      frameAnchor: "top-left",
      text: "Country Name",
      lineAnchor: "bottom",
      fontSize: 14,
      fontWeight: "bold",
      dy: -5
    })),
    Plot.rectX(aggregated_money_savings_last_year_2017, {
      fill: "Sex",
      reverse: true,
      y1: d => d.Sex === "Male" ? 1.5 : 0,
      y2: d => d.Sex === "Male" ? 4 : 2.5,
      x2: "Value",
      tip:{
              format: {
                Sex: true,
                Value: true,
                x1: false,
                y: false,
                fx: false,
                fy: false,
              }
            },
    }),
    Plot.textX(aggregated_money_savings_last_year_2017, {
      fill: "Sex",
      filter: (d) => d.Sex === "Female",
      text: d => `${d.Value.toFixed(1)}%`,
      textAnchor: "start",
      fontSize: 14,    
      insetTop: 10,
      dx: 4,
      frameAnchor: "bottom",
      fontWeight: "bold",
      x: "Value"
    }),
    Plot.textX(aggregated_money_savings_last_year_2017, {
      fill: "Sex",
      filter: (d) => d.Sex === "Male",
      text: d => `${d.Value.toFixed(1)}%`,
      textAnchor: "start",
      fontSize: 14,
      insetTop: 10,
      frameAnchor: "top",
      fontWeight: "bold",
      dx: 4,
      x: "Value"
    })
  ]
})}
      </td>
      </tr>
</table>
```

---

Excellent.

---

### Men and women who own a house or land by sex

This third visualization from the Gender Portal [`Assets` topic summary](https://genderdata.worldbank.org/topics/assets) page is comprised of two scatter plots.  The visualization shows distributions of economies by the percentage of men and women who own a house alone, jointly, or both alone and jointly. The chart on the left shows these ownership distributions for houses.  The chart on the right shows distributions for land.

```js
const own_house_or_land_by_sex = await FileAttachment("./data/own_house_or_land_by_sex.png").image()
```

```js
(await FileAttachment("./data/own_house_or_land_by_sex.png")).image()
```

In order to create this visualization, our data must be encoded with both economy and region so that we can assign colors to the dots. As the source [`assets.csv`](https://observablehq.com/d/7fb248de83bc0ad4#assets) file does not contain this encoding (it provides only regional aggregates; it does not identify country assignments to regions), we must find a reference index.  For this, we'll use the World Bank [Country and Lending Groups](https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups) classifications.

```js 
const country_and_lending_group_classifications = display(await FileAttachment("./data/CLASS.xlsx").xlsx().then(d => d.sheet("List of economies", {headers: true})))
```

Before going further, let's pause to verify whether the names of countries/economies in the `country_and_lending_group_classifications` dataset matches those we have for gender `assets`.

For our comparison, we first want to filter out all the aggregation values for economies, such as '`${country_and_lending_group_classifications[220].Economy}`', so that we're with just the values for countries.

These are the regional assignments:

```js
const regions = display(Array.from(new Set(country_and_lending_group_classifications.map(d => d["Region"]))).filter(function( element ) {
   return element !== undefined;
}))
```

And here's the list of economies represented in the `country_and_lending_group_classifications` dataset:

```js
const country_and_lending_group_classification_economies = display(country_and_lending_group_classifications.filter(({ Region }) => regions.includes(Region)).flatMap(({ Economy }) => Economy))
```

The classification dataset comprises ${country_and_lending_group_classification_economies.length} economies&mdash; ${country_and_lending_group_classification_economies.length - countries_group.length} more than in our [`assets`](https://observablehq.com/d/7fb248de83bc0ad4#assets) dataset.  There are also a a few economies that have slightly different names and spellings.  Let's write a function to help us compare these two datasets so that we can see exactly where they differ:

```js echo
function compare_country_datasets(source, comparison) {
  const common_countries = Array.from(source).filter(country => comparison.has(country));
  const source_countries = Array.from(source).filter(country => !comparison.has(country));
  const comparison_countries = Array.from(comparison).filter(country => !source.has(country));

  return {common_values: common_countries, source_unique: source_countries, comparison_unique: comparison_countries};
}
```

```js
const country_datasets_comparison = display(compare_country_datasets(new Set(countries_group.map(d => d[0])), new Set(country_and_lending_group_classification_economies)))
```

Let's take a moment to re-map the names of economies in the `country_and_lending_group_classification_economies` to match those in our `assets` dataset:

```js echo
const economies_renamed = country_and_lending_group_classifications.map(c => ({ ...c, Economy: { "Côte d’Ivoire": "Cote d'Ivoire", "Czech Republic": "Czechia", "São Tomé and Príncipe": "Sao Tome and Principe", "Türkiye": "Turkiye" }[c.Economy] || c.Economy }));
```

With this step accomplished, it's time to filter down to our target indicators. We'll start by focusing on house ownership:

```js echo
const own_house = assets.filter(asset => {
  const countryNameMatch = economies_renamed.some(entry =>
    entry.Economy === asset['Country Name']
  );

  const indicatorCodeMatch = [
    'SG.OWN.HSAL.FE.ZS',
    'SG.OWN.HSAL.MA.ZS',
    'SG.OWN.HSJT.FE.ZS',
    'SG.OWN.HSJT.MA.ZS',
    'SG.OWN.HSAJ.FE.ZS',
    'SG.OWN.HSAJ.MA.ZS',
  ].includes(asset['Indicator Code']);

  return countryNameMatch && indicatorCodeMatch;
})
  .map(asset => {
    const isFemaleIndicator = [
      'SG.OWN.HSAL.FE.ZS',
      'SG.OWN.HSJT.FE.ZS',
      'SG.OWN.HSAJ.FE.ZS'
    ].includes(asset['Indicator Code']);

    const Sex = isFemaleIndicator ? 'Female' : 'Male';

    const classification = economies_renamed.find(c =>
      c.Economy === asset['Country Name']
    );

    if (classification) {
      return {
        ...asset,
        Region: classification.Region,
        'Income group': classification['Income group'],
        Sex
      };
    }

    return { ...asset, Sex };
});
```

```js
view(Inputs.table(own_house ))
```

From the table above, we can quickly see that our filtered data comprises values from across several years&mdash;from 2010 to 2020.  Some countries report more observations than other, for instance with Senegal reporting the most and Turkey the least.  To recreate the World Bank visualization, we'll need to ensure that we're only looking at the most recent year where multiple years are present.  We'll also need to combine the reported values for each form of ownership (alone, jointly, or both alone and jointly).  


Here's one way to accomplish this:

```js echo
const own_house_filtered = Object.values(
  Object.values(
    //Reduce the 'own_house' array to a key-value store with unique keys based on specific properties.
    own_house.reduce((r, c) => {
      // Create a unique key based on specific properties of the object.
      const key = JSON.stringify({
        "Country Name": c["Country Name"],
        "Country Code": c["Country Code"],
        "Year": c["Year"],
        "Region": c["Region"],
        "Income group": c["Income group"],
      });
      // If the key does not exist in the result object, initialize it with specific properties and default values.
      r[key] = r[key] || { ...c, "Female Value": 0, "Male Value": 0, "Indicator Name": "Own House" };
      // Check if the current entry corresponds to Female or Male Value indicator and update values accordingly.
      const isFemaleIndicator = ["SG.OWN.HSAL.FE.ZS", "SG.OWN.HSJT.FE.ZS", "SG.OWN.HSAJ.FE.ZS"].includes(c["Indicator Code"]);
      const isMaleIndicator = ["SG.OWN.HSAL.MA.ZS", "SG.OWN.HSJT.MA.ZS", "SG.OWN.HSAJ.MA.ZS"].includes(c["Indicator Code"]);
      // Update Female and Male Values based on the indicator type.
      r[key]["Female Value"] += isFemaleIndicator ? (isNaN(c["Value"]) ? 0 : c["Value"]) : 0;
      r[key]["Male Value"] += isMaleIndicator ? (isNaN(c["Value"]) ? 0 : c["Value"]) : 0;

      return r;
    }, {})
    // Group the transformed data by unique keys (Country Name and Indicator Code)
  ).reduce((groups, entry) => {
    const key = `${entry["Country Name"]}-${entry["Indicator Code"]}`;
    // If the key does not exist in the groups object, initialize it as an empty array.
    groups[key] = groups[key] || [];
    // Push the current entry into the corresponding group.
    groups[key].push(entry);
    return groups;
  }, {})
  //Extract the most recent data for Female and Male Values, filling missing Male Values with the last available value.
).flatMap(group => {
  // Find the most recent year in the current group.
  const mostRecentYear = Math.max(...group.map(entry => entry["Year"]));
  let lastMaleValue = null;
  
  return group
    // Filter the entries for the most recent year and non-zero Female and Male Values.
    .filter(entry => entry["Year"] === mostRecentYear && entry["Male Value"] !== 0 && entry["Female Value"] !== 0)
    .map(entry => {
      // Fill missing Male Values with the last available value.
      if (entry["Male Value"] === 0 && lastMaleValue !== null) {
        entry["Male Value"] = lastMaleValue;
      } else {
        lastMaleValue = entry["Male Value"];
      }
      return entry;
    });
})
```

Let's plot the results and see how close we are...

```js echo
Plot.plot({
  color: { legend: true, range: ["dodgerblue", "magenta", "green", "purple" , "orange", "red", "gray"], opacity : 0.8 },
  insetTop: 10,
  insetRight: 10,
  insetBottom: 10,
  insetLeft: 10,
  height: 400,
  width: 500,
  y: { percent: false,domain:[0,100], grid: true },
  x: { percent: false, domain:[0,100], grid: true },
  caption: "Own House",
  marks: [
    Plot.dot(own_house_filtered, {
      x: "Male Value",
      y: "Female Value",
      stroke: "Region",
      fill: "Region",
      opacity: 0.4,
      channels: {Year: "Year", Country: "Country Name"},
      tip: true
    }),
    Plot.ruleX([0]),
    Plot.ruleY([0]),
    Plot.link([0], {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      strokeDasharray: "5,3",
      strokeOpacity: (k) => k === 1 ? 1 : 0.2
    }),
  ],
})
```

Looking good!  Next let's repeat this process focusing on land ownership:

```js echo
const own_land = assets.filter(asset => {
  const countryNameMatch = economies_renamed.some(entry =>
    entry.Economy === asset['Country Name']
  );

  const indicatorCodeMatch = [
    // own land alone
    'SG.OWN.LDAL.FE.ZS',
    'SG.OWN.LDAL.MA.ZS',
    // own land jointly
    'SG.OWN.LDJT.FE.ZS',
    'SG.OWN.LDJT.MA.ZS',
    // own land both alone and jointly
    'SG.OWN.LDAJ.FE.ZS',
    'SG.OWN.LDAJ.MA.ZS',
  ].includes(asset['Indicator Code']);

  return countryNameMatch && indicatorCodeMatch;
})
  .map(asset => {
    const isFemaleIndicator = [
      'SG.OWN.LDAL.FE.ZS',
      'SG.OWN.LDJT.FE.ZS',
      'SG.OWN.LDAJ.FE.ZS'
    ].includes(asset['Indicator Code']);

    const Sex = isFemaleIndicator ? 'Female' : 'Male';

    const classification = economies_renamed.find(c =>
      c.Economy === asset['Country Name']
    );

    if (classification) {
      return {
        ...asset,
        Region: classification.Region,
        'Income group': classification['Income group'],
        Sex
      };
    }

    return { ...asset, Sex };
});
```

```js echo
const own_land_filtered = Object.values(
  Object.values(
    //Reduce the 'own_land' array to a key-value store with unique keys based on specific properties.
    own_land.reduce((r, c) => {
      // Create a unique key based on specific properties of the object.
      const key = JSON.stringify({
        "Country Name": c["Country Name"],
        "Country Code": c["Country Code"],
        "Year": c["Year"],
        "Region": c["Region"],
        "Income group": c["Income group"],
      });
      // If the key does not exist in the result object, initialize it with specific properties and default values.
      r[key] = r[key] || { ...c, "Female Value": 0, "Male Value": 0, "Indicator Name": "Own Land" };
      // Check if the current entry corresponds to Female or Male Value indicator and update values accordingly.
      const isFemaleIndicator = [
    // own land alone
    'SG.OWN.LDAL.FE.ZS',
    // own land jointly
    'SG.OWN.LDJT.FE.ZS',
    // own land both alone and jointly
    'SG.OWN.LDAJ.FE.ZS'].includes(c["Indicator Code"]);
      const isMaleIndicator = [
    // own land alone
    'SG.OWN.LDAL.MA.ZS',
    // own land jointly
    'SG.OWN.LDJT.MA.ZS',
    // own land both alone and jointly,
    'SG.OWN.LDAJ.MA.ZS'].includes(c["Indicator Code"]);
      // Update Female and Male Values based on the indicator type.
      r[key]["Female Value"] += isFemaleIndicator ? (isNaN(c["Value"]) ? 0 : c["Value"]) : 0;
      r[key]["Male Value"] += isMaleIndicator ? (isNaN(c["Value"]) ? 0 : c["Value"]) : 0;

      return r;
    }, {})
    // Group the transformed data by unique keys (Country Name and Indicator Code)
  ).reduce((groups, entry) => {
    const key = `${entry["Country Name"]}-${entry["Indicator Code"]}`;
    // If the key does not exist in the groups object, initialize it as an empty array.
    groups[key] = groups[key] || [];
    // Push the current entry into the corresponding group.
    groups[key].push(entry);
    return groups;
  }, {})
  //Extract the most recent data for Female and Male Values, filling missing Male Values with the last available value.
).flatMap(group => {
  // Find the most recent year in the current group.
  const mostRecentYear = Math.max(...group.map(entry => entry["Year"]));
  let lastMaleValue = null;
  
  return group
    // Filter the entries for the most recent year and non-zero Female and Male Values.
    .filter(entry => entry["Year"] === mostRecentYear && entry["Male Value"] !== 0 && entry["Female Value"] !== 0)
    .map(entry => {
      // Fill missing Male Values with the last available value.
      if (entry["Male Value"] === 0 && lastMaleValue !== null) {
        entry["Male Value"] = lastMaleValue;
      } else {
        lastMaleValue = entry["Male Value"];
      }
      return entry;
    });
})
```

```js echo
Plot.plot({
  color: { legend: true, range: ["dodgerblue", "magenta", "green", "purple" , "orange", "red", "gray"], opacity : 0.8 },
  insetTop: 10,
  insetRight: 10,
  insetBottom: 10,
  insetLeft: 10,
  height: 400,
  width: 500,
  y: { percent: false,domain:[0,80], grid: true },
  x: { percent: false, domain:[0,80], grid: true },
  caption: "Own Land",
  marks: [
    Plot.dot(own_land_filtered, {
      x: "Male Value",
      y: "Female Value",
      stroke: "Region",
      fill: "Region",
      opacity: 0.4,
      channels: {Year: "Year", Country: "Country Name"},
      tip: true
    }),
    Plot.ruleX([0]),
    Plot.ruleY([0]),
    Plot.link([0], {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      strokeDasharray: "5,3",
      strokeOpacity: (k) => k === 1 ? 1 : 0.2
    }),
  ],
})
```

---

To bring everything together, let's quickly write out the remaining bits of code needed to create a stand-alone legend, then bundle it all up into a HTML component similar to match the World Bank's visualization:

```js echo
const categories = [
            "Latin America & Caribbean",
            "South Asia",     
            "Sub-Saharan Africa",
            "Europe & Central Asia",
            "Middle East & North Africa",
            "East Asia & Pacific",
]
```

```js echo
const categoricalRange = [
 "rgba(0, 128, 0, 0.5)", "rgba(255, 165, 0, 0.5)", "rgba(255, 0, 0, 0.5)", "rgba(255, 0, 255, 0.5)", "rgba(128, 0, 128, 0.5)", "rgba(30, 144, 255, 0.5)"
//Green, Orange, Red, Magenta, Purple, Dodger Blue//
]
```

---

```html echo
<span style="font-family: Andes, Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 1;">
    Men and women who own a house or land by sex
</span>
<color-legend
  titleText=""
  width="1200"
  height="22"
  scaletype="categorical"
  marktype="circle"
  domain='${JSON.stringify(categories)}'
  range='${JSON.stringify(categoricalRange)}'
></color-legend>
<table>
<tr>
  <td>${Plot.plot({
  color: { legend: false, range: ["dodgerblue", "magenta", "green", "purple" , "orange", "red", "gray"], opacity : 0.8 },
  insetTop: 10,
  insetRight: 10,
  insetBottom: 10,
  insetLeft: 10,
  height: 400,
  width: 500,
  y: { percent: false,domain:[0,100], grid: true },
  x: { percent: false, domain:[0,100], grid: true },
  caption: "Own House",
  marks: [
    Plot.dot(own_house_filtered, {
      x: "Male Value",
      y: "Female Value",
      stroke: "Region",
      fill: "Region",
      opacity: 0.4,
      channels: {Year: "Year", Country: "Country Name"},
      tip: true
    }),
    Plot.ruleX([0]),
    Plot.ruleY([0]),
    Plot.link([0], {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      strokeDasharray: "5,3",
      strokeOpacity: (k) => k === 1 ? 1 : 0.2
    }),
  ],
})}</td><td>${Plot.plot({
  color: { legend: false, range: ["dodgerblue", "magenta", "green", "purple" , "orange", "red", "gray"], opacity : 0.8 },
  insetTop: 10,
  insetRight: 10,
  insetBottom: 10,
  insetLeft: 10,
  height: 400,
  width: 500,
  y: { percent: false,domain:[0,80], grid: true },
  x: { percent: false, domain:[0,80], grid: true },
  caption: "Own Land",
  marks: [
    Plot.dot(own_land_filtered, {
      x: "Male Value",
      y: "Female Value",
      stroke: "Region",
      fill: "Region",
      opacity: 0.4,
      channels: {Year: "Year", Country: "Country Name"},
      tip: true
    }),
    Plot.ruleX([0]),
    Plot.ruleY([0]),
    Plot.link([0], {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      strokeDasharray: "5,3",
      strokeOpacity: (k) => k === 1 ? 1 : 0.2
    }),
  ],
})}</td>
</tr>
</table>
<span style="font-family: Andes, Arial, sans-serif;">
    <sub>Source: <a href="https://genderdata.worldbank.org/topics/assets">World Bank</a></sub>
</span>

```

---

And that's a wrap for this visualization.

---

### Law grants spouses equal administrative authority over assets during marriage <br/>& Sons and daughters have equal rights to inherit assets from their parents

The fourth and final visualization on the [Gender Data Portal](https://genderdata.worldbank.org/), [Assets topic page](https://genderdata.worldbank.org/topics/assets/), plots two different indicators next to one another as square marks with darker and lighter colors representing 'Yes' and 'No' values.  This topic examines the relative equality of men and women with respect to control over family assets.  Here's the target visualization:

```js
const marriage_grants_equal_authority = await FileAttachment("./data/marriage_grants_equal_authority.png").image()
```

```js
(await FileAttachment("./data/marriage_grants_equal_authority.png")).image()
```


We'll start by re-mapping the [`country_and_lending_group_classification_economies`](https://observablehq.com/d/7fb248de83bc0ad4#country_and_lending_group_classification_economies) dataset to create an index of country names that aligns with those in the source `assets` dataset.

```js echo
const economies_name_map = (() => country_and_lending_group_classification_economies.map((country) => {
  switch (country) {
    case "Côte d’Ivoire":
      return "Cote d'Ivoire";
    case "Czech Republic":
      return "Czechia";
    case "São Tomé and Príncipe":
      return "Sao Tome and Principe";
    case "Türkiye":
      return "Turkiye";
    default:
      return country;
  }
}))();
```

Next we'll filter the [`assets`](https://observablehq.com/d/7fb248de83bc0ad4#assets) dataset for our target indicators, `SG.LAW.ASST.AR` and `SG.IHT.ASST.PT.EQ`&mdash;equal inheritance rights for sons and daughters and equal authority over assets during marriage. For each filtered asset, we'll correct the country name using the mapping provided in `economies_name_map`, then search for the corresponding classification data in `country_and_lending_group_classifications`. If a classification is found, we'll add the 'Region' and 'Income group' properties, otherwise we'll set these properties to null. Finally, we will filtered again to exclude those objects with null 'Region' or 'Income group'. This ensures that only assets with complete classification information are included in our resulting `equal_authority_and_rights array`:

```js echo
const equal_authority_and_rights = assets
  // Filter assets based on specific indicators
  .filter(asset => [
    // The law grants spouses equal administrative authority over assets during marriage (1=yes; 0=no)
    'SG.LAW.ASST.AR',
    // Sons and daughters have equal rights to inherit assets from their parents (1=yes; 0=no)
    'SG.IHT.ASST.PT.EQ'
  ].includes(asset['Indicator Code']))
// Process each filtered asset
  .map(asset => {
    // Correct country name based on a mapping
    const correctedCountryName = economies_name_map.find(entry =>
      entry.includes(asset['Country Name'])
    );
    // Find classification data based on the corrected country name
    const classification = country_and_lending_group_classifications.find(c =>
      c.Economy === correctedCountryName
    );
    // If classification data is found, add Region and Income group properties to the asset
    if (classification) {
      return {
        ...asset,
        Region: classification.Region,
        'Income group': classification['Income group'],
      };
    }
    // If no classification data is found, set Region and Income group properties to null
    return {
      ...asset,
      Region: null,
      'Income group': null,
    };
  })
  // Filter out assets without complete classification information
  .filter(asset => asset['Region'] !== null && asset['Income group'] !== null);
```

Rendering the resulting array into a data table cell, we quickly see that we have data for several years&mdash;from 1970 to 2021.

```js
view(Inputs.table(equal_authority_and_rights))
```

Our target visualization focuses only on data from the most recent year.  Let's add one more filter to focus on observations from 2021:

```js echo
const equal_authority_and_rights_2021 = assets
  .filter(asset => [
    // The law grants spouses equal administrative authority over assets during marriage (1=yes; 0=no)
    'SG.LAW.ASST.AR',
    // Sons and daughters have equal rights to inherit assets from their parents (1=yes; 0=no)
    'SG.IHT.ASST.PT.EQ'
  ].includes(asset['Indicator Code']) && asset['Year'] === 2021)
  .map(asset => {
    const correctedCountryName = economies_name_map.find(entry =>
      entry.includes(asset['Country Name'])
    );

    const classification = country_and_lending_group_classifications.find(c =>
      c.Economy === correctedCountryName
    );

    if (classification) {
      return {
        ...asset,
        Region: classification.Region,
        'Income group': classification['Income group'],
      };
    }

    return {
      ...asset,
      Region: null,
      'Income group': null,
    };
  })
  .filter(asset => asset['Region'] !== null && asset['Income group'] !== null);
```

Using a fairly simple plot, we can already come close to achieving our [target visualization](https://observablehq.com/d/7fb248de83bc0ad4#marriage_grants_equal_authority):

```js echo
Plot.plot({
  color: { legend: false },
  //marginRight: 160,
  marginLeft: 200,
  inset: 12,
  marks: [
    Plot.frame({ strokeOpacity: 0.1 }),
    Plot.dot(
      equal_authority_and_rights_2021,
      Plot.group(
        { r: "count" },
        {
          fy: "Region",
          x: "Country Name",
          y: "Indicator Code",
          stroke: d => {
            if (d["Indicator Code"] === "SG.IHT.ASST.PT.EQ") {
              return d.Value === 1 ? "rgb(231, 173, 0)" : "rgb(231, 219, 183)";
            }
            else if (d["Indicator Code"] === "SG.LAW.ASST.AR") {
              return d.Value === 1 ? "rgb(0, 86, 231)" : "rgb(138, 161, 231)";
            }
          },
          fill: d => {
            if (d["Indicator Code"] === "SG.IHT.ASST.PT.EQ") {
              return d.Value === 1 ? "rgb(231, 173, 0)" : "rgb(231, 219, 183)";
            }
            else if (d["Indicator Code"] === "SG.LAW.ASST.AR") {
              return d.Value === 1 ? "rgb(0, 86, 231)" : "rgb(138, 161, 231)";
            }
          },
          tip: {
            format: {
              fill: false,
              stroke: false,
              r: false,
            },
          },
          symbol: "square",
        }
      )
    )
  ],
  x: { axis: null },
  y: { axis: null },
})
```

But of course we can go further! With just a bit more data wrangling and some CSS magic, we can reposition and wrap the facets.  Here it goes:

```js echo
const equal_authority_and_rights_2021_sorted = ((() => {
  // Define an array of region names in a specific order.
  const regions = [
    "East Asia & Pacific",
    "Europe & Central Asia",
    "Latin America & Caribbean",
    "Middle East & North Africa",
    "South Asia",
    "Sub-Saharan Africa",
    "North America"
  ];
  // Use D3.js to group the input data by "Country Name".
  // Then sort the groups based on the index of their corresponding region in the defined regions array.
  // The sorting is done in descending order (-) of the region index.
  // Finally, format the sorted data as `${v[1].Value} / ${v[0].Value}`.
  return d3
    .sort(
      // Group the input data by "Country Name".
      d3
        .group(equal_authority_and_rights_2021, (d) => d["Country Name"])
        .values(),
      // Sort the groups based on the index of the region in the predefined regions array.
      (v) => -regions.indexOf(v[0].Region),
      // Format the sorted data as `${v[1].Value} / ${v[0].Value}`.
      (v) => `${v[1].Value} / ${v[0].Value}`
    )
     // Reverse the sorted array.
    .reverse()
    // Flatten the array, removing nested arrays.
    .flat();
}))();
```

And now for the final visualization:

---

```js echo
htl.html`
<span style="font-family: Andes, Arial, sans-serif; font-size: 20px; font-weight: bold; line-height: 1;">
Law grants spouses equal administrative authority over assets during marriage; <br/>Sons and daughters have equal rights to inherit assets from their parents
</span>
</p>
<div style="display: flex; flex-wrap: wrap; margin-left: 40px;">
${d3
  .rollup(
    equal_authority_and_rights_2021_sorted,
    (v) =>
      ((chart) => {
        d3.select(chart).on("mouseenter", function () {
          d3.select(this.parentElement).selectAll("svg").style("z-index", 0);
          d3.select(this).style("z-index", 1); // for the tooltip to be over the neighbors
        });
        return chart;
      })(
        Plot.plot({
          style: "overflow: visible; background: transparent;",
          width: 280,
          height: 100,
          x: { axis: null, insetLeft: 4, insetRight: 160, domain: [0, 19] },
          y: { reverse: true, axis: null, inset: 3 },
          fy: {
            paddingInner: 0,
            axis: null,
            domain: [-1, 0, 1, 2],
            insetBottom: 20
          },
          opacity: { range: [0.5, 1] },
          color: { range: ["rgb(231, 173, 0)", "rgb(0, 86, 231)"] },
          marks: [
            Plot.text([v[0].Region], {
              frameAnchor: "bottom-left",
              fontSize: 17,
              facetAnchor: "top",
              dy: -4
            }),
            Plot.dot(v, {
              x: (d, i) => Math.floor((i % 40) / 2),
              fy: (d, i) => Math.floor(i / 40),
              y: "Indicator Code",
              fill: "Indicator Code",
              fillOpacity: { value: "Value", scale: "opacity" },
              symbol: "square",
              r: 3,
                            channels: {"Country": "Country Name",
                        "Equal Rights to Inherit" : (d) => {
            if (d["Indicator Code"] === "SG.IHT.ASST.PT.EQ") {
              return d.Value === 1 ? "Yes" : "No";
            }},
                        "Spouse Equal Authority" : (d) => {
            if (d["Indicator Code"] === "SG.LAW.ASST.AR") {
              return d.Value === 1 ? "Yes" : "No";
            }

          },
                        },
              tip: {
                format: {
                  x: false,
                  fy: false,
                  fill: false,
                  fillOpacity: false,
                }
              }
            })
          ]
        })
      ),
    (d) => d.Region
  )
  .values()}
</div>
<span style="font-family: Andes, Arial, sans-serif;">
    <sub>Source: <a href="https://genderdata.worldbank.org/topics/assets">World Bank</a></sub>
</span>`
```

---

Ta-da! 🎉

---

## Acknowledgements

Thanks to `@fil` for all the time mentoring and for the fantastic Plot demonstrations. Thanks to `@mootarti` for answering my many questions on data wrangling and for the years of encouragement. 
 And thanks to `@pstuffa` for showing me many SQL equivalents to the JavaScript used in this notebook. 😊

---
