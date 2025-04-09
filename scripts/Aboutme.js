document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // DOM elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Mobile sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Skill items animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('bounce');
            void this.offsetWidth; // Trigger reflow
            this.classList.add('bounce');
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target) && 
                e.target !== sidebarToggle) {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });

    // Set initial active section
    const defaultNavItem = document.querySelector('.nav-item[data-section="education"]');
    if (defaultNavItem) {
        defaultNavItem.classList.add('active');
    }
});