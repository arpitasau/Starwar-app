const express = require('express')

const app = express()
const PORT = 3000

var path = require("path");

var bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
 

const characters = [
  {
    name: 'Yoda',
    role: 'Jedi Master',
    age: 900,
    forcePoints: 2000,
    routeName: 'yoda'
  },
  {
    name: 'Darth Maul',
    role: 'Sith Lord',
    age: 200,
    forcePoints: 1200,
    routeName: 'Darth Maul'
  },
  {
    name: 'Anakin',
    role: 'Sith Lord',
    age: 18,
    forcePoints: 1500,
  },
]

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get('/api/:characters', (req, res) => {
  res.json(characters)
});
app.get('/api/characters:character', (req, res) => {
  const chosen = req.params.character
  if (chosen) {
    for (let i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        res.json(characters[i])
        return;
      }
    }
    res.send("No character found");
  } else {
    res.json(characters);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`)
})