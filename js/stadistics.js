const tableUpcomming= document.querySelector('.tableUpcomming');
const tablePast= document.querySelector('.tablePast');

//funciones
async function getDatas(){
  try{
      const response= await fetch("https://mindhub-xj03.onrender.com/api/amazing");
    const data= await response.json();

    mapEventsGenerals(data.events,data.currentDate);
    mapEventsUpcoming(data.events,data.currentDate);
    mapEventspast(data.events,data.currentDate);
  }
  catch(error){
console.log(error);
  }
}

//funcion para calculos de eventos de cabezera general
function mapEventsGenerals(arrayData,current){
  const highestAtten=document.querySelector(".highest_attendance");
  const lowesttAtten=document.querySelector(".lowest_attendance");
  const highestCapacity=document.querySelector(".highest_capacity");
  let assistanceTotal=0;
  let lowestAttendance=999999;
  let highestAttendance=0;
  let lowestAttendanceName;
  let highestAttendanceName;
  let capacityTotal=0;
  let capacityTotalName=0;

    arrayData.map(element =>{
    if(element.date<current){
        
      let aux={};
      aux.name= element.name;
      aux.capacity= element.capacity;
      aux.assistance= element.assistance;

      assistanceTotal+=element.assistance
      
      if((element.assistance*100)/element.capacity<lowestAttendance){
        lowestAttendance=(element.assistance*100)/element.capacity;
        lowestAttendanceName=element.name;
      }

      if((element.assistance*100)/element.capacity>highestAttendance){
        highestAttendance=(element.assistance*100)/element.capacity;
        highestAttendanceName=element.name;
      }

      if(element.capacity>capacityTotal){
        capacityTotal=element.capacity;
        capacityTotalName=element.name;
      }
    }
    
  })

  highestAtten.innerHTML=`${highestAttendanceName} (${highestAttendance.toFixed(2)}%)`
  lowesttAtten.innerHTML=`${lowestAttendanceName} (${lowestAttendance.toFixed(2)}%)`
  highestCapacity.innerHTML=`${capacityTotalName} (${capacityTotal})`
  
}


//funcion para mapear un array con solo los eventos futuros
function mapEventsUpcoming(arrayData,current){
  let newArray=[]
  arrayData.map(element =>{
    if(element.date>current){
      let aux={};
      aux.category= element.category;
      aux.estimate= element.estimate;
      aux.price= element.price;
      aux.capacity= element.capacity
      aux.date= element.date

      newArray.push(aux);
    }
})

//Arreglo de categorias no repetidas para usar la funcion de calculo
let categoryUpcomming=[]
for (const i in newArray) {
  categoryUpcomming.push(newArray[i].category);
}
const categoryNoRepeat= new Set(categoryUpcomming)
categoryNoRepeat.forEach(element=>{
  calculoUpccoming(newArray,element)
})

}


//funcion para mapear un array con solo los eventos pasados
function mapEventspast(arrayData,current){
  let newArray=[]
  arrayData.map(element =>{
    if(element.date<current){
      let aux={};
      aux.category= element.category;
      aux.assistance = element.assistance;
      aux.price= element.price;
      aux.capacity= element.capacity
      aux.date= element.date

      newArray.push(aux);
    }
})


//Arreglo de categorias no repetidas para usar la funcion de calculo
let categoryPast=[]
for (const i in newArray) {
    categoryPast.push(newArray[i].category);
}
const categoryNoRepeat= new Set(categoryPast)
categoryNoRepeat.forEach(element=>{
  calculoPast(newArray,element)
})
}

//calculo para cada evento futuro categoria en la tabla
function calculoUpccoming(array,category){
  let categoryName;
  let revenues=0;
  let attendence=0;
  let capacityTotal=0;

  for(let i=0;i<array.length;i++){

    if(array[i].category==category){
      categoryName=array[i].category;
      revenues+=array[i].estimate*array[i].price;
      attendence+=array[i].estimate;
      capacityTotal+=array[i].capacity
    }
    
    } 

    tableUpcomming.innerHTML+=`<tr>
    <td class="NameCategory">${categoryName}</td>
    <td>$${new Intl.NumberFormat('en-US').format(revenues)}</td>
    <td>${((attendence*100)/capacityTotal).toFixed(2)}%</td>
  </tr>` 
}

//calculo para cada evento pasado categoria en la tabla
function calculoPast(array,category){
  let categoryName;
  let revenues=0;
  let attendence=0;
  let capacityTotal=0;

  for(let i=0;i<array.length;i++){

    if(array[i].category==category){
      categoryName=array[i].category;
      revenues+=array[i].assistance*array[i].price;
      attendence+=array[i].assistance;
      capacityTotal+=array[i].capacity
    }
    } 


    tablePast.innerHTML+=`<tr>
    <td class="NameCategory">${categoryName}</td>
    <td>$${new Intl.NumberFormat('en-US').format(revenues)}</td>
    <td>${((attendence*100)/capacityTotal).toFixed(2)}%</td>
  </tr>`
}

getDatas()


