/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/xml-utils@1.10.2/get-attribute.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function g(e,l,s){const t=s&&s.debug||!1;t&&console.log("[xml-utils] getting "+l+" in "+e);const i=typeof e=="object"?e.outer:e,u=i.slice(0,i.indexOf(">")+1),r=['"',"'"];for(let o=0;o<r.length;o++){const n=r[o],f=l+"\\="+n+"([^"+n+"]*)"+n;t&&console.log("[xml-utils] pattern:",f);const c=new RegExp(f).exec(u);if(t&&console.log("[xml-utils] match:",c),c)return c[1]}}export{g as default};
