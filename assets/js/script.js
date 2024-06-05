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

    updateDots();



    const sections = document.querySelectorAll('.card-wrapper');
    const navLinks = document.querySelectorAll('.sidebar-navigation a');

    const observerOptions = {
        threshold: 0.8
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const id = entry.target.getAttribute('id');
                document.querySelector(`.sidebar-navigation a[href="#${id}"]`).classList.add('active');
            } else {
                entry.target.classList.remove('visible');
                const id = entry.target.getAttribute('id');
                document.querySelector(`.sidebar-navigation a[href="#${id}"]`).classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    }, false);

    const body = document.body;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        console.log('ScrollY value:', scrollPosition); // Log the scrollY value

        const scrollFraction = Math.min(scrollPosition / maxScroll, 1);

        // Calculate the animation progress based on scroll position
        const animationDuration = 20; // Animation duration in seconds
        const animationProgress = scrollFraction * animationDuration;

        // Update the animation progress
        body.style.animationPlayState = 'running';
        body.style.animationDelay = `-${animationProgress}s`; // Adjust based on animation duration
    });
    
    //signup form  hover effect
    const button = document.querySelector(".contact .cta-button");
    const hoverText = document.querySelector("form h2");

    button.addEventListener("mouseover", () => {
        hoverText.classList.add("hovered");
    });

    button.addEventListener("mouseout", () => {
        hoverText.classList.remove("hovered");
    });
    
});
