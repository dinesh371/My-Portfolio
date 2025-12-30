// Year
const y = document.getElementById("year");
if (y) y.textContent = `© ${new Date().getFullYear()} T. Dinesh`;

// Copy phone
const copyBtn = document.getElementById("copyPhone");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const phone = "+91-8331956172";
    try {
      await navigator.clipboard.writeText(phone);
      copyBtn.querySelector("strong").textContent = `${phone} (copied)`;
      setTimeout(() => copyBtn.querySelector("strong").textContent = `${phone} (click to copy)`, 1200);
    } catch (e) {
      alert("Copy failed. Please copy manually: " + phone);
    }
  });
}

// Mobile menu
const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu");
if (nav && menu) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });
}
