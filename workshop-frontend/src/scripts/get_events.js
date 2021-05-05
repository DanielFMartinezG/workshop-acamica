class Event {
  constructor(event_id,join_button_id,close_button_id,register_form_id){
    this.event_id = event_id;
    this.join_button_id= join_button_id;
    this.close_button_id=close_button_id;
    this.register_form_id=register_form_id;
  }
}
const event_card_template = document.getElementById("event-card-template");
const events_container = document.getElementById('events-container');
const body = document.getElementsByTagName('body');
let event_box = document.getElementsByClassName('event-box');
body[0].removeChild(event_card_template);
let events_ids =[];
let events_array;
const url_events = "http://localhost:3000/events";
//solicitud a la api local de eventos
fetch(url_events)
.then(response => response.json())
.then(events_response => {
  events_array = events_response.data;
  events_response.data.forEach(element => {
    app_event_card(element);
  });
});
//funcion para agregar cada card de eventos
const app_event_card = (event)=>{
  const event_id = `event-${event.id}`;
  let template = event_card_template.cloneNode(true);
  template.style.display = "flex";
  template.id = event_id;
  events_container.appendChild(template);
  let event_date = document.querySelectorAll(`div#${event_id} > .envent-box-content > p.event-box-date`);
  event_date[0].textContent = event.date;
  let event_title = document.querySelectorAll(`div#${event_id} > .envent-box-content > p.event-box-title`);
  event_title[0].textContent = event.name;
  let event_org = document.querySelectorAll(`div#${event_id} > .envent-box-content > p.event-organizer`);
  event_org[0].textContent = event.organizer;
  let event_platform = document.querySelectorAll(`div#${event_id} > .envent-box-content > p.event-platform`);
  event_platform[0].textContent = event.platform;
  let event_hour = document.querySelectorAll(`div#${event_id} > .envent-box-content > p.event-hour`);
  event_hour[0].textContent = event.hour;
  let event_img = document.querySelectorAll(
    `div#${event_id} > 
    .envent-box-content >
    div.event-box-description > 
    img.event-box-description-img`
  );
  event_img[0].src = event.url;
  let event_decription = document.querySelectorAll(
    `div#${event_id} > 
    .envent-box-content >
    div.event-box-description > 
    div.event-box-description-text > 
    p.event-description-text`
  );
  event_decription[0].textContent = event.description;
  //_____________id's botones____________
  //boton de login
  let event_join_button = document.querySelectorAll(`div#${event_id} > div.event-box-buttons > div#join-button`);
  event_join_button[0].id = `join-bttn-event-${event.id}`;
  event_join_button[0].addEventListener("click", joinParticipant);
  //boton de cerrar menu de registro
  let close_reg_button = document.querySelectorAll(`div#${event_id} > div.event-box-buttons >  div#close-register-button`);
  close_reg_button[0].id = `close-bttn-event-${event.id}`;
  close_reg_button[0].addEventListener("click", closeRegister);
  //formulario de registro
  let event_reg_form = document.querySelectorAll(
    `#${event_id} > 
    .envent-box-content >
    .event-box-description > 
    .register-event-container > 
    .register-form`
  );
  event_reg_form[0].id = `form-register-event-${event.id}`
  event_reg_form[0].addEventListener("submit", participanRegister);
  //almacenamos referencias en la lista
  const object_event = new Event 
  (
    event_id,
    event_join_button[0].id,
    close_reg_button[0].id, 
    event_reg_form[0].id
  );
  events_ids.push(object_event);
}

const joinParticipant=(event) =>{
  const index = events_ids.findIndex(element => element.join_button_id === event.toElement.id);  
  showRegisterMenu(index);
}
const closeRegister = (event)=>{
  const index = events_ids.findIndex(element => element.close_button_id === event.toElement.id);
  showRegisterMenu(index);
}

const showRegisterMenu =(index) =>{
  const event_img = document.querySelectorAll(
    `div#${events_ids[index].event_id} > 
    div.envent-box-content >
    div.event-box-description > 
    img.event-box-description-img`
  );
  event_img[0].classList.toggle("show-box");
  const event_register = document.querySelectorAll(
    `div#${events_ids[index].event_id} > 
    .envent-box-content >
    div.event-box-description > 
    div.register-event-container`
  );
  event_register[0].classList.toggle("show-box");
  const bttn_join = document.getElementById(events_ids[index].join_button_id);
  bttn_join.classList.toggle("show-button");
  const bttn_register = document.getElementById(events_ids[index].close_button_id);
  bttn_register.classList.toggle("show-button");
}

const participanRegister = (event)=>{
  event.preventDefault();
  const name = document.querySelectorAll(`#${event.srcElement.id} > #name`);
  const lastName = document.querySelectorAll(`#${event.srcElement.id} > #last-name`);
  const email = document.querySelectorAll(`#${event.srcElement.id} > #email`);
  const city = document.querySelectorAll(`#${event.srcElement.id} > #city`);
  const new_register ={
    name: name[0].value,
    lastName: lastName[0].value,
    email: email[0].value,
    city: city[0].value
  };
  const index = events_ids.findIndex(element => element.register_form_id == event.srcElement.id);
  fetch(url_events + "/" + events_array[index].id,{
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(new_register)
  })
  .then(response => response.json())
  .then(response_event =>  {
    console.log(response_event);
    showRegisterMenu(index);
    alert(response_event.msg)
  });
}