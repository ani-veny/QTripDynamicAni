import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const url=`${config.backendEndpoint}`+'/reservations/';
    const reserv=await fetch(url);
    const res= await reserv.json();
    console.log(res);
    return res;
  }
  catch(e){
  return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 console.log(reservations);
     if(reservations.length>0)
     {
      document.getElementById("reservation-table-parent").style.display="block";
      document.getElementById("no-reservation-banner").style.display="none";
     }
     else{
      document.getElementById("reservation-table-parent").style.display="none";
      document.getElementById("no-reservation-banner").style.display="block";
     }

     let table = document.getElementById("reservation-table");
     reservations.forEach(ele =>{
       console.log(ele);
       var date=new Date(ele.date);
       var time=new Date(ele.time);
       const options = { year: 'numeric', month: 'long', day: 'numeric' };
       let dat = time.toLocaleDateString("en-IN",options);
       console.log(dat);
       let ti = time.toLocaleTimeString("en-IN");
       console.log(ti);
       var month=time.toLocaleString(undefined,{month:"long"})
       var day=time.getDate();
       var year=time.getFullYear();
       var booktime=dat +", "+ti;
       console.log(booktime);
 
       let tr = document.createElement('tr');
       tr.innerHTML = `
       <td>${ele.id}</td>
       <td>${ele.name}</td>
       <td>${ele.adventureName}</td>
       <td>${ele.person}</td>
       <td>${date.toLocaleDateString('en-IN')}</td>
       <td>${ele.price}</td>
       <td>${booktime}</td>
       
       <td id="${ele.id}"><a href="../detail/?adventure=${ele.adventure}">
     <button class="reservation-visit-button">Visit Adventure</button>
    </a></td>
       `
       table.append(tr)
     })
}

export { fetchReservations, addReservationToTable };
