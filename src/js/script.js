'use strict';

// VARIABLES
const searchBtn = document.querySelector('.search__icon');
const searchField = document.querySelector('.search__field');
const sliders = document.querySelectorAll('#slider');

// EVENT LISTENERS
// Focusing on search input field when clicking on search icon
searchBtn.addEventListener('click', () => {
  searchField.focus();
});

// Scrolling in X direction on mouse scroll
sliders.forEach(slider => {
  slider.addEventListener('wheel', function (e) {
    // Determing scroll direction(1 = down | -1 = up)
    const delta = Math.sign(e.deltaY);

    // Controling the scroll speed
    const scrollAmount = 25;

    slider.scrollLeft += delta * scrollAmount;

    // Prevent Default scrolling behavior
    e.preventDefault();
  });
});
