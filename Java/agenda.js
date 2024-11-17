const dateInput = document.getElementById("date");
const noteInput = document.getElementById("note");
const saveButton = document.getElementById("save-button");
const viewEventsButton = document.getElementById("view-events");
const deleteNoteButton = document.getElementById("delete-note");
const deleteAllButton = document.getElementById("delete-all");
const eventListContainer = document.getElementById("event-list");
const eventsList = document.getElementById("events");


const notes = JSON.parse(localStorage.getItem("notes")) || {};


dateInput.addEventListener("change", () => {
    const date = dateInput.value;
    noteInput.value = notes[date] || "";
});


saveButton.addEventListener("click", () => {
    const date = dateInput.value;
    const note = noteInput.value;

    if (!date) {
        alert("Por favor, selecciona una fecha.");
        return;
    }

    if (note.trim()) {
        notes[date] = note;
        localStorage.setItem("notes", JSON.stringify(notes));
        alert("Nota guardada.");
    } else {
        alert("No puedes guardar una nota vacía.");
    }
});

// Mostrar eventos guardados
viewEventsButton.addEventListener("click", () => {
    eventsList.innerHTML = ""; // Limpiar la lista de eventos
    Object.keys(notes).forEach(date => {
        const listItem = document.createElement("li");
        listItem.textContent = date;
        listItem.addEventListener("click", () => {
            dateInput.value = date;
            noteInput.value = notes[date];
            eventListContainer.classList.add("hidden");
        });
        eventsList.appendChild(listItem);
    });

    eventListContainer.classList.remove("hidden");
});

// Eliminar la nota actual
deleteNoteButton.addEventListener("click", () => {
    const date = dateInput.value;

    if (!date) {
        alert("Por favor, selecciona una fecha.");
        return;
    }

    if (notes[date]) {
        delete notes[date];
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = "";
        alert(`Nota del ${date} eliminada.`);
    } else {
        alert("No hay nota para esta fecha.");
    }
});

// Eliminar todas las notas
deleteAllButton.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas eliminar todas las notas? Esta acción no se puede deshacer.")) {
        localStorage.removeItem("notes");
        Object.keys(notes).forEach(date => delete notes[date]); // Limpia el objeto en memoria
        noteInput.value = "";
        alert("Todas las notas han sido eliminadas.");
    }
});
