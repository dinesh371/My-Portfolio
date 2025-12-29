(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  const saved = localStorage.getItem("theme");
  if (saved === "dark") root.setAttribute("data-theme", "dark");

  const setIcon = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
  };
  setIcon();

  btn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    setIcon();
  });
})();
