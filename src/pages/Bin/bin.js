document.addEventListener("DOMContentLoaded", function () {
	const binContainer = document.getElementById("bin-container");
	const binNotes = localStorage.getItem("binNotes") || "[]";
	const binNotesArray = JSON.parse(binNotes);
  
	binNotesArray.forEach(function (note) {
	  createDeletedNoteElement(note);
	});
  
	function createDeletedNoteElement(note) {
	  const noteElement = document.createElement("div");
	  noteElement.className = "bin-note";
	  
	  if (note.text) {
		const noteContent = document.createElement("p");
		noteContent.textContent = note.text;
		noteElement.appendChild(noteContent);
	  }
  
	  if (note.images && note.images.length > 0) {
		note.images.forEach(function (image) {
		  const imgElement = document.createElement("img");
		  imgElement.src = image;
		  noteElement.appendChild(imgElement);
		});
	  }
  
	  binContainer.appendChild(noteElement);
	}
  });
  