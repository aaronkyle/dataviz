# Protected Areas Database of the United States (PAD-US) | Web Services

<link href='https://api.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.css' rel='stylesheet' />


```js
import mapboxgl from 'npm:mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25reWxlIiwiYSI6ImNsYmFvYXh4ODBibmozb244c3NuYXZ1bWQifQ.9Q2VAoy5gQuPmkhTuAY3Gg';
const container = display(html`<div style='height: 400px;'>`);
// Initialize the map object.
  const map = (container.value = new mapboxgl.Map({
    container,
    center: [-71.8, 42.2],
    zoom: 7, //viewof zoom.value, // TODO update dynamically
    style:
      "mapbox://styles/mapbox/" + basemap_style,
    scrollZoom: false
  }));

  // Add some navigation controls.
  map.addControl(new mapboxgl.NavigationControl(), "top-right");

  // When the user interacts with the map, propagate the values to inputs.
  //map.on("zoom", () => (viewof zoom.value = map.getZoom()));;

  // If this cell is invalidated, dispose of the map.
  invalidation.then(() => map.remove());

  // The map must be loaded before we can add sources.
  await new Promise((resolve) => map.on("load", resolve));

  /// Protection Status by GAP Status Code 
    // Define map sources.
  map.addSource('PADUS3_0ProtectionStatusbyGAPStatusCode-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0ProtectionStatusbyGAPStatusCode/MapServer/WMTS/tile/1.0.0/PADUS3_0ProtectionStatusbyGAPStatusCode/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0ProtectionStatusbyGAPStatusCode',
      'type': 'raster',
      'source': 'PADUS3_0ProtectionStatusbyGAPStatusCode-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0ProtectionStatusbyGAPStatusCode") ? "visible" : "none"
    }
    });

  ///Public Access
      // Define map sources.
  map.addSource('PADUS3_0PublicAccess-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0PublicAccess/MapServer/WMTS/tile/1.0.0/PADUS3_0PublicAccess/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0PublicAccess',
      'type': 'raster',
      'source': 'PADUS3_0PublicAccess-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0PublicAccess") ? "visible" : "none"
    }
    });


  // Fee Managers
      // Define layers.
  map.addSource('PADUS3_0Fee_Manager-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0Fee_Manager/MapServer/WMTS/tile/1.0.0/PADUS3_0Fee_Manager/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0Fee_Manager',
      'type': 'raster',
      'source': 'PADUS3_0Fee_Manager-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0Fee_Manager") ? "visible" : "none"
    }
    });


    // Manager Name
      // Define layers.
  map.addSource('PADUS3_0ManagerName-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0ManagerName/MapServer/WMTS/tile/1.0.0/PADUS3_0ManagerName/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0ManagerName',
      'type': 'raster',
      'source': 'PADUS3_0ManagerName-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0ManagerName") ? "visible" : "none"
    }
    });


      // Manager Type
      // Define layers.
  map.addSource('PADUS3_0Manager_Type-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0Manager_Type/MapServer/WMTS/tile/1.0.0/PADUS3_0Manager_Type/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0Manager_Type',
      'type': 'raster',
      'source': 'PADUS3_0Manager_Type-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0Manager_Type") ? "visible" : "none"
    }
    });

      // Federal Fee Managers Authoritative
      // Define layers.
  map.addSource('PADUS3_0FederalFeeManagers_Authoritative-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0FederalFeeManagers_Authoritative/MapServer/WMTS/tile/1.0.0/PADUS3_0FederalFeeManagers_Authoritative/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0FederalFeeManagers_Authoritative',
      'type': 'raster',
      'source': 'PADUS3_0FederalFeeManagers_Authoritative-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0FederalFeeManagers_Authoritative") ? "visible" : "none"
    }
    });

      // Federal Management Agencies
      // Define layers.
  map.addSource('PADUS3_0FederalManagementAgencies-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0FederalManagementAgencies/MapServer/WMTS/tile/1.0.0/PADUS3_0FederalManagementAgencies/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0FederalManagementAgencies',
      'type': 'raster',
      'source': 'PADUS3_0FederalManagementAgencies-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0FederalManagementAgencies") ? "visible" : "none"
    }
    });

      // Protection Mechanism Category
      // Define layers.
  map.addSource('PADUS3_0ProtectionMechanismCategory-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0ProtectionMechanismCategory/MapServer/WMTS/tile/1.0.0/PADUS3_0ProtectionMechanismCategory/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0ProtectionMechanismCategory',
      'type': 'raster',
      'source': 'PADUS3_0ProtectionMechanismCategory-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0ProtectionMechanismCategory") ? "visible" : "none"
    }
    });
  
  
      // Proclamation and Other Planning Boundaries
      // Define layers.
  map.addSource('PADUS3_0ProclamationandOtherPlanningBoundaries-wmts', {
    'type': 'raster',
    'tiles': [
'https://services.arcgis.com/v01gqwM5QqNysAAi/arcgis/rest/services/PADUS3_0ProclamationandOtherPlanningBoundaries/MapServer/WMTS/tile/1.0.0/PADUS3_0ProclamationandOtherPlanningBoundaries/default/default028mm/{z}/{y}/{x}.png'
      ],
      'tileSize': 256,
      'minzoom': 0,
      'maxzoom': 20
    });
    // Define layers.
  map.addLayer({
      'id': 'PADUS3_0ProclamationandOtherPlanningBoundaries',
      'type': 'raster',
      'source': 'PADUS3_0ProclamationandOtherPlanningBoundaries-wmts',
      layout: {
      visibility: image_selection.includes("PADUS3_0ProclamationandOtherPlanningBoundaries") ? "visible" : "none"
    }
    });
  
```

```js
var image_selection = view(Inputs.checkbox(["PADUS3_0ProtectionStatusbyGAPStatusCode", "PADUS3_0PublicAccess", "PADUS3_0Fee_Manager", "PADUS3_0ManagerName", "PADUS3_0Manager_Type", "PADUS3_0FederalFeeManagers_Authoritative", "PADUS3_0FederalManagementAgencies", "PADUS3_0ProtectionMechanismCategory", "PADUS3_0ProclamationandOtherPlanningBoundaries"], {label: "Select Image", value: ["PADUS3"]}))
```

```js
var basemap_style = view(Inputs.select(
  [
    "streets-v11",
    "outdoors-v11",
    "light-v10",
    "dark-v10",
    "satellite-v9",
    "satellite-streets-v11",
    "navigation-day-v1",
    "navigation-night-v1"
  ],
  {label: "Base Map Style", value: "streets-v11" }
))
```