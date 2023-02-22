import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  /*let srr = search.split("=");
   console.log(srr[1]);
   return srr[1];*/
  // console.log(search)
  let params=new URLSearchParams(search);
  // console.log(params.get('adventure'));
  return params.get('adventure');
    // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{ 
    const adv=await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
      let advent=await adv.json();
      console.log(advent);
      return advent;
    }
    catch(e){
      return null;
    }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  console.log(adventure);
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
   let h1=document.getElementById('adventure-name');
   h1.textContent=`${adventure.name}`;
   let p=document.getElementById('adventure-subtitle');
   p.innerHTML=`${adventure.subtitle}`;
   let n=adventure.images.length;
   let div=document.createElement('div');
   adventure.images.forEach(ele=>{
    let div1=document.createElement('div');
    let img=document.createElement('img');
    console.log(ele);
    img.setAttribute('src', ele);
    img.setAttribute('class', 'activity-card-image');
    div1.append(img);
    div.append(div1);
   })
   let main=document.getElementById('photo-gallery');
   main.append(div);
   let content=document.getElementById("adventure-content");
   content.innerHTML=adventure.content;
  // main.append(content);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
    console.log("$$")
    let gallery=document.getElementById("photo-gallery");
    gallery.innerHTML=`
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="carousel-inner">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
   `
    images.forEach((ele, i)=>{
    let div1 = document.createElement("div");
    div1.className = `carousel-item ${i===0?'active' : ''}`;
    div1.innerHTML =  
    `<img src= ${ele} class="d-block w-100 activity-card-image" alt="...">`
    let abcd = document.getElementById("carousel-inner")
    console.log(abcd)
    abcd.append(div1);
   })
   
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.  
    if(adventure.available == true)
    {
      document.getElementById('reservation-panel-sold-out').style.display="none";
      document.getElementById('reservation-panel-available').style.display = "block";
      document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
    }
    else{
      document.getElementById('reservation-panel-sold-out').style.display="block";
      document.getElementById('reservation-panel-available').style.display = "none";
    }
  }

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
   return document.getElementById('reservation-cost').innerHTML=`${adventure.costPerHead*persons}`;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let Form=document.getElementById('myForm') ;
  Form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let  data={
      name:Form.elements["name"].value,
      date:new Date(Form.elements["date"].value),
      person:Form.elements["person"].value,
      adventure:adventure["id"]
    }
    console.log(data);
    try{
      const url=`${config.backendEndpoint}/reservations/new`;
      const res=await fetch(url,{
        method:"POST",
       headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
      });
     alert("success");
     window.location.reload();
    }
    catch(error){
      console.log(error);
      alert("failed");
 
    }
  });
    
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else
  {
    document.getElementById('reserved-banner').style.display = "none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
