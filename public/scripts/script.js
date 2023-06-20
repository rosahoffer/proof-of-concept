
// A collection of documents for our examples
console.log(allTitles);
 
const input = document.getElementById('search-term')
const autocompleteResults = document.querySelector('.autocomplete-options')

if (input) {
    input.addEventListener('input', (event) => {
        autocompleteResults.innerHTML = ''
        if (input.value.length ) {
            allTitles.forEach(title => {
            const lowerCaseTitle = title.toLowerCase()
                if (lowerCaseTitle.includes(input.value.toLowerCase())) {
                    autocompleteResults.innerHTML += `<li>${title}</li>`
                }
            })
        }
        // myArray.filter(element => element.includes("substring"));
        // const foundPosts =  getResults(allTitles, input.value)
    })
}
