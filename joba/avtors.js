const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector(".icon");

// Проверяем сохраненную тему
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    icon.textContent = "☀️";
}

// Обработчик клика по кнопке
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");

    // Меняем иконку
    icon.textContent = isDark ? "☀️" : "🌙";

    // Сохраняем тему
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

