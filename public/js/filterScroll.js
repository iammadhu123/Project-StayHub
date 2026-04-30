function scrollFilters(value) {
    const filters = document.getElementById('filters');
    if (!filters) return;

    filters.scrollBy({
        left: value,
        behavior: 'smooth'
    });
}

function updateScrollButtons() {
    const filters = document.getElementById('filters');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    if (!filters || !leftBtn || !rightBtn) return;

    const scrollLeft = filters.scrollLeft;
    const clientWidth = filters.clientWidth;
    const scrollWidth = filters.scrollWidth;

    const hasOverflow = scrollWidth > clientWidth + 5;

    if (!hasOverflow) {
        leftBtn.classList.remove('visible');
        rightBtn.classList.remove('visible');
        return;
    }

    if (scrollLeft <= 2) {
        leftBtn.classList.remove('visible');
        rightBtn.classList.add('visible');
    } 
    else if (scrollLeft + clientWidth >= scrollWidth - 2) {
        leftBtn.classList.add('visible');
        rightBtn.classList.remove('visible');
    } 
    else {
        leftBtn.classList.add('visible');
        rightBtn.classList.add('visible');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const filters = document.getElementById('filters');

    if (filters) {
        filters.scrollLeft = 0;

        setTimeout(updateScrollButtons, 100);

        filters.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);
    }
});