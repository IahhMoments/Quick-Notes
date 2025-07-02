let notes = [];

function openNoteDialog() {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  document.getElementById("noteDialog").close();
}
