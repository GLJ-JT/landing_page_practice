// script.js

document.addEventListener("DOMContentLoaded", () => {
    function createSlideUI() {
        const slideUI = document.createElement('div');
        slideUI.classList.add('slideUI');

        const prevButton = document.createElement('button');
        prevButton.classList.add('prev');
        prevButton.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
        `;

        const nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
        `;

        const pageIndicator = document.createElement('div');
        pageIndicator.classList.add('page-indicator');
        
        for (let i = 0; i < numIndicators; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dash');
            if (i === 0) dot.classList.add('active');
            pageIndicator.appendChild(dot);
        }

        slideUI.append(prevButton, pageIndicator, nextButton);

        return slideUI;
    }

    // Get the number of .service-card elements
    const slides = document.querySelectorAll('.service-card');
    const numIndicators = Math.ceil(slides.length / 2);

    // Inject slideUI into the specified container
    const sliderContainer = document.getElementById('slider-container');
    const slideUI = createSlideUI(numIndicators);
    sliderContainer.appendChild(slideUI);

});