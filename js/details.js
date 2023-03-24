
//de manera online
const url2= "https://mindhub-xj03.onrender.com/api/amazing"

//de manera local
const url= "http://127.0.0.1:5500/events.json";


//funcion asincrona
async function getDatas(){
  try{
        //usando de manera online
    const response= await fetch(url2);

    //usando de manera local
// const response= await fetch(url);

    //usando api rick and morty
// const response= await fetch(url3);
    
    console.log(response);
   const data= await response.json();
    

    console.log(data.events);
    detailsParams(data.events)
  }
  catch(error){
console.log(error)
  }
}

getDatas();


//funciones

function detailsParams(arrayData){

  const detailsCards= arrayData.map(element =>{
    let aux={};
    aux.image= element.image;
    aux.name= element.name;
    aux.description= element.description;
    aux.price= element.price;
    aux.place= element.place;
    aux.date=element.date;
    aux._id=element._id;
    return aux
  })
  
  const querySearch = document.location.search;
  
  const id = new URLSearchParams(querySearch).get("id")
  
  const events = detailsCards.find(personaje => personaje._id == id)
  
  const containerDetails = document.querySelector('.card-container');
  
  containerDetails.innerHTML = `
  <div class="card-container__card">
    <img src="${events.image} class="img-details" alt="">
  </div>
  
  <div class="card-container__detaills">
    <h5>${events.name}</h5>
    <p>${events.description}</p>
    <p><i class="bi bi-calendar-event"></i><span class="span_detaills">Date:</span> ${events.date}</p>
    <p><i class="bi bi-geo-alt"></i><span class="span_detaills">Place:</span> ${events.place}</p>
    <p><i class="bi bi-cash-coin"></i><span class="span_detaills">Price:</span> $${events.price}</p>
  </div>`
}




