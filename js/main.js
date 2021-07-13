/* global data */
/* exported data */
var $photo = document.querySelector('#photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');

$photo.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  $img.setAttribute('src', event.target.value);
}

function handleSubmit(event) {

}
