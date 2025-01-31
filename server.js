// Importeer express en node-fetch
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config()

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
  variables.orderBy = req.query.orderBy || 'publishDate_DESC';

  if (req.query.authorId) {
    variables.authorId = req.query.authorId;
    query = `
    query BlogPostSearch($pattern: String!, $authorId: [ItemId], $orderBy: [BlogPostModelOrderBy]) {
      allBlogPosts(filter: {
        title: { matches: { pattern: $pattern } },
        authors: { eq: $authorId }
      }, orderBy: $orderBy) {
        title
        slug
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
        slug
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

  
  const url = process.env.API_URL;
  const key = process.env.API_KEY;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: (key)
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const data = await response.json();
  const allTitles = data.data.allBlogPosts.map(post => { return {title:  post.title, slug: post.slug} })
  res.render('index', {data, allTitles});
});

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8000);

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`);
});


