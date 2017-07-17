const http = require('http');
const cheerio = require('cheerio');
const rp = require('request-promise');

function imdb_Search(movie) {
  var options = {
    uri: `www.imdb.com/find?ref_=nv_sr_fn&q=${movie}&s=all`,
    transform: function(body) {
      return cheerio.load(body)
    }
  }

  rp(options)
    .then(function ($) {
      $('body')
      $('.findSection')
      .first()
      .find('.result_text')
      .map((i, elm) => $(elm).text())
      .toArray()
      console.log('gahasjkhdkashdk', body);
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
        console.log(err);
    });
}

const movie = process.argv.slice(2).join('+')

imdb_Search(movie)
