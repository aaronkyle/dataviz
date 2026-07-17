/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/@turf/boolean-intersects@7.3.5/dist/esm/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{booleanDisjoint as u}from"../boolean-disjoint@7.3.5/c51bbebd.js";import{flattenEach as t}from"../meta@7.3.5/c130756a.js";function r(o,n,{ignoreSelfIntersections:a=!0}={}){let e=!1;return t(o,f=>{t(n,l=>{if(e===!0)return!0;e=!u(f.geometry,l.geometry,{ignoreSelfIntersections:a})})}),e}var i=r;export{r as booleanIntersects,i as default};
