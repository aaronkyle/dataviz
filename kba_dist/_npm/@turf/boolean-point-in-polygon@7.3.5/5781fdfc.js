/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/@turf/boolean-point-in-polygon@7.3.5/dist/esm/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import d from"../../point-in-polygon-hao@1.2.4/484319dd.js";import{getCoord as g,getGeom as m}from"../invariant@7.3.5/caffb3d2.js";function u(r,e,a={}){if(!r)throw new Error("point is required");if(!e)throw new Error("polygon is required");const n=g(r),i=m(e),c=i.type,f=e.bbox;let o=i.coordinates;if(f&&p(n,f)===!1)return!1;c==="Polygon"&&(o=[o]);let s=!1;for(var t=0;t<o.length;++t){const l=d(n,o[t]);if(l===0)return!a.ignoreBoundary;l&&(s=!0)}return s}function p(r,e){return e[0]<=r[0]&&e[1]<=r[1]&&e[2]>=r[0]&&e[3]>=r[1]}var y=u;export{u as booleanPointInPolygon,y as default};
