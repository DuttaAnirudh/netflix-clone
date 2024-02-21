export const addHandlerSearchValue = function (handler) {
  const form = document.getElementById('search-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputValue = document.getElementById('search-box').value;
    console.log(inputValue);
    return handler(inputValue);
  });
};
