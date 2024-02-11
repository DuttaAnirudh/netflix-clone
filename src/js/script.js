'use strict';

// VARIABLES
const searchBtn = document.querySelector('.search__icon');
const searchField = document.querySelector('.search__field');

// EVENT LISTENERS
// Focusing on search input field when clicking on search icon
searchBtn.addEventListener('click', () => {
  searchField.focus();
});
