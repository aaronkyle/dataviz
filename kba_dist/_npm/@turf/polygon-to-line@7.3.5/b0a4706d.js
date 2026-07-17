/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/@turf/polygon-to-line@7.3.5/dist/esm/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{featureCollection as f,multiLineString as l,lineString as m}from"../helpers@7.3.5/4ca518d2.js";import{getGeom as i}from"../invariant@7.3.5/caffb3d2.js";function c(e,r={}){const t=i(e);switch(!r.properties&&e.type==="Feature"&&(r.properties=e.properties),t.type){case"Polygon":return u(t,r);case"MultiPolygon":return a(t,r);default:throw new Error("invalid poly")}}function u(e,r={}){const o=i(e).coordinates,n=r.properties?r.properties:e.type==="Feature"?e.properties:{};return s(o,n)}function a(e,r={}){const o=i(e).coordinates,n=r.properties?r.properties:e.type==="Feature"?e.properties:{},p=[];return o.forEach(g=>{p.push(s(g,n))}),f(p)}function s(e,r){return e.length>1?l(e,r):m(e[0],r)}var d=c;export{s as coordsToLine,d as default,a as multiPolygonToLine,c as polygonToLine,u as singlePolygonToLine};
