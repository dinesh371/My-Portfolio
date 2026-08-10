(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- DATA ---------------- */
  const skillCats = [
    ['Leadership & Identity', [['Team Leadership','🧑\u200d💼'],['Okta / IAM','🔐'],['Active Directory','🗂️']]],
    ['Endpoint & Network', [['NinjaOne','💾'],['CrowdStrike EDR','🦅'],['Webroot','🛡️'],['Firewall Mgmt','🔥'],['PRTG Monitoring','📡']]],
    ['Cloud & SaaS', [['Microsoft 365','🟦'],['Google Workspace','📇'],['Azure','☁️'],['RingCentral','☎️'],['Zoom','🎥'],['KnowBe4','📚']]],
    ['ITSM & Ops', [['Jira / ITSM','🎫'],['Change Management','🔁'],['Proxmox','🧱'],['Snipe-IT','🏷️'],['Matrix & COSEC','🚪']]],
    ['Governance', [['SOC Audit & Compliance','🔍'],['greytHR / ADP','🧾'],['Wrike','🗒️'],['TeamViewer','🖱️']]]
  ];

  const experience = [
    {role:'Team Lead – IT Infrastructure & Operations', org:'Pro-Vigil Surveillance Services', time:'Sep 2023 — Present', current:true,
      items:[
        'Lead day-to-day IT operations across endpoint security, cloud/SaaS, IAM, ITSM, networks, monitoring, virtualization, and asset management.',
        'Own end-to-end ITSM & change management in Jira: change control, approvals, incident lifecycle, leadership reporting.',
        'Manage IAM (Okta SSO/MFA, Active Directory) and endpoint security across 500+ machines with NinjaOne, CrowdStrike EDR, Webroot.',
        'Run multi-site network ops (Vizag, Hyderabad, HQ, SOC) with PRTG monitoring, firewall administration, Proxmox virtualization.',
        'Coordinate US/India onboarding-offboarding, manage IT assets via Snipe-IT, and extend SOC audit support to cloud/SaaS apps.'
      ]},
    {role:'System Support Specialist', org:'Dynata', time:'Dec 2021 — Sep 2023', current:false,
      items:[
        'Delivered L2/L3 support for Windows servers, desktops, and business apps across a global user base.',
        'Managed incidents through Jira within SLA and escalation timelines.',
        'Supported onboarding/offboarding, endpoint provisioning, and audit readiness.'
      ]},
    {role:'Technical Engineer', org:'HBL Power Systems Ltd.', time:'Jan 2021 — Dec 2021', current:false,
      items:[
        'Supported server, network, and firewall operations; installed and maintained routers, switches, structured cabling.'
      ]},
    {role:'Earlier Experience', org:'Piramal Swasthya · Progressive Infovision · Pioneer Elba\'s', time:'2017 — 2021', current:false,
      items:[
        'IT Support Executive, IT Support Engineer, and Network Engineer (NOC) roles across enterprise support and field operations.'
      ]}
  ];

  const projects = [
    ['Okta IAM & SSO Rollout','Identity','Centralized identity across every enterprise application and enforced org-wide MFA, closing a long-standing audit gap.',[['100%','MFA coverage'],['↓60%','access tickets']]],
    ['NinjaOne Endpoint Automation','Endpoint','Brought 500+ endpoints under automated, real-time patch compliance with zero-day remediation.',[['500+','endpoints'],['↑98%','patch compliance']]],
    ['ITSM & Change Management','ITSM','Stood up structured change control, approvals, and SLA reporting in Jira for the whole IT function.',[['10K+','tickets'],['SLA','discipline']]],
    ['M365 & Azure Administration','Cloud','Full user lifecycle, security policy, and collaboration platform management across a hybrid identity model.',[['99.9%','uptime'],['JML','lifecycle']]]
  ];

  const certs = [
    ['☁️','Azure Administrator Associate (AZ-104)','Microsoft'],
    ['🌩️','Azure Fundamentals (AZ-900)','Microsoft'],
    ['🏅','Microsoft Certified Professional (MCP)','Microsoft'],
    ['🖥️','MTA: Windows Server Administration','Microsoft'],
    ['🟦','Microsoft 365 Administration','Microsoft'],
    ['☎️','RingCentral Certified Professional','RingCentral · 2024']
  ];

  /* ---------------- BOOT SEQUENCE ---------------- */
  const bootLines = [
    'DineshOS v3.0 — initializing kernel...  [ OK ]',
    'Mounting identity module (Okta / Active Directory)...  [ OK ]',
    'Starting endpoint protection (NinjaOne, CrowdStrike, Webroot)...  [ OK ]',
    'Loading ITSM services (Jira change control)...  [ OK ]',
    'Checking network interfaces (Vizag · Hyderabad · HQ · SOC)...  [ OK ]',
    'Verifying SOC compliance & audit evidence...  [ OK ]',
    'System ready. Welcome, Dinesh Tankala.'
  ];
  const bootEl = document.getElementById('bootLines');
  const bootBar = document.getElementById('bootBar');
  const bootScreen = document.getElementById('boot');

  function runBoot(){
    if(reduce){ bootScreen.classList.add('gone'); return; }
    let i = 0;
    function next(){
      if(i >= bootLines.length){
        setTimeout(()=>bootScreen.classList.add('gone'), 400);
        return;
      }
      const line = document.createElement('div');
      line.className = 'ln';
      const text = bootLines[i];
      line.innerHTML = text.replace('[ OK ]','<span class="ok">[ OK ]</span>');
      bootEl.appendChild(line);
      i++;
      bootBar.style.width = Math.round((i/bootLines.length)*100)+'%';
      setTimeout(next, 260);
    }
    next();
  }
  runBoot();

  /* ---------------- CLOCK ---------------- */
  function tick(){
    const now = new Date();
    const s = now.toLocaleTimeString('en-US',{hour12:false});
    const c1 = document.getElementById('clock');
    const c2 = document.getElementById('clockSmall');
    if(c1) c1.textContent = s;
    if(c2) c2.textContent = s;
  }
  tick(); setInterval(tick, 1000);

  /* ---------------- WINDOW MANAGER ---------------- */
  const windowsLayer = document.getElementById('windows');
  const taskbarTabs = document.getElementById('taskbarTabs');
  const openWins = {};
  let zTop = 10;

  const appTitles = {
    about:'About.txt', skills:'Skills.app', experience:'Experience.log',
    projects:'Projects.dir', certs:'Certifications.lic', contact:'Contact.sh', firewall:'Firewall.sys'
  };

  function populateWindow(app, root){
    if(app === 'skills'){
      const box = root.querySelector('#skillsCats');
      skillCats.forEach(([cat, items])=>{
        const wrap = document.createElement('div');
        const title = document.createElement('div');
        title.className = 'skill-cat-title'; title.textContent = cat;
        const row = document.createElement('div'); row.className = 'skill-chip-row';
        items.forEach(([name, ic])=>{
          const chip = document.createElement('span'); chip.className = 'skill-chip';
          chip.innerHTML = '<span>'+ic+'</span><span>'+name+'</span>';
          row.appendChild(chip);
        });
        wrap.appendChild(title); wrap.appendChild(row);
        box.appendChild(wrap);
      });
    }
    if(app === 'experience'){
      const box = root.querySelector('#expLog');
      experience.forEach(e=>{
        const entry = document.createElement('div');
        entry.className = 'exp-entry' + (e.current ? '' : ' past');
        entry.innerHTML =
          '<div class="exp-role">'+e.role+'</div>'+
          '<div class="exp-org">'+e.org+'</div>'+
          '<div class="exp-time">'+e.time+'</div>'+
          '<ul>'+e.items.map(i=>'<li>'+i+'</li>').join('')+'</ul>';
        box.appendChild(entry);
      });
    }
    if(app === 'projects'){
      const box = root.querySelector('#projGrid');
      projects.forEach(([name, tag, desc, metrics])=>{
        const card = document.createElement('div'); card.className = 'proj-card'; card.dataset.tag = tag;
        card.innerHTML =
          '<div class="proj-top"><span class="proj-name">'+name+'</span><span class="proj-tag">'+tag+'</span></div>'+
          '<div class="proj-desc">'+desc+'</div>'+
          '<div class="proj-metrics">'+metrics.map(m=>'<div class="m"><div class="n">'+m[0]+'</div><div class="l">'+m[1]+'</div></div>').join('')+'</div>';
        box.appendChild(card);
      });
    }
    if(app === 'certs'){
      const box = root.querySelector('#certList');
      certs.forEach(([ic, name, issuer])=>{
        const row = document.createElement('div'); row.className = 'cert-row';
        row.innerHTML = '<span class="cert-ic">'+ic+'</span><div><div class="cert-name">'+name+'</div><div class="cert-issuer">'+issuer+'</div></div>';
        box.appendChild(row);
      });
    }
    if(app === 'firewall'){
      const box = root.querySelector('#fwGrid');
      const stats = [['4','Sites protected'],['Ruckus + PRTG','Monitoring stack'],['Jira','Change control'],['24/7','Policy enforcement']];
      stats.forEach(([n,l])=>{
        const el = document.createElement('div'); el.className = 'fw-stat';
        el.innerHTML = '<div class="n">'+n+'</div><div class="l">'+l+'</div>';
        box.appendChild(el);
      });
    }
  }

  function bringToFront(win){
    zTop += 1;
    win.style.zIndex = zTop;
  }

  function setActiveTab(app){
    document.querySelectorAll('.taskbar-tab').forEach(t=>t.classList.remove('active'));
    const tab = document.querySelector('.taskbar-tab[data-app="'+app+'"]');
    if(tab) tab.classList.add('active');
  }

  function openApp(app){
    if(openWins[app]){
      const w = openWins[app];
      w.classList.remove('minimized');
      w.classList.add('open');
      bringToFront(w);
      setActiveTab(app);
      return;
    }
    const tpl = document.getElementById('tpl-'+app);
    if(!tpl) return;

    const win = document.createElement('div');
    win.className = 'win';
    win.dataset.app = app;

    const offset = Object.keys(openWins).length * 26;
    win.style.left = (60 + offset) + 'px';
    win.style.top = (72 + offset) + 'px';

    win.innerHTML =
      '<div class="win-head">'+
        '<div class="win-dots">'+
          '<button type="button" class="wd-close" data-act="close" aria-label="Close window" title="Close"></button>'+
          '<button type="button" class="wd-min" data-act="min" aria-label="Minimize window" title="Minimize"></button>'+
          '<button type="button" class="wd-max" data-act="max" aria-label="Maximize window" title="Maximize"></button>'+
        '</div>'+
        '<div class="win-title">'+appTitles[app]+'</div>'+
        '<div style="width:53px"></div>'+
      '</div>'+
      '<div class="win-scroll"></div>'+
      '<div class="win-resize" title="Resize"></div>';

    const scrollArea = win.querySelector('.win-scroll');
    scrollArea.appendChild(tpl.content.cloneNode(true));
    windowsLayer.appendChild(win);
    populateWindow(app, win);

    // Taskbar tab
    const tab = document.createElement('div');
    tab.className = 'taskbar-tab';
    tab.dataset.app = app;
    tab.innerHTML = '<button type="button" class="tab-label">'+appTitles[app]+'</button><button type="button" class="tab-close" aria-label="Close '+appTitles[app]+'">✕</button>';
    tab.querySelector('.tab-label').onclick = function(){ openApp(app); };
    tab.querySelector('.tab-close').onclick = function(e){ e.stopPropagation(); closeApp(app); };
    taskbarTabs.appendChild(tab);

    openWins[app] = win;
    bringToFront(win);
    requestAnimationFrame(()=>win.classList.add('open'));
    setActiveTab(app);
    makeDraggable(win);
    makeResizable(win);

    win.querySelector('[data-act="close"]').onclick = function(e){
      e.stopPropagation();
      closeApp(app);
    };
    win.querySelector('[data-act="min"]').onclick = function(e){
      e.stopPropagation();
      win.classList.add('minimized');
      tab.classList.remove('active');
    };
    win.querySelector('[data-act="max"]').onclick = function(e){
      e.stopPropagation();
      win.classList.toggle('maximized');
    };
    win.querySelector('.win-head').addEventListener('dblclick', function(e){
      if(e.target.closest('.win-dots')) return;
      win.classList.toggle('maximized');
    });
    win.addEventListener('mousedown', ()=>{ bringToFront(win); setActiveTab(app); });
  }

  function closeApp(app){
    const win = openWins[app];
    if(!win) return;
    const tab = document.querySelector('.taskbar-tab[data-app="'+app+'"]');
    win.classList.remove('open');
    setTimeout(()=>{ win.remove(); if(tab) tab.remove(); delete openWins[app]; }, 180);
  }

  function makeDraggable(win){
    const head = win.querySelector('.win-head');
    let dragging = false, sx=0, sy=0, ox=0, oy=0;
    head.addEventListener('pointerdown', function(e){
      if(e.target.closest('.win-dots')) return;
      if(win.classList.contains('maximized')) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      const rect = win.getBoundingClientRect();
      ox = rect.left; oy = rect.top;
      head.setPointerCapture(e.pointerId);
    });
    head.addEventListener('pointermove', function(e){
      if(!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      const headH = head.offsetHeight || 40;
      const maxLeft = window.innerWidth - 60;
      const maxTop = window.innerHeight - 48 - headH;
      win.style.left = Math.min(maxLeft, Math.max(0, ox + dx)) + 'px';
      win.style.top = Math.min(maxTop, Math.max(38, oy + dy)) + 'px';
    });
    head.addEventListener('pointerup', function(){ dragging = false; });
  }

  function makeResizable(win){
    const handle = win.querySelector('.win-resize');
    if(!handle) return;
    let resizing = false, sx=0, sy=0, sw=0, sh=0;
    handle.addEventListener('pointerdown', function(e){
      e.stopPropagation();
      if(win.classList.contains('maximized')) return;
      resizing = true;
      sx = e.clientX; sy = e.clientY;
      const rect = win.getBoundingClientRect();
      sw = rect.width; sh = rect.height;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', function(e){
      if(!resizing) return;
      const dw = e.clientX - sx, dh = e.clientY - sy;
      const rect = win.getBoundingClientRect();
      const maxW = window.innerWidth - rect.left - 12;
      const maxH = window.innerHeight - rect.top - 60;
      win.style.width = Math.min(maxW, Math.max(320, sw + dw)) + 'px';
      win.style.maxHeight = Math.min(maxH, Math.max(220, sh + dh)) + 'px';
    });
    handle.addEventListener('pointerup', function(){ resizing = false; });
  }

  document.querySelectorAll('.icon[data-app]').forEach(function(icon){
    icon.addEventListener('click', function(){ openApp(icon.dataset.app); });
  });
  document.querySelectorAll('.start-menu-list button').forEach(function(btn){
    btn.addEventListener('click', function(){
      openApp(btn.dataset.app);
      document.getElementById('startMenu').classList.remove('open');
    });
  });

  /* ---------------- START MENU ---------------- */
  const startBtn = document.getElementById('startBtn');
  const startMenu = document.getElementById('startMenu');
  startBtn.addEventListener('click', function(e){
    e.stopPropagation();
    startMenu.classList.toggle('open');
  });
  document.addEventListener('click', function(e){
    if(!startMenu.contains(e.target) && e.target !== startBtn){
      startMenu.classList.remove('open');
    }
  });

  /* Auto-open About on first load for orientation (after boot) */
  if(!reduce){
    setTimeout(()=>openApp('about'), bootLines.length*260 + 700);
  } else {
    openApp('about');
  }
})();
