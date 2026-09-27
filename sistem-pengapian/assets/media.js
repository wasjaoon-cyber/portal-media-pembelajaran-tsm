
const DB_NAME='MediaPengapianDB', STORE='files';

function openMediaDB(){
 return new Promise((resolve,reject)=>{
  const r=indexedDB.open(DB_NAME,1);
  r.onupgradeneeded=()=>{
   if(!r.result.objectStoreNames.contains(STORE))
    r.result.createObjectStore(STORE,{keyPath:'id',autoIncrement:true});
  };
  r.onsuccess=()=>resolve(r.result);
  r.onerror=()=>reject(r.error);
 });
}
async function saveMedia(file,category,title){
 const db=await openMediaDB();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readwrite');
  tx.objectStore(STORE).add({file,category,title,name:file.name,type:file.type,created:Date.now()});
  tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);
 });
}
async function getAllMedia(){
 const db=await openMediaDB();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readonly'), r=tx.objectStore(STORE).getAll();
  r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);
 });
}
async function deleteMedia(id){
 const db=await openMediaDB();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(id);
  tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);
 });
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function formatBytes(n){if(!n)return'0 B';const u=['B','KB','MB','GB'];const i=Math.min(Math.floor(Math.log(n)/Math.log(1024)),3);return(n/Math.pow(1024,i)).toFixed(i?1:0)+' '+u[i]}

async function renderMedia(category,targetId){
 const box=document.getElementById(targetId); if(!box)return;
 box.innerHTML='<div class="small">Memuat media...</div>';
 try{
  const all=await getAllMedia(), items=all.filter(x=>x.category===category);
  box.innerHTML='';
  if(!items.length){box.innerHTML='<div class="empty">Belum ada media tambahan untuk submateri ini. Upload melalui Editor Media.</div>';return}
  items.forEach(x=>{
   const url=URL.createObjectURL(x.file), d=document.createElement('div');d.className='media-item';
   const media=x.type.startsWith('image/')?`<img src="${url}" alt="${esc(x.name)}">`:
     `<video src="${url}" controls preload="metadata"></video>`;
   d.innerHTML=`<div class="media-title">${esc(x.title)}</div>
    <div class="small">${esc(x.category)}</div>${media}
    <div class="filename">${esc(x.name)}</div>
    <div class="meta">${formatBytes(x.file.size)}</div>`;
   box.appendChild(d);
  });
 }catch(e){
  box.innerHTML='<div class="callout">Media belum dapat dimuat. Pastikan browser mengizinkan IndexedDB untuk file lokal.</div>';
 }
}
