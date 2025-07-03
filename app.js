let notes = [];
let editingNoteId = null;

function loadNotes() {
  const savedNotes = localStorage.getItem("quickNotes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault();

  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (editingNoteId) {
    // Update existing note
    const noteIndex = notes.findIndex((note) => note.id === editingNoteId);
    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title,
      content: content,
    };
  } else {
    notes.unshift({
      id: generateId(),
      title: title,
      content: content,
    });
  }

  console.log(`New Note Added: ${title}`);

  closeNoteDialog();
  saveNotes();
  renderNotes();
}

function deleteNote(noteId) {
  const noteToDelete = notes.find((note) => note.id == noteId);
  notes = notes.filter((note) => note.id != noteId);

  if (noteToDelete) {
    console.log(`Note Deleted: ${noteToDelete.title}`);
  } else {
    console.log(`Note Deleted: (unknown title)`);
  }
  saveNotes();
  renderNotes();
}

const generateId = () => {
  return Date.now().toString();
};

function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");
  if (notes.length === 0) {
    notesContainer.innerHTML = `
        <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
        </div>
        `;

    return;
  }

  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
        <h3 class="note-title">${note.title}</h3>
        <p class="note-content">${note.content}</p>
        <div class="note-actions">
          <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
            <i class="material-symbols-outlined">cancel</i>
          </button>
        </div>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".note-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".delete-btn")) return;
      const noteId = this.getAttribute("data-note-id");
      openNoteDialog(noteId);
    });
  });
}

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById("noteDialog");
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");

  if (noteId) {
    // Edit Note
    const noteToEdit = notes.find((note) => note.id === noteId);
    editingNoteId = noteId;
    document.getElementById("dialogTitle").textContent = "Edit Note";
    titleInput.value = noteToEdit.title;
    contentInput.value = noteToEdit.content;
  } else {
    // Add Note
    editingNoteId = null;
    document.getElementById("dialogTitle").textContent = "Add Note";
    titleInput.value = "";
    contentInput.value = "";
  }

  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  document.getElementById("noteDialog").close();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("themeToggleBtn").textContent = isDark ? "🌞" : "🌙";
}

function applyStoredTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    document.getElementById("themeToggleBtn").textContent = "🌞";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  applyStoredTheme();
  notes = loadNotes();
  renderNotes();

  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document
    .getElementById("themeToggleBtn")
    .addEventListener("click", toggleTheme);

  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});
