/* global data */
/* exported data */
var $photo = document.querySelector('#photo');
var $img = document.querySelector('img');
var $form = document.querySelector('form');

$photo.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  $img.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var newObject = {
    title: $form.elements.title.value,
    url: $form.elements.photo.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newObject);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
