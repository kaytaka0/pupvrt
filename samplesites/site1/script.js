document.getElementById('broken-btn').addEventListener('click', function (e) {
    e.preventDefault();
    // BUG: No action taken, console error maybe?
    console.error("Uncaught TypeError: Cannot read property 'submit' of undefined");
});
