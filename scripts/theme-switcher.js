// Theme Switcher Functionality
(function() {
    'use strict';
    
    // Get theme from localStorage or default to light
    const getTheme = () => localStorage.getItem('theme') || 'light';
    
    // Set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleButton(theme);
    };
    
    // Update toggle button appearance
    const updateToggleButton = (theme) => {
        const toggle = document.querySelector('.theme-toggle');
        const icon = document.querySelector('.theme-toggle-slider i');
        
        if (toggle) {
            if (theme === 'dark') {
                toggle.classList.add('dark');
                if (icon) {
                    icon.className = 'fas fa-moon';
                }
            } else {
                toggle.classList.remove('dark');
                if (icon) {
                    icon.className = 'fas fa-sun';
                }
            }
        }
    };
    
    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };
    
    // Initialize theme on page load
    const initTheme = () => {
        const savedTheme = getTheme();
        setTheme(savedTheme);
        
        // Add click event listener to toggle
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
        }
    };
    
    // Run on DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    // Export for use in other scripts if needed
    window.themeManager = {
        getTheme,
        setTheme,
        toggleTheme
    };
})();
