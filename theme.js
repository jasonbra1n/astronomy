document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️';
        } else {
            htmlElement.classList.remove('dark-theme');
            themeToggle.innerHTML = '🌙';
        }
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme preference, or use device preference
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = htmlElement.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    /**
     * Listen for theme changes from the parent LAB application when embedded in an iframe.
     * This allows the tool's theme to stay in sync with the main application.
     */
    window.addEventListener('message', (event) => {
        // Optional: Ensure the message is from a trusted origin
        // if (event.origin !== 'https://lab.jasonbrain.com') return;

        if (event.data && event.data.type === 'themeChange') {
            const newTheme = event.data.theme === 'dark-theme' ? 'dark' : 'light';
            if (newTheme !== (htmlElement.classList.contains('dark-theme') ? 'dark' : 'light')) {
                applyTheme(newTheme);
            }
        }
    });

    // On load, ask the parent window for its current theme.
    // This is useful if the tool is loaded after the parent page has already been set to a specific theme.
    // The '*' target origin is permissive; for production, you might restrict this to the parent's origin.
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'requestTheme' }, '*');
    }
});
