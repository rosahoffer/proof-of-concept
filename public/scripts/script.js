// selecteer button open
let openButton = document.querySelector("#open-button-sign-in");

// selecteer pop up
let popUpForm = document.querySelector("#form-pop-up");

// selecteer button close
let closeButton = document.querySelector("#cancel-button")



// option 1
openButton.addEventListener('click', openForm);

function openForm(){
  popUpForm.showModal();
}

closeButton.addEventListener('click', closeForm);

function closeForm(){
  popUpForm.close();
}