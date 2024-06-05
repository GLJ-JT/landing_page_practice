// script.js

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.service-card');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dash');
    const sliderContainer = document.querySelector('.card-container');

    let currentIndex = 0;

    function updateSliderPosition() {
        const offset = currentIndex * -50; // Since each card is 50% of the container width
        sliderContainer.style.transform = `translateX(${offset}%)`;
        updateButtonStates();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateButtonStates() {
        const maxIndex = Math.ceil((slides.length - 2) / 2); // Adjust maxIndex for partial last slide
        console.log(`currentIndex: ${currentIndex}, maxIndex: ${maxIndex}`);
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === maxIndex;
        prevButton.classList.toggle('inactive', currentIndex === 0);
        nextButton.classList.toggle('inactive', currentIndex === maxIndex);
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateSliderPosition();
            updateDots();
        }
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = Math.ceil((slides.length - 2) / 2); // Adjust maxIndex for partial last slide
        if (currentIndex < maxIndex) {
            currentIndex += 1;
            updateSliderPosition();
            updateDots();
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSliderPosition();
            updateDots();
        });
    });
    updateButtonStates();
});

