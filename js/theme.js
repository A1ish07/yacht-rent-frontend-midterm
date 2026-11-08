const root = document.documentElement;

function getSavedTheme() {
    try {
        return localStorage.getItem('theme') || 'light';
    } catch (e) {
        return 'light';
    }
}

function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme);
    const button = document.getElementById('theme-toggle');
    if (button) {
        button.textContent = theme === 'dark' ? '☀️' : '🌙';
        button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
}

function toggleTheme() {
    const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    try {
        localStorage.setItem('theme', next);
    } catch (e) { }
    applyTheme(next);
}

applyTheme(getSavedTheme());

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getSavedTheme());
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});