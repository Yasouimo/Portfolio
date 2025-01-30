// Initialize AOS
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

// Get current certificate index
function getCurrentIndex() {
    const track = document.querySelector('.certificates-track');
    const transform = track.style.transform;
    const translateX = transform ? parseInt(transform.match(/-?\d+/)[0]) : 0;
    const cardWidth = document.querySelector('.certification-card').offsetWidth + 32; // Including gap
    return Math.abs(Math.round(translateX / cardWidth));
}

// Scroll to specific certificate
function scrollToCertificate(index) {
    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certification-card');
    
    // Close all open details
    const allHeaders = document.querySelectorAll('.certification-header.active');
    allHeaders.forEach(header => {
        header.classList.remove('active');
        const details = header.nextElementSibling;
        details.style.height = '0';
    });

    if (index >= 0 && index < cards.length) {
        const cardWidth = cards[0].offsetWidth + 32; // Including gap
        const newTransformValue = -cardWidth * index; // Move by one card width
        track.style.transition = 'transform 0.3s ease'; // Add transition for smooth scrolling
        track.style.transform = `translateX(${newTransformValue}px)`;
    }
}

function closeAllDetails() {
    const allDetails = document.querySelectorAll('.certification-details');
    allDetails.forEach(details => {
        details.style.height = '0';
    });

    const allHeaders = document.querySelectorAll('.certification-header.active');
    allHeaders.forEach(header => {
        header.classList.remove('active');
    });
}

// Event listeners for prev/next buttons
document.querySelector('.prev-certificate').addEventListener('click', function() {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
        scrollToCertificate(currentIndex - 1);
    }
});

document.querySelector('.next-certificate').addEventListener('click', function() {
    const currentIndex = getCurrentIndex();
    const totalCards = document.querySelectorAll('.certification-card').length;
    if (currentIndex < totalCards - 1) {
        scrollToCertificate(currentIndex + 1);
    }
});

// Close card details when clicking outside
document.addEventListener('click', (e) => {
    const isCardHeader = e.target.closest('.certification-header');
    const isCardContent = e.target.closest('.certification-details');
    const isNavButton = e.target.closest('.nav-button');
    
    if (!isCardHeader && !isCardContent && !isNavButton) {
        closeAllDetails();
    }
});
