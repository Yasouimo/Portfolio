console.log("Portfolio loaded successfully!");

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isActive = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').endsWith(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
});
