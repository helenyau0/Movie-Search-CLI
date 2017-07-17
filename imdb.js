const http = require('http');
const cheerio = require('cheerio');

function imdb_Search(movie, cb) {
  http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${movie}&s=all`
  }, (res) => {
    let html = ''
    res.on('data', (chunk) => { html += chunk })
    res.on('end', () => {
      const movieNames = getMovieNames(html)
      cb(null, movieNames)
    })
  })
}

function getMovieNames(html) {
  const $ = cheerio.load(html)
  const movieNames = $('.findSection')
  .first()
  .find('.result_text')
  .map((i, elm) => $(elm).text())
  .toArray()
  return movieNames
}

function init() {
  const movie = process.argv.slice(2).join('+')

  imdb_Search(movie, (err, movieNames) => {
    if(err) throw err
    console.log(movieNames);
    console.log(movieNames.join('\n'));
  })
}

if(!module.parent) {
  init()
}
