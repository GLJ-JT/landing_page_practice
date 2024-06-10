//responsive on scroll side bar
const sections = document.querySelectorAll('.card-wrapper');
const navLists = document.querySelectorAll('.sidebar-navigation li a');

let lastScrollTop = 0;
let scrollDirection = 'down';

const observerOptions = {
    threshold: 0.6
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
            // document.querySelector(`.sidebar-navigation li[id="${id}"]`).classList.add('active');
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
            // document.querySelector(`.sidebar-navigation li[id="${id}"]`).classList.remove('active');
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