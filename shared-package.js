(()=>{
  const DB_NAMES=['physik-project-pages','physik-local-media'];
  const DB_VERSION=1;
  const openDb=name=>new Promise((resolve,reject)=>{const r=indexedDB.open(name,DB_VERSION);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('files'))d.createObjectStore('files',{keyPath:'id'});if(!d.objectStoreNames.contains('settings'))d.createObjectStore('settings',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
  async function allFiles(name){try{const d=await openDb(name);return await new Promise((resolve,reject)=>{const r=d.transaction('files','readonly').objectStore('files').getAll();r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>reject(r.error)})}catch{return[]}}
  async function setting(name,id){try{const d=await openDb(name);return await new Promise((resolve,reject)=>{const r=d.transaction('settings','readonly').objectStore('settings').get(id);r.onsuccess=()=>resolve(r.result?.value??null);r.onerror=()=>reject(r.error)})}catch{return null}}
  async function oldPackage(){try{const r=await fetch('./shared-content.json',{cache:'no-store'});return r.ok?await r.json():null}catch{return null}}
  const safe=s=>String(s||'datei').normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(-80)||'datei';
  function crc32(bytes){let c=0xffffffff;for(const b of bytes){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
  function u16(n){return new Uint8Array([n&255,(n>>>8)&255])}function u32(n){return new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255])}
  function zip(entries){const local=[],central=[];let offset=0;for(const e of entries){const name=new TextEncoder().encode(e.name),data=e.data,crc=crc32(data);const head=[u32(0x04034b50),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),name,data];local.push(...head);const c=[u32(0x02014b50),u16(20),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(offset),name];central.push(...c);offset+=head.reduce((n,x)=>n+x.length,0)}const cdSize=central.reduce((n,x)=>n+x.length,0),end=[u32(0x06054b50),u16(0),u16(0),u16(entries.length),u16(entries.length),u32(cdSize),u32(offset),u16(0)];return new Blob([...local,...central,...end],{type:'application/zip'})}
  async function exportPackage(){
    const prior=await oldPackage(),assets=new Map(),files=[...(await allFiles(DB_NAMES[0])),...(await allFiles(DB_NAMES[1]))];
    async function addFile(file,id,prefix){if(!file)return null;const path=`media/${safe(prefix)}-${safe(file.name)}`;assets.set(path,new Uint8Array(await file.blob.arrayBuffer()));return path}
    const videosLocal=await setting(DB_NAMES[0],'video-gallery')||[],slidesLocal=await setting(DB_NAMES[0],'presentation-slides')||[],introLocal=await setting(DB_NAMES[0],'presentation-intro')||{};
    const byId=new Map(files.map(f=>[f.id,f]));
    const videos=[...(prior?.videos||[])];for(const v of videosLocal){const f=byId.get(v.mediaId);const asset=await addFile(f,v.mediaId,'video');if(asset)videos.push({id:v.mediaId,title:v.title,description:v.description||'',asset})}
    const priorSlides=prior?.presentation?.slides||[],slides=[...priorSlides];for(const s of slidesLocal){const f=byId.get(s.mediaId);const asset=await addFile(f,s.mediaId,'slide');if(asset)slides.push({id:s.id,title:s.title,caption:s.caption||'',asset})}
    const plugins=Array.isArray(prior?.plugins)?prior.plugins:[];let localPlugins=[];try{localPlugins=JSON.parse(localStorage.getItem('shiji-plugins-v1')||'[]')}catch{}
    const homeFiles=await allFiles(DB_NAMES[1]),homeMap=new Map(homeFiles.map(f=>[f.id,f]));
    for(const p of localPlugins){const copy={...p};if(copy.mediaId){const f=homeMap.get(copy.mediaId);const asset=await addFile(f,copy.mediaId,'plugin');if(asset){copy.asset=asset;copy.mediaType=f.type;delete copy.mediaId}}plugins.push(copy)}
    const manifest={version:1,generatedAt:new Date().toISOString(),plugins,videos,presentation:{title:introLocal.title||prior?.presentation?.title||'Die Ordnung des Kosmos',description:introLocal.description||prior?.presentation?.description||'',slides}};
    for(const path of [...new Set([...(prior?.videos||[]).map(x=>x.asset),...priorSlides.map(x=>x.asset),...(prior?.plugins||[]).map(x=>x.asset)].filter(Boolean))]){if(assets.has(path))continue;try{const r=await fetch('./'+path);if(r.ok)assets.set(path,new Uint8Array(await r.arrayBuffer()))}catch{}}
    const enc=new TextEncoder(),entries=[{name:'shared-content.json',data:enc.encode(JSON.stringify(manifest,null,2))},...Array.from(assets,([name,data])=>({name,data}))];const blob=zip(entries),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='kosmos-shared-package.zip';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000);
  }
  async function load(){return oldPackage()}
  window.KosmosPackage={export:exportPackage,load};
})();
