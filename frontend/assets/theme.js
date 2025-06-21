document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-theme");
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    toggleButton.textContent = theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", theme);
  }

  toggleButton?.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  const storedTheme = localStorage.getItem("theme") || "dark";
  setTheme(storedTheme);
});
