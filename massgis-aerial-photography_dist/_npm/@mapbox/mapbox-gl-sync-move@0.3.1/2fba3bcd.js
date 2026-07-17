/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/@mapbox/mapbox-gl-sync-move@0.3.1/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var _,i;function g(){if(i)return _;i=1;function v(n,t){var a=n.getCenter(),e=n.getZoom(),c=n.getBearing(),f=n.getPitch();t.forEach(function(u){u.jumpTo({center:a,zoom:e,bearing:c,pitch:f})})}function p(){var n,t=arguments.length;if(t===1)n=arguments[0];else{n=[];for(var a=0;a<t;a++)n.push(arguments[a])}var e=[];n.forEach(function(r,o){e[o]=u.bind(null,r,n.filter(function(s,m){return m!==o}))});function c(){n.forEach(function(r,o){r.on("move",e[o])})}function f(){n.forEach(function(r,o){r.off("move",e[o])})}function u(r,o){f(),v(r,o),c()}return c(),function(){f(),e=[],n=[]}}return _=p,_}var b=g();export{b as default};
