/* global data */
/* exported data */
var $photo = document.querySelector('#photo-url');
var $img = document.querySelector('img');

$photo.addEventListener('input', handleInput);

function handleInput(event) {
  $img.setAttribute('src', event.target.value);
}
