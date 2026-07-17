# Comparing MassGIS Aerial Photography 2015-2021

Use the slider below to compare [MassGIS historical image data](https://www.mass.gov/info-details/massgis-data-layers#image-data-). 

<link href="https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css" rel="stylesheet" />
<link href="https://unpkg.com/@maplibre/maplibre-gl-compare@0.5.0/dist/maplibre-gl-compare.css" rel="stylesheet" />

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
.${scope} .maplibregl-ctrl-attrib-inner {
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

  new Compare(mapBefore, mapAfter, container, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
  });

  function initMap(container, layerName) {
    const map = new maplibregl.Map({
      container,
      center: [
        -73.3567649, 42.2350711],
      zoom: 15,
      pitch: 55,
      bearing: 0,
      style: {
        version: 8,
        sources: {},
        layers: [{
          id: "background",
          type: "background",
          paint: {"background-color": "#d8d5cf"}
        }]
      },
      scrollZoom: true
    });

    map.on("load", () => {
      map.addLayer({
        id: "basemap",
        type: "raster",
        source: {
          type: "raster",
          tileSize: 256,
          attribution: '<a href="https://www.mass.gov/info-details/massgis-data-layers-image-data">MassGIS</a>',
          tiles: [
"https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/" + layerName + "/MapServer/WMTS/tile/1.0.0/" + layerName + "/default/default028mm/{z}/{y}/{x}.jpg"
    ]
        },
        paint: {
          "raster-fade-duration": 0,
          "raster-opacity": 0.8
        }
      });

    });

    return map;
  }
})()
```

<!--### Dependencies-->

```js
import maplibregl from "npm:maplibre-gl@5.24.0";
```

```js
import Compare from "npm:@maplibre/maplibre-gl-compare@0.5.0";
```

## Acknowledgements

Thanks to [Dr. Sudhira H.S.](https://in.linkedin.com/in/sudhira) for introducing me to this technique!
