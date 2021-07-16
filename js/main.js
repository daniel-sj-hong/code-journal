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
$ul.addEventListener('click', handleEdit);

function handleInput(event) {
  $img.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = {
          title: $form.elements.title.value,
          url: $form.elements.photo.value,
          notes: $form.elements.notes.value,
          entryId: data.editing.entryId
        };
        renderSingleEntry();
      }
    }
  } else {
    var newObject = {
      title: $form.elements.title.value,
      url: $form.elements.photo.value,
      notes: $form.elements.notes.value,
      entryId: data.nextEntryId
    };
    data.entries.unshift(newObject);
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    $ul.prepend(renderTree(newObject));
    handleClick();
    data.nextEntryId++;
  }
  data.view = 'entries';
  switchView();
}

function renderSingleEntry(event) {
  var $li = document.createElement('li');
  $ul.appendChild($li);

  var $rowOne = document.createElement('div');
  $rowOne.setAttribute('class', 'row');
  $li.appendChild($rowOne);

  var $columnHalfOne = document.createElement('div');
  $columnHalfOne.setAttribute('class', 'column-half');
  $rowOne.appendChild($columnHalfOne);

  var $img = document.createElement('img');
  $img.setAttribute('src', data.entries.url);
  $img.className = 'entry-image';
  $columnHalfOne.appendChild($img);

  var $columnHalftwo = document.createElement('div');
  $columnHalftwo.setAttribute('class', 'column-half');
  $rowOne.appendChild($columnHalftwo);

  var $rowTwo = document.createElement('div');
  $rowTwo.setAttribute('class', 'row space-between align-center');
  $columnHalftwo.appendChild($rowTwo);

  var $h3 = document.createElement('h3');
  $h3.textContent = data.entries.title;
  $rowTwo.appendChild($h3);

  var $i = document.createElement('i');
  $i.setAttribute('class', 'fas fa-pen pen');
  $i.setAttribute('data-view-id', data.nextEntryId);
  $rowTwo.appendChild($i);

  var $rowThree = document.createElement('div');
  $rowThree.setAttribute('class', 'row');
  $columnHalftwo.appendChild($rowThree);

  var $p = document.createElement('p');
  $p.textContent = data.entries.notes;
  $rowThree.appendChild($p);

  return $li;
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
  $img.className = 'entry-image';
  $columnHalfOne.appendChild($img);

  var $columnHalftwo = document.createElement('div');
  $columnHalftwo.setAttribute('class', 'column-half');
  $rowOne.appendChild($columnHalftwo);

  var $rowTwo = document.createElement('div');
  $rowTwo.setAttribute('class', 'row space-between align-center');
  $columnHalftwo.appendChild($rowTwo);

  var $h3 = document.createElement('h3');
  $h3.textContent = newObject.title;
  $rowTwo.appendChild($h3);

  var $i = document.createElement('i');
  $i.setAttribute('class', 'fas fa-pen pen');
  $i.setAttribute('data-view-id', data.nextEntryId);
  $rowTwo.appendChild($i);

  var $rowThree = document.createElement('div');
  $rowThree.setAttribute('class', 'row');
  $columnHalftwo.appendChild($rowThree);

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
  data.editing = null;
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

function handleEdit(event) {
  if (event.target.matches('.pen')) {
    data.view = 'entry-form';
    switchView();
    var closest = event.target.closest('i');
    var viewId = closest.getAttribute('data-view-id');
    var parseViewId = parseInt(viewId);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseViewId) {
        data.editing = data.entries[i];
      }
    }
    $form.elements.title.value = data.editing.title;
    $form.elements.photo.value = data.editing.url;
    $form.elements.notes.value = data.editing.notes;
    $img.setAttribute('src', data.editing.url);
  }
}
