/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/@turf/line-intersect@7.3.5/dist/esm/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{feature as f,featureCollection as n,point as g}from"../helpers@7.3.5/4ca518d2.js";import h from"../../sweepline-intersections@1.5.0/997d1b30.js";var m=h;function a(e,t,c={}){const{removeDuplicates:y=!0,ignoreSelfIntersections:l=!0}=c;let o=[];e.type==="FeatureCollection"?o=o.concat(e.features):e.type==="Feature"?o.push(e):(e.type==="LineString"||e.type==="Polygon"||e.type==="MultiLineString"||e.type==="MultiPolygon")&&o.push(f(e)),t.type==="FeatureCollection"?o=o.concat(t.features):t.type==="Feature"?o.push(t):(t.type==="LineString"||t.type==="Polygon"||t.type==="MultiLineString"||t.type==="MultiPolygon")&&o.push(f(t));const s=m(n(o),l);let u=[];if(y){const r={};s.forEach(p=>{const i=p.join(",");r[i]||(r[i]=!0,u.push(p))})}else u=s;return n(u.map(r=>g(r)))}var S=a;export{S as default,a as lineIntersect};
