// BUG: Functional - Menu button logic is flawed
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    // Intentionally doing nothing or toggling a wrong class
    console.log('Menu clicked');
    // mobileMenu.classList.toggle('active'); // This line is missing/commented out
});
