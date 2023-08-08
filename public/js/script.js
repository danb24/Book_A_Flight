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

    const response = await fetch('/flights?from=' + from + '&dest=' + dest);
    const data = await response.json();
    const flightList = document.getElementById('flightlist');
    flightList.innerHTML = ``
    let filtered = ''

    data.forEach((flights) =>{
        filtered +=`<tr>
    <td>${flights.flight_number}</td>
    <td>${flights.from}</td>
    <td>${flights.dest}</td>
    <td>${flights.date}</td>
    <td>${flights.price}</td>
    <td>${flights.company}</td>
    <tr>`})
    flightList.innerHTML=filtered;
}
