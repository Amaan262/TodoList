let addBtn = document.querySelector('#add-btn')
let closeBtn = document.querySelector('#close-modal')
let modalContainer = document.querySelector('.modal-container')
let overlay = document.querySelector('#overlay')
let addNoteBtn = document.querySelector('.modal-btn')
let titleInput = document.querySelector('.input-container input')
let descInput = document.querySelector('.input-container textarea')
let container = document.querySelector('.container')
let dltBtn = document.querySelector('.dlt-btn')
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];



showModal = () => {

    overlay.classList.add('overlay')
    modalContainer.style.display = "block"
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)"
    document.querySelector('body').style.overflow = "hidden"
    overlay.style.zIndex = "99"
}
closeModal = () => {

    modalContainer.style.display = "none"
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.0)"
    overlay.style.zIndex = "-1"
    document.querySelector('body').style.overflow = "auto"

    titleInput.value = "";
    descInput.value = "";
}



addNote = () => {

    let title = titleInput.value.trim(),
        description = descInput.value.trim();
    if (title || description) {
        
    let currentDate = new Date(),
        day = currentDate.getDate(),
        month = months[currentDate.getMonth()].slice(0, 3),
        year = currentDate.getFullYear(),
        hour = currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours(),
        minutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes(),
        Am_PM = currentDate.getHours() > 12 ? 'PM' : "AM";

    // localStorage.setItem(title, description)
    let newNote = { title, description, date: `${month}, ${day} ${year}&nbsp; ${hour}:${minutes} ${Am_PM}` }

    notes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
    closeModal();
    }
}

deleteNote = (noteId) => {
    let confirmDel = confirm("Are you sure you want to delete this note?")
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes();
}

// dltBtn.addEventListener("click",deleteNote())
showNotes = () => {
    if (notes.length < 1) {
        container.innerHTML = ""
        let boxNote = document.createElement('div')
        boxNote.innerHTML = `<div class="box-note">
        <p class="title">Sorry</p>
        <p class="desc">Nothing to display </p>
        <!-- <hr class="line"> -->
        <div class="box-footer">
        <p class="date"></p>
        <!-- <button class="btn dots">...</button> -->
        </div>
        </div>`
        container.appendChild(boxNote)

    } else {

        container.innerHTML = ""
        notes.forEach((note, id) => {
            let boxNote = document.createElement('div');
            boxNote.innerHTML = `
    <div class="box-note">
    <p class="title">${note.title}</p>
    <p class="desc">${note.description}</p>
    <hr class="line">
    <div class="box-footer">
        <p class="date">${note.date}</p>
        <img onclick="deleteNote(${id})" class="btn dlt-btn" src="delete.png" alt="dlt">
    </div>
    </div>
    `
            container.appendChild(boxNote)
        });


    }


}
showNotes();

clearAllNotes = () => {

    localStorage.clear();
    showNotes();
    location.reload();
}