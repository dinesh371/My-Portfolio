(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const data = window.PORTFOLIO || {};

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

  // Theme
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

  // Mobile menu
  const menuBtn = $("#menuBtn");
  const nav = $("#navLinks");
  if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

  // Active link
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$("#navLinks a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page) a.classList.add("active");
  });

  // Page transition
  const wrap = $("#pageWrap");
  requestAnimationFrame(() => wrap && wrap.classList.add("in"));

  // Avatar
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

  // Copy email
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

  // Index stats + highlights
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
  if ($("#highlights")) {
    setHTML("#highlights",
      (data.highlights || []).map(h => `
        <div class="feature">
          <div class="icon">${h.icon || "☁"}</div>
          <div>
            <div class="featureK">${escapeHtml(h.k)}</div>
            <div class="featureV">${escapeHtml(h.v)}</div>
          </div>
        </div>
      `).join("")
    );
  }

  // Experience page
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

  // Skills page
  const skillsGrid = $("#skillsGrid");
  if (skillsGrid && Array.isArray(data.skills)) {
    skillsGrid.innerHTML = (data.skills || []).map(g => `
      <div class="skillGroup reveal">
        <div class="sgTitle">${escapeHtml(g.group)}</div>
        <div class="meters">
          ${(g.items || []).map(it => `
            <div class="meterRow">
              <div class="mName">${escapeHtml(it.name)}</div>
              <div class="mBar"><div class="mFill" style="width:${Number(it.level)}%"></div></div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  // Meter animation
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

  // Radar
  if ($("#radarSvg")) renderRadar();
  function renderRadar() {
    const groups = data.skills || [];
    const labels = groups.map(g => g.group);
    const values = groups.map(g => {
      const items = g.items || [];
      const avg = items.length ? items.reduce((a,x)=>a+(Number(x.level)||0),0)/items.length : 0;
      return Math.round(avg);
    });

    const W=900, H=420, cx=W/2, cy=H/2, R=150;
    const n = Math.max(labels.length, 3);
    const angle = (Math.PI*2)/n;

    const points = values.map((v,i)=>{
      const r = (v/100)*R;
      const a = -Math.PI/2 + i*angle;
      return [cx + r*Math.cos(a), cy + r*Math.sin(a)];
    });

    const gridLevels = [25,50,75,100].map(p=> p/100);
    const poly = (pts)=> pts.map((p,i)=> (i? "L":"M")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")+" Z";

    const axes = labels.map((lab,i)=>{
      const a = -Math.PI/2 + i*angle;
      return {lab,
        x: cx + (R+30)*Math.cos(a),
        y: cy + (R+30)*Math.sin(a),
        ax: cx + R*Math.cos(a),
        ay: cy + R*Math.sin(a)
      };
    });

    const gridPolys = gridLevels.map(k=>{
      const pts = Array.from({length:n}).map((_,i)=>{
        const a = -Math.PI/2 + i*angle;
        return [cx + (R*k)*Math.cos(a), cy + (R*k)*Math.sin(a)];
      });
      return poly(pts);
    });

    const path = poly(points);

    $("#radarSvg").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" class="radarSvg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rg" x1="0" x2="1">
            <stop offset="0" stop-color="var(--accent)" stop-opacity="0.55"/>
            <stop offset="1" stop-color="var(--accent2)" stop-opacity="0.45"/>
          </linearGradient>
        </defs>

        ${gridPolys.map(d=>`<path d="${d}" fill="none" stroke="var(--line)" stroke-width="2"/>`).join("")}
        ${axes.map(a=>`<line x1="${cx}" y1="${cy}" x2="${a.ax}" y2="${a.ay}" stroke="var(--line)" stroke-width="2"/>`).join("")}

        <path d="${path}" fill="url(#rg)" stroke="var(--accent)" stroke-width="2" opacity="0.95"></path>

        ${points.map((p,i)=>`
          <circle cx="${p[0]}" cy="${p[1]}" r="5" fill="var(--accent2)">
            <title>${escapeHtml(labels[i])}: ${values[i]}%</title>
          </circle>
        `).join("")}

        ${axes.map(a=>`
          <text x="${a.x}" y="${a.y}" fill="var(--muted)" font-size="16" font-weight="800" text-anchor="middle">${escapeHtml(a.lab)}</text>
        `).join("")}
      </svg>
    `;
  }

  // Projects page (NO Operational Flow Diagram)
  const projectList = $("#projectList");
  if (projectList && Array.isArray(data.projects)) {
    projectList.innerHTML = (data.projects || []).map(pj => `
      <div class="exp reveal">
        <div class="expTop">
          <div>
            <div class="expRole">${escapeHtml(pj.name)}</div>
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
            <div class="tags">${(pj.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
          </div>

          <div class="exp">
            <div class="expRole">Highlights</div>
            <div class="expCompany muted">Reliability • Governance • Ownership</div>
            <ul>
              <li>Incident triage and closure validation</li>
              <li>Secure access discipline aligned with IAM principles</li>
              <li>Documentation and repeat-issue reduction</li>
              <li>Stakeholder coordination and support excellence</li>
            </ul>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Certifications
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

  // Quick actions
  const qCV = $("#qCV");
  const qEmail = $("#qEmail");
  const qLinked = $("#qLinked");
  const qTop = $("#qTop");

  if (qCV) qCV.addEventListener("click", () => window.open("assets/T_Dinesh_CV.pdf", "_blank"));
  if (qEmail) qEmail.addEventListener("click", () => data.email && (location.href = `mailto:${data.email}`));
  if (qLinked) qLinked.addEventListener("click", () => window.open(data.links?.linkedin || "#", "_blank"));
  if (qTop) qTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("in"));
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));

  // Year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
