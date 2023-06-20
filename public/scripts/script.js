// Console.log de array met alle titels
console.log(allTitles);

// Zoek het input-element en het element voor de autocomplete-resultaten op
const input = document.getElementById('search-term');
const autocompleteResults = document.querySelector('.autocomplete-options');

// Functie om de overeenkomende tekst vetgedrukt te maken na 4 karakters
function boldMatch(title, inputValue) {
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseInputValue = inputValue.toLowerCase();

    // Zoek naar de positie van de overeenkomende tekst
    const matchIndex = lowerCaseTitle.indexOf(lowerCaseInputValue);

    // Controleer of er een overeenkomst is gevonden en deze begint na het vierde karakter
    if (matchIndex !== -1 && matchIndex >= 3) {
        // Maak de overeenkomende tekst vetgedrukt
        const boldMatchText = title.slice(0, matchIndex) + '<b>' + title.slice(matchIndex, matchIndex + inputValue.length) + '</b>' + title.slice(matchIndex + inputValue.length);
        return boldMatchText;
    }

    return title; // Geen overeenkomst na 4 karakters, retourneer de originele titel
}

// Controleer of het input-element bestaat
if (input) {
    // Luister naar het 'input' evenement op het input-element
    input.addEventListener('input', () => {
        // Leeg de HTML van de autocomplete-resultaten
        autocompleteResults.innerHTML = '';
        // Controleer of de lengte van de ingevoerde waarde groter is dan 0
        if (input.value.length) {
            // Doorloop alle titels
            allTitles.forEach(post => {
                const slug = post.slug
                if (input.value.length < 4) {
                    const lowerCaseTitle = post.title.toLowerCase();
                    const lowerCaseInputValue = input.value.toLowerCase();
                    const textMatches = lowerCaseTitle.includes(lowerCaseInputValue) 
                    if (textMatches) {
                        autocompleteResults.innerHTML += `<li><a href="#${slug}">${post.title}</a></li>`;
                    }
                } else {
                    const result = boldMatch(post.title, input.value);
                    // Voeg een lijstitem toe aan de autocomplete-resultaten met de vetgedrukte overeenkomende tekst
                    autocompleteResults.innerHTML += `<li><a href="#${slug}">${result}</a></li>`;
                }

            });
        }
    });
}
