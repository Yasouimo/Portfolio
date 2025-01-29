document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Skills animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.remove('bounce');
            void item.offsetWidth; // Trigger reflow
            item.classList.add('bounce');
        });
    });

    // Set initial active section
    document.querySelector('.nav-item[data-section="education"]').classList.add('active');
    document.getElementById('education').classList.add('active');
});