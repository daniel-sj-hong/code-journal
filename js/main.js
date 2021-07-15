/* global data */
/* exported data */
var $photo = document.querySelector('#photo');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $entries = document.querySelector('.entries');
var $input = document.querySelectorAll('.input');
var $noEntries = document.querySelector('.none');
var $newButton = document.querySelector('.new-button');

$photo.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleLoad);
$entries.addEventListener('click', handleClick);
$newButton.addEventListener('click', handleNew);

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
  $ul.prepend(renderTree(newObject));
  handleClick();
}

function renderTree(newObject) {
  var $li = document.createElement('li');

  var $rowOne = document.createElement('div');
  $rowOne.setAttribute('class', 'row');
  $li.appendChild($rowOne);

  var $outerColumnHalfOne = document.createElement('div');
  $outerColumnHalfOne.setAttribute('class', 'column-half');
  $rowOne.appendChild($outerColumnHalfOne);

  var $img = document.createElement('img');
  $img.setAttribute('src', newObject.url);
  $img.className = 'entry-image';
  $outerColumnHalfOne.appendChild($img);

  var $outerColumnHalfTwo = document.createElement('div');
  $outerColumnHalfTwo.setAttribute('class', 'column-half');
  $rowOne.appendChild($outerColumnHalfTwo);

  var $rowTwo = document.createElement('div');
  $rowTwo.setAttribute('class', 'row space-between align-center');
  $outerColumnHalfTwo.appendChild($rowTwo);

  var $h3 = document.createElement('h3');
  $h3.textContent = newObject.title;
  $rowTwo.appendChild($h3);

  var $i = document.createElement('i');
  $i.setAttribute('class', 'fas fa-pen pen');
  $rowTwo.appendChild($i);

  var $rowThree = document.createElement('div');
  $rowThree.setAttribute('class', 'row');
  $outerColumnHalfTwo.appendChild($rowThree);

  var $p = document.createElement('p');
  $p.textContent = newObject.notes;
  $rowThree.appendChild($p);

  return $li;
}

function handleLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var value = renderTree(data.entries[i]);
    $ul.appendChild(value);
  }
}

switchView();

function handleClick(event) {
  data.view = 'entries';
  if (data.view === 'entries') {
    switchView();
  }
}

function handleNew(event) {
  data.view = 'entry-form';
  if (data.view === 'entry-form') {
    switchView();
  }
}

function switchView(event) {
  if (data.entries.length === 0) {
    $noEntries.className = 'row none';
  } else {
    $noEntries.className = 'row hidden none';
  }
  for (var i = 0; i < $input.length; i++) {
    var view = $input[i].getAttribute('data-view');
    if (data.view === view) {
      $input[i].className = 'input';
    } else {
      $input[i].className = 'input hidden';
    }
  }
}
