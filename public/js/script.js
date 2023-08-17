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

// add user by manager 
async function adduser(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const phone = document.getElementById('phone').value;
    const Email = document.getElementById('Email').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const newuser = {id, username, password, role, phone, Email, first_name, last_name};
    const respone = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newuser)
        })
    const data = await respone.json();
    console.log('data', data)
    if (data==="Inserted sucessfully") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}
// delete user by manager
async function deleteuser(event) {
    event.preventDefault();
    const username = document.getElementById('username-delete').value;
    const id = document.getElementById('id-delete').value;
    const deleteuser = {username,id};
    const respone = await fetch('/users', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteuser)
        })
    const data = await respone.json();
    console.log('data', data)
    if (data==="deleted sucessfully") {document.getElementById('message').innerText=data.message}
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

// add discount by manager 
async function createcoupons(event) {
    event.preventDefault();
    const discount = document.getElementById('discount').value;
    const couponcode = document.getElementById('coupon-code').value;
    const coupon_description = document.getElementById('coupon_description').value;
    const newdiscount = {discount, couponcode, coupon_description};
    const respone = await fetch('/coupons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newdiscount)
        })
    const data = await respone.json();
    console.log('data', data)
    if (data==="comment sent sucessfully =)") {document.getElementById('message').innerText=data.message}
    else {
        document.getElementById('message').innerText=data.message
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Call a function to set up the event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Event listener for Discounts link
    const discountsLink = document.querySelector('#navigation li:nth-child(2) a');
    if (discountsLink) {
        discountsLink.addEventListener('click', () => {
            fetchCoupon();
        });
    }
}

//make fetchCoupon run onload
document.addEventListener('DOMContentLoaded', () => {
    fetchCoupon();
});
//watch coupon
async function fetchCoupon() {
    console.log('fetchCoupon function called');
    const response = await fetch('/coupons');
    const data = await response.json();
    const couponlist = document.getElementById('couponlist');
    couponlist.innerHTML = '';

    data.forEach((coupons) => {
        const cube = document.createElement('div');
        cube.classList.add('coupon-cube');

        const couponDetails = document.createElement('div');
        couponDetails.classList.add('coupon-details');
        console.log('1')
        couponDetails.innerHTML = `
            <div>discount: ${coupons.discount}</div>
            <div>couponcode: ${coupons.couponcode}</div>
            <div>coupon_description: ${coupons.coupon_description}</div>
        `;

        cube.appendChild(couponDetails);
        couponlist.appendChild(cube);
    });
}


//deleteCoupon
async function deleteCoupons(event) {
    event.preventDefault();
    const couponcodediscard = document.getElementById('coupon-code-discard').value;
    const deleteCoupon = {couponcodediscard};
    const respone = await fetch('/coupons', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteCoupon)
        })
    const data = await respone.json();
    console.log('data', data)
    if (data==="deleted sucessfully") {document.getElementById('message-discard').innerText=data.message}
    else {
        document.getElementById('message-discard').innerText=data.message
    }
}

//sendmail
async function email (event){
    event.preventDefault()
    const subject = document.getElementById('subject-contact').value;
    const message = document.getElementById('message-contact').value;
    const newMail = {subject,message};
    const response = await fetch('/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMail)
    })
    const data = await response.json()
    console.log(data)
    document.getElementById('message-mail').innerText=data.message
}

// get chart
async function getstatistics(event){
    event.preventDefault
    const response = await fetch ('/statistics')
    console.log('response', response)
    const data = await response.json();
    console.log('data', data)
    const labels=data.map((review) => review.destination)
    const ratings=data.map((review) => review.averageRating)
    console.log(ratings)
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
       type: 'bar',
     data: {
       labels,
       datasets: [{
         label: '#Average of Destination',
         data:ratings,

         borderWidth: 1
       }]
     },
     options: {
       scales: {
         y: {
           beginAtZero: true
         }
       }
     }
   });
}
