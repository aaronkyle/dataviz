/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/@mapbox/mapbox-gl-sync-move@0.3.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var n=function(){var n,o=arguments.length;if(1===o)n=arguments[0];else{n=[];for(var t=0;t<o;t++)n.push(arguments[t])}var f=[];function e(){n.forEach((function(n,o){n.on("move",f[o])}))}function r(){n.forEach((function(n,o){n.off("move",f[o])}))}function c(n,o){r(),function(n,o){var t=n.getCenter(),f=n.getZoom(),e=n.getBearing(),r=n.getPitch();o.forEach((function(n){n.jumpTo({center:t,zoom:f,bearing:e,pitch:r})}))}(n,o),e()}return n.forEach((function(o,t){f[t]=c.bind(null,o,n.filter((function(n,o){return o!==t})))})),e(),function(){r(),f=[],n=[]}};export{n as default};
