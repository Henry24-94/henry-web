// -------------------------
// Smooth Scroll Navigation
// -------------------------
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetID = link.getAttribute("href");
    const target = document.querySelector(targetID);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// -------------------------
// Say Hello Button
// -------------------------
const helloBtn = document.getElementById("helloBtn");
const message = document.getElementById("message");

if (helloBtn) {
  helloBtn.addEventListener("click", () => {
    message.textContent = "Hello Man! Welcome to my portfolio 😊";
  });
}


// -------------------------
// Dark / Light Theme Toggle
// -------------------------
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


// -------------------------
// Active Navigation on Scroll
// -------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 150; 
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});


// -------------------------
// Back To Top Button
// -------------------------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.style.display = scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
