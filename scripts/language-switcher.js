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
      if (subtitle) {
        if (lang === 'fr') {
          subtitle.classList.add('fr');
        } else {
          subtitle.classList.remove('fr');
        }
      }
      
      // Update bio paragraphs
      document.querySelectorAll('.bio').forEach(bio => {
        bio.style.display = 'none';
      });
      
      const activeBio = document.querySelector(`.bio[data-${lang}]`);
      if (activeBio) {
        activeBio.style.display = 'block';
      }
      
      // Update buttons text
      document.querySelectorAll('.btn span[data-en]').forEach(btn => {
        btn.textContent = btn.dataset[lang];
      });
      
      // Update footer stats
      document.querySelectorAll('.stats p[data-en]').forEach(stat => {
        stat.textContent = stat.dataset[lang];
      });
    }
  });