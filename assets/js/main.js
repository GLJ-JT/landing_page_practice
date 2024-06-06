document.addEventListener("DOMContentLoaded", () => {
    const svgNS = "http://www.w3.org/2000/svg";
    const dotsContainer = document.getElementById("dots-container");
    const numDots = 50; // Number of dots to create
    const dots = [];

    // Create dots and store them in an array
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElementNS(svgNS, "circle");
        const cx = Math.random() * 100;
        const cy = Math.random() * 100;
        const r = Math.random() * 3 + 2;
        const duration = Math.random() * 3 + 2;

        dot.setAttribute("class", "dot");
        dot.setAttribute("cx", `${cx}%`);
        dot.setAttribute("cy", `${cy}%`);
        dot.setAttribute("r", r);
        dot.style.animation = `float ${duration}s infinite ease-in-out alternate`;
        dot.style.animationDelay = `${Math.random() * 5}s`;

        dotsContainer.appendChild(dot);
        dots.push({
            element: dot,
            x: cx,
            y: cy,
            vx: 0,
            vy: 0,
            r: r
        });
    }

    document.addEventListener("mousemove", (event) => {
        const rect = dotsContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        dots.forEach(dot => {
            const dx = mouseX - (dot.x / 100 * rect.width);
            const dy = mouseY - (dot.y / 100 * rect.height);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = Math.max(0, 100 - distance) / 100; // Force decreases with distance

            const acceleration = force * 0.05; // Adjust this value for acceleration strength

            dot.vx += (dx / distance) * acceleration;
            dot.vy += (dy / distance) * acceleration;
        });
    });

    function updateDots() {
        const friction = 0.98; // Friction coefficient
        const randomFactor = 0.001; // Factor to add random movement

        dots.forEach(dot => {
            dot.vx *= friction;
            dot.vy *= friction;

            // Add some random movement
            dot.vx += (Math.random() - 0.5) * randomFactor;
            dot.vy += (Math.random() - 0.5) * randomFactor;

            dot.x += dot.vx;
            dot.y += dot.vy;

            // Ensure dots stay within the bounds
            if (dot.x < 0) dot.x = 0;
            if (dot.x > 100) dot.x = 100;
            if (dot.y < 0) dot.y = 0;
            if (dot.y > 100) dot.y = 100;

            dot.element.setAttribute("cx", `${dot.x}%`);
            dot.element.setAttribute("cy", `${dot.y}%`);
        });

        requestAnimationFrame(updateDots);
    }

    //banner text wrapper fade out
    document.addEventListener('scroll', () => {
        const banner = document.querySelector('.banner-wrapper');
        const maxScroll = 300; // Maximum scroll distance for the effect
        const scrollY = window.scrollY;
        const opacity = Math.max(1 - scrollY / maxScroll, 0);
        banner.style.opacity = opacity;
    });

    updateDots();

    //responsive on scroll side bar
    const sections = document.querySelectorAll('.card-wrapper');
    const navLists = document.querySelectorAll('.sidebar-navigation li a');

    let lastScrollTop = 0;
    let scrollDirection = 'down';

    const observerOptions = {
        threshold: 0.8
    };

    const observer = new IntersectionObserver((entries, observer) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('invisible');
                if (scrollDirection === 'down') {
                    entry.target.classList.remove('up');
                    entry.target.classList.add('down');
                } else {
                    entry.target.classList.remove('down');
                    entry.target.classList.add('up');
                }
                navLists.forEach(navItem => {
                    if (navItem.getAttribute('href') === `#${id}`) {
                        navItem.parentElement.classList.add('active');
                    } else {
                        navItem.parentElement.classList.remove('active');
                    }
                });
                document.querySelector(`.sidebar-navigation li[id="${id}"]`).classList.add('active');
            } else {
                entry.target.classList.remove('visible');
                entry.target.classList.add('invisible');
                if (scrollDirection === 'down') {
                    entry.target.classList.add('down');
                    entry.target.classList.remove('up');
                } else {
                    entry.target.classList.add('up');
                    entry.target.classList.remove('down');
                }
                document.querySelector(`.sidebar-navigation li[id="${id}"]`).classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Throttling function
    function throttle(fn, wait) {
        let time = Date.now();
        return function () {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        }
    }

    window.addEventListener('scroll', throttle(() => {

        document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    }, 100)); // Adjust the throttle delay as needed (100ms in this case)



    //bank card on scroll animation 1
    const object = document.querySelector('.landing-container');
    const backgroundAnimation = document.querySelector('.background-animation');
    const heroOverlay = document.querySelector('.hero_overlay');
    const maxScroll = window.innerHeight * 2; // Set max scroll height as 200vh
    const midScroll = window.innerHeight; // 100vh
    const fadeStart = window.innerHeight * 1; // 100vh
    const fadeEnd = maxScroll * 0.7; // 140vh
    const midVW = 0.5 * window.innerWidth; // Calculate 0.5 * viewport width

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        let transform = '';
        let opacity = 1; // Default opacity
        let heroOpacity = 0; // Default hero background opacity

        if (scrollPosition <= midScroll * 0.5) {
            // 0-100vh: Translate on x-axis
            const translateX = Math.min(scrollPosition * 2, midVW);
            transform = `translateX(${-translateX*0.5}px)`;
        } else if (scrollPosition <= maxScroll) {
            // 100-200vh: Scale up while keeping x-translate at midVW
            const scalePosition = scrollPosition - midScroll * 0.5;
            const scale = 1 + scalePosition / midScroll * 2; // Scale from 1 to 3
            transform = `translateX(${-midVW*0.5}px) scale(${scale})`;
            const fadeFraction = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
            opacity = 1 - fadeFraction;
            heroOpacity = fadeFraction; // Opacity increases from 0 to 1
        }
        else {
            const scale = 0
            transform = `scale(${scale})`;
        }

        // Apply the transformation and opacity
        object.style.transform = transform;
        object.style.opacity = opacity;
        backgroundAnimation.style.opacity = opacity;

        // Apply the background opacity change to hero pseudo-element
        heroOverlay.style.opacity = heroOpacity;
    });


    //signup-form hover effect
    const button = document.querySelector(".contact .cta-button");
    const hoverText = document.querySelector("form h2");

    button.addEventListener("mouseover", () => {
        hoverText.classList.add("hovered");
    });

    button.addEventListener("mouseout", () => {
        hoverText.classList.remove("hovered");
    });

});
