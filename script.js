(() => {

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const p = window.PORTFOLIO
if(!p) return


/* ==========================
PAGE FADE IN
========================== */

document.body.style.opacity=0

window.addEventListener("load",()=>{
document.body.style.transition="opacity .6s ease"
document.body.style.opacity=1
})


/* ==========================
THEME SWITCH
========================== */

const savedTheme = localStorage.getItem("theme")

if(savedTheme){
document.documentElement.setAttribute("data-theme",savedTheme)
}

const themeBtn=$("#themeBtn")

if(themeBtn){
themeBtn.onclick=()=>{
const cur=document.documentElement.getAttribute("data-theme") || "dark"
const next = cur==="dark" ? "light" : "dark"

document.documentElement.setAttribute("data-theme",next)
localStorage.setItem("theme",next)
}
}


/* ==========================
ACTIVE NAV LINK
========================== */

const page=(location.pathname.split("/").pop()||"index.html").toLowerCase()

$$(".links a").forEach(a=>{
const href=(a.getAttribute("href")||"").toLowerCase()
a.classList.toggle("active",href===page)
})


/* ==========================
MOBILE MENU
========================== */

const menuBtn=$("#menuBtn")
const navLinks=$("#navLinks")

if(menuBtn && navLinks){

menuBtn.onclick=()=>navLinks.classList.toggle("open")

document.addEventListener("click",e=>{
if(!navLinks.classList.contains("open")) return
if(!navLinks.contains(e.target) && !menuBtn.contains(e.target)){
navLinks.classList.remove("open")
}
})

}


/* ==========================
HERO IMAGE ROTATION
========================== */

function heroPick(){

const arr=p.heroImages||[]
if(!arr.length) return ""

const d=new Date()
const seed=d.getDate()+d.getMonth()+d.getFullYear()

return arr[seed % arr.length]

}

const hero=heroPick()

if(hero){

const img=new Image()

img.onload=()=>{
document.documentElement.style.setProperty("--heroUrl",`url("${hero}")`)
}

img.src=hero

}


/* ==========================
COMMON DATA BINDING
========================== */

function setText(sel,val){
const el=$(sel)
if(el) el.textContent=val||""
}

function setHref(sel,val){
const el=$(sel)
if(el && val) el.href=val
}

setText("#name",p.name)
setText("#nameFooter",p.name)
setText("#location",p.location)
setText("#tagline",p.tagline)
setText("#summary",p.summary)
setText("#totalExp",p.totalExperience)

setText("#emailText",p.email)
setText("#phoneText",p.phone)

setHref("#linkedinLink",p.linkedin)
setHref("#githubLink",p.github)
setHref("#cvLink",p.cvPath)
setHref("#cvBtn",p.cvPath)

setHref("#emailLink","mailto:"+p.email)


/* ==========================
TITLE TYPING EFFECT
========================== */

const title=$("#title")

if(title){

const text=p.title||""
let i=0

title.classList.add("typing")

const timer=setInterval(()=>{

title.textContent=text.slice(0,i++)

if(i>text.length){
clearInterval(timer)
title.classList.remove("typing")
}

},18)

}


/* ==========================
PROFILE IMAGE
========================== */

const img=$("#profileImg")
const fallback=$("#avatarFallback")

function initials(name){

if(!name) return "TD"

const parts=name.split(" ")
return (parts[0][0]+(parts[1]?.[0]||"")).toUpperCase()

}

if(fallback){
fallback.textContent=initials(p.name)
}

if(img && p.profileImage){

const test=new Image()

test.onload=()=>{
img.src=p.profileImage
img.style.display="block"
fallback.style.display="none"
}

test.onerror=()=>{
img.style.display="none"
}

test.src=p.profileImage

}


/* ==========================
COPY EMAIL
========================== */

const copy=$("#copyEmail")

if(copy){

copy.onclick=async()=>{

try{

await navigator.clipboard.writeText(p.email)

const old=copy.textContent
copy.textContent="Copied ✓"

setTimeout(()=>copy.textContent=old,1200)

}catch{

alert("Clipboard copy blocked")

}

}

}


/* ==========================
STATS RENDER
========================== */

const stats=$("#stats")

if(stats){

stats.innerHTML=(p.stats||[]).map(s=>`

<div class="stat reveal">

<div class="statK">${s.k}</div>

<div class="statV">

<span class="countUp" data-to="${parseInt(s.v)||0}">0</span>

</div>

<div class="statS">${s.s}</div>

</div>

`).join("")

}


/* ==========================
EXPERIENCE RENDER
========================== */

const expWrap=$("#experienceList")

if(expWrap){

expWrap.innerHTML=(p.experience||[]).map(e=>`

<article class="exp reveal" data-search="${(e.role+" "+e.company+" "+(e.tags||[]).join(" ")).toLowerCase()}">

<div class="expRole">${e.role}</div>

<div class="expCompany">${e.company}</div>

<div class="expPeriod">${e.period}</div>

<ul>

${(e.points||[]).map(x=>`<li>${x}</li>`).join("")}

</ul>

</article>

`).join("")

}


/* ==========================
PROJECTS RENDER
========================== */

const proj=$("#projectList")

if(proj){

proj.innerHTML=(p.projects||[]).map(pr=>`

<article class="exp reveal"
data-search="${(pr.title+" "+(pr.stack||[]).join(" ")).toLowerCase()}">

<div class="expRole">${pr.title}</div>

<div class="expPeriod">${pr.period}</div>

<div class="pBlock">

<div class="pLabel">Problem</div>
<div class="pText">${pr.problem}</div>

</div>

<div class="pBlock">

<div class="pLabel">Outcome</div>
<div class="pText">${pr.outcome}</div>

</div>

<div class="tags">

${(pr.stack||[]).map(t=>`<span class="tag">${t}</span>`).join("")}

</div>

</article>

`).join("")

}


/* ==========================
SEARCH FILTER
========================== */

const search=$("#searchBox")

if(search){

search.oninput=()=>{

const q=search.value.toLowerCase()

$$("[data-search]").forEach(el=>{

const hay=el.dataset.search||""

el.style.display=hay.includes(q)?"":"none"

})

}

}


/* ==========================
SCROLL REVEAL
========================== */

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("in")
observer.unobserve(entry.target)
}
})
},{threshold:0.15})

$$(".reveal").forEach(el=>observer.observe(el))


/* ==========================
COUNT UP STATS
========================== */

$$(".countUp").forEach(el=>{

const to=parseInt(el.dataset.to||0)
let start=0

const step=()=>{

start+=Math.ceil(to/20)

if(start>to) start=to

el.textContent=start

if(start<to) requestAnimationFrame(step)

}

step()

})


/* ==========================
CARD TILT EFFECT
========================== */

$$(".card,.infra-card,.security-card,.ops-card").forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect()

const x=e.clientX-rect.left
const y=e.clientY-rect.top

const centerX=rect.width/2
const centerY=rect.height/2

const rotateX=(y-centerY)/12
const rotateY=(centerX-x)/12

card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

})

card.addEventListener("mouseleave",()=>{
card.style.transform="rotateX(0) rotateY(0)"
})

})


/* ==========================
CURSOR GLOW
========================== */

const cursor=document.createElement("div")
cursor.className="cursorGlow"
document.body.appendChild(cursor)

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
})


/* ==========================
TOPBAR SCROLL EFFECT
========================== */

const topbar=document.querySelector(".topbar")

window.addEventListener("scroll",()=>{

if(window.scrollY>40){
topbar.classList.add("scrolled")
}else{
topbar.classList.remove("scrolled")
}

})


/* ==========================
SCROLL TO TOP
========================== */

const topBtn=$("#fabTop")

if(topBtn){
topBtn.onclick=()=>window.scrollTo({top:0,behavior:"smooth"})
}


/* ==========================
YEAR
========================== */

const year=$("#year")
if(year) year.textContent=new Date().getFullYear()

})()
