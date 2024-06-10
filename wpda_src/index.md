# World Database of Protected Areas (WDPA) 

The map below renders [WDPA dataset](https://www.protectedplanet.net/en/thematic-areas/wdpa) (polygon layers),  served by the [UN Environment Programme World Conservation Monitoring Centre](https://www.unep-wcmc.org/) (UNEP-WCMC)&mdash; a global centre of excellence on biodiversity and nature’s contribution to society and the economy.  

The map first loads UNEP-WCMC's [vector tiles](https://data-gis.unep-wcmc.org/server/rest/services/Hosted/wdpa_latest_vts/VectorTileServer) showing the locations of marine and terrestrial protected areas.  _With a little patience and time_, an overlay will appear using their [feature server](https://data-gis.unep-wcmc.org/server/rest/services/ProtectedSites/The_World_Database_of_Protected_Areas/FeatureServer/) that colors the data according to their IUCN Category. It also enables a tooltip showing a selection of data attributes associated with each area.



```html
<link rel='stylesheet' href='https://unpkg.com/maplibre-gl@4.3.2/dist/maplibre-gl.css' />
    <style>
        body { margin: 0; padding: 0; }
         html, body, #map { /*height: 720px;*/ }
    </style>

    <style>
    .maplibregl-popup-content{
        color: black;
    }
    </style>
<div id="map" style="width:720px; height:600px"></div>
<!-- <div id="map" style="width: ${width}px;height:${width/1.4}px;"> -->
```


```html
<strong>Legend:</strong></p>

${swatch("#B42222")} Category Ia – strict nature reserve<br>
${swatch("#68e94e")} Category Ib – wilderness area<br>
${swatch("#1ea503")} Category II – national park<br>
${swatch("#d388dd")} Category III – natural monument or feature<br>
${swatch("#FC4E2A")} Category IV – habitat or species management area<br>
${swatch("#FEB24C")} Category V – protected landscape or seascape<br>
${swatch("#FED976")} Category VI – protected area with sustainable use of natural resources<br>
${swatch("#898a90")} IUCN Category Not Assigned<br>
```

---

**About the Data:**

The World Database of Protected Areas (WDPA) is a comprehensive global database of marine and terrestrial protected areas and is one of the key global biodiversity datasets used by scientists, businesses, governments, international organizations and others to inform planning, policy decisions and management. 

The WDPA is a joint project between UN Environment Programme and the International Union for Conservation of Nature (IUCN). The compilation and management of the WDPA is carried out by UN Environment Programme World Conservation Monitoring Centre (UNEP-WCMC), in collaboration with governments, non-governmental organisations, academia and industry. Data and information on the world's protected areas compiled in the WDPA are used for reporting to the Convention on Biological Diversity on progress towards reaching the Aichi Biodiversity Targets (particularly Target 11), to the UN to track progress towards the 2030 Sustainable Development Goals, to some of the Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services (IPBES) core indicators, and other international assessments and reports including the Global Biodiversity Outlook, as well as for the publication of the United Nations List of Protected Areas.

_Text adapted from:_ UNEP-WCMC and IUCN (2024), Protected Planet: The World Database on Protected Areas (WDPA)[On-line], [June 2024], Cambridge, UK: UNEP-WCMC and IUCN. Available at: https://doi.org/10.34892/6fwd-af11


```js
import maplibregl from 'npm:maplibre-gl';
import FeatureService from 'npm:mapbox-gl-arcgis-featureserver';

const map = new maplibregl.Map({
    //interactive: false,
    boxZoom: true,
    pitch: 0,
    bearing: 0,
    maplibreLogo: true,
    container: 'map',
    center: [133.4,37.4],
    zoom: 5,
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    scrollZoom: true
  });

  map.addControl(new maplibregl.NavigationControl());

  map.on('load', () => {

  map.addSource('wdpa', {
    type: 'vector',
    tiles: ['https://data-gis.unep-wcmc.org/server/rest/services/Hosted/wdpa_latest_vts/VectorTileServer/tile/{z}/{y}/{x}.pbf'],
    promoteId: 'id',
  });

  map.addLayer({
    'id': 'wdpa-layer',
    'type': 'fill',
    'source': 'wdpa',
    'source-layer': 'WDPA_poly_latest', // Make sure this matches the correct source layer name
    'layout': {},
    'paint': {
      'fill-color': '#888888',
      'fill-opacity': 0.4,
    },
  });
    
    const srcId = 'fs-src'
    const service = new FeatureService(srcId, map, {
      url: 'https://data-gis.unep-wcmc.org/server/rest/services/ProtectedSites/The_World_Database_of_Protected_Areas/FeatureServer/1'
    });
    
    const fsLyrId = 'fs-fill-lyr'
    map.addLayer({
      'id': fsLyrId,
      'source': srcId,
      'type': 'fill',
      'paint': {
        'fill-opacity': 0.5,
        'fill-color': [
          'match',
          ['get', 'iucn_cat'],
          'Ia', '#B42222',
          'Ib', '#68e94e',
          'II', '#1ea503',
          'III', '#d388dd',
          'IV', '#FC4E2A',
          'V', '#FEB24C',
          'VI', '#FED976',
          'Not Assigned', '#898a90',
          /* default */ '#e2e3e9'
        ]
      }
    });
    
    function hideFsLayer () {
       map.setLayoutProperty(fsLyrId, 'visibility', 'none')
       service.disableRequests()
    }

    function showFsLayer () {
       map.setLayoutProperty(fsLyrId, 'visibility', 'visible')
       service.enableRequests()
    }

    function removeFsCompletelyFromMap () {
      map.removeLayer(fsLyrId)
      service.destroySource()
    }

    // Add a click event listener for the layer
    map.on('click', fsLyrId, (e) => {
      const feature = e.features[0];
      
    // Create a popup and set its coordinates and content
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`
          <strong>Name:</strong> ${feature.properties.name}<br>
          <strong>Original Name:</strong> ${feature.properties.orig_name}<br>
          <strong>Designation:</strong> ${feature.properties.desig}<br>
          <strong>Designation (Eng):</strong> ${feature.properties.desig_eng}<br>
          <strong>Designation Type:</strong> ${feature.properties.desig_type}<br>
          <strong>IUCN Category:</strong> ${feature.properties.iucn_cat}<br>
          <strong>International Criteria:</strong> ${feature.properties.int_crit}<br>
          <!--<strong>Marine:</strong> ${feature.properties.marine}-->
        `)
        .addTo(map);
    });

    // Change the cursor to a pointer when hovering over the layer
    map.on('mouseenter', fsLyrId, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change the cursor back when leaving the layer
    map.on('mouseleave', fsLyrId, () => {
      map.getCanvas().style.cursor = '';
    });
  });
```


```js
// from https://observablehq.com/@d3/working-with-color
function swatch(color) {
  return html`<div title="${color}" style="
  display: inline-block;
  width: 1em;
  height: 1em;
  background: ${color};
"></div>`;
}
```


