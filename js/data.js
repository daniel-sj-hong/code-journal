/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntryJSON = localStorage.getItem('entry');

if (previousEntryJSON !== null) {
  data = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', handleJSON);

function handleJSON(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('entry', entriesJSON);
}
