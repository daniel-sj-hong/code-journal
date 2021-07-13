/* global data */
/* exported data */
var $photo = document.querySelector('#photo');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $li = document.querySelector('li');

$photo.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleLoad);

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

function renderTree(newObject) {
  var $li = document.createElement('li');

  var $rowOne = document.createElement('div');
  $rowOne.setAttribute('class', 'row');
  $li.appendChild($rowOne);

  var $columnHalfOne = document.createElement('div');
  $columnHalfOne.setAttribute('class', 'column-half');
  $rowOne.appendChild($columnHalfOne);

  var $img = document.createElement('img');
  $img.setAttribute('src', newObject.url);
  $columnHalfOne.appendChild($img);

  var $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.setAttribute('class', 'column-half');
  $rowOne.appendChild($columnHalfTwo);

  var $rowTwo = document.createElement('div');
  $rowTwo.setAttribute('class', 'row');
  $columnHalfTwo.appendChild($rowTwo);

  var $h3 = document.createElement('h3');
  $h3.textContent = newObject.title;
  $rowTwo.appendChild($h3);

  var $rowThree = document.createElement('div');
  $rowThree.setAttribute('class', 'row');
  $columnHalfTwo.appendChild($rowThree);

  var $p = document.createElement('p');
  $p.textContent = newObject.notes;
  $rowThree.appendChild($p);

  return $li;
}

function handleLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var value = renderTree(data.entries[i]);
    $li.appendChild(value);
  }
}
