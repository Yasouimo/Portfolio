document.addEventListener('DOMContentLoaded', function() {
  // Get language buttons
  const btnEn = document.getElementById('lang-en');
  const btnFr = document.getElementById('lang-fr');
  
  // Check if there's a saved language preference
  const savedLang = localStorage.getItem('preferred-language') || 'en';
  
  // Set initial language based on saved preference
  setLanguage(savedLang);
  
  // Add click event listeners to language buttons
  btnEn.addEventListener('click', function() {
    setLanguage('en');
  });
  
  btnFr.addEventListener('click', function() {
    setLanguage('fr');
  });
  
  // Function to set language
  function setLanguage(lang) {
    // Save language preference
    localStorage.setItem('preferred-language', lang);
    
    // Update active button state
    if (lang === 'en') {
      btnEn.classList.add('active');
      btnFr.classList.remove('active');
      document.documentElement.setAttribute('lang', 'en');
    } else {
      btnFr.classList.add('active');
      btnEn.classList.remove('active');
      document.documentElement.setAttribute('lang', 'fr');
    }
    
    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset[lang]) {
        link.textContent = link.dataset[lang];
      }
    });
    
    // Update sidebar and mobile tabs
    document.querySelectorAll('.nav-item, .mobile-tab').forEach(item => {
      if (item.dataset[lang]) {
        item.textContent = item.dataset[lang];
      }
    });
    
    // Update subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle && subtitle.dataset[lang]) {
      subtitle.textContent = subtitle.dataset[lang];
    }
    
    // Update bio paragraphs (on index page)
    document.querySelectorAll('.bio').forEach(bio => {
      if (bio) bio.style.display = 'none';
    });
    
    const activeBio = document.querySelector(`.bio[data-${lang}]`);
    if (activeBio) {
      activeBio.style.display = 'block';
    }
    
    // Update ALL elements with data attributes
    document.querySelectorAll('[data-en], [data-fr]').forEach(element => {
      if (element.dataset[lang]) {
        element.textContent = element.dataset[lang];
      }
    });
    
    // Specific update for timeline card elements
    document.querySelectorAll('.timeline-card h2, .timeline-card .location span, .timeline-card .subjects li').forEach(item => {
      if (item.dataset[lang]) {
        item.textContent = item.dataset[lang];
      }
    });
    
    // Update buttons text
    document.querySelectorAll('.btn span[data-en]').forEach(btn => {
      if (btn.dataset[lang]) {
        btn.textContent = btn.dataset[lang];
      }
    });
    
    // Update footer stats (on index page)
    document.querySelectorAll('.stats p[data-en]').forEach(stat => {
      if (stat.dataset[lang]) {
        stat.textContent = stat.dataset[lang];
      }
    });
    
    // Update skill items
    document.querySelectorAll('.skill-item span').forEach(skill => {
      if (skill.dataset[lang]) {
        skill.textContent = skill.dataset[lang];
      }
    });
    
    // Update animated subtitle if on index page
    updateAnimatedSubtitle(lang);
  }
  
  // Function to update animated subtitle
  function updateAnimatedSubtitle(lang) {
    const subtitleElement = document.getElementById('animated-subtitle');
    if (subtitleElement) {
      const occupation = lang === 'en' ? 'AI & Data Science Engineer' : 'Ingénieur en IA & Science des Données';
      
      // Remove show class, update text, then re-show with animation
      subtitleElement.classList.remove('show');
      setTimeout(() => {
        subtitleElement.textContent = occupation;
        subtitleElement.classList.add('show');
      }, 300);
    }
  }
});