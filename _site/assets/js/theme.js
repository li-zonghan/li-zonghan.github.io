(function () {
    "use strict";

    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    function currentTheme() {
        return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }

    function updateControls(theme) {
        var isDark = theme === "dark";
        document.querySelectorAll(".theme-toggle").forEach(function (button) {
            var nextMode = isDark ? "light" : "dark";
            var label = "Switch to " + nextMode + " mode";
            var icon = button.querySelector("i");
            var text = button.querySelector(".theme-toggle-label");

            button.setAttribute("aria-label", label);
            button.setAttribute("title", label);
            if (icon) {
                icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
            }
            if (text) {
                text.textContent = isDark ? "Light mode" : "Dark mode";
            }
        });
    }

    function applyTheme(theme, remember) {
        root.setAttribute("data-theme", theme);
        root.style.colorScheme = theme;
        if (remember) {
            try {
                localStorage.setItem("theme", theme);
            } catch (error) {
                // The theme still applies when storage is unavailable.
            }
        }
        updateControls(theme);
    }

    document.addEventListener("DOMContentLoaded", function () {
        updateControls(currentTheme());
        document.querySelectorAll(".theme-toggle").forEach(function (button) {
            button.addEventListener("click", function () {
                applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
            });
        });
    });

    if (media) {
        media.addEventListener("change", function (event) {
            var savedTheme = null;
            try {
                savedTheme = localStorage.getItem("theme");
            } catch (error) {
                savedTheme = null;
            }
            if (savedTheme !== "dark" && savedTheme !== "light") {
                applyTheme(event.matches ? "dark" : "light", false);
            }
        });
    }
}());
