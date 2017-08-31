// Import the necessary modules.
/* eslint-disable no-console */
const OmdbApi = require('..')

// Create a new instance of the module.
const omdb = new OmdbApi({
  apiKey: process.env.OMDB_KEY
})

// Get by id.
const byId = omdb.byId({
  imdb: 'tt0412142',
  title: 'House',
  type: 'series',
  year: 2004,
  plot: 'full',
  tomatoes: true,
  season: 1
})

// Get by search.
const bySearch = omdb.bySearch({
  search: 'House',
  type: 'series',
  year: '2004',
  page: 1
})

// Execute the promises and print out the result. Or catch the error if one
// occures in one of the promises.
Promise.all([byId, bySearch]).then(res => {
  console.log(res[0])
  console.log(res[1])
}).catch(err => console.error(err))
