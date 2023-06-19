// Importeer express en node-fetch
import express from 'express';
import fetch from 'node-fetch';

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs');
app.set('views', './views');

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'));

// Maak een route voor de index
app.get('/', async function (req, res) {
  let query = '';
  let variables = {};
  variables.pattern = req.query.searchTerm || '';
  variables.orderBy = req.query.orderBy || 'publishDate_ASC';

  if (req.query.authorId) {
    variables.authorId = req.query.authorId;
    query = `
    query BlogPostSearch($pattern: String!, $authorId: [ItemId], $orderBy: [BlogPostModelOrderBy]) {
      allBlogPosts(filter: {
        title: { matches: { pattern: $pattern } },
        authors: { eq: $authorId }
      }, orderBy: $orderBy) {
        title
        publishDate
        authors {
          id
          name
          image {
            width
            height
            filename
          }
        }
      }
    }
    `;
  } else {
    query = `
    query BlogPostSearch($pattern: String!, $orderBy: [BlogPostModelOrderBy]) {
      allBlogPosts(filter: {
        title: { matches: { pattern: $pattern } }
      }, orderBy: $orderBy) {
        title
        publishDate
        authors {
          id
          name
          image {
            width
            height
            filename
          }
        }
      }
    }`;
  }

  console.log(query);
  console.log(variables);

  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 10a0ae10c2d6418c1acd4346de9329',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  console.log(data);

  res.render('index', data);
});

// Route voor de autocomplete
app.get('/autocomplete', async function (req, res) {
  const searchTerm = req.query.searchTerm || '';

  // Functie om de autocomplete-resultaten op te halen
  async function getAutocompleteResults(searchTerm) {
    try {
      const apiUrl = 'https://graphql.datocms.com/';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 10a0ae10c2d6418c1acd4346de9329',
      };

      const params = {
        searchTerm: searchTerm,
      };

      // Doe de API-aanroep met fetch
      const response = await fetch(`${apiUrl}/autocomplete?searchTerm=${searchTerm}`, {
        method: 'GET',
        headers: headers,
      });

      // Controleer of de API-aanroep succesvol was
      if (!response.ok) {
        throw new Error('API call failed');
      }

      // Lees de JSON-respons van de API
      const data = await response.json();

      // Verwerk de ontvangen data en retourneer de resultaten
      const processAutocompleteData = (data) => {
        try {
          // Controleer of de ontvangen data een array is
          if (Array.isArray(data)) {
            return data;
          } else {
            console.error('Ontvangen data is geen array:', data);
            return [];
          }
        } catch (handleError) {
          console.error('Error retrieving autocomplete results:', handleError);
          return [];
        }
      };

      const autocompleteResults = processAutocompleteData(data);
      return autocompleteResults;
    } catch (error) {
      console.error('Error retrieving autocomplete results:', error);
      return [];
    }
  }

  const autocompleteResults = await getAutocompleteResults(searchTerm);
  const resultsArray = Array.isArray(autocompleteResults) ? autocompleteResults : [];
  res.json(resultsArray);
});

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`);
});


