/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/mapbox-gl-arcgis-featureserver@0.0.8/dist/mapbox-gl-arcgis-featureserver.esm.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import e from"../@mapbox/tilebelt@1.0.2/_esm.js";import t from"../arcgis-pbf-parser@0.0.1/_esm.js";class i{constructor(e,t,i,s){if(!e||!t||!i)throw new Error("Source id, map and arcgisOptions must be supplied as the first three arguments.");if(!i.url)throw new Error("A url must be supplied as part of the esriServiceOptions object.");this.sourceId=e,this._map=t,this._tileIndices=new Map,this._featureIndices=new Map,this._featureCollections=new Map,this._esriServiceOptions=Object.assign({useStaticZoomLevel:!1,minZoom:i.useStaticZoomLevel?7:2,simplifyFactor:.3,precision:8,where:"1=1",to:null,from:null,outFields:"*",setAttributionFromService:!0,f:"pbf",useSeviceBounds:!0,projectionEndpoint:`${i.url.split("rest/services")[0]}rest/services/Geometry/GeometryServer/project`,token:null,fetchOptions:null},i),this._fallbackProjectionEndpoint="https://tasks.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer/project",this.serviceMetadata=null,this._maxExtent=[-1/0,1/0,-1/0,1/0];const r=s||{};this._map.addSource(e,Object.assign(r,{type:"geojson",data:this._getBlankFc()})),this._getServiceMetadata().then((()=>{if(!this.supportsPbf){if(!this.supportsGeojson)throw this._map.removeSource(e),new Error("Server does not support PBF or GeoJSON query formats.");this._esriServiceOptions.f="geojson"}if(this._esriServiceOptions.useSeviceBounds){const e=this.serviceMetadata.extent;4326===e.spatialReference.wkid?this._setBounds([e.xmin,e.ymin,e.xmax,e.ymax]):this._projectBounds()}"*"!==this._esriServiceOptions.outFields&&(this._esriServiceOptions.outFields=`${this._esriServiceOptions.outFields},${this.serviceMetadata.uniqueIdField.name}`),this._setAttribution(),this.enableRequests(),this._clearAndRefreshTiles()}))}destroySource(){this.disableRequests(),this._map.removeSource(this.sourceId)}_getBlankFc(){return{type:"FeatureCollection",features:[]}}_setBounds(e){this._maxExtent=e}get supportsGeojson(){return this.serviceMetadata.supportedQueryFormats.indexOf("geoJSON")>-1}get supportsPbf(){return this.serviceMetadata.supportedQueryFormats.indexOf("PBF")>-1}disableRequests(){this._map.off("moveend",this._boundEvent)}enableRequests(){this._boundEvent=this._findAndMapData.bind(this),this._map.on("moveend",this._boundEvent)}_clearAndRefreshTiles(){this._tileIndices=new Map,this._featureIndices=new Map,this._featureCollections=new Map,this._findAndMapData()}setWhere(e){this._esriServiceOptions.where=e,this._clearAndRefreshTiles()}clearWhere(){this._esriServiceOptions.where="1=1",this._clearAndRefreshTiles()}setDate(e,t){this._esriServiceOptions.to=e,this._esriServiceOptions.from=t,this._clearAndRefreshTiles()}setToken(e){this._esriServiceOptions.token=e,this._clearAndRefreshTiles()}_createOrGetTileIndex(e){const t=this._tileIndices.get(e);if(t)return t;const i=new Map;return this._tileIndices.set(e,i),i}_createOrGetFeatureCollection(e){const t=this._featureCollections.get(e);if(t)return t;const i=this._getBlankFc();return this._featureCollections.set(e,i),i}_createOrGetFeatureIdIndex(e){const t=this._featureIndices.get(e);if(t)return t;const i=new Map;return this._featureIndices.set(e,i),i}async _findAndMapData(){const t=this._map.getZoom();if(t<this._esriServiceOptions.minZoom)return;const i=this._map.getBounds().toArray(),s=e.bboxToTile([i[0][0],i[0][1],i[1][0],i[1][1]]);if(this._esriServiceOptions.useSeviceBounds&&this._maxExtent[0]!==-1/0&&!this._doesTileOverlapBbox(this._maxExtent,i))return;const r=this._esriServiceOptions.useStaticZoomLevel?this._esriServiceOptions.minZoom:2*Math.floor(t/2),n=this._createOrGetTileIndex(r),o=this._createOrGetFeatureIdIndex(r),a=this._createOrGetFeatureCollection(r),c=[];if(s[2]<r){let t=e.getChildren(s),n=t[0][2];for(;n<r;){const i=[];t.forEach((t=>i.push(...e.getChildren(t)))),t=i,n=t[0][2]}for(let e=0;e<t.length;e++)this._doesTileOverlapBbox(t[e],i)&&c.push(t[e])}else c.push(s);for(let t=0;t<c.length;t++){const i=e.tileToQuadkey(c[t]);n.has(i)?(c.splice(t,1),t--):n.set(i,!0)}if(0===c.length)return void this._updateFcOnMap(a);const h=Math.abs(i[1][0]-i[0][0])/this._map.getCanvas().width*this._esriServiceOptions.simplifyFactor;await this._loadTiles(c,h,o,a),this._updateFcOnMap(a)}async _loadTiles(e,t,i,s){return new Promise((r=>{const n=e.map((e=>this._getTile(e,t)));Promise.all(n).then((e=>{e.forEach((e=>{e&&this._iterateItems(e,i,s)})),r()}))}))}_iterateItems(e,t,i){e.features.forEach((e=>{t.has(e.id)||(i.features.push(e),t.set(e.id))}))}get _time(){if(!this._esriServiceOptions.to)return!1;let e=this._esriServiceOptions.from,t=this._esriServiceOptions.to;return e instanceof Date&&(e=e.valueOf()),t instanceof Date&&(t=t.valueOf()),`${e},${t}`}_getTile(i,s){const r=e.tileToBBOX(i),n={spatialReference:{latestWkid:4326,wkid:4326},xmin:r[0],ymin:r[1],xmax:r[2],ymax:r[3]},o=new URLSearchParams({f:this._esriServiceOptions.f,geometry:JSON.stringify(n),where:this._esriServiceOptions.where,outFields:this._esriServiceOptions.outFields,outSR:4326,returnZ:!1,returnM:!1,precision:this._esriServiceOptions.precision,quantizationParameters:JSON.stringify({extent:n,tolerance:s,mode:"view"}),resultType:"tile",spatialRel:"esriSpatialRelIntersects",geometryType:"esriGeometryEnvelope",inSR:4326});return this._time&&o.append("time",this._time),this._appendTokenIfExists(o),new Promise((e=>{fetch(`${this._esriServiceOptions.url}/query?${o.toString()}`,this._esriServiceOptions.fetchOptions).then((e=>"pbf"===this._esriServiceOptions.f?e.arrayBuffer():e.json())).then((i=>{let s;try{s="pbf"===this._esriServiceOptions.f?t(new Uint8Array(i)).featureCollection:i}catch(e){console.error("Could not parse arcgis buffer. Please check the url you requested.")}e(s)}))}))}_updateFcOnMap(e){const t=this._map.getSource(this.sourceId);t&&t.setData(e)}_doesTileOverlapBbox(t,i){const s=4===t.length?t:e.tileToBBOX(t);return!(s[2]<i[0][0])&&(!(s[0]>i[1][0])&&(!(s[3]<i[0][1])&&!(s[1]>i[1][1])))}_getServiceMetadata(){if(null!==this.serviceMetadata)return Promise.resolve(this.serviceMetadata);const e=new URLSearchParams({f:"json"});return this._appendTokenIfExists(e),this._requestJson(`${this._esriServiceOptions.url}?${e.toString()}`,this._esriServiceOptions.fetchOptions).then((e=>{if(e.error)throw new Error(JSON.stringify(e.error));return this.serviceMetadata=e,this.serviceMetadata}))}getFeaturesByLonLat(e,t,i){i=i||!1,t=t||20;const s=new URLSearchParams({sr:4326,geometryType:"esriGeometryPoint",geometry:JSON.stringify({x:e.lng,y:e.lat,spatialReference:{wkid:4326}}),returnGeometry:i,time:this._time,outFields:"*",spatialRel:"esriSpatialRelIntersects",units:"esriSRUnit_Meter",distance:t,f:"geojson"});return this._appendTokenIfExists(s),new Promise((e=>{this._requestJson(`${this._esriServiceOptions.url}/query?${s.toString()}`,this._esriServiceOptions.fetchOptions).then((t=>e(t)))}))}getFeaturesByObjectIds(e,t){Array.isArray(e)&&(e=e.join(",")),t=t||!1;const i=new URLSearchParams({sr:4326,objectIds:e,returnGeometry:t,outFields:"*",f:"geojson"});return this._appendTokenIfExists(i),new Promise((e=>{this._requestJson(`${this._esriServiceOptions.url}/query?${i.toString()}`,this._esriServiceOptions.fetchOptions).then((t=>e(t)))}))}_projectBounds(){const e=new URLSearchParams({geometries:JSON.stringify({geometryType:"esriGeometryEnvelope",geometries:[this.serviceMetadata.extent]}),inSR:this.serviceMetadata.extent.spatialReference.wkid,outSR:4326,f:"json"});let t={};this._projectionEndpointIsFallback()||(t=this._esriServiceOptions.fetchOptions,this._appendTokenIfExists(e)),this._requestJson(`${this._esriServiceOptions.projectionEndpoint}?${e.toString()}`,t).then((e=>{const t=e.geometries[0];this._maxExtent=[t.xmin,t.ymin,t.xmax,t.ymax]})).catch((e=>{if(this._projectionEndpointIsFallback())throw e;this._esriServiceOptions.projectionEndpoint=this._fallbackProjectionEndpoint,this._projectBounds()}))}_requestJson(e,t){return new Promise(((i,s)=>{fetch(e,t).then((e=>e.json())).then((e=>{"error"in e&&s(new Error("Endpoint doesnt exist")),i(e)})).catch((e=>s(e)))}))}_projectionEndpointIsFallback(){return this._esriServiceOptions.projectionEndpoint===this._fallbackProjectionEndpoint}_setAttribution(){const e='Powered by <a href="https://www.esri.com">Esri</a>',t=this._map._controls.find((e=>"_attribHTML"in e));if(!t)return;const i=t.options.customAttribution;"string"==typeof i?t.options.customAttribution=`${i} | ${e}`:void 0===i?t.options.customAttribution=e:Array.isArray(i)&&-1===i.indexOf(e)&&i.push(e),this._esriServiceOptions.setAttributionFromService&&this.serviceMetadata.copyrightText.length>0&&(this._map.style.sourceCaches[this.sourceId]._source.attribution=this.serviceMetadata.copyrightText),t._updateAttributions()}_appendTokenIfExists(e){const t=this._esriServiceOptions.token;null!==t&&e.append("token",t)}}export{i as default};