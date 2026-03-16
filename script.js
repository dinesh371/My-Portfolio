(() => {

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const p = window.PORTFOLIO
if(!p) return


/* --------------------------
THEME SWITCH
-------------------------- */

const savedTheme = localStorage.getItem("theme")

if(savedTheme){
document.documentElement.setAttribute("data-theme",savedTheme)
}

const themeBtn = $("#themeBtn")

if(themeBtn){
themeBtn.onclick=()=>{
const cur=document.documentElement.getAttribute("data-theme")||"dark"
const next=cur==="dark"?"light":"dark"

document.documentElement.setAttribute("data-theme",next)
localStorage.setItem("theme",next)
}
}


/* --------------------------
ACTIVE NAV LINK
-------------------------- */

const page=(location.pathname.split("/").pop()||"index.html").toLowerCase()

$$(".links a").forEach(a=>{
const href=(a.getAttribute("href")||"").toLowerCase()
a.classList.toggle("active",href===page)
})


/* --------------------------
MOBILE MENU
-------------------------- */

const menuBtn=$("#menuBtn")
const navLinks=$("#navLinks")

if(menuBtn){
menuBtn.onclick=()=>navLinks.classList.toggle("open")
}

document.addEventListener("click",(e)=>{
if(!navLinks?.classList.contains("open"))return
if(!navLinks.contains(e.target)&&!menuBtn.contains(e.target)){
navLinks.classList.remove("open")
}
})


/* --------------------------
HERO IMAGE ROTATION
-------------------------- */

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


/* --------------------------
COMMON FIELD BINDING
-------------------------- */

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


/* --------------------------
TITLE TYPING EFFECT
-------------------------- */

const title=$("#title")

if(title){

const text=p.title||""
let i=0

title.classList.add("typing")

const type=setInterval(()=>{

title.textContent=text.slice(0,i++)

if(i>text.length){
clearInterval(type)
title.classList.remove("typing")
}

},18)

}


/* --------------------------
PROFILE IMAGE
-------------------------- */

const img=$("#profileImg")
const fallback=$("#avatarFallback")

function initials(name){
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


/* --------------------------
COPY EMAIL BUTTON
-------------------------- */

const copy=$("#copyEmail")

if(copy){

copy.onclick=async()=>{

try{

await navigator.clipboard.writeText(p.email)

copy.textContent="Copied ✓"

setTimeout(()=>copy.textContent="Copy Email",1200)

}catch{

alert("Clipboard blocked")

}

}

}


/* --------------------------
ICONS
-------------------------- */

const icons={

shield:`<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v6c0 5-3.4 9-8 10-4.6-1-8-5-8-10V7l8-4Z" stroke="currentColor" stroke-width="1.7"/></svg>`,

cloud:`<svg viewBox="0 0 24 24" fill="none"><path d="M7 12.5c0-2.9 2.1-5.2 5-5.2 2 0 3.7 1.1 4.5 2.8 2 .2 3.5 1.9 3.5 3.9 0 2.2-1.8 4-4 4H9.8C8.2 18 7 16.9 7 15.5v-3Z" stroke="currentColor" stroke-width="1.7"/></svg>`,

network:`<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h10v4H7V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M5 17h6v4H5v-4Z" stroke="currentColor" stroke-width="1.7"/></svg>`

}


/* --------------------------
STATS RENDER
-------------------------- */

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


/* --------------------------
EXPERIENCE RENDER
-------------------------- */

const expWrap=$("#experienceList")

if(expWrap){

expWrap.innerHTML=(p.experience||[]).map(e=>`

<article class="exp reveal">

<div class="expRole">${e.role}</div>

<div class="expCompany">${e.company}</div>

<div class="expPeriod">${e.period}</div>

<ul>

${e.points.map(x=>`<li>${x}</li>`).join("")}

</ul>

</article>

`).join("")

}


/* --------------------------
SKILLS RENDER
-------------------------- */

const skills=$("#skillsGrid")

if(skills){

skills.innerHTML=(p.skills||[]).map(g=>`

<div class="skillGroup reveal">

<div class="sgTitle">${g.group}</div>

${g.items.map(i=>`

<div class="meterRow">

<div class="mName">${i.name}</div>

<div class="mBar">

<div class="mFill" style="width:${i.level}%"></div>

</div>

</div>

`).join("")}

</div>

`).join("")

}


/* --------------------------
SCROLL REVEAL
-------------------------- */

const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add("in")
}
})
},{threshold:.12})

$$(".reveal").forEach(el=>observer.observe(el))


/* --------------------------
COUNT UP STATS
-------------------------- */

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


/* --------------------------
SCROLL TO TOP
-------------------------- */

const topBtn=$("#fabTop")

if(topBtn){

topBtn.onclick=()=>window.scrollTo({
top:0,
behavior:"smooth"
})

}


/* --------------------------
YEAR
-------------------------- */

const year=$("#year")

if(year){
year.textContent=new Date().getFullYear()
}

})()
