class SliderView {
  _sliders = document.querySelectorAll('.slider-box');
  constructor() {
    // Adding event listeners for each slider
    this._sliders.forEach(slider => {
      slider.addEventListener(
        'wheel',
        this._handleSliderScroll.bind(this, slider)
      );
    });
  }

  _handleSliderScroll(slider, e) {
    // Determining scroll direction (1 = down | -1 = up)
    const delta = Math.sign(e.deltaY);

    // Controlling the scroll speed
    const scrollAmount = 25;

    // Scrolling in the X direction
    slider.scrollLeft += delta * scrollAmount;

    // Preventing default scrolling behavior
    e.preventDefault();
  }
}

export default new SliderView();
