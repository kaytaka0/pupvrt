// BUG: Functional - Scroll hijacking / sticking
window.addEventListener('scroll', () => {
    if (window.scrollY > 300 && window.scrollY < 600) {
        window.scrollTo(0, 300); // Stuck at 300px
    }
});
