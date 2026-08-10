(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  const skills=[['Team Leadership','🧑\u200d💼',90],['Okta / IAM','🔐',92],['Active Directory','🗂️',90],['Firewall Management','🔥',84],['Microsoft 365','🟦',95],['Google Workspace','📇',88],['Azure','☁️',85],['NinjaOne','💾',92],['CrowdStrike EDR','🦅',85],['Webroot','🛡️',82],['Jira / ITSM','🎫',92],['Change Management','🔁',90],['PRTG Monitoring','📡',82],['Proxmox','🧱',80],['Snipe-IT','🏷️',80],['Matrix & COSEC','🚪',78],['RingCentral','☎️',82],['Zoom','🎥',82],['KnowBe4','📚',80],['Wrike','🗒️',78],['TeamViewer','🖱️',80],['greytHR / ADP','🧾',78],['SOC Audit & Compliance','🔍',88]];
  const sg=document.getElementById('skillsGrid');
  skills.forEach(([nm,ic,lvl])=>{const d=document.createElement('div');d.className='skill reveal';d.innerHTML='<div class="ic">'+ic+'</div><div class="nm">'+nm+'</div><div class="bar"><i data-lvl="'+lvl+'"></i></div>';sg.appendChild(d);});

  const projects=[
    ['Okta IAM & SSO Rollout','🔐','Identity','Centralized identity across every enterprise application and enforced org-wide MFA, cutting access-review overhead and closing a long-standing audit gap.',['Okta','SSO','MFA'],[['100%','MFA coverage'],['↓60%','access tickets']],true],
    ['NinjaOne Endpoint Automation','💾','Endpoint','Brought 500+ endpoints under automated, real-time patch compliance with zero-day remediation and standardized provisioning.',['NinjaOne','Automation'],[['500+','endpoints'],['↑98%','patch compliance']],false],
    ['ITSM & Change Management','🔁','ITSM','Stood up structured change control, approvals, and SLA reporting in Jira for the whole IT function — the backbone leadership now reports from.',['Jira','ITSM','Change'],[['10K+','tickets'],['SLA','discipline']],false],
    ['Ruckus Wi-Fi Deployment','📡','Network','Segmented and stabilized wireless across sites with VLAN isolation and secure SSIDs, eliminating recurring connectivity complaints.',['Ruckus','VLAN'],[['Multi-site','coverage'],['VLAN','isolation']],false],
    ['M365 & Azure Administration','☁️','Cloud','Full user lifecycle, security policy, and collaboration platform management at scale across a hybrid on-prem/cloud identity model.',['M365','Azure','Entra'],[['99.9%','uptime'],['JML','lifecycle']],false],
    ['SOC Audit Enablement','🛡️','Compliance','Delivered IAM logs, endpoint evidence, and compliance reporting that took the org through security audits without critical findings.',['SOC','Compliance'],[['Audit','ready'],['Evidence','pipeline']],false]
  ];
  const pg=document.getElementById('projGrid');
  projects.forEach(([t,g,cat,d,tags,metrics,featured])=>{const el=document.createElement('div');el.className='glass-card project reveal'+(featured?' featured':'');el.innerHTML='<div class="preview"><span class="proj-cat">'+cat+'</span>'+(featured?'<span class="proj-featured-tag">Featured</span>':'')+'<div class="proj-badge">'+g+'</div><div class="pv-tags">'+tags.map(x=>'<span>'+x+'</span>').join('')+'</div></div><div class="pbody"><h3>'+t+'</h3><p class="pdesc">'+d+'</p><div class="metrics">'+metrics.map(m=>'<div class="metric"><div class="mn">'+m[0]+'</div><div class="ml">'+m[1]+'</div></div>').join('')+'</div></div>';pg.appendChild(el);});

  const services=[['Identity & Access','🔐','Okta SSO/MFA, Active Directory, RBAC, and Zero Trust — the right access for the right people.'],['Endpoint & Patch','💾','NinjaOne, Intune, Sophos & Webroot — compliance, monitoring, and zero-day remediation.'],['Cloud & Collaboration','☁️','Microsoft 365, Azure/Entra, and Google Workspace administration across the user lifecycle.'],['ITSM & Change Mgmt','🔁','Jira change control, approvals, incident lifecycle, SLAs, and leadership reporting.'],['Network & Security','🌐','Ruckus Wi-Fi, multi-site LAN, firewall administration, and PRTG monitoring — stable, secure connectivity.'],['Backup & DR','🧯','Resilient backup strategy and disaster-recovery readiness for business continuity.']];
  const svg=document.getElementById('servGrid');
  services.forEach(([t,ic,d])=>{const el=document.createElement('div');el.className='glass-card service reveal';el.innerHTML='<div class="ic">'+ic+'</div><h3>'+t+'</h3><p>'+d+'</p>';svg.appendChild(el);});

  const certs=[['Azure Administrator Associate (AZ-104)','MICROSOFT','Certified','☁️'],['Azure Fundamentals (AZ-900)','MICROSOFT','Certified','🌩️'],['Microsoft Certified Professional (MCP)','MICROSOFT','Certified','🏅'],['MTA: Windows Server Administration','MICROSOFT','Certified','🖥️'],['Microsoft 365 Administration','MICROSOFT','Certified','🟦'],['RingCentral Certified Professional','RINGCENTRAL','Issued 2024','☎️']];
  const cg=document.getElementById('certGrid');
  certs.forEach(([n,i,m,ic])=>{const el=document.createElement('div');el.className='glass-card cert reveal';el.innerHTML='<div class="badge">'+ic+'</div><h3>'+n+'</h3><div class="issuer">'+i+'</div><div class="meta">'+m+'</div>';cg.appendChild(el);});

  const revObs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');var bars=e.target.querySelectorAll?e.target.querySelectorAll('.bar i'):[];bars.forEach(function(b){b.style.width=b.dataset.lvl+'%';});revObs.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){revObs.observe(el);});

  const cObs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);cObs.unobserve(e.target);}});},{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cObs.observe(el);});
  function count(el){var t=parseFloat(el.dataset.count),suf=el.dataset.suffix||'',dec=String(t).indexOf('.')>-1,c=0,step=t/45;(function tick(){c+=step;if(c>=t){el.textContent=(dec?t.toFixed(1):t)+suf;return;}el.textContent=(dec?c.toFixed(1):Math.floor(c))+suf;requestAnimationFrame(tick);})();}

  var items=[].slice.call(document.querySelectorAll('#rotator .r-item')),ri=0;
  if(!reduce)setInterval(function(){items[ri].classList.remove('on');items[ri].classList.add('off');var prev=ri;ri=(ri+1)%items.length;setTimeout(function(){items[prev].classList.remove('off');},500);items[ri].classList.add('on');},2600);

  var typedEl=document.getElementById('typed');
  var txt="I design and run enterprise IT that stays secure, compliant, and always on — identity, endpoints, cloud, and the ITSM discipline behind it all.";
  if(reduce){typedEl.textContent=txt;}else{var i=0;(function type(){if(i<=txt.length){typedEl.textContent=txt.slice(0,i);i++;setTimeout(type,26);}})();}

  if(fine && !reduce){
    document.body.classList.add('cursor-on');
    var dot=document.getElementById('cDot'),ring=document.getElementById('cRing'),spot=document.getElementById('spot');
    var rx=innerWidth/2,ry=innerHeight/2,tx=rx,ty=ry;
    addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';spot.style.left=e.clientX+'px';spot.style.top=e.clientY+'px';spot.style.opacity='1';});
    (function loop(){rx+=(tx-rx)*.18;ry+=(ty-ry)*.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
    document.querySelectorAll('a,button,.skill,.glass-card,.channel').forEach(function(el){el.addEventListener('mouseenter',function(){ring.classList.add('hover');});el.addEventListener('mouseleave',function(){ring.classList.remove('hover');});});
    document.querySelectorAll('[data-mag]').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)';});b.addEventListener('mouseleave',function(){b.style.transform='translate(0,0)';});});
    var av=document.getElementById('avatar'),avw=av.closest('.avatar-wrap');
    avw.addEventListener('mousemove',function(e){var r=av.getBoundingClientRect();av.style.transform='rotateY('+((e.clientX-r.left)/r.width-.5)*16+'deg) rotateX('+(-((e.clientY-r.top)/r.height-.5)*16)+'deg)';});
    avw.addEventListener('mouseleave',function(){av.style.transform='rotateY(0) rotateX(0)';});
  }

  var cv=document.getElementById('net');
  if(!reduce){var ctx=cv.getContext('2d'),W,H,pts;
    function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;var n=Math.min(70,Math.floor(W*H/22000));pts=[];for(var k=0;k<n;k++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});}
    size();addEventListener('resize',size);
    (function draw(){ctx.clearRect(0,0,W,H);for(var a=0;a<pts.length;a++){var p=pts[a];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.fillStyle='rgba(6,182,212,.7)';ctx.beginPath();ctx.arc(p.x,p.y,1.4,0,7);ctx.fill();for(var b=a+1;b<pts.length;b++){var q=pts[b],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);if(d<130){ctx.strokeStyle='rgba(124,58,237,'+(.14*(1-d/130))+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}}requestAnimationFrame(draw);})();}

  var prog=document.getElementById('progress'),topBtn=document.getElementById('topBtn');
  addEventListener('scroll',function(){var st=scrollY,h=document.body.scrollHeight-innerHeight;prog.style.width=(st/h*100)+'%';topBtn.classList.toggle('show',st>500);});
  topBtn.onclick=function(){scrollTo({top:0,behavior:'smooth'});};
  var navA=[].slice.call(document.querySelectorAll('.navlinks a'));
  var secs=navA.map(function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);
  var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){navA.forEach(function(a){a.classList.remove('active');});var l=document.querySelector('.navlinks a[href="#'+e.target.id+'"]');if(l)l.classList.add('active');}});},{rootMargin:'-45% 0px -45% 0px'});
  secs.forEach(function(s){spy.observe(s);});

  var tb=document.getElementById('themeBtn');
  tb.onclick=function(){document.body.classList.toggle('light');var lt=document.body.classList.contains('light');tb.textContent=lt?'☀️':'🌙';document.querySelector('meta[name=theme-color]').content=lt?'#f6f3ec':'#0A0E13';};

  var mm=document.getElementById('mobileMenu');
  document.getElementById('burger').onclick=function(){mm.classList.add('open');};
  document.getElementById('menuClose').onclick=function(){mm.classList.remove('open');};
  mm.querySelectorAll('a').forEach(function(a){a.onclick=function(){mm.classList.remove('open');};});

  var vid=document.getElementById('introVideo'),poster=document.getElementById('videoPoster'),playBtn=document.getElementById('playBtn'),note=document.getElementById('videoNote');
  playBtn.onclick=function(){vid.play().then(function(){poster.style.display='none';playBtn.style.display='none';note.style.display='none';vid.setAttribute('controls','');}).catch(function(){note.textContent='No intro.mp4 found yet — add it to /assets to enable playback.';note.style.color='#EC4899';});};
  vid.addEventListener('error',function(){note.textContent='No intro.mp4 found yet — add it to /assets to enable playback.';});

  document.getElementById('sendBtn').onclick=function(){var n=fName.value||'',e=fEmail.value||'',p=fPhone.value||'',c=fCompany.value||'',m=fMsg.value||'';var body='Name: '+n+'%0D%0AEmail: '+e+'%0D%0APhone: '+p+'%0D%0ACompany: '+c+'%0D%0A%0D%0A'+m;location.href='mailto:dineshtankala85@outlook.com?subject=Portfolio enquiry from '+encodeURIComponent(n)+'&body='+body;};
})();
