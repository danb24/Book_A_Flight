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






// flight_number
// depart_date
// from
// destination
// price
// company






async function addFlight(event){
    event.preventDefault()
    const flight_number=document.getElementById('flight_number').value
    const depart_date=document.getElementById('depart_date').value
    const from=document.getElementById('from').value
    const destination=document.getElementById('destination').value
    const price=document.getElementById('price').value
    const company=document.getElementById('company').value
    console.log('flight_number', flight_number)
    console.log('depart_date', depart_date)
    console.log('from', from)
    console.log('destination', destination)
    console.log('price', price)
    console.log('company', company)
    const newflight = {flight_number, date:depart_date, from, dest:destination, price, company}
    const respone = await fetch ('/flights', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newflight),

    })
    const data = await respone.json();
    console.log('data', data)
    if (data==="Inserted sucessfully") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
    




}
