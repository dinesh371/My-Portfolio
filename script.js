(() => {
  const root = document.documentElement;

  // set year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // mobile menu
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  if (menu && nav) menu.addEventListener("click", () => nav.classList.toggle("open"));

  // theme
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") || "light";
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
})();
