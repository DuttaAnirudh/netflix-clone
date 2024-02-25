class NavigationView {
  _overlayBox = document.querySelector('.overlay');
  _navigationToggle = document.getElementById('navi-toggle');
  _searchBtn = document.querySelector('.search__icon');
  _searchField = document.querySelector('.search__field');
  _body = document.querySelector('.main');

  constructor() {
    // Adding event listener for navigation toggle
    // Add overlay to body when navigation menu is open
    this._navigationToggle.addEventListener(
      'click',
      this._handleNavigationToggleOverlay.bind(this, this._navigationToggle)
    );

    // Adding event listener for overlaybox
    // Close navigation menu when on click on overlay
    this._overlayBox.addEventListener(
      'click',
      this._handleCloseNavigationToggle.bind(this, this._navigationToggle)
    );

    // Adding event listener to search icon
    // focus on search input box when search icon is clicked
    this._searchBtn.addEventListener(
      'click',
      this._handleSearchBarFocus.bind(this)
    );
  }

  // Adding overlay when menu icon is clicked
  _handleNavigationToggleOverlay(navigationToggle, e) {
    if (navigationToggle.checked) {
      this._overlayBox.classList.add('overlay--active');
    } else {
      this._overlayBox.classList.remove('overlay--active');
    }
  }

  // Closing Menu when someone clicks outside of menu-list
  _handleCloseNavigationToggle(navigationToggle, e) {
    if (navigationToggle.checked) {
      this._navigationToggle.checked = false;
      this._overlayBox.classList.remove('overlay--active');
    }
  }

  // Focusing on search input field when clicking on search icon
  _handleSearchBarFocus() {
    this._searchField.focus();
  }
}

export default new NavigationView();
