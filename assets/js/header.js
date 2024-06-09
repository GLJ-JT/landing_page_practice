document.addEventListener("DOMContentLoaded", () => {
    const outerHeader = document.getElementById('outerHeader');
    const header = document.querySelector('.header-wrapper header');
    const headerButton = document.querySelector('.header-wrapper header .cta-button')
    const headerLogo = document.querySelector('.header-wrapper header .logo')
    
    const headerLogo2 = document.querySelector('.header-wrapper header .logo2 .logo')
    const headerNavText = document.querySelector('.header-wrapper header .nav')

    // Handle shrinking header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
            outerHeader.classList.add('shrink');
            headerButton.classList.add('shrink');
            headerLogo.classList.add('shrink');
            headerLogo2.classList.add('shrink');
            headerNavText.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
            outerHeader.classList.remove('shrink');
            headerButton.classList.remove('shrink');
            headerLogo.classList.remove('shrink');
            headerLogo2.classList.remove('shrink');
            headerNavText.classList.remove('shrink');
        }
    });
});