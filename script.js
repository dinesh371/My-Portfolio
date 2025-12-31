(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const data = window.PORTFOLIO || {};

  // ---------- Utils ----------
  const escapeHtml = (str) =>
    String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const setText = (sel, v) => { const el = $(sel); if (el) el.textContent = v ?? ""; };
  const setHref = (sel, v) => { const el = $(sel); if (el && v) el.setAttribute("href", v); };
  const setHTML = (sel, v) => { const el = $(sel); if (el) el.innerHTML = v ?? ""; };

  // ---------- Theme ----------
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  const themeBtn = $("#themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // ---------- Mobile menu ----------
  const menuBtn = $("#menuBtn");
  const nav = $("#navLinks");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

  // ---------- Active link ----------
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$("#navLinks a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page) a.classList.add("active");
  });

  // ---------- Page transition ----------
  const wrap = $("#pageWrap");
  requestAnimationFrame(() => wrap && wrap.classList.add("in"));

  // ---------- Hero image (optional, rotates daily) ----------
  function pickHero() {
    const arr = data.heroImages || [];
    if (!arr.length) return "";
    const d = new Date();
    const seed = (d.getFullYear() * 10000) + ((d.getMonth() + 1) * 100) + d.getDate();
    return arr[seed % arr.length];
  }
  const heroUrl = pickHero();
  document.documentElement.style.setProperty("--heroUrl", heroUrl ? `url("${heroUrl}")` : "none");

  // ---------- Avatar ----------
  function initials(name) {
    if (!name) return "ME";
    const parts = name.trim().split(/\s+/);
    const a = parts[0]?.[0] || "M";
    const b = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0]?.[1] || "E");
    return (a + b).toUpperCase();
  }

  function internetAvatar(name) {
    const n = encodeURIComponent(name || "User");
    return `https://ui-avatars.com/api/?name=${n}&size=256&background=0D8ABC&color=ffffff&bold=true&format=png`;
  }

  setText("#name", data.name);
  setText("#title", data.title);
  setText("#location", data.location);
  setText("#tagline", data.tagline);
  setText("#summary", data.summary);
  setText("#emailText", data.email);
  setText("#phoneText", data.phone);

  setHref("#cvLink", data.cvPath || "assets/T_Dinesh_CV.pdf");
  setHref("#cvBtn", data.cvPath || "assets/T_Dinesh_CV.pdf");
  setHref("#linkedinLink", data.links?.linkedin || data.linkedin);
  setHref("#githubLink", data.links?.github || data.github);
  setHref("#emailLink", data.email ? `mailto:${data.email}` : "#");

  const img = $("#profileImg");
  const avatarFallback = $("#avatarFallback");
  if (avatarFallback) avatarFallback.textContent = initials(data.name);

  if (img) {
    img.src = "assets/profile.jpg"; // optional local
    img.onerror = () => {
      img.src = internetAvatar(data.name);
      img.onerror = () => {
        img.style.display = "none";
        if (avatarFallback) avatarFallback.style.display = "flex";
      };
    };
    img.onload = () => {
      if (avatarFallback) avatarFallback.style.display = "none";
    };
  }

  // ---------- Copy email ----------
  const copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(data.email || "");
        const old = copyBtn.textContent;
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => (copyBtn.textContent = old), 1200);
      } catch {
        alert("Clipboard copy blocked by browser.");
      }
    });
  }

  // ---------- Icons ----------
  const icons = {
    id: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 21c1.4-4 5-6 7.5-6s6.1 2 7.5 6" stroke="currentColor" stroke-width="1.7"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 12.5c0-2.9 2.1-5.2 5-5.2 2 0 3.7 1.1 4.5 2.8 2 .2 3.5 1.9 3.5 3.9 0 2.2-1.8 4-4 4H9.8C8.2 18 7 16.9 7 15.5v-3Z" stroke="currentColor" stroke-width="1.7"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v6c0 5-3.4 9-8 10-4.6-1-8-5-8-10V7l8-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M9.5 12.5l1.8 1.8L15.8 10" stroke="currentColor" stroke-width="1.7"/></svg>`,
    network: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h10v4H7V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M5 17h6v4H5v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M13 17h6v4h-6v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M12 11v6" stroke="currentColor" stroke-width="1.7"/></svg>`
  };

  // ---------- Index Stats ----------
  if ($("#stats")) {
    setHTML("#stats",
      (data.stats || []).map(s => `
        <div class="stat">
          <div class="statK">${escapeHtml(s.k)}</div>
          <div class="statV">${escapeHtml(s.v)}</div>
          <div class="statS">${escapeHtml(s.s)}</div>
        </div>
      `).join("")
    );
  }

  // ---------- Index Highlights ----------
  if ($("#highlights")) {
    setHTML("#highlights",
      (data.highlights || []).map(h => `
        <div class="feature">
          <div class="icon">${icons[h.icon] || icons.cloud}</div>
          <div>
            <div class="featureK">${escapeHtml(h.k)}</div>
            <div class="featureV">${escapeHtml(h.v)}</div>
          </div>
        </div>
      `).join("")
    );
  }

  // ---------- Experience Page (uses data.experience) ----------
  const expWrap = $("#experienceList");
  if (expWrap && Array.isArray(data.experience)) {
    expWrap.innerHTML = `
      <div class="timeline">
        ${data.experience.map(e => `
          <article class="exp reveal">
            <div class="expTop">
              <div>
                <div class="expRole">${escapeHtml(e.role)}</div>
                <div class="expCompany">${escapeHtml(e.company)} ${e.location ? "• " + escapeHtml(e.location) : ""}</div>
              </div>
              <div class="expPeriod">${escapeHtml(e.period)}</div>
            </div>
            <div class="tags">${(e.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
            <ul>${(e.points || []).map(b => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
    `;
  }

  // ---------- Skills Page (meters) ----------
  const skillsGrid = $("#skillsGrid");
  if (skillsGrid && Array.isArray(data.skills)) {
    skillsGrid.innerHTML = (data.skills || []).map(g => `
      <div class="skillGroup reveal">
        <div class="sgTitle">${escapeHtml(g.group)}</div>
        <div class="meters">
          ${(g.items || []).map(it => `
            <div class="meterRow">
              <div class="mName">${escapeHtml(it.name ?? it)}</div>
              <div class="mBar"><div class="mFill" style="width:${Number(it.level ?? 80)}%"></div></div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  // Animate meters when visible
  const meterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".mFill").forEach(fill => {
        const w = fill.style.width;
        fill.style.width = "0%";
        requestAnimationFrame(() => fill.style.width = w);
      });
      meterObserver.unobserve(e.target);
    });
  }, { threshold: 0.18 });

  $$(".skillGroup").forEach(el => meterObserver.observe(el));

  // ---------- Radar ----------
  if ($("#radarSvg")) renderRadar();

  function renderRadar() {
    const groups = data.skills || [];
    const labels = groups.map(g => g.group);
    const values = groups.map(g => {
      const items = g.items || [];
      const arr = items.map(x => Number(x.level ?? 80));
      const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
      return Math.round(avg);
    });

    const W = 900, H = 420, cx = W / 2, cy = H / 2, R = 150;
    const n = Math.max(labels.length, 3);
    const angle = (Math.PI * 2) / n;

    const points = values.map((v, i) => {
      const r = (v / 100) * R;
      const a = -Math.PI / 2 + i * angle;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });

    const gridLevels = [25, 50, 75, 100].map(p => p / 100);
    const poly = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ") + " Z";

    const axes = labels.map((lab, i) => {
      const a = -Math.PI / 2 + i * angle;
      const x = cx + (R + 30) * Math.cos(a);
      const y = cy + (R + 30) * Math.sin(a);
      const ax = cx + R * Math.cos(a);
      const ay = cy + R * Math.sin(a);
      return { lab, x, y, ax, ay };
    });

    const gridPolys = gridLevels.map(k => {
      const pts = Array.from({ length: n }).map((_, i) => {
        const a = -Math.PI / 2 + i * angle;
        return [cx + (R * k) * Math.cos(a), cy + (R * k) * Math.sin(a)];
      });
      return poly(pts);
    });

    const path = poly(points);

    const svg = `
      <svg viewBox="0 0 ${W} ${H}" class="radarSvg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skills radar chart">
        <defs>
          <linearGradient id="rg" x1="0" x2="1">
            <stop offset="0" stop-color="var(--accent)" stop-opacity="0.55"/>
            <stop offset="1" stop-color="var(--accent2)" stop-opacity="0.45"/>
          </linearGradient>
        </defs>

        ${gridPolys.map(d => `<path d="${d}" fill="none" stroke="var(--line)" stroke-width="2"/>`).join("")}
        ${axes.map(a => `<line x1="${cx}" y1="${cy}" x2="${a.ax}" y2="${a.ay}" stroke="var(--line)" stroke-width="2"/>`).join("")}

        <path d="${path}" fill="url(#rg)" stroke="var(--accent)" stroke-width="2" opacity="0.95"></path>

        ${points.map((p, i) => `
          <circle cx="${p[0]}" cy="${p[1]}" r="5" fill="var(--accent2)">
            <title>${escapeHtml(labels[i])}: ${values[i]}%</title>
          </circle>
        `).join("")}

        ${axes.map(a => `
          <text x="${a.x}" y="${a.y}" fill="var(--muted)" font-size="16" font-weight="800" text-anchor="middle">${escapeHtml(a.lab)}</text>
        `).join("")}

        <text x="${cx}" y="${H - 16}" fill="var(--muted)" font-size="14" text-anchor="middle">
          Hover dots for % values • Auto-calculated from Skills Matrix
        </text>
      </svg>
    `;
    $("#radarSvg").innerHTML = svg;
  }

  // ---------- Projects Page (REMOVED Operational Flow Diagram) ----------
  const projectList = $("#projectList");
  if (projectList && Array.isArray(data.projects)) {
    projectList.innerHTML = (data.projects || []).map(pj => `
      <div class="exp reveal">
        <div class="expTop">
          <div>
            <div class="expRole">${escapeHtml(pj.title || pj.name)}</div>
            <div class="expCompany muted">${escapeHtml(pj.period || "")}</div>
          </div>
        </div>
        <div class="hr"></div>
        <div class="grid2">
          <div>
            <div class="sectionTitle">Problem</div>
            <div class="sectionSub">${escapeHtml(pj.problem || "")}</div>
            <div class="hr"></div>
            <div class="sectionTitle">Actions</div>
            <ul>${(pj.actions || []).map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
            <div class="hr"></div>
            <div class="sectionTitle">Outcome</div>
            <div class="sectionSub">${escapeHtml(pj.outcome || "")}</div>
            <div class="tags">${(pj.stack || pj.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
          </div>

          <div class="exp" style="height:100%">
            <div class="expRole">Key Contributions</div>
            <div class="expCompany muted">Impact, ownership, reliability</div>
            <ul>
              <li>Operational triage and resolution ownership</li>
              <li>Access hygiene and governance discipline</li>
              <li>Documentation and repeat-issue reduction</li>
              <li>Stakeholder coordination and closure validation</li>
            </ul>
          </div>
        </div>
      </div>
    `).join("");
  }

  // ---------- Certifications ----------
  const certList = $("#certList");
  if (certList && Array.isArray(data.certifications)) {
    certList.innerHTML = (data.certifications || []).map(c => `
      <div class="exp reveal">
        <div class="expTop">
          <div>
            <div class="expRole">${escapeHtml(c.name)}</div>
            <div class="expCompany muted">${escapeHtml(c.org || "Issuer")} • ${escapeHtml(c.year || "")}</div>
          </div>
        </div>
        ${c.note ? `<div class="sectionSub">${escapeHtml(c.note)}</div>` : ""}
      </div>
    `).join("");
  }

  // ---------- Quick actions ----------
  const qCV = $("#qCV");
  const qEmail = $("#qEmail");
  const qLinked = $("#qLinked");
  const qTop = $("#qTop");

  if (qCV) qCV.addEventListener("click", () => window.open(data.cvPath || "assets/T_Dinesh_CV.pdf", "_blank"));
  if (qEmail) qEmail.addEventListener("click", () => data.email && (location.href = `mailto:${data.email}`));
  if (qLinked) qLinked.addEventListener("click", () => window.open(data.links?.linkedin || data.linkedin || "#", "_blank"));
  if (qTop) qTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("in"));
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));

  // ---------- Year ----------
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
tags: ["LAN/Wi-Fi", "Access Points", "Support"]