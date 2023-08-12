const fetchFunction = (html) => {
    fetch(html)
        .then(response => response.text())
        .then(htmlContent => {
            document.getElementById('body').innerHTML = htmlContent
        });

}

// show user all the flights
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

// show user all the flights baesd on the filter he puts
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

// the login suposed pass to check if user is in the system before rendering to app.js ---> dosent work fo now

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

// adding flights by the manager
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

// get all reviews
async function fetchreviews(){
    const respone = await fetch ('/reviews')
    const data = await respone.json();
    const reviewslist = document.getElementById('reviewslist')
    reviewslist.innerHTML=``
    let review = ''

    data.forEach((reviews) =>{
        review +=`<tr>
    <td>${reviews.destination}</td>
    <td>${reviews.description}</td>
    <td>${reviews.rating}</td>
    <td>${reviews.commenter}</td>
    <tr>`})
    reviewslist.innerHTML=review;
}

//filter review
async function filterreviews() {
    const destination = document.getElementById('destination').value;
    const response = await fetch(`/reviews?destination=${destination}`);
    const data = await response.json();
    const reviewslist = document.getElementById('reviewslist');
    reviewslist.innerHTML = ''
    let review = ''

    data.forEach((reviews) => {
        review += `
        <tr>
            <td>${reviews.destination}</td>
            <td>${reviews.description}</td>
            <td>${reviews.rating}</td>
            <td>${reviews.commenter}</td>
        </tr>`})
    reviewslist.innerHTML=review;
}

// add review
async function addreview(event){
    event.preventDefault()
    const destinationR =document.getElementById('destinationR').value
    const description=document.getElementById('description').value
    const rating=document.getElementById('rating').value
    const commenter = document.getElementById('commenter').value
    console.log('destinationR', destinationR)
    console.log('description', description)
    console.log('rating', rating)
    console.log('commenter', commenter)
    const newReview = { destinationR, description, rating, commenter}
    const respone = await fetch ('/reviews', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),

    })
    const data = await respone.json();
    console.log('data', data)
    if (data === "Inserted sucessfully") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}
