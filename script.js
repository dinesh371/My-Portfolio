(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const p = window.PORTFOLIO;
  if (!p) return;

  // -------------------------
  // Theme (persisted)
  // -------------------------
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }
  const themeBtn = $("#themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // -------------------------
  // Active link
  // -------------------------
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".links a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", href === page);
  });

  // -------------------------
  // Mobile menu
  // -------------------------
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  // Close menu on outside click (nice UX)
  document.addEventListener("click", (e) => {
    if (!navLinks || !navLinks.classList.contains("open")) return;
    const inside = navLinks.contains(e.target) || (menuBtn && menuBtn.contains(e.target));
    if (!inside) navLinks.classList.remove("open");
  });

  // -------------------------
  // Hero background rotation (daily) + preload
  // -------------------------
  function pickHero() {
    const arr = p.heroImages || [];
    if (!arr.length) return "";
    const d = new Date();
    const seed = (d.getFullYear() * 10000) + ((d.getMonth()+1) * 100) + d.getDate();
    return arr[seed % arr.length];
  }

  const heroUrl = pickHero();
  if (heroUrl) {
    const bg = new Image();
    bg.onload = () => document.documentElement.style.setProperty("--heroUrl", `url("${heroUrl}")`);
    bg.src = heroUrl;
  } else {
    document.documentElement.style.setProperty("--heroUrl", "none");
  }

  // -------------------------
  // Helpers
  // -------------------------
  const setText = (sel, v) => { const el = $(sel); if (el) el.textContent = v ?? ""; };
  const setHref = (sel, v) => { const el = $(sel); if (el && v) el.setAttribute("href", v); };

  // -------------------------
  // Bind common fields
  // -------------------------
  setText("#name", p.name);
  setText("#nameFooter", p.name);
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

  const phoneClean = String(p.phone || "").replace(/[^\d+]/g, "");
  setHref("#phoneLink", phoneClean ? `tel:${phoneClean}` : "");

  // -------------------------
  // Typing title (Home only)
  // -------------------------
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
    }, 14);
  }

  // -------------------------
  // Avatar with safe fallback
  // -------------------------
  function initials(name){
    if(!name) return "TD";
    const parts = name.trim().split(/\s+/);
    const a = parts[0]?.[0] || "T";
    const b = parts.length > 1 ? parts[parts.length-1][0] : (parts[0]?.[1] || "D");
    return (a + b).toUpperCase();
  }

  const img = $("#profileImg");
  const fallback = $("#avatarFallback");
  if (fallback) {
    fallback.textContent = initials(p.name);
    fallback.style.display = "flex";
  }

  if (img) {
    img.style.display = "none";
    img.removeAttribute("src");

    if (p.profileImage) {
      const test = new Image();
      test.onload = () => {
        img.src = p.profileImage;
        img.style.display = "block";
        if (fallback) fallback.style.display = "none";
      };
      test.onerror = () => {
        img.style.display = "none";
        if (fallback) fallback.style.display = "flex";
      };
      test.src = p.profileImage;
    }
  }

  // -------------------------
  // Copy email
  // -------------------------
  const copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(p.email);
        const old = copyBtn.textContent;
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => (copyBtn.textContent = old), 1100);
      } catch {
        alert("Clipboard copy blocked by browser.");
      }
    });
  }

  // -------------------------
  // Icons
  // -------------------------
  const icons = {
    id: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 21c1.4-4 5-6 7.5-6s6.1 2 7.5 6" stroke="currentColor" stroke-width="1.7"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 12.5c0-2.9 2.1-5.2 5-5.2 2 0 3.7 1.1 4.5 2.8 2 .2 3.5 1.9 3.5 3.9 0 2.2-1.8 4-4 4H9.8C8.2 18 7 16.9 7 15.5v-3Z" stroke="currentColor" stroke-width="1.7"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v6c0 5-3.4 9-8 10-4.6-1-8-5-8-10V7l8-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M9.5 12.5l1.8 1.8L15.8 10" stroke="currentColor" stroke-width="1.7"/></svg>`,
    network: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h10v4H7V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M5 17h6v4H5v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M13 17h6v4h-6v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M12 11v6" stroke="currentColor" stroke-width="1.7"/></svg>`,

    // Tech icons (simple, clean)
    azure: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 18H4L12 3Z" stroke="currentColor" stroke-width="1.7"/><path d="M10.2 14.2h7.2" stroke="currentColor" stroke-width="1.7"/></svg>`,
    okta: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v10" stroke="currentColor" stroke-width="1.7"/></svg>`,
    ad: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 8h10v8H7V8Z" stroke="currentColor" stroke-width="1.7"/><path d="M9 11h6M9 13.5h4" stroke="currentColor" stroke-width="1.7"/></svg>`,
    m365: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 6l5-3 5 3v12l-5 3-5-3V6Z" stroke="currentColor" stroke-width="1.7"/></svg>`,
    windows: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5l8-2v9H4V5Z" stroke="currentColor" stroke-width="1.7"/><path d="M12 3l8-1v10h-8V3Z" stroke="currentColor" stroke-width="1.7"/><path d="M4 12h8v9l-8-2v-7Z" stroke="currentColor" stroke-width="1.7"/><path d="M12 12h8v10l-8-1V12Z" stroke="currentColor" stroke-width="1.7"/></svg>`
  };

  // -------------------------
  // Home: stats + highlights + confidence
  // -------------------------
  const stats = $("#stats");
  if (stats) {
    stats.innerHTML = (p.stats||[]).map(s => {
      const val = s.count ? `<span class="countUp" data-to="${s.v}" data-suffix="${s.suffix||''}">0</span>` : s.v;
      return `
        <div class="stat reveal">
          <div class="statK">${s.k}</div>
          <div class="statV">${val}</div>
          <div class="statS">${s.s}</div>
        </div>
      `;
    }).join("");
  }

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

  const conf = $("#confidence");
  if (conf) {
    conf.innerHTML = (p.confidence||[]).map(h => `
      <div class="feature reveal">
        <div class="icon">${icons[h.icon] || icons.shield}</div>
        <div>
          <div class="featureK">${h.k}</div>
          <div class="featureV">${h.v}</div>
        </div>
      </div>
    `).join("");
  }

  // -------------------------
  // Logo row render (Home only)
  // -------------------------
  const logoWrap = $("#toolLogos");
  if (logoWrap && Array.isArray(p.toolLogos)) {
    logoWrap.innerHTML = p.toolLogos.map(t => `
      <span class="logoPill reveal" title="${t.name}">
        ${icons[t.key] || icons.shield}
        ${t.name}
      </span>
    `).join("");
  }

  // -------------------------
  // Experience render
  // -------------------------
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

  // -------------------------
  // Skills render
  // -------------------------
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

  // -------------------------
  // Projects render
  // -------------------------
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

  // -------------------------
  // Certifications render
  // -------------------------
  const certList = $("#certList");
  if (certList && Array.isArray(p.certifications)) {
    certList.innerHTML = `
      ${p.certifications.map(c => `
        <article class="exp reveal">
          <div class="expTop">
            <div>
              <div class="expRole">${c.name}</div>
              <div class="pMeta">Credential ID: <em>(add if available)</em></div>
            </div>
          </div>
        </article>
      `).join("")}
    `;
  }

  // -------------------------
  // Security render
  // -------------------------
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

  // -------------------------
  // Contact bind
  // -------------------------
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

  // -------------------------
  // Search filter
  // -------------------------
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

  // -------------------------
  // Reveal animation
  // -------------------------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("in"));
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));

  // -------------------------
  // Count-up (Home only)
  // -------------------------
  const countEls = $$(".countUp");
  if (countEls.length) {
    const runCountUp = (el) => {
      const to = parseFloat(el.getAttribute("data-to") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 900;
      const start = performance.now();

      const step = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const v = Math.floor(to * (0.15 + 0.85*p));
        el.textContent = `${v}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = `${to}${suffix}`;
      };
      requestAnimationFrame(step);
    };

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        runCountUp(e.target);
        countObserver.unobserve(e.target);
      });
    }, { threshold: 0.35 });

    countEls.forEach(el => countObserver.observe(el));
  }

  // -------------------------
  // Floating buttons
  // -------------------------
  const fabCv = $("#fabCv");
  const fabMail = $("#fabMail");
  const fabTop = $("#fabTop");

  if (fabCv) fabCv.setAttribute("href", p.cvPath);
  if (fabMail) fabMail.setAttribute("href", `mailto:${p.email}`);

  if (fabTop) {
    fabTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // -------------------------
  // Year
  // -------------------------
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
