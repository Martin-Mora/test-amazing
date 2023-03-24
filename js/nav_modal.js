const navbar_toggler= document.querySelector('.navbar-toggler');

const modal_background= document.querySelector('.modal-background');

const closed_button = document.querySelector('.closed_button');

const navbar= document.querySelector('.navbar-collapse');


//activando nav y modal
navbar_toggler.addEventListener("click",()=>{
  modal_background.style.display = 'block'
  navbar.style.display = 'block'
})

//cerrando nav
closed_button.addEventListener('click',()=>{
  modal_background.style.display = 'none'
  navbar.style.display = 'none'
})

modal_background.addEventListener('click',()=>{
  modal_background.style.display = 'none'
  navbar.style.display = 'none'
})