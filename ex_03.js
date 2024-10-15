function display_planet_info(planet) {
    const planetItem = $('<li class="planet"></li>');

    planetItem.append(`
        <strong>Name:</strong> ${planet.name}<br>
        <strong>Diameter:</strong> ${planet.diameter} km<br>
        <strong>Climate:</strong> ${planet.climate}<br>
        <strong>Terrain:</strong> ${planet.terrain}<br>
        <strong>Population:</strong> ${planet.population}<br>
    `);

    $('#planet-list').append(planetItem);
}
$('#loadPlanetBtn').click(function() {
    const randomPlanetId = Math.floor(Math.random() * 6) + 1; 
    fetch(`https://swapi.dev/api/planets/${randomPlanetId}/`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => display_planet_info(data))
        .catch(error => console.error('Error fetching planet data:', error));
});
