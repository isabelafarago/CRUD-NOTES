document.addEventListener("DOMContentLoaded", function () {
	const notesContainer = document.getElementById("notes-container");
	const pinnedNotesContainer = document.getElementById("pinned-notes-container");
	const archivedNotesContainer = document.getElementById("archived-notes-container");
	const binNotesContainer = document.getElementById("bin-notes-container");
	const noteInput = document.getElementById("note-input");
	const addButton = document.getElementById("add-button");
	const imageInput = document.getElementById("image-input");
	const imageContainer = document.getElementById("image-container");

	addButton.addEventListener("click", function () {
		const noteText = noteInput.value.trim();
		const files = imageInput.files;

		if (noteText !== "" || files.length > 0) {
			createNoteElement(noteText, files);
			noteInput.value = "";
			imageInput.value = "";
			imageContainer.innerHTML = "";
		}
	});

	imageInput.addEventListener("change", handleImageSelect);

	noteInput.addEventListener("paste", function (event) {
		handlePaste(event);
	});

	function handlePaste(event) { //in progress
		const clipboardData = event.clipboardData || window.clipboardData;
		const pastedContent = clipboardData.getData("Text");
		const pastedFiles = Array.from(clipboardData.files || []);

		if (pastedContent.trim() !== "" || pastedFiles.length > 0) {
			createNoteElement(pastedContent, pastedFiles);
		}
	}

	function handleImageSelect(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      displayImage(file, imageContainer);
    }
  }
  

  function createNoteElement(noteText, files) {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    const noteContent = document.createElement("div");
    noteContent.className = "note-content";
    noteContent.textContent = noteText;
    noteElement.appendChild(noteContent);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        displayImage(file, noteElement);
      }
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    noteElement.appendChild(deleteButton);

    const pinButton = document.createElement("button");
    pinButton.className = "pin-button";
    pinButton.innerHTML = '<i class="fas fa-thumbtack"></i>';
    noteElement.appendChild(pinButton);

    const archiveButton = document.createElement("button");
    archiveButton.className = "archive-button";
    archiveButton.innerHTML = '<i class="fas fa-folder"></i>';
    noteElement.appendChild(archiveButton);

    pinButton.addEventListener("click", function () {
      noteElement.classList.toggle("pinned");
      noteElement.classList.toggle("note");
      if (noteElement.classList.contains("pinned")) {
        pinnedNotesContainer.appendChild(noteElement);
        archiveButton.style.display = "none";
      } else {
        notesContainer.appendChild(noteElement);
        archiveButton.style.display = "inline-block";
      }
    });

    archiveButton.addEventListener("click", function () {
      noteElement.classList.toggle("archived");
      noteElement.classList.toggle("note");
      if (noteElement.classList.contains("archived")) {
        archivedNotesContainer.appendChild(noteElement);
        pinButton.style.display = "none";
      } else {
        notesContainer.appendChild(noteElement);
        pinButton.style.display = "inline-block";
      }
    });

    deleteButton.addEventListener("click", function () {
      if (noteElement.classList.contains("archived")) {
        archivedNotesContainer.removeChild(noteElement);
      } else if (noteElement.classList.contains("pinned")) {
        pinnedNotesContainer.removeChild(noteElement);
      } else {
        notesContainer.removeChild(noteElement);
      }
    });

    notesContainer.appendChild(noteElement);
  }

  function displayImage(file, container) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.classList.add("note-image"); 
      container.appendChild(img);
    };
    reader.readAsDataURL(file);
    
  }
  function saveDeletedNoteToBin(noteText) {
    if (binNotesContainer) {
      const noteElement = document.createElement("div");
      noteElement.className = "bin-note";
      noteElement.textContent = noteText;
      binNotesContainer.appendChild(noteElement);

      const millisecondsInDay = 24 * 60 * 60 * 1000; 
      const millisecondsToWait = 30 * millisecondsInDay; 

      setTimeout(function () {
        noteElement.remove(); 
      }, millisecondsToWait);
    }
  }
}); 