let currentPage = 1; 
const planetsPerPage = 10; 
let allPlanets = []; 

function display_planet_info(planets) {
    $('#planet-list').empty(); 

    planets.forEach(planet => {
        const planetItem = $('<li class="planet"></li>');
        planetItem.append(`<strong><a href="#" class="planet-link" data-url="${planet.url}">${planet.name}</a></strong><br>`);
        planetItem.append(`<strong>Diameter:</strong> ${planet.diameter} km<br>`);
        planetItem.append(`<strong>Climate:</strong> ${planet.climate}<br>`);
        planetItem.append(`<strong>Terrain:</strong> ${planet.terrain}<br>`);
        planetItem.append(`<strong>Population:</strong> ${planet.population}<br>`);

        $('#planet-list').append(planetItem);
    });
}
function display_planet_details(planet) {
    $('#planet-list').empty(); 

    const planetDetail = $('<div class="planet-detail"></div>');
    planetDetail.append(`<h2>${planet.name}</h2>`);
    planetDetail.append(`<strong>Diameter:</strong> ${planet.diameter} km<br>`);
    planetDetail.append(`<strong>Climate:</strong> ${planet.climate}<br>`);
    planetDetail.append(`<strong>Terrain:</strong> ${planet.terrain}<br>`);
    planetDetail.append(`<strong>Population:</strong> ${planet.population}<br>`);

    planetDetail.append(`<h3>Films:</h3>`);
    const filmsList = $('<ul></ul>');
    const filmPromises = planet.films.map(filmUrl => {
        return fetch(filmUrl)
            .then(response => response.json())
            .then(filmData => {
                filmsList.append(`<li>${filmData.title}</li>`);
            });
    });
    Promise.all(filmPromises).then(() => {
        planetDetail.append(filmsList);
        $('#planet-list').append(planetDetail);
    });
}
function updatePlanets() {
    const searchValue = $('#searchInput').val(); 
    const filteredPlanets = allPlanets.filter(planet => planet.name.includes(searchValue)); 

    const startIndex = (currentPage - 1) * planetsPerPage;
    const endIndex = startIndex + planetsPerPage;

    const planetsToDisplay = filteredPlanets.slice(startIndex, endIndex);
    display_planet_info(planetsToDisplay); 

}

$('#searchInput').on('input', function() {
    currentPage = 1; 
    updatePlanets(); 
});
$(document).on('click', '.planet-link', function(event) {
    event.preventDefault(); 
    const planetUrl = $(this).data('url'); 
    fetch(planetUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            display_planet_details(data); 
        })
        .catch(error => console.error('Error fetching planet data:', error));
});
fetch('https://swapi.dev/api/planets/')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        allPlanets = data.results; 
        updatePlanets(); 
    })
    .catch(error => console.error('Error fetching planet data:', error));
