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
      
      // Update headings with data attributes
      document.querySelectorAll('h1[data-en], h2[data-en], h3[data-en]').forEach(heading => {
        if (heading.dataset[lang]) {
          heading.textContent = heading.dataset[lang];
        }
      });
      
      // Update paragraphs with data attributes
      document.querySelectorAll('p[data-en]').forEach(paragraph => {
        if (paragraph.dataset[lang]) {
          paragraph.textContent = paragraph.dataset[lang];
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
    }
  });