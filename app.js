const express = require('express')
const app = express()
const http = require('http');
const cheerio = require('cheerio');
const rp = require('request-promise');

const query = process.argv.slice(2).join('+')

const port = process.env.PORT || 3000;

app.get(`/api/imdb/search/${query}`, function(req, res) {
  let options = {
    uri: `http://www.imdb.com/find?ref_=nv_sr_fn&q=${query}&s=all`,
    transform: function(body) {
      return cheerio.load(body)
    }
  }



  rp(options)
    .then(function ($) {

      let movies = $('.findSection')
      .first()
      .find('.result_text')
      .map((i, elm) => $(elm).text().replace(/[^0-9]/gi, ''))
      .toArray()


      console.log(movie);
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.log(err);
    });
})

exports = module.exports = app;


app.listen(port)
console.log('listening on port: 3000');
