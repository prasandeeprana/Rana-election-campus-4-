// Smooth anchor navigation + reveal animations + countdown to 3 October 2026.
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const target = new Date('2026-10-03T00:00:00+05:30').getTime();
const updateCountdown = ()=>{
  const diff = target - Date.now();
  const values = diff > 0 ? {
    days: Math.floor(diff/86400000),
    hours: Math.floor((diff%86400000)/3600000),
    minutes: Math.floor((diff%3600000)/60000),
    seconds: Math.floor((diff%60000)/1000)
  } : {days:0,hours:0,minutes:0,seconds:0};
  Object.entries(values).forEach(([key,val])=>{
    const el=document.getElementById(key);
    if(el) el.textContent=String(val).padStart(2,'0');
  });
};
updateCountdown();
setInterval(updateCountdown,1000);
