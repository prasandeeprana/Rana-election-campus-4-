const bar=document.getElementById("progressBar");
const topBtn=document.getElementById("top");
const updateScroll=()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  bar.style.width=(h>0?(scrollY/h)*100:0)+"%";
  topBtn.classList.toggle("show",scrollY>500);
};
addEventListener("scroll",updateScroll,{passive:true}); updateScroll();
topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");});
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

const target=new Date("2026-10-03T00:00:00+05:30").getTime();
const tick=()=>{
  let d=target-Date.now(); if(d<0)d=0;
  const vals={days:Math.floor(d/86400000),hours:Math.floor(d%86400000/3600000),minutes:Math.floor(d%3600000/60000),seconds:Math.floor(d%60000/1000)};
  for(const [k,v] of Object.entries(vals)){const el=document.getElementById(k);if(el)el.textContent=String(v).padStart(2,"0");}
};
tick();setInterval(tick,1000);

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const t=document.querySelector(a.getAttribute("href")); if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"});}
}));
