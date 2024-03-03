const ipAddressElement = document.getElementById('ipAddress');
const locationElement = document.getElementById('location');
const timezoneElement = document.getElementById('timezone');
const ispElement = document.getElementById('isp');
const text = document.getElementById('ipSearch');
const submit = document.getElementById('submit')
const form = document.getElementById('form')

const ipifyApiKey = "at_5IepPIB7u7nrYOPxHuFBP5y9Jmttn";
let map;
async function getData() {
  try {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${ipifyApiKey}&ipAddress=${text.value}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(text.value)
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function mapped(event) { // Pass data as a parameter
  try {
    event.preventDefault();
    const data = await getData()
    const lat = data.location.lat;
    const lng = data.location.lng;

    if (map) {
      map.remove();
    }

    map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
    .bindPopup('Location')
    .openPopup();
    ipAddressElement.innerHTML =(`${data.ip}`);
    locationElement.innerHTML = (`${data.location.city}, ${data.location.region} ${data.location.postalCode}`);
    timezoneElement.innerHTML = (`${data.location.timezone}`)
    ispElement.innerHTML = (`${data.isp}`)

  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

form.addEventListener('submit', (event)=>mapped(event).catch(error=>console.error('Error:',error)));