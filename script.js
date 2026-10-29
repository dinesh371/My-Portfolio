/* typing effect */
(function(){
  const words=["network security","endpoint security","identity & access (Okta)","ITSM & change management","business continuity","cloud & SaaS"];
  const el=document.getElementById("type");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){el.textContent=words[0];return}
  let w=0,i=0,del=false;
  (function step(){
    const word=words[w];el.textContent=word.slice(0,i);
    if(!del&&i<word.length){i++;setTimeout(step,60)}
    else if(!del){del=true;setTimeout(step,1700)}
    else if(i>0){i--;setTimeout(step,30)}
    else{del=false;w=(w+1)%words.length;setTimeout(step,300)}
  })();
})();

/* mobile menu */
(function(){
  const btn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
  btn.addEventListener("click",()=>{const o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");btn.setAttribute("aria-expanded","false")}));
})();

/* clock, year, back to top */
function tick(){document.getElementById("clock").textContent=new Date().toLocaleTimeString("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",hour12:true})}
tick();setInterval(tick,30000);
document.getElementById("yr").textContent=new Date().getFullYear();
const toTop=document.getElementById("toTop");
addEventListener("scroll",()=>toTop.classList.toggle("show",scrollY>700),{passive:true});

/* reveal on scroll */
(function(){
  const els=document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("in"));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
  els.forEach(e=>io.observe(e));
})();

/* active nav link */
(function(){
  const links=[...document.querySelectorAll("nav a")];
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
  document.querySelectorAll("section[id]").forEach(s=>io.observe(s));
})();
