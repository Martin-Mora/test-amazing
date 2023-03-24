const containerCards= document.querySelector('.container-cards');

const form = document.querySelector('.category__search');

const input = document.querySelector('.space-search');

const containerChecks = document.querySelector('.category__check');


//de manera local
// const url= "amazing.json";

//de manera online
const url2= "https://mindhub-xj03.onrender.com/api/amazing"



//Accediendo a la api
async function getDatas(){
  try{
    //usando de manera local
    // const response= await fetch(url);

       //usando de manera online
      const response= await fetch(url2);
    
      //console.log(response);
      const data= await response.json();
    

      renderCardsPast(data.events,containerCards,data.currentDate);

      renderChecks(data.events,containerChecks);

      filterChecks(data.events);

    function mixFilter(){
      let filterArray1 = textFilter(data.events, input.value);
      let filterArray2 = filterChecks(filterArray1);
      renderCardsPast(filterArray2,containerCards,data.currentDate);
    }

    containerChecks.addEventListener('click',mixFilter)
    input.addEventListener('input',mixFilter)

    
  }
  catch(error){
console.log(error);
  }
}



//dato currendate


//renderiza las cards
function renderCardsPast(arrayDatos,container,date) {
  let current = date;
  if(arrayDatos.length == 0){
      container.innerHTML = `<div class="containerNotFound" >
                    <i class="bi bi-file-earmark-excel-fill"></i>
                  <h2 class='notFound'>RESULT NOT FOUND</h2>
                </div>
          `
      return;
  }
  let cards = ''
  arrayDatos.forEach(element => {
    if(element.date>current){
      cards += `<div class="card all ${element.category}" style="width: 18rem;" >
      <img src="${element.image}" class="card-img-top" alt="cinema">
      <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text">${element.description}</p>
        <div class="detaills">
          <p> <span class="detaills__price">Price: $${element.price}</span></p>
          <a href="./details.html?id=${element._id}" class="btn btn-primary">View more...</a>
        </div>
      </div>
    </div>`
  }
  })
  container.innerHTML = cards;
}


//Previene la recarga del search por formulario
form.addEventListener('submit',(e)=>{
  e.preventDefault();
});


//muestra los chekbox

function renderChecks(arrayDatos,container){
  
  let checks='';
  let repeatingcategory = arrayDatos.map(element => element.category);
  let category = new Set(repeatingcategory);


  category.forEach(element=>{

    checks+=`<div class="form-check">
    <input class="form-check-input" type="checkbox" value="${element}" id="${element}">
    <label class="form-check-label" for="${element}">
    ${element}
    </label>
  </div>
 `
  })

  container.innerHTML=checks;
}

//Obtiene el dato por input
function textFilter(arrayDatos, text){
  let filterArray = arrayDatos.filter(element => element.name.toLowerCase().includes(text.toLowerCase()));
  return filterArray;
}

//filtra por categoria
function filterChecks(arraydata){
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let arrayChecks = Array.from(checkboxes);
    
    let checksChecked = arrayChecks.filter(check => check.checked);
    if(checksChecked.length == 0){
        return arraydata;
    }
    let checkValues = checksChecked.map(check => check.value);;
    let filterArray = arraydata.filter(element => checkValues.includes(element.category));
    return filterArray;
  }


  //funciones para un boton que regrese arriba de todo
btn_scroolTop.addEventListener('click',()=>{
  window.scrollTo(0,0)
})

window.onscroll=()=>{
  if(window.scrollY<1000){
    btn_scroolTop.classList.remove('btn-scroolTop-on');
  }else{
    btn_scroolTop.classList.add('btn-scroolTop-on');
  }
}


//activar funciones

getDatas()










