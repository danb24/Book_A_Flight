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
    console.log(data);

    
}
