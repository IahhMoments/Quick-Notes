let notes = [];

function saveNote(event) {
  event.preventDefault();

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  notes.unshift({
    id: generateId(),
    title: title,
    content: content,
  });

  saveNotes();
}

const generateId = () => {
  return Date.now().toString();
};

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}

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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("noteForm").addEventListener("submit", saveNote);

  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});
