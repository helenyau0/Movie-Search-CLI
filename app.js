const express = require('express')
const app = express()
const cheerio = require('cheerio');
const rp = require('request-promise');

const port = process.env.PORT || 3000;

app.get('/api/imdb/search/:query', function(req, res) {
  const {query} = req.params

  let options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${query}&s=all`,
    transform: function(body) {
      return cheerio.load(body)
    }
  }

  let movieObj = {
    "movies" : []
  }

  rp(options)
    .then(function ($) {
      $('body')
      let movies = $('.findSection')
      .first()
      .find('.result_text')
      .children('a')
      .map((i, elm) => $(elm).text())
      .toArray()
      for (let values of movies) {
        movieObj["movies"].push({"name": values})
      }

      $('body')
      let imdb_movies = $('.findSection')
      .first()
      .find('.result_text')
      .map((i, elm) => $(elm).text().replace(/[^0-9]/gi, '').substr(0,4))
      .toArray()
      let movieArray = movieObj['movies']
      for(let i = 0; i < movieArray.length; i++) {
        for(let n = 0; n < imdb_movies.length; n++) {
          movieArray[i]['year'] = imdb_movies[i]
        }
      }
      return movieObj
    })
    .then(movieObj => res.json(movieObj))
    .catch(err => console.log(err))
})

module.exports = app;


app.listen(port)
console.log('listening on port: 3000');
