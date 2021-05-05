const url_event = "http://localhost:3000/events";
const url_participants = 'http://localhost:3000/participants';
const event_img = document.getElementsByClassName('event-img');
const event_title = document.getElementsByClassName('event-title');
const event_date = document.getElementsByClassName('event-date');
const event_description = document.getElementsByClassName('event-description');
const event_button = document.getElementById('event-button');
const participants_container = document.getElementsByClassName('participants-container');
const token = localStorage.getItem('admin')
let specific_event;//variable encargada de almacenar el id del evento y los participantes de la primera promesa
//optenemos los participantes y el id del evento enviando el token
fetch(url_participants,{
  headers: {
    "Authorization": `${token}`
  }})
.then(response => response.json())
.then(event => {
  specific_event = event.data;
  getEvent(event.data.id_event)
})
//obtenemos la información de un evento en especifico
const getEvent =(event)=>{  
  fetch(`${url_event}/${event}`)
  .then(response => response.json())
  .then(event => showEvent(event));
}
//función encargada de agregar los participantes del evento
const showParticipants = ()=>{
  event_button.style.display = 'none';
  participants_container[0].style.display = 'block';
  specific_event.participants.forEach(element => {
    const card = document.createElement('div');
    card.innerHTML = 
      `<div class="participants-card">
        <p id="participants-name">${element.name}  ${element.lastName}</p>
        <p id="participants-email">${element.email}</p>
        <p id="participants-city">${element.city}</p>
      </div>`
    ;
    participants_container[0].appendChild(card);
  });
}
//función encargada de mostrar la información del evento
const showEvent =(event)=>{
  event_img[0].src=event.data.url;
  event_title[0].textContent = event.data.name;
  event_date[0].textContent = event.data.date;
  event_description[0].textContent = event.data.description;
  event_button.addEventListener('click', showParticipants)
}