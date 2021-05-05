const url_event = "http://localhost:3000/events/1";//en su momento enviaré el token
const event_img = document.getElementsByClassName('event-img');
const event_title = document.getElementsByClassName('event-title');
const event_date = document.getElementsByClassName('event-date');
const event_description = document.getElementsByClassName('event-description');
const event_button = document.getElementById('event-button');
const participants_container = document.getElementsByClassName('participants-container');

const specific_event=[];
fetch(url_event)
.then(response => response.json())
.then(event => showEvent(event));

const showParticipants = (evt)=>{
  event_button.style.display = 'none';
  participants_container[0].style.display = 'block';
  fetch('http://localhost:3000/events/1/participants')
  .then(response => response.json())
  .then(resp_participants =>{
    const participants = resp_participants.data;
    participants.forEach(element => {
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
  })
}

const showEvent =(event)=>{
  console.log(event)
  event_img[0].src=event.data.url;
  event_title[0].textContent = event.data.name;
  event_date[0].textContent = event.data.date;
  event_description[0].textContent = event.data.description;
  event_button.addEventListener('click', showParticipants)
}