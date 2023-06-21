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

// Functie voor debouncing
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

// Controleer of het input-element bestaat
if (input) {
    // Maak een gedebounceerde versie van de event handler functie
    const debouncedInputHandler = debounce(() => {
        // Leeg de HTML van de autocomplete-resultaten
        autocompleteResults.innerHTML = '';
        // Controleer of de lengte van de ingevoerde waarde groter is dan 0
        if (input.value.length) {
            // Doorloop alle titels
            allTitles.forEach(post => {
                const slug = post.slug;
                if (input.value.length < 4) {
                    // Vergelijk de ingevoerde waarde met de titel zonder hoofdletters
                    const lowerCaseTitle = post.title.toLowerCase();
                    const lowerCaseInputValue = input.value.toLowerCase();
                    const textMatches = lowerCaseTitle.includes(lowerCaseInputValue);
                    if (textMatches) {
                        // Voeg een lijstitem toe aan de autocomplete-resultaten met de link naar de post
                        autocompleteResults.innerHTML += `<li><a href="#${slug}">${post.title}</a></li>`;
                    }
                } else {
                    // Pas de boldMatch-functie toe om de overeenkomende tekst vetgedrukt te maken
                    const result = boldMatch(post.title, input.value);
                    // Voeg een lijstitem toe aan de autocomplete-resultaten met de vetgedrukte overeenkomende tekst
                    autocompleteResults.innerHTML += `<li><a href="#${slug}">${result}</a></li>`;
                }

            });
        }
    }, 300); // Stel de gewenste debounce-vertraging in (bijvoorbeeld 300 milliseconden)

    // Luister naar het 'input' evenement op het input-element met de gedebounceerde functie
    input.addEventListener('input', debouncedInputHandler);
    
}

function ShowAndHide() {
    // Haal het element op met de ID 'filter-contain-desktop' en sla het op in de variabele openFilterButton
    var openFilterButton = document.getElementById('filter-contain-desktop');
    
    // Controleer of de huidige weergave (display) stijl van openFilterButton 'none' is
    if (openFilterButton.style.display == 'none') {
        // Als het 'none' is, verander dan de weergave stijl naar 'block' om het element te tonen
        openFilterButton.style.display = 'block';
    } else {
        // Als het niet 'none' is, verander dan de weergave stijl naar 'none' om het element te verbergen
        openFilterButton.style.display = 'none';
    }
}
