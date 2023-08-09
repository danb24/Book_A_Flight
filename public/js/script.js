const fetchFunction = (html) => {
    fetch(html)
        .then(response => response.text())
        .then(htmlContent => {
            document.getElementById('body').innerHTML = htmlContent
        });

}

async function fetchFlights(){
    const respone = await fetch ('/flights')
    const data = await respone.json();
    const flightlist = document.getElementById('flightlist')
    flightlist.innerHTML=``
    let flight = ''

    data.forEach((flights) =>{
        flight +=`<tr>
    <td>${flights.flight_number}</td>
    <td>${flights.from}</td>
    <td>${flights.dest}</td>
    <td>${flights.date}</td>
    <td>${flights.price}</td>
    <td>${flights.company}</td>
    <tr>`})
    flightlist.innerHTML=flight;
}


async function filterFlights() {
    const from = document.getElementById('from').value;
    const dest = document.getElementById('dest').value;

    const response = await fetch(`/flights?from=${from}&dest=${dest}`);
    const data = await response.json();
    const flightlist = document.getElementById('flightlist');
    flightlist.innerHTML = '';
    let flight = '';

    data.forEach((flights) => {
        flight += `
            <tr>
                <td>${flights.flight_number}</td>
                <td>${flights.from}</td>
                <td>${flights.dest}</td>
                <td>${flights.date}</td>
                <td>${flights.price}</td>
                <td>${flights.company}</td>
            </tr>`;
    });
    
    flightlist.innerHTML = flight;
}



const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Call your login function here, passing username and password
    const loggedIn = await login(username, password);
  
    if (loggedIn) {
      // Redirect to the home page
      true
    } else {
      // Handle failed login (e.g., display an error message)
      console.error('Login failed');
    }
});
