/* =========================
   script.js (FULL, WORKING)
   - Fixes image loading (Profile.JPG)
   - Modern theme toggle (saved)
   - Better hero background rotation (safe)
   - Improved UX + accessibility
========================= */
(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const p = window.PORTFOLIO;
  if (!p) return;

  // -------------------------
  // Theme (saved)
  // -------------------------
  const themeBtn = $("#themeBtn");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  const applyThemeIcon = () => {
    const t = document.documentElement.getAttribute("data-theme") || "dark";
    const icon = $(".themeIcon");
    if (icon) icon.textContent = t === "light" ? "☀" : "☾";
  };
  applyThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      applyThemeIcon();
    });
  }

  // -------------------------
  // Active link (safe)
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
  const links = $("#navLinks");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close when clicking a link (mobile)
    links.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A" && links.classList.contains("open")) {
        links.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // -------------------------
  // Hero image rotation (daily)
  // -------------------------
  function pickHero() {
    const arr = p.heroImages || [];
    if (!arr.length) return "";
    const d = new Date();
    const seed = (d.getFullYear() * 10000) + ((d.getMonth() + 1) * 100) + d.getDate();
    return arr[seed % arr.length];
  }
  const heroUrl = pickHero();
  document.documentElement.style.setProperty("--heroUrl", heroUrl ? `url("${heroUrl}")` : "none");

  // -------------------------
  // Helpers
  // -------------------------
  const setText = (sel, v) => { const el = $(sel); if (el) el.textContent = v ?? ""; };
  const setHref = (sel, v) => { const el = $(sel); if (el && v) el.setAttribute("href", v); };

  // -------------------------
  // Bind data
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
  setHref("#pillLinkedIn", p.linkedin);
  setHref("#pillGitHub", p.github);

  setHref("#emailLink", `mailto:${p.email}`);
  setHref("#phoneLink", `tel:${String(p.phone || "").replace(/[^\d+]/g, "")}`);

  // -------------------------
  // Typing animation (title)
  // -------------------------
  const titleEl = $("#title");
  if (titleEl) {
    const full = p.title || "";
    titleEl.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      titleEl.textContent = full.slice(0, i++);
      if (i > full.length) clearInterval(timer);
    }, 16);
  }

  // -------------------------
  // Avatar: safe image + initials fallback
  // -------------------------
  function initials(name) {
    if (!name) return "TD";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "T";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : (parts[0]?.[1] || "D");
    return (first + last).toUpperCase();
  }

  function setProfileImage(url, fullName) {
    const img = $("#profileImg");
    const fallback = $("#avatarFallback");
    if (!img || !fallback) return;

    // default to fallback
    fallback.textContent = initials(fullName);
    fallback.style.display = "grid";
    img.style.display = "none";
    img.removeAttribute("src");

    if (!url) return;

    const testImg = new Image();
    testImg.onload = () => {
      img.src = url;
      img.style.display = "block";
      fallback.style.display = "none";
    };
    testImg.onerror = () => {
      img.style.display = "none";
      fallback.style.display = "grid";
    };
    testImg.src = url;
  }

  setProfileImage(p.profileImage, p.name);

  // -------------------------
  // Mini badges
  // -------------------------
  const miniBadges = $("#miniBadges");
  if (miniBadges && Array.isArray(p.badges)) {
    miniBadges.innerHTML = p.badges.map(b => `<span class="miniBadge">${b}</span>`).join("");
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
        copyBtn.classList.add("ok");
        setTimeout(() => {
          copyBtn.textContent = old;
          copyBtn.classList.remove("ok");
        }, 1200);
      } catch {
        alert("Clipboard copy blocked by browser.");
      }
    });
  }

  // -------------------------
  // Icons
  // -------------------------
  const icons = {
    id: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 21c1.4-4 5-6 7.5-6s6.1 2 7.5 6" stroke="currentColor" stroke-width="1.7"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 12.5c0-2.9 2.1-5.2 5-5.2 2 0 3.7 1.1 4.5 2.8 2 .2 3.5 1.9 3.5 3.9 0 2.2-1.8 4-4 4H9.8C8.2 18 7 16.9 7 15.5v-3Z" stroke="currentColor" stroke-width="1.7"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 4v6c0 5-3.4 9-8 10-4.6-1-8-5-8-10V7l8-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M9.5 12.5l1.8 1.8L15.8 10" stroke="currentColor" stroke-width="1.7"/></svg>`,
    network: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7h10v4H7V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M5 17h6v4H5v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M13 17h6v4h-6v-4Z" stroke="currentColor" stroke-width="1.7"/><path d="M12 11v6" stroke="currentColor" stroke-width="1.7"/></svg>`
  };

  // -------------------------
  // Render stats + highlights (Home)
  // -------------------------
  const stats = $("#stats");
  if (stats) {
    stats.innerHTML = (p.stats || []).map(s => `
      <div class="stat reveal">
        <div class="statK">${s.k}</div>
        <div class="statV">${s.v}</div>
        <div class="statS">${s.s}</div>
      </div>
    `).join("");
  }

  const hi = $("#highlights");
  if (hi) {
    hi.innerHTML = (p.highlights || []).map(h => `
      <div class="feature reveal">
        <div class="icon">${icons[h.icon] || icons.cloud}</div>
        <div>
          <div class="featureK">${h.k}</div>
          <div class="featureV">${h.v}</div>
        </div>
      </div>
    `).join("");
  }

  // -------------------------
  // Reveal animation
  // -------------------------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("in"));
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));

  // -------------------------
  // Year
  // -------------------------
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
