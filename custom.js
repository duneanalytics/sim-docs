// Select all .method-nav-pill elements inside <a> tags
document.querySelectorAll('a .method-nav-pill').forEach(pill => {
    const a = pill.closest('a');
    if (a) {
        // Remove the pill from its current position and append it as the last child of <a>
        pill.remove();
        a.appendChild(pill);
    }
});