# Standalone data visualization examples

This repository is a collection of standalone HTML data visualizations, mapping experiments, layout prototypes, and data-driven documents. The examples are intentionally independent: open the HTML source directly, serve it with any static web server, or share the corresponding GitHub Pages URL.

Observable Framework source projects and generated Framework sites now live in the dedicated [aaronkyle/framework](https://github.com/aaronkyle/framework) repository. Keeping the two collections separate lets this repository stay focused on portable HTML concepts without a repository-level build system.

## Mapping and spatial visualization

- [MHC historic inventory](https://aaronkyle.github.io/dataviz/MHC-historic-inventory.html) ([source](MHC-historic-inventory.html))
- [MapLibre KML/KMZ viewer with popups](https://aaronkyle.github.io/dataviz/MapLibre-render-KML-source-with-popup.html) ([source](MapLibre-render-KML-source-with-popup.html))
- [MapLibre render of a shapefile vector source](https://aaronkyle.github.io/dataviz/MapLibre-render-SHP-vector-source.html) ([source](MapLibre-render-SHP-vector-source.html))
- [WDPA categories using IUCN colors](https://aaronkyle.github.io/dataviz/WDPA-iucn-color.html) ([source](WDPA-iucn-color.html))
- [Map with external controls](https://aaronkyle.github.io/dataviz/map-with-external-controls.html) ([source](map-with-external-controls.html))
- [MapLibre with Leaflet integration](https://aaronkyle.github.io/dataviz/maplibre-leaflet.html) ([source](maplibre-leaflet.html))
- [Page navigation with a map](https://aaronkyle.github.io/dataviz/example-page-with-nav-and-map.html) ([source](example-page-with-nav-and-map.html))
- [Flex-grid map, navigation, and sidebar](https://aaronkyle.github.io/dataviz/flex-grid-with-map-nav-and-sidebar.html) ([source](flex-grid-with-map-nav-and-sidebar.html))

## Spatial file loading and conversion

- [Load a KML URL as local GeoJSON](https://aaronkyle.github.io/dataviz/KML-URL-to-local-json.html) ([source](KML-URL-to-local-json.html))
- [Load a zipped shapefile URL as local JSON](https://aaronkyle.github.io/dataviz/SHP-zipfile-URL-to-local-json.html) ([source](SHP-zipfile-URL-to-local-json.html))
- [Convert KML to GeoJSON](https://aaronkyle.github.io/dataviz/kml-to-geojson.html) ([source](kml-to-geojson.html))
- [Open and render GeoJSON](https://aaronkyle.github.io/dataviz/open-GeoJSON.html) ([source](open-GeoJSON.html))
- [Open and render KML or KMZ](https://aaronkyle.github.io/dataviz/open-KML.html) ([source](open-KML.html))
- [Open common spatial files](https://aaronkyle.github.io/dataviz/open-spatial-file.html) ([source](open-spatial-file.html))

## Layout concepts

- [Sticky header and footer with CSS grid](https://aaronkyle.github.io/dataviz/css-grid-experiment.html) ([source](css-grid-experiment.html))
- [Two-page flex-grid layout](https://aaronkyle.github.io/dataviz/css-multipage-flex.html) ([source](css-multipage-flex.html))

## Data-driven documents

- [World Bank PIP shared prosperity](https://aaronkyle.github.io/dataviz/wbg-pip-shared-prosperity.html) ([source](wbg-pip-shared-prosperity.html))

## Working locally

There is no shared installation or build step. From the repository root, a simple static server is enough:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/` followed by an example filename or directory. Single-file pages remain at the repository root to preserve their established GitHub Pages URLs. Multi-file documents remain in their own directories with their supporting JavaScript, CSS, and data assets.
