(() => {

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

/* ==========================
PAGE FADE
========================== */

document.body.style.opacity=0

window.addEventListener("load",()=>{
document.body.style.transition="opacity .6s ease"
document.body.style.opacity=1
})

/* ==========================
NAV ACTIVE
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
SCROLL REVEAL
========================== */

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("in")
observer.unobserve(entry.target)
}
})
},{threshold:.15})

$$(".reveal").forEach(el=>observer.observe(el))

/* ==========================
COUNT STATS
========================== */

$$(".countUp").forEach(el=>{

const to=parseInt(el.dataset.to||0)
let start=0

function step(){

start+=Math.ceil(to/20)

if(start>to) start=to

el.textContent=start

if(start<to) requestAnimationFrame(step)

}

step()

})

/* ==========================
CARD TILT
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
card.style.transform=""
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
TOPBAR SCROLL
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
NETWORK TOPOLOGY
========================== */

const canvas=document.getElementById("networkCanvas")

if(canvas){

const ctx=canvas.getContext("2d")

function resize(){
canvas.width=canvas.offsetWidth
canvas.height=canvas.offsetHeight
}

resize()
window.addEventListener("resize",resize)

const nodes=[...document.querySelectorAll(".networkMap .node")]

let packetOffset=0

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

const core=document.querySelector(".node.core")

if(!core) return

const parent=canvas.getBoundingClientRect()

const coreRect=core.getBoundingClientRect()

const cx=coreRect.left-parent.left+coreRect.width/2
const cy=coreRect.top-parent.top+coreRect.height/2

nodes.forEach(n=>{

if(n===core) return

const rect=n.getBoundingClientRect()

const x=rect.left-parent.left+rect.width/2
const y=rect.top-parent.top+rect.height/2

ctx.beginPath()
ctx.moveTo(cx,cy)
ctx.lineTo(x,y)

ctx.strokeStyle="rgba(124,92,255,.45)"
ctx.lineWidth=1.5
ctx.stroke()

const dx=x-cx
const dy=y-cy

const px=cx+dx*(packetOffset%100)/100
const py=cy+dy*(packetOffset%100)/100

ctx.beginPath()
ctx.arc(px,py,3,0,Math.PI*2)

ctx.fillStyle="#2ee9a6"
ctx.fill()

})

packetOffset+=1

requestAnimationFrame(draw)

}

draw()

}

/* ==========================
SCROLL TOP
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
