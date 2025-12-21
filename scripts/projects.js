// projects.js
// Initialize AOS with longer duration
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    const track = document.querySelector('.projects-track');
    const cards = document.querySelectorAll('.project-card');
    
    // Function to get card width including gap based on screen size
    function getCardWidth() {
        const isMobile = window.innerWidth <= 768;
        const gap = isMobile ? 16 : 32; // 1rem = 16px for mobile, 2rem = 32px for desktop
        return cards[0].offsetWidth + gap;
    }

    let isScrolling = false;
    let scrollTimeout;

    // Handle scroll snapping
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            const currentScroll = track.scrollLeft;
            const cardWidth = getCardWidth();
            const nearestIndex = Math.round(currentScroll / cardWidth);
            const snapPosition = nearestIndex * cardWidth;

            if (!isScrolling) {
                track.scrollTo({ 
                    left: snapPosition, 
                    behavior: 'smooth' 
                });
            }
        }, 150);
    });

    // Handle wheel scrolling
    track.addEventListener('wheel', (e) => {
        isScrolling = true;
        
        const scrollAmount = e.deltaY * 0.5;
        track.scrollLeft += scrollAmount;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);

        e.preventDefault();
    }, { passive: false });
});

// Close all open card details
function closeAllDetails() {
    const openHeaders = document.querySelectorAll('.project-header.active');
    openHeaders.forEach(header => {
        header.classList.remove('active');
        const details = header.nextElementSibling;
        if (details) {
            details.style.height = '0';
        }
    });
}

// Toggle project details
function toggleDetails(element) {
    const isCurrentlyActive = element.classList.contains('active');
    
    // Close all other open card details
    closeAllDetails();
    
    // If this card wasn't active, open it
    if (!isCurrentlyActive) {
        element.classList.add('active');
        const details = element.nextElementSibling;
        if (details) {
            details.style.height = details.scrollHeight + 'px';
        }
    }
}

// Scroll to a specific project by index
function scrollToProject(index) {
    const track = document.querySelector('.projects-track');
    const cards = document.querySelectorAll('.project-card');
    
    closeAllDetails(); // Always close details, even if the index is invalid

    if (index >= 0 && index < cards.length) {
        const isMobile = window.innerWidth <= 768;
        const gap = isMobile ? 16 : 32;
        const cardWidth = cards[0].offsetWidth + gap;
        const scrollPosition = cardWidth * index;
        track.scrollTo({ 
            left: scrollPosition, 
            behavior: 'smooth' 
        });
    }
}

// Get the current visible card index
function getCurrentCardIndex() {
    const track = document.querySelector('.projects-track');
    const cards = document.querySelectorAll('.project-card');
    const isMobile = window.innerWidth <= 768;
    const gap = isMobile ? 16 : 32;
    const cardWidth = cards[0].offsetWidth + gap;
    const currentScroll = track.scrollLeft;
    return Math.round(currentScroll / cardWidth);
}

// Scroll to next project
function scrollToNextProject() {
    const currentIndex = getCurrentCardIndex();
    const nextIndex = currentIndex + 1;
    scrollToProject(nextIndex);
}

// Scroll to previous project
function scrollToPrevProject() {
    const currentIndex = getCurrentCardIndex();
    const prevIndex = currentIndex - 1;
    scrollToProject(prevIndex);
}

// Close card details when clicking outside the card
document.addEventListener('click', (e) => {
    const isCardHeader = e.target.closest('.project-header'); // Check if the click is on a card header
    const isCardContent = e.target.closest('.project-details'); // Check if the click is on the card details

    // If the click is not on the card header or card details, close all details
    if (!isCardHeader && !isCardContent) {
        closeAllDetails();
    }
});

// Keyboard navigation with arrow keys
document.addEventListener('keydown', (e) => {
    // Only trigger if not typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToPrevProject();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToNextProject();
    }
});