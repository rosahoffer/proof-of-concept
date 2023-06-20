// Console.log de array met alle titels
console.log(allTitles);

// Zoek het input-element en het element voor de autocomplete-resultaten op
const input = document.getElementById('search-term');
const autocompleteResults = document.querySelector('.autocomplete-options');

// Controleer of het input-element bestaat
if (input) {
    // Luister naar het 'input' evenement op het input-element
    input.addEventListener('input', (event) => {
        // Leeg de HTML van de autocomplete-resultaten
        autocompleteResults.innerHTML = '';

        // Controleer of de lengte van de ingevoerde waarde groter is dan 0
        if (input.value.length) {
            // Doorloop alle titels
            allTitles.forEach(title => {
                // Converteer de titel naar kleine letters
                const lowerCaseTitle = title.toLowerCase();

                // Controleer of de ingevoerde waarde voorkomt in de titel
                if (lowerCaseTitle.includes(input.value.toLowerCase())) {
                    // Voeg een lijstitem toe aan de autocomplete-resultaten
                    autocompleteResults.innerHTML += `<li>${title}</li>`;
                }
            });
        }
    });
}
