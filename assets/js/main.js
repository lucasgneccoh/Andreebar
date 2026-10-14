// Small progressive enhancements: mobile menu, theme toggle, footer year.
// The site is fully usable without JavaScript.
(function () {
  "use strict";

  // Mobile menu toggle
  var menuButton = document.getElementById("menu-button");
  var nav = document.getElementById("site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Theme toggle: explicit light/dark choice stored in localStorage.
  // Without a stored choice, the OS color scheme applies via CSS.
  var themeButton = document.getElementById("theme-button");
  var root = document.documentElement;
  function storedTheme() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function storeTheme(value) {
    try {
      if (value) { localStorage.setItem("theme", value); }
      else { localStorage.removeItem("theme"); }
    } catch (e) { /* private mode: ignore */ }
  }
  function currentTheme() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function applyTheme(value) {
    root.setAttribute("data-theme", value);
    if (themeButton) {
      themeButton.setAttribute("aria-label",
        value === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }
  var initial = storedTheme();
  if (initial === "light" || initial === "dark") { applyTheme(initial); }
  else if (themeButton) {
    themeButton.setAttribute("aria-label",
      currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      storeTheme(next);
      applyTheme(next);
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
