document.getElementById('load-more').addEventListener('click', () => {
    // Fetch non-existent resource
    fetch('/api/more-items')
        .then(res => {
            if (!res.ok) throw new Error('404 Not Found');
            return res.json();
        })
        .catch(err => console.error(err));
});
