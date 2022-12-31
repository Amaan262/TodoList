const addBtn = document.querySelector('#add-btn')
const dltAllBtn = document.querySelector('#dlt-all')
const closeBtn = document.querySelector('#close-modal')
const modalContainer = document.querySelector('.modal-container')
const overlay = document.querySelector('#overlay')
const submitNoteBtn = document.querySelector("#submit-btn")
const confirm_modal = document.querySelector('.confirm-modal')
const confirmDltBtn = document.querySelector('#confirm-del')
const cancelDelBtn = document.querySelector('#cancel-del')
let titleInput = document.querySelector('.input-container input')
let descInput = document.querySelector('.input-container textarea')
let container = document.querySelector('.container') //
let modalTitle = document.querySelector('#modal-title')

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

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

//All functions 


closeModal = () => {

    modalContainer.style.display = "none"
    overlay.classList.remove('overlay')
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
        let newNote = { title, description, date: `${month}, ${day} ${year} &nbsp; ${hour}:${minutes} ${Am_PM}` }
        if (!isUpdate) {
            notes.unshift(newNote);
        } else {
            isUpdate = false;
            notes[updateId] = newNote;
        }
        // notes.unshift(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
        closeModal();
    }
}



showConfirmModal = () => {
    confirm_modal.classList.add('showConfirm');
    // modalMsg.innerHTML = `${msg}`
    overlay.classList.add('overlay')
    document.querySelector('body').style.overflow = "hidden"


}
DelNote = (noteId) => {
    let confirmDel = confirm("Are you sure you want to delete this Note ?")
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes))
    confirm_modal.classList.remove('showConfirm');
    document.querySelector('body').style.overflow = "auto"
    overlay.classList.remove('overlay')
    showNotes();
}

cancelDelNote = () => {
    confirm_modal.classList.remove('showConfirm');
    document.querySelector('body').style.overflow = "auto"
    overlay.classList.remove('overlay')


}
updateNote = (noteId, title, description) => {

    updateId = noteId;
    isUpdate = true;
    addBtn.click();
    titleInput.value = title;
    descInput.value = description;
    modalTitle.innerHTML = "Update a new Task"
    submitNoteBtn.innerHTML = "Update Task"
}
showNotes = () => {
    if (notes.length < 1) {
        container.innerHTML = ""
        let boxNote = document.createElement('div')
        boxNote.innerHTML = `<div class="box-note">
        <div class="bxScroll">
        <p class="title">whoa! You don't have any task!</p>
        <p class="desc">Wanna be sorted as you are! </p>
        </div>
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
            console.log(id)
            let boxNote = document.createElement('div');
            boxNote.innerHTML = `
            <div class="box-note">
            <div class="bxScroll">
                <p class="title">${note.title}</p>
                <p class="desc">${note.description}</p>
            </div>
            <hr class="line">
            <div class="box-footer">
                <p class="date">${note.date}</p>
                <!-- <img onclick="updateNote('${id}','${note.title}','${note.description}')" class="btn dlt-btn" src="delete.png" alt="..."> -->
                <div class="setting">
                    <i onclick="showMenu(this)" class='bx bx-dots-horizontal-rounded dots' ></i>
                    <ul>
                        <li class="" onclick="updateNote(${id}, '${note.title}','${note.description}')"><i class='bx bx-edit'></i> Edit</li>
                        <li class="" onclick="DelNote(${id})"><i class='bx bxs-trash-alt'></i>Delete</li>
                    </ul>
                </div>
                <!-- <img onclick="updateNote(${id})" class="btn dlt-btn" src="delete.png" alt="..."> -->
            </div>
        </div>
    `
            container.appendChild(boxNote)
        });


    }


}
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", (e) => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

clearAllNotes = () => {
    let confirmation = confirm("Are you sure you want to Clear All your notes ?")
    if (!confirmation) {
        return;
    }
    if (notes.length >= 1) {
        // showConfirmModal();
        localStorage.clear();
        location.reload();
    }

}

// All  Event Listeners


addBtn.addEventListener("click", () => {
    overlay.classList.add('overlay')
    modalTitle.innerHTML = "Add a new Task"
    submitNoteBtn.innerHTML = "Add Task"
    modalContainer.style.display = "block"
    document.querySelector('body').style.overflow = "hidden"
    titleInput.focus();
})

closeBtn.addEventListener("click", () => {

    modalContainer.style.display = "none"
    overlay.classList.remove('overlay')
    document.querySelector('body').style.overflow = "auto"
    titleInput.value = "";
    descInput.value = "";
})
submitNoteBtn.addEventListener("click", addNote)
dltAllBtn.addEventListener('click', clearAllNotes)
// confirmDltBtn.addEventListener('click', confirmDelNote)
cancelDelBtn.addEventListener('click', cancelDelNote)
window.addEventListener("load", showNotes)


titleInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (titleInput.value == "") {
        } else {

            descInput.focus();
        }
    }
});
descInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submit-btn").click();
    }
});
