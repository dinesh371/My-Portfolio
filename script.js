(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const p = window.PORTFOLIO;
  if (!p) return;

  // Active link
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".links a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page) a.classList.add("active");
  });

  // Mobile menu
  const menuBtn = $("#menuBtn");
  const links = $("#navLinks");
  if (menuBtn && links) menuBtn.addEventListener("click", () => links.classList.toggle("open"));

  // Hero image rotation (daily)
  function pickHero() {
    const arr = p.heroImages || [];
    if (!arr.length) return "";
    const d = new Date();
    const seed = (d.getFullYear() * 10000) + ((d.getMonth()+1) * 100) + d.getDate();
    return arr[seed % arr.length];
  }
  const heroUrl = pickHero();
  document.documentElement.style.setProperty("--heroUrl", heroUrl ? `url("${heroUrl}")` : "none");

  // Helpers
  const setText = (id, v) => { const el = $(id); if (el) el.textContent = v ?? ""; };
  const setHref = (id, v) => { const el = $(id); if (el && v) el.setAttribute("href", v); };

  // Bind common
  setText("#name", p.name);
  setText("#location", p.location);
  setText("#tagline", p.tagline);
  setText("#summary", p.summary);
  setText("#totalExp", p.totalExperience);
  setText("#emailText", p.email);
  setText("#phoneText", p.phone);

  setHref("#cvLink", p.cvPath);
  setHref("#cvBtn", p.cvPath);
  setHref("#linkedinLink", p.linkedin);
  setHref("#githubLink", p.github);
  setHref("#emailLink", `mailto:${p.email}`);

  // Typing animation (Home title only)
  const titleEl = $("#title");
  if (titleEl) {
    const full = p.title || "";
    titleEl.classList.add("typing");
    titleEl.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      titleEl.textContent = full.slice(0, i++);
      if (i > full.length) {
        clearInterval(timer);
        titleEl.classList.remove("typing");
      }
    }, 18);
  }

  // Avatar (optional profile.jpg)
  function initials(name){
    if(!name) return "TD";
    const parts = name.trim().split(/\s+/);
    const a = parts[0]?.[0] || "T";
    const b = parts.length > 1 ? parts[parts.length-1][0] : (parts[0]?.[1] || "D");
    return (a + b).toUpperCase();
  }
  const img = $("#profileImg");
  const fallback = $("#avatarFallback");
  if (fallback) fallback.textContent = initials(p.name);

  if (img) {
    img.src = "assets/profile.jpg";
    img.onerror = () => {
      img.style.display = "none";
      if (fallback) fallback.style.display = "flex";
    };
  }

  // Copy email
  const copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(p.email);
        const old = copyBtn.textContent;
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => (copyBtn.textContent = old), 1200);
      }catch{
        alert("Clipboard copy blocked by browser.");
      }
    });
  }

  // Icons
  const icons = {
    id: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 21c1.4-4 5-6 7.5-6s6.1 2 7.5 6" stroke="currentColor" stroke-width="1.7"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 12.5c0-2.9 2.1-5.2 5-5.2 2 0 3.7 1.1 4.5 2.8 2 .2 3.5 1.9 3.5 3.9 0 2.2-1.8 4-4 4H9.8C8.2 18 7 16.9 7 15.5v-3Z" stroke="currentColor" stroke-width="1.7"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v6c0 5-3.4 9-8 10-4.6-1-8-5-8-10V7l8-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M9.5 12.5l1.8 1.8L15.8 10" stroke="currentColor" stroke-width="1.7"/></svg>`,
    network: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h10v4H7V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M5 17h6v4H5v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M13 17h6v4h-6v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M12 11v6" stroke="currentColor" stroke-width="1.7"/></svg>`
  };

  // Index stats
  const stats = $("#stats");
  if (stats) {
    stats.innerHTML = (p.stats||[]).map(s => `
      <div class="stat reveal">
        <div class="statK">${s.k}</div>
        <div class="statV">${s.v}</div>
        <div class="statS">${s.s}</div>
      </div>
    `).join("");
  }

  // Index highlights
  const hi = $("#highlights");
  if (hi) {
    hi.innerHTML = (p.highlights||[]).map(h => `
      <div class="feature reveal">
        <div class="icon">${icons[h.icon] || icons.cloud}</div>
        <div>
          <div class="featureK">${h.k}</div>
          <div class="featureV">${h.v}</div>
        </div>
      </div>
    `).join("");
  }

  // Experience timeline render
  const expWrap = $("#experienceList");
  if (expWrap && Array.isArray(p.experience)) {
    expWrap.innerHTML = `
      <div class="timeline">
        ${p.experience.map(e => `
          <article class="exp reveal" data-search="${(e.role+' '+e.company+' '+e.period+' '+(e.tags||[]).join(' ')).toLowerCase()}">
            <div class="expTop">
              <div>
                <div class="expRole">${e.role}</div>
                <div class="expCompany">${e.company} • ${e.location || ""}</div>
              </div>
              <div class="expPeriod">${e.period}</div>
            </div>
            <ul>${(e.points||[]).map(x => `<li>${x}</li>`).join("")}</ul>
            <div class="tags">${(e.tags||[]).map(t => `<span class="tag">${t}</span>`).join("")}</div>
          </article>
        `).join("")}
      </div>
    `;
  }

  // Skills render (NO radar)
  const skillsGrid = $("#skillsGrid");
  if (skillsGrid && Array.isArray(p.skills)) {
    skillsGrid.innerHTML = `
      <div class="skillsWrap">
        ${p.skills.map(g => `
          <div class="skillGroup reveal" data-search="${(g.group+' '+(g.items||[]).map(x=>x.name).join(' ')).toLowerCase()}">
            <div class="sgTitle">${g.group}</div>
            ${(g.items||[]).map(it => `
              <div class="meterRow">
                <div class="mName">${it.name}</div>
                <div class="mBar"><div class="mFill" style="width:${it.level}%"></div></div>
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    `;
  }

  // Animate skill bars
  const meterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      e.target.querySelectorAll(".mFill").forEach(fill => {
        const w = fill.style.width;
        fill.style.width = "0%";
        requestAnimationFrame(() => fill.style.width = w);
      });
      meterObserver.unobserve(e.target);
    });
  }, { threshold: 0.18 });
  $$(".skillGroup").forEach(el => meterObserver.observe(el));

  // Projects render (diagram removed)
  const proj = $("#projectList");
  if (proj && Array.isArray(p.projects)) {
    proj.innerHTML = `
      <div class="projectGrid">
        ${p.projects.map(pr => `
          <article class="exp reveal" data-search="${(pr.title+' '+pr.period+' '+(pr.stack||[]).join(' ')).toLowerCase()}">
            <div class="expTop">
              <div>
                <div class="expRole">${pr.title}</div>
                <div class="pMeta">${pr.period}</div>
              </div>
            </div>

            <div class="pBlock">
              <div class="pLabel">Problem</div>
              <div class="pText">${pr.problem}</div>
            </div>

            <div class="pBlock">
              <div class="pLabel">Actions</div>
              <ul>${(pr.actions||[]).map(x => `<li>${x}</li>`).join("")}</ul>
            </div>

            <div class="pBlock">
              <div class="pLabel">Outcome</div>
              <div class="pText">${pr.outcome}</div>
            </div>

            <div class="tags">${(pr.stack||[]).map(t => `<span class="tag">${t}</span>`).join("")}</div>
          </article>
        `).join("")}
      </div>
    `;
  }

  // Certifications
  const certList = $("#certList");
  if (certList && Array.isArray(p.certifications)) {
    certList.innerHTML = `
      ${p.certifications.map(c => `
        <article class="exp reveal">
          <div class="expTop">
            <div>
              <div class="expRole">${c.name}</div>
            </div>
          </div>
          <div class="certRow">
          </div>
        </article>
      `).join("")}
    `;
  }

  // Security page
  const secWrap = $("#securityList");
  if (secWrap && Array.isArray(p.securityPractices)) {
    secWrap.innerHTML = `
      ${p.securityPractices.map(s => `
        <article class="exp reveal">
          <div class="expRole">${s.title}</div>
          <ul>${(s.bullets||[]).map(x => `<li>${x}</li>`).join("")}</ul>
        </article>
      `).join("")}
    `;
  }

  // Contact page
  const cName = $("#cName");
  const cEmail = $("#cEmail");
  const cPhone = $("#cPhone");
  const cLoc = $("#cLoc");
  const cLinked = $("#cLinked");
  if (cName) cName.textContent = p.name;
  if (cEmail) cEmail.textContent = p.email;
  if (cPhone) cPhone.textContent = p.phone;
  if (cLoc) cLoc.textContent = p.location;
  if (cLinked) cLinked.setAttribute("href", p.linkedin);

  // Search filter (Skills + Projects + Experience)
  const searchBox = $("#searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      const q = searchBox.value.trim().toLowerCase();
      $$("[data-search]").forEach(el => {
        const hay = (el.getAttribute("data-search") || "");
        el.style.display = hay.includes(q) ? "" : "none";
      });
    });
  }

  // Reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("in"));
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));

  // Year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // Floating buttons
  const toTop = $("#fabTop");
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
})();
