const cheerio = require('cheerio');
const rp = require('request-promise');

function imdb_Search(movie) {
  let options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${movie}&s=all`,
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
      .find('a')
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
      let bleh = movieObj['movies']
      for(let i = 0; i < bleh.length; i++) {
        for(let n = 0; n < imdb_movies.length; n++) {
          bleh[i]['year'] = imdb_movies[i]
        }
      }
      console.log(movieObj);
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.log(err);
    });
}

const movie = process.argv.slice(2).join('+')

imdb_Search(movie)
