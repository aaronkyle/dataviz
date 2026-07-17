/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/@turf/bbox-polygon@7.3.5/dist/esm/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{polygon as u}from"../helpers@7.3.5/4ca518d2.js";function p(t,o={}){const e=Number(t[0]),n=Number(t[1]),r=Number(t[2]),s=Number(t[3]);if(t.length===6)throw new Error("@turf/bbox-polygon does not support BBox with 6 positions");const i=[e,n];return u([[i,[r,n],[r,s],[e,s],i]],o.properties,{bbox:t,id:o.id})}var c=p;export{p as bboxPolygon,c as default};
