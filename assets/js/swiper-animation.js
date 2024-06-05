document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.swiper-animation-bottom');

    window.addEventListener('scroll', () => {
        elements.forEach((yellowCard) => {
            const yellowCardRect = yellowCard.getBoundingClientRect();

            console.log('Yellow Card Y Position:', yellowCardRect.top); // Log the Y position of the yellow card

            const thresholdStart = 500;
            const thresholdEnd = 300;
            const maxTransform = 300; // Maximum translateY value

            if (yellowCardRect.top <= thresholdStart && yellowCardRect.top >= thresholdEnd) {
                const translateX = ((thresholdStart - yellowCardRect.top) / (thresholdStart - thresholdEnd)) * maxTransform;
                yellowCard.style.transform = `translateX(${translateX - 300}px) translateY(0)`;
            } else if (yellowCardRect.top > thresholdStart) {
                yellowCard.style.transform = 'translateX(-300px) translateY(0)';
            } else if (yellowCardRect.top < thresholdEnd) {
                yellowCard.style.transform = `translateX(0) translateY(0)`;
            }
        });
    });
});