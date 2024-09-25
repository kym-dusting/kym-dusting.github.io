// Array of dynamic text options
const dynamicTexts = ["Developer", "Designer", "Baller", "Learner", "Drummer"];
let currentIndex = 0;

function changeDynamicText() {
    const dynamicText = document.getElementById("dynamic-text");
    const dynamicEmoji = document.getElementById("dynamic-emoji");
    dynamicText.style.opacity = 0; // Fade out the text

    setTimeout(() => {
        dynamicText.textContent = dynamicTexts[currentIndex];
        dynamicEmoji.className = dynamicTexts[currentIndex];
        dynamicText.style.opacity = 1; // Fade in the new text
    }, 250); // Wait for 0.25 seconds for fade out effect

    currentIndex = (currentIndex + 1) % dynamicTexts.length;
}

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.timeline-item');

    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const run = () => items.forEach(item => {
        if (isInViewport(item)) {
            item.classList.add('visible');
        }
    });

    // Run on load
    run();

    // Run on scroll
    window.addEventListener('scroll', run);

    const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--base-color').trim();

    items.forEach((item, index) => {
        const colorAdjustment = index * 10; // Adjust this value as needed
        const newColor = adjustColor(baseColor, colorAdjustment);
        item.style.setProperty('--adjusted-color', newColor);
    });

    const scrollButton = document.querySelector('.scroll-down');
    const scrollIcon = document.querySelector('.scroll-down i');

    scrollButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (scrollIcon.classList.contains('rotate-180')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    });

    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // scrollIcon.classList.remove('fa-chevron-down');
            scrollIcon.classList.add('rotate-180');
        } else {
            scrollIcon.classList.remove('rotate-180');
            // scrollIcon.classList.add('fa-chevron-down');
        }
    });

    const logo = document.querySelector('.logo');
    const ul = logo.querySelector('ul');
    const h1 = logo.querySelector('h1');

    window.addEventListener('scroll', function() {
        if (window.scrollY === 0 || ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
            logo.classList.remove('hidden');
        } else {
            logo.classList.add('hidden');
        }
    });

    h1.addEventListener('click', function() {
        logo.classList.remove('hidden');
    });
});

function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
}

// Initial call to start rotating text
// changeDynamicText();

// Change text every 10 seconds
setInterval(changeDynamicText, 8000);
