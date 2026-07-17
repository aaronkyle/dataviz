/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/xml-utils@1.10.2/find-tags-by-name.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function E(s,n,e){const l=new RegExp(n).exec(s.slice(e));return l?e+l.index:-1}function x(s,n,e){const l=new RegExp(n).exec(s.slice(e));return l?e+l.index+l[0].length-1:-1}function y(s,n){const e=new RegExp(n,"g"),t=s.match(e);return t?t.length:0}function B(s,n,e){const t=e&&e.debug||!1,l=!(e&&typeof e.nested===!1),u=e&&e.startIndex||0;t&&console.log("[xml-utils] starting findTagByName with",n," and ",e);const c=E(s,`<${n}[ 
>/]`,u);if(t&&console.log("[xml-utils] start:",c),c===-1)return;const f=s.slice(c+n.length);let i=x(f,"^[^<]*[ /]>",0);const o=i!==-1&&f[i-1]==="/";if(t&&console.log("[xml-utils] selfClosing:",o),o===!1)if(l){let a=0,h=1,b=0;for(;(i=x(f,"[ /]"+n+">",a))!==-1;){const w=f.substring(a,i+1);if(h+=y(w,"<"+n+`[ 
	>]`),b+=y(w,"</"+n+">"),b>=h)break;a=i}}else i=x(f,"[ /]"+n+">",0);const r=c+n.length+i+1;if(t&&console.log("[xml-utils] end:",r),r===-1)return;const d=s.slice(c,r);let g;return o?g=null:g=d.slice(d.indexOf(">")+1,d.lastIndexOf("<")),{inner:g,outer:d,start:c,end:r}}function I(s,n,e){const t=[],l=e&&e.debug||!1,u=e&&typeof e.nested=="boolean"?e.nested:!0;let c=e&&e.startIndex||0,f;for(;f=B(s,n,{debug:l,startIndex:c});)u?c=f.start+1+n.length:c=f.end,t.push(f);return l&&console.log("findTagsByName found",t.length,"tags"),t}export{I as default};
