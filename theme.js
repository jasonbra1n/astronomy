// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference, otherwise use device preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    // Apply the initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update button text based on current theme
    const updateButtonText = (theme) => {
        themeToggle.innerHTML = `${theme === 'light' ? '🌙' : '☀️'} Toggle Theme`;
    };
    
    updateButtonText(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button text
        updateButtonText(newTheme);
    });
});
