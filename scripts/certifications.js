// Initialize AOS with longer duration
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certification-card');
    const cardWidth = cards[0].offsetWidth + 32; // Include gap

    let isScrolling = false;
    let scrollTimeout;

    // Handle scroll snapping
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            const currentScroll = track.scrollLeft;
            const nearestIndex = Math.round(currentScroll / cardWidth);
            const snapPosition = nearestIndex * cardWidth;

            if (!isScrolling) {
                track.scrollTo({ 
                    left: snapPosition, 
                    behavior: 'smooth' 
                });
            }
        }, 150); // Slightly longer delay for better user experience
    });

    // Handle wheel scrolling
    track.addEventListener('wheel', (e) => {
        isScrolling = true;
        
        const scrollAmount = e.deltaY * 0.5; // Reduce scroll sensitivity
        track.scrollLeft += scrollAmount;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);

        e.preventDefault();
    }, { passive: false });
});

// Toggle certificate details
function toggleDetails(element) {
    closeAllDetails(); // Close all other open card details

    element.classList.toggle('active');
    const details = element.nextElementSibling;

    if (details.style.height === '0px' || !details.style.height) {
        details.style.height = details.scrollHeight + 'px';
    } else {
        details.style.height = '0';
    }
}

// Close all open card details
function closeAllDetails() {
    const openHeaders = document.querySelectorAll('.certification-header.active');
    openHeaders.forEach(header => {
        header.classList.remove('active');
        const details = header.nextElementSibling;
        details.style.height = '0';
    });
}

// Scroll to a specific certificate by index
function scrollToCertificate(index) {
    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certification-card');
    
    closeAllDetails(); // Always close details, even if the index is invalid

    if (index >= 0 && index < cards.length) {
        const cardWidth = cards[0].offsetWidth + 32; // Include gap
        const scrollPosition = cardWidth * index;
        track.scrollTo({ 
            left: scrollPosition, 
            behavior: 'smooth' 
        });
    }
}

// Get the current visible card index
function getCurrentCardIndex() {
    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certification-card');
    const cardWidth = cards[0].offsetWidth + 32; // Include gap
    const currentScroll = track.scrollLeft;
    return Math.round(currentScroll / cardWidth);
}

// Scroll to next certificate
function scrollToNextCertificate() {
    const currentIndex = getCurrentCardIndex();
    const nextIndex = currentIndex + 1;
    scrollToCertificate(nextIndex);
}

// Scroll to previous certificate
function scrollToPrevCertificate() {
    const currentIndex = getCurrentCardIndex();
    const prevIndex = currentIndex - 1;
    scrollToCertificate(prevIndex);
}

// Prevent card collapse on arrow click
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to the card header
    });
});

// Ensure only one card's details are open at a time
document.querySelectorAll('.certification-header').forEach(header => {
    header.addEventListener('click', () => {
        closeAllDetails(); // Close all other card details
        toggleDetails(header); // Open the clicked card's details
    });
});

// Close card details when clicking outside the card
document.addEventListener('click', (e) => {
    const isCardHeader = e.target.closest('.certification-header'); // Check if the click is on a card header
    const isCardContent = e.target.closest('.certification-details'); // Check if the click is on the card details

    // If the click is not on the card header or card details, close all details
    if (!isCardHeader && !isCardContent) {
        closeAllDetails();
    }
});