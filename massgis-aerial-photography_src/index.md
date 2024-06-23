# Comparing MassGIS Aerial Photography 2015-2021

Use the slider below to compare [MassGIS historical image data](https://www.mass.gov/info-details/massgis-data-layers#image-data-). 

---


`Control` + `mouse scroll` to zoom in/out and turn around.


```js
var count = 0;

function Id(id) {
  this.id = id;
  this.href = new URL(`#${id}`, location) + "";
}

function uid(name) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}

function contextWebGL(width, height, dpi) {
  if (dpi == null) dpi = devicePixelRatio;
  var canvas = document.createElement("canvas");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  var context = canvas.getContext("webgl");
  if (!context) {
    console.error("WebGL not supported");
    return null;
  }
  return canvas;
}
```


```js
const map_3d = (() => {
  //const scope = DOM.uid().id;
  const scope =  uid().id;
  const containerBefore = htl.html`<div class="${scope}-map">`;
  const containerAfter = htl.html`<div class="${scope}-map">`;
  const container = display(html`<div class="${scope}">
    ${containerBefore}
    ${containerAfter}
    <style>
@import url(https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css);
.${scope} {
  height:600px;
  position:relative;
  /* Margin of -17px negates Observable's cell margins. */
  margin: 0 -17px;
}
.${scope}-map {
  position: absolute;
  top: 0;
  bottom:0;
  width: 100%;
}
/* Prevent attribution from getting selected while dragging */
.${scope} .mapboxgl-ctrl-attrib-inner {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
    </style>
  </div>`);

  const mapBefore = initMap(
    containerBefore,
    "imagery2015"
  );
  const mapAfter = initMap(
    containerAfter,
    "orthos2021"
  );

  new compare(mapBefore, mapAfter, container, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
  });

  function initMap(container, layerName) {
    const map = new mapboxgl.Map({
      container,
      accessToken: "pk.eyJ1IjoidmluY2VudHNhcmFnbyIsImEiOiJjamxwa3JkaWkwZ3BjM3dudmZmazQwYjI2In0.eUzks_hqH-QVIlnXUKmKsA",
      center: [
        -73.3567649, 42.2350711],
      zoom: 15,
      pitch: 55,
      bearing: 0,
      style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
      scrollZoom: true
    });

    map.on("load", () => {
      map.addLayer({
        id: "basemap",
        type: "raster",
        source: {
          type: "raster",
          tileSize: 256,
          tiles: [
"https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/" + layerName + "/MapServer/WMTS/tile/1.0.0/" + layerName + "/default/default028mm/{z}/{y}/{x}.jpg"
    ]
        },
        paint: {
          "raster-fade-duration": 0,
          "raster-opacity": 0.8
        }
      });

      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1 });

      map.addLayer(layer_contour_labels);
      map.addLayer(layer_contours);
      // add a sky layer that will show when the map is highly pitched
      map.addLayer(layer_sky);
    });

    return map;
  }
})()
```

---

<!--### Additional Layers-->

```js
const layer_contour_labels = ({
  id: "countour-labels",
  type: "symbol",
  source: {
    type: "vector",
    url: "mapbox://mapbox.mapbox-terrain-v2"
  },
  "source-layer": "contour",
  layout: {
    visibility: "visible",
    "symbol-placement": "line",
    "text-field": ["concat", ["to-string", ["get", "ele"]], "m"]
  },
  paint: {
    "icon-color": "#fff44f",
    "icon-halo-width": 0.5,
    "text-color": "#fff44f",
    "text-halo-width": 1,
    "text-opacity": 0.6
  }
})
```

```js
const layer_contours = ({
  id: "countours",
  type: "line",
  source: { type: "vector", url: "mapbox://mapbox.mapbox-terrain-v2" },
  "source-layer": "contour",
  layout: {
    visibility: "visible",
    "line-join": "round",
    "line-cap": "round"
  },
  paint: {
    "line-color": "#fff44f",
    "line-width": 1,
    "line-opacity": 0.4
  }
})
```

```js
const layer_sky = ({
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15
  }
})
```

<!--### Dependencies-->

```js
//const mapboxgl = {
//  const gl = await require("mapbox-gl");
//  if (!gl.accessToken) {
//    gl.accessToken =
//      "pk.eyJ1IjoidmluY2VudHNhcmFnbyIsImEiOiJjamxwa3JkaWkwZ3BjM3dudmZmazQwYjI2In0.eUzks_hqH-QVIlnXUKmKsA";
//    const href = await require.resolve("https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css");
//    document.head.appendChild(html`<link href=${href} rel=stylesheet>`);

//  }
//  return gl;
//}
```

```js
import mapboxgl from 'npm:mapbox-gl';
```

```js
// const compare = require('https://bundle.run/mapbox-gl-compare@0.4.0');
import compare from 'npm:mapbox-gl-compare@0.4.0';
```

```js
// To apply base styles when the notebook is downloaded/exported
// substratum({invalidation})
```

```js
//import {substratum} from "@categorise/substratum"
```

## Acknowledgements

Thanks to [Dr. Sudhira H.S.](https://in.linkedin.com/in/sudhira) for introducing me to this technique!