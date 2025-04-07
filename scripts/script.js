console.log("Portfolio loaded successfully!");

document.addEventListener('DOMContentLoaded', function() {
  // Navbar toggle functionality
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Set active nav link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkPage = link.getAttribute('href').split('/').pop();
      
      if (linkPage === currentPage || 
          (currentPage === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Call initially and on navigation
  setActiveNavLink();
  window.addEventListener('popstate', setActiveNavLink);

  // Prevent scrolling when menu is open
  document.addEventListener('keydown', function(e) {
    if (navLinks && navLinks.classList.contains('active')) {
      e.preventDefault();
    }
  });
});