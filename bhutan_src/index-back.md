# Bhutan | Sources of Geospatial Data on Administrative Divisions`

As I am working more on safeguard issues in the Kingdom of Bhutan, I wish to improve my understanding of the state's geography and administrative divisions. This notebook reflects a sort of 'walk through' of my findings in this pursuit.

To the greatest extent possible, I like to work with 'official' data sources&mdash;those published and maintained by state agencies.

---

The first site I came across is the [Bhutan Geo Portal](https://web.archive.org/web/20191101224221/http://geo.gov.bt/), which was designed to allows users to share maps, data, and information about data (metadata) to enhance the awareness about data availability and improved access to geospatial information and different applications.<sup>[[ref]](https://www.nlcs.gov.bt/?page_id=38)</sup> The Portal was developed by Bhutan's [Center for GIS Coordination](https://web.archive.org/web/20180717154132/http://www.nlcs.gov.bt/?page_id=70) and the [National Land Commission of Royal Government of Bhutan](https://www.nlcs.gov.bt/) with the support from the International Centre for [Integrated Mountain Development (ICIMOD)](http://www.icimod.org/) and [SERVIR-Himalaya](https://www.servirglobal.net/Regions/Himalaya) (a joint initiative of the [United States Agency for International Development (USAID)](https://www.usaid.gov/), the [National Aeronautics and Space Administration (NASA)](https://www.nasa.gov/) and ICIMOD).

---

On top of Bhutan's Geo Portal are a number of interesting applications.  Here's a quick run-down:

* [Bhutan Data Viewer](https://web.archive.org/web/20180305145346/http://geo.gov.bt/Home/ApplicationDetail?appId=6)
    * An interactive web mapping application to view geospatial data arranged in various thematic areas.
* [Road Planner](https://web.archive.org/web/20180911105117/http://geo.gov.bt/Home/ApplicationDetail?appId=4)
    * An interactive web mapping application to support planning of farm road construction in Bhutan
* [Bhutan Cadastral Mapping](https://web.archive.org/web/20180912020231/http://geo.gov.bt/Home/ApplicationDetail?appId=5)
    * A web mapping application for locating land parcels in a given Gewog and Dzongkhag based on Thrarm and Plot Id information.
* [Glacier Dynamics in Bhutan Himalaya](http://geo.gov.bt/Home/ApplicationDetail?appId=2)
    * Interactive mapping of glacier dynamics in Bhutan for 1980, 1990, 2000, and 2010
* [Forest Fire Detection & Monitoring in Bhutan](http://geo.gov.bt/Home/ApplicationDetail?appId=3)
    * MODIS based active fire detection and monitoring system in Bhutan with SMS and email alerts
* [Land Cover Dynamics in Bhutan](http://geo.gov.bt/Home/ApplicationDetail?appId=1)
    * Statistics on the harmonised land cover database of Bhutan for 1990, 2000 and 2010
* [Topographic Base Map View (New)](http://geo.gov.bt/Home/ApplicationDetail?appId=8)
    * This is the sample topographic base map view of Southern belt.
* [SamdrupJongKhar City Addressing App(New)](http://geo.gov.bt/Home/ApplicationDetail?appId=9)
    * TSamdrupJongKhar City Addressing App

---

Regrettably, at the time of writing this notebook, the Bhutan Geo Portal's main entry point was down. Since the apps listed above don't link to downloads of the underlying data layers, my search continues.

---

The next set of files I find are hosted on [The Humanitarian Data Exchange (HDX)](https://data.humdata.org/), a service maintained by the [United Nations Office for the Coordination of Humanitarian Affairs (OCHA)](https://www.unocha.org/).  HDX has [a lot of interesting data on Bhutan](https://data.humdata.org/group/btn), including (at the time of writing) [12 source of 'geodata'](https://data.humdata.org/group/btn?ext_geodata=1&q=&ext_page_size=25). 

Being interested as I am in creating a map of the state's administrative divisions, I turn my attention to the layer entitled [Bhutan - Administrative Boundaries (levels 0 - 2)](https://data.humdata.org/dataset/bhutan-administrative-boundaries-levels-0-2), uploaded by [Ahmadou Dicko](https://data.humdata.org/user/dickoah). As described on the site, "The administrative level 0 and 1 shapefiles and geodatabase feature classes are suitable for database or GIS linkage to the Bhutan administrative level 0-1 population statistics CSV tables."  Sounds great (I'll eventually wish to start joining statistical data to these shapefiles)!

Here's a quick list of the several files options HDX provides for this resource:

* [\`btn_adm_bnlc_SHP.zip\`](https://data.humdata.org/dataset/cff13277-eac9-49b0-8436-e80f42eb4684/resource/993e195f-3c7c-4472-ad2f-f04245a3537d/download/btn_adm_bnlc_shp.zip)
* [\`btn_adm_bnic_EMF.zip\`](https://data.humdata.org/dataset/cff13277-eac9-49b0-8436-e80f42eb4684/resource/c83c14ed-32a2-44a3-82a9-fe31b7e19a02/download/btn_adm_bnic_emf.zip)
* [\`btn_adm_bnlc_KMZ.zip\`](https://data.humdata.org/dataset/cff13277-eac9-49b0-8436-e80f42eb4684/resource/f93371ea-de16-4b53-ad85-8cfd779aa8fe/download/btn_adm_bnlc_kmz.zip)
* [\`btn_adm_bnlc.gdb.zip\`](https://data.humdata.org/dataset/cff13277-eac9-49b0-8436-e80f42eb4684/resource/2625dea2-787b-4b56-a1ec-d52bb3906b06/download/btn_adm_bnlc.gdb.zip)
* [\`BTN COD-AB 2019 02 01.pdf\`](https://data.humdata.org/dataset/cff13277-eac9-49b0-8436-e80f42eb4684/resource/e048ac82-5233-4693-bbd5-9303cf11d200/download/btn-cod-ab-2019-02-01.pdf)
* [\`btn_adm_gazetteer.xls\`](https://data.humdata.org/dataset/cff13277-eac9-49b0-8436-e80f42eb4684/resource/38d88f26-a81a-49be-aeb1-f2c3e5a4ea60/download/btn_adm_gazetteer.xls)


Yet something appears to be amiss!  This is what I get when loading in and rendering out the `btn_adm_bnlc_SHP.zip` shapefile:

```js
const humdata_BTN_admin = FileAttachment("humdata_BTN_admin.geojson").json()
```

```html echo
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display:block;width:70%;height:auto;">
  <path d="${path(humdata_BTN_admin)}" fill="none" stroke="black" stroke-width="2"></path>
</svg>
```

```html echo
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display:block;width:70%;height:auto;">
  <path d="${path(humdata_BTN_admin)}" fill="none" stroke="black" stroke-width="2"></path>
</svg>
```


Not ideal.  The `admin0` level doesn't exactly conform to my expectations, and the `admin1` and `admin2` levels aren't readily visible.  I might be able to overcome these shortcomings with some work (the object properties differentiate boundaries down to  `admin4`), but I imagine there are easier-to-use datasets out there. Again, my search continues.

---

After a bit more digging (and broadening my search to 'non-official' sources), I arrive at [GADM, the Database of Global Administrative Areas](https://gadm.org/)<!--, hosted by the [Center for Spatial Sciences](https://spatial.ucdavis.edu/) at the [University of California, Davis](https://www.ucdavis.edu/)-->. GADM wants to map the [administrative areas of all countries](https://gadm.org/download_country_v3.html) at all levels of sub-division&mdash;capturing high spatial resolution and of a extensive set of attributes.

Here are the GADM offerings for Bhutan:

* [Geopackage](https://biogeo.ucdavis.edu/data/gadm3.6/gpkg/gadm36_BTN_gpkg.zip)
* [Shapefile](https://biogeo.ucdavis.edu/data/gadm3.6/shp/gadm36_BTN_shp.zip)
* R (sp): [level-0](https://biogeo.ucdavis.edu/data/gadm3.6/Rsp/gadm36_BTN_0_sp.rds), [level1](https://biogeo.ucdavis.edu/data/gadm3.6/Rsp/gadm36_BTN_1_sp.rds), [level2](https://biogeo.ucdavis.edu/data/gadm3.6/Rsp/gadm36_BTN_2_sp.rds)
* R (sf): [level-0](https://biogeo.ucdavis.edu/data/gadm3.6/Rsf/gadm36_BTN_0_sf.rds), [level1](https://biogeo.ucdavis.edu/data/gadm3.6/Rsf/gadm36_BTN_1_sf.rds), [level2](https://biogeo.ucdavis.edu/data/gadm3.6/Rsf/gadm36_BTN_2_sf.rds)
* KMZ: [level-0](https://biogeo.ucdavis.edu/data/gadm3.6/kmz/gadm36_BTN_0.kmz), [level1](https://biogeo.ucdavis.edu/data/gadm3.6/kmz/gadm36_BTN_1.kmz), [level2](https://biogeo.ucdavis.edu/data/gadm3.6/kmz/gadm36_BTN_2.kmz)

I'll load in the GADM shapefile data (after manually converting it to geojson format) and re-draw the map:


```js echo
const gadm_BTN_admin0 = await FileAttachment("gadm36_BTN_admin0.geojson").json() 
// state-level boundary
```

```js echo
const gadm_BTN_admin1 = await FileAttachment("gadm36_BTN_admin1.geojson").json() 
// district-level boundaries
```

```js echo
const gadm_BTN_admin2 = await FileAttachment("gadm36_BTN_admin2.geojson").json() 
// village-level boundaries
```

```html echo
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display:block;width:70%;height:auto;">
  <path d="${path(gadm_BTN_admin0)}" fill="none" stroke="black" stroke-width="2"></path>
  <path d="${path(gadm_BTN_admin1)}" fill="none" stroke="blue" stroke-width="1.2"></path>
  <path d="${path(gadm_BTN_admin2)}" fill="none" stroke="grey" stroke-width="0.8"></path>
</svg>
```

```html echo
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display:block;width:70%;height:auto;">
  <path d="${path(gadm_BTN_admin0)}" fill="none" stroke="black" stroke-width="2"></path>
  <path d="${path(gadm_BTN_admin1)}" fill="none" stroke="blue" stroke-width="1.2"></path>
  <path d="${path(gadm_BTN_admin2)}" fill="none" stroke="grey" stroke-width="0.8"></path>
</svg>
```


Okay. I'm getting somewhere &ndash; this map appears to conform to Bhutan's current political organization.

---

For good measure, I'll have another look around the Internet to see if I can find another source to verify the GADM dataset.

One quick-to-find resource is [MapCruzin](https://mapcruzin.com/) is an independent firm specializing in GIS data for professional research and analysis.

MapCruzin provides the following data for Bhutan:<sup>[[ref]](https://mapcruzin.com/free-bhutan-country-city-place-gis-shapefiles.htm)</sup>

* [Administrative](https://mapcruzin.com/bhutan-shapefiles/bhutan_administrative.zip)
* [Coastline](https://mapcruzin.com/bhutan-shapefiles/bhutan_coastline.zip)
* [Roads](https://mapcruzin.com/bhutan-shapefiles/bhutan_highway.zip)
* [Places](https://mapcruzin.com/bhutan-shapefiles/bhutan_location.zip)
* [Natural Features](https://mapcruzin.com/bhutan-shapefiles/bhutan_natural.zip)
* [Points of Interest](https://mapcruzin.com/bhutan-shapefiles/bhutan_poi.zip)
* [Water](https://mapcruzin.com/bhutan-shapefiles/bhutan_water.zip)


Regrettably, the MapCruzin \`bhutan_administrative.zip\` appears to contain the same data as the HDX \`btn_adm_bnlc_SHP.zip\`, so no dice!

Alas - I'm fairly contented with the GADM-based map, so I'll end my pursuit of administrative division geodata here (for now).

---

Before concluding this notebook, I'd like to note a few additional sources of geospatial data for Bhutan that look interesting (and worth further exploration... in another future notebook).


* [Bhutan National Land Commission Secretariat](https://web.archive.org/web/20180715191814/http://www.nlcs.gov.bt/?page_id=203)
    * The National Land Commission Secretariat is a national mapping organization, mandated to produce topographic base maps, thematic maps, cadastral maps and large scale maps for projects. Their [topographic base map](# 'Previously at: https://www.nlcs.gov.bt/topo_map/gsimaps/#9/27.390000/90.400000') sub-divides the country into 56 map tiles for referential convenience. The following offerings can be accessed on request:
        * Topographic maps on 1:50000 scale
        * Topographic maps on 1:25,000 scale
        * Cadastral maps
        * Administrative maps
        * Physical maps
        * Guide maps

* [Global Map data archives](https://globalmaps.github.io/)
    * Global Map data archives is repository of geospatial information developed for the the Global Mapping Project<sup>[[ref]](https://g4aw.spaceoffice.nl/en/projects/international/data-and-services/data/global-mapping-project/)</sup>&mdash;an initiative launched in 1996 as a voluntary international cooperation of national mapping organizations, and led by the International Steering Committee for Global Mapping (ISCGM) and its Secretariat, c/o Geospatial Information Authority of Japan (GSI). The aim of the Global Mapping Project was to develop and provide Global Map data set with the following characteristics:
        * Fundamental geospatial information covering the whole land of the globe
        * Geospatial information developed and authorized by NGIAs of respective countries and regions around the world.
        * Digital geospatial information composed of eight layers being developed with consistent specifications
        * Freely available for download, and in case of non-commercial purposes, in principle, anyone can use the data freely.
    * The resolution of the termination of ISCGM and the transfer of Global Map data to the Geospatial Information Section in the UN was adopted at the 23rd ISCGM meeting on August 2, 2016. In this context, ISCGM terminated its website service on December 19, 2016. The Global Map data archives host the project data as it is existed on ISCGM termination.
    * The following data are archived for Bhutan: [gmbt10](https://github.com/globalmaps/gmbt10), [gmbt20](https://github.com/globalmaps/gmbt20).


<!-- ### Appendix -->


<!-- #### JavaScript Visualization Code -->


```js echo
// const d3 = import * as d3 from "npm:d3@5";
```

```js echo
const width = 975
```

```js echo
const projection = d3.geoIdentity()
    .reflectY(true)
    .fitWidth(width, gadm_BTN_admin0)
```

```js echo
const height = await Math.ceil(path.bounds(gadm_BTN_admin0)[1][1])
```

```js echo
const path = d3.geoPath(projection)
```

