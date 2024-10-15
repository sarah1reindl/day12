let currentPage = 1;
const planetsPerPage = 10; 
let allPlanets = []; 

function display_planet_info(planets) {
    $('#planet-list').empty(); 

    planets.forEach(planet => {
        const planetItem = $('<li class="planet"></li>');
        planetItem.append(`<strong>Name:</strong> ${planet.name}<br>`);
        planetItem.append(`<strong>Diameter:</strong> ${planet.diameter} km<br>`);
        planetItem.append(`<strong>Climate:</strong> ${planet.climate}<br>`);
        planetItem.append(`<strong>Terrain:</strong> ${planet.terrain}<br>`);
        planetItem.append(`<strong>Population:</strong> ${planet.population}<br>`);
        $('#planet-list').append(planetItem);
    });
}

function updatePlanets() {
    const searchValue = $('#searchInput').val().toLowerCase(); 
    const filteredPlanets = allPlanets.filter(planet => planet.name.toLowerCase().includes(searchValue)); 

    const startIndex = (currentPage - 1) * planetsPerPage;
    const planetsToDisplay = filteredPlanets.slice(startIndex, startIndex + planetsPerPage);
    display_planet_info(planetsToDisplay); 

    $('#prevBtn').prop('disabled', currentPage === 1);
    $('#nextBtn').prop('disabled', (startIndex + planetsToDisplay.length) >= filteredPlanets.length);
}

$('#searchInput').on('input', function() {
    currentPage = 1; 
    updatePlanets(); 
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
