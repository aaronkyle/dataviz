/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/point-in-polygon-hao@1.2.4/dist/esm/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{orient2d as o}from"../robust-predicates@3.0.3/b42f30a7.js";function w(m,d){var n,i,h=0,s,v,r,t,a,e,u,g=m[0],x=m[1],P=d.length;for(n=0;n<P;n++){i=0;var f=d[n],l=f.length-1;if(e=f[0],e[0]!==f[l][0]&&e[1]!==f[l][1])throw new Error("First and last coordinates in a ring must be the same");for(v=e[0]-g,r=e[1]-x,i;i<l;i++){if(u=f[i+1],t=u[0]-g,a=u[1]-x,r===0&&a===0){if(t<=0&&v>=0||v<=0&&t>=0)return 0}else if(a>=0&&r<=0||a<=0&&r>=0){if(s=o(v,t,r,a,0,0),s===0)return 0;(s>0&&a>0&&r<=0||s<0&&a<=0&&r>0)&&h++}e=u,r=a,v=t}}return h%2!==0}export{w as default};
