(()=>{
  const grid=document.querySelector('#grid');
  if(!grid)return;
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeRelativePath=value=>{
    const path=String(value||'').replace(/\\/g,'/');
    return path&&!path.startsWith('/')&&!path.includes('..')&&!/^[a-z]+:/i.test(path)?path:'';
  };
  let last='';
  async function show(){
    try{
      const data=await window.KosmosPackage.load();
      const starterIds=new Set(['clock','notes','focus','links','timeline']),source=data?.plugins||[],byId=new Map(),localIds=new Set();
      let local=[];
      try{local=JSON.parse(localStorage.getItem('shiji-plugins-v1')||'[]')}catch{}
      for(const item of local)if(item?.id)localIds.add(String(item.id));
      for(const item of source)if(item?.id)byId.set(String(item.id),item);
      const list=[...byId.values()].filter(item=>!localIds.has(String(item.id))&&!starterIds.has(String(item.id)));
      const key=JSON.stringify(list);
      if(key===last&&grid.querySelector('[data-shared-card]'))return;
      last=key;
      grid.querySelectorAll('[data-shared-card]').forEach(n=>n.remove());
      const html=list.map((p,i)=>{
        let body='';
        const url=safeRelativePath(p.localUrl||p.asset);
        const type=String(p.mediaType||'').toLowerCase();
        if(url&&type.startsWith('image/'))body=`<img src="${esc(url)}" alt="${esc(p.name)}" style="width:100%;max-height:220px;object-fit:contain">`;
        else if(url&&type.startsWith('video/'))body=`<video src="${esc(url)}" controls style="width:100%"></video>`;
        else if(url&&type.startsWith('audio/'))body=`<audio src="${esc(url)}" controls style="width:100%"></audio>`;
        else if(url&&type==='application/pdf')body=`<iframe src="${esc(url)}" title="${esc(p.name)}" style="width:100%;height:260px;border:0;border-radius:10px"></iframe>`;
        else if(url)body=`<a href="${esc(url)}" target="_blank" rel="noopener">Datei im neuen Tab öffnen</a>`;
        else if(p.kind==='local-text')body=`<div style="white-space:pre-wrap">${esc(p.content)}</div>`;
        else if(p.kind==='timeline')body=`<div>${(p.timeline||[]).map(x=>`<span style="margin:4px;padding:5px 9px;background:#eee;border-radius:12px;display:inline-block">${esc(x.label)}</span>`).join('')}</div>`;
        else if(p.kind==='external'){
          try{const link=new URL(p.url,location.href);if(['http:','https:'].includes(link.protocol))body=`<a href="${esc(link.href)}" target="_blank" rel="noopener">Webseite öffnen ↗</a>`}catch{}
        }
        return `<article class="card" data-shared-card="${i}"><div class="card-head"><div class="plugin-icon">✦</div></div><h3>${esc(p.name)}</h3><p>${esc(p.desc||'Geteilter Projektinhalt')}</p>${body}<div class="card-foot"><span class="tag">Geteiltes Projekt</span></div></article>`;
      }).join('');
      grid.insertAdjacentHTML('beforeend',html);
    }catch{}
  }
  const obs=new MutationObserver(()=>show());
  obs.observe(grid,{childList:true});
  show();
})();
