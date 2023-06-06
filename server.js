// Importeer express uit de node_modules map
import express from 'express'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', async function (req, res) {
  const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes?first=3')
  const data = await fetch (url).then ((response)=> response.json())  
  res.render('index', data)
})

// Route voor index 2
app.get('/index2', async function (req, res) {
  const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes')
  const data = await fetch (url).then ((response)=> response.json()) 
  res.render('index2', data)
})


// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
