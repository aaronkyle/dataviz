# Key Biodiversity Areas

The World Database of Key Biodiversity Areas is managed by BirdLife International on behalf of the KBA Partnership. It hosts data on global and regional Key Biodiversity Areas (KBAs), including Important Bird and Biodiversity Areas identified by the BirdLife International Partnership, Alliance for Zero Extinction sites, KBAs identified through hotspot ecosystem profiles supported by the Critical Ecosystem Partnership Fund, and a small number of other KBAs. The database was developed from the World Bird and Biodiversity Database (WBDB) managed by BirdLife International.


```html
<link rel='stylesheet' href='https://unpkg.com/maplibre-gl@4.3.2/dist/maplibre-gl.css' />
<style>
  .maplibregl-popup-content{
    color: black;
}
</style>
```


```js
const container = display(html`<div style="width:840px; height:600px"></div>`)
```


```js
import maplibregl from 'npm:maplibre-gl';
import FeatureService from 'npm:mapbox-gl-arcgis-featureserver';
```


```js
const map_one = (() => {
  // Create the "map" object with the maplibregl.Map constructor, referencing the container div

  const mapRef = (container.value = new maplibregl.Map({
    container: container,
    center: [-73.2380902, 42.3824162],
    zoom: 8.5,
    maplibreglLogo: true,
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    attributionControl: true
}));



  // Add some navigation controls.
  mapRef.addControl(new maplibregl.NavigationControl(), "top-right");

  // When the user interacts with the map, propagate the values to inputs.
  //map.on("zoom", () => (viewof zoom.value = map.getZoom()));;

  // If this cell is invalidated, dispose of the map.
  invalidation.then(() => mapRef.remove());

  // The map must be loaded before we can add sources.
  new Promise((resolve, reject) => {
    mapRef.on("load", async () => {
      wms_layer_view(mapRef);

      kba_2022_10_POL_view(
        mapRef,
        kba_2022_10_POL
      );


 //     resolve();

    });
  });

  //yield container;


  return mapRef;

  
 })()
```


```js
            // Add WMS layer using CORS proxy
const proxyUrl = 'https://corsproxy.io/?';
```


```js
const wms_layer_view = (mapRef) => {
    map.addSource('wms-layer', {
                'type': 'raster',
                'tiles': [
                    proxyUrl + 'https://birdlaa8.birdlife.org/geoserver/gwc/service/wms?service=WMS&request=GetMap&layers=birdlife_dz:ibas_global_2024_wm&styles=&format=image/png&transparent=true&version=1.1.1&height=256&width=256&srs=EPSG:3857&bbox={bbox-epsg-3857}'
                ],
                'tileSize': 256
            });

    map.addLayer({
                'id': 'wms-layer',
                'type': 'raster',
                'source': 'wms-layer',
                'paint': { 'raster-opacity': 0.5 }
            });
            }
```

```js
const kba_2022_10_POL_view = (mapRef, kba_2022_10_POL) => {
// Adding source for the polygon feature collection
map.addSource('kba_2022_10_POL', {
  type: 'geojson',
  data: kba_2022_10_POL,
});

// Adding layer for the polygon feature collection
  mapRef.addLayer({
    id: "kba_2022_10_POL_fill",
    type: "fill",
    source: "kba_2022_10_POL",
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": "#EE4031",
      "fill-opacity": 0.3
    }
  });
  mapRef.addLayer({
    id: "kba_2022_10_POL_line",
    type: "line",
    source: "kba_2022_10_POL",
    layout: {
      visibility: "visible"
    },
    paint: {
      "line-color": "#EE4031",
      "line-width": 1.5,
      "line-opacity": 0.4
    }
  });
}
```




```js
const image_selection = view(Inputs.radio(["clear", "wms-layer"], {
  label: "Select Image",
  value: "clear"
}))
```

```js
const tableOfContents = view(Inputs.checkbox(toc, {
  label: "Select Layers",
  value: toc.values()
}))
```


```js
const toc = new Map([
  ["Town Boundaries", { label: "wms-layer", layers: ["wms-layer"] }],
  [
    "Areas of Environmental Concern",
    {
      label: "kba_2022_10_POL",
      layers: ["kba_2022_10_POL_fill", "kba_2022_10_POL_line"]
    }
  ],
])
```





```js
const map = new maplibregl.Map({
    //interactive: false,
    boxZoom: true,
    pitch: 0,
    bearing: 0,
    maplibreLogo: true,
    container,
    center: [133.4,37.4],
    zoom: 5,
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    scrollZoom: true
  });

  map.addControl(new maplibregl.NavigationControl());

  map.on('load', () => {




            // Add WMS layer using CORS proxy
const proxyUrl = 'https://corsproxy.io/?';
    
    map.addSource('wms-layer', {
                'type': 'raster',
                'tiles': [
                    proxyUrl + 'https://birdlaa8.birdlife.org/geoserver/gwc/service/wms?service=WMS&request=GetMap&layers=birdlife_dz:ibas_global_2024_wm&styles=&format=image/png&transparent=true&version=1.1.1&height=256&width=256&srs=EPSG:3857&bbox={bbox-epsg-3857}'
                ],
                'tileSize': 256
            });

    map.addLayer({
                'id': 'wms-layer',
                'type': 'raster',
                'source': 'wms-layer',
                'paint': { 'raster-opacity': 0.5 }
            });


// Adding source for the polygon feature collection
map.addSource('kba_2022_10_POL', {
  type: 'geojson',
  data: kba_2022_10_POL,
});

// Adding layer for the polygon feature collection
map.addLayer({
  'id': 'kba-polygons-layer',
  'type': 'fill',
  'source': 'kba_2022_10_POL',
  'paint': {
    'fill-color': '#008000',
    'fill-opacity': 0.2,
  },
});


// Add popup functionality
map.on('click', 'kba-polygons-layer', function (e) {
  const feature = e.features[0];
  const properties = feature.properties;

  // Create the popup content
  const popupContent = `
    <p>
      <strong>${properties['IntName']}</strong><br />
      <strong>Site ID:</strong> ${properties['SitRecID']}<br />
      <strong>Triggers:</strong> ${properties['triggers']}<br />
      <strong>Country:</strong> ${properties['Country']}<br />
      <strong>Region:</strong> ${properties['Region']}

    </p>
  `;

  // Create a new popup and set its coordinates and content
  new maplibregl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(popupContent)
    .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the redlist-polygons-layer
map.on('mouseenter', 'kba-polygons-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change the cursor back to default when the mouse leaves the redlist-polygons-layer
map.on('mouseleave', 'kba-polygons-layer', function () {
  map.getCanvas().style.cursor = '';
});

  });
```

```js echo
import * as shapefile from "npm:shapefile";
```

```js echo
//import {rewind} from "@fil/rewind";
import {rewind} from "./components/rewind.js";
```

Then, to read a `.shp` and `.dbf` file:


```js echo
//const kba_2022_10_PNT = shapefile.read(
//  ...(await Promise.all([
 //   FileAttachment("KBA_IBAT_Triggers_PNT.shp").stream(),
 //   FileAttachment("KBA_IBAT_Triggers_PNT.dbf").stream()
 // ]))
//);
```

```js echo
//const kba_2022_10_POL = shapefile.read(
 // ...(await Promise.all([
 //   FileAttachment("KBA_IBAT_Triggers_POL.shp").stream(),
 //   FileAttachment("KBA_IBAT_Triggers_POL.dbf").stream()
 // ]))
//);
```

```js echo
const kba_2022_10_POL = await FileAttachment("kba-2022-10-poly-simp.geojson").json()
```

```js echo
//const rw = rewind(kba_2022_10_POL)
```

```js echo
//kba_2022_10_PNT
```


```js echo
kba_2022_10_POL
```


To produce a map using [Plot’s geo mark](https://observablehq.com/plot/marks/geo):

```js echo
Plot.plot({ projection: "equal-earth", marks: [Plot.geo(kba_2022_10_POL)] })
```


```js echo
Plot.plot({
  projection: {
    type: "orthographic",
    rotate: [110, -30],
  },
  marks: [
    Plot.sphere(),
    //Plot.graticule(),
    //Plot.geo(collection, {fill: "currentColor"}),
    Plot.geo(kba_2022_10_POL),
  ]
})
```

