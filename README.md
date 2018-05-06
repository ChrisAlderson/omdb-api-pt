# omdb-api-pt

[![Build Status](https://travis-ci.org/ChrisAlderson/omdb-api-pt.svg?branch=master)](https://travis-ci.org/ChrisAlderson/omdb-api-pt)
[![Coverage Status](https://coveralls.io/repos/github/ChrisAlderson/omdb-api-pt/badge.svg?branch=master)](https://coveralls.io/github/ChrisAlderson/omdb-api-pt?branch=master)
[![Dependency Status](https://david-dm.org/ChrisAlderson/omdb-api-pt.svg)](https://david-dm.org/ChrisAlderson/omdb-api-pt)
[![devDependency Status](https://david-dm.org/ChrisAlderson/omdb-api-pt/dev-status.svg)](https://david-dm.org/ChrisAlderson/omdb-api-pt?type=dev)

An OMDB API wrapper for NodeJS.

## Usage

#### Setup
```
npm install --save omdb-api-pt
```

#### Initialize
```js
const OmdbApi = require('omdb-api-pt')

// Create a new instance of the module.
const omdb = new OmdbApi({
  apiKey, // Your API key.
  baseUrl // The base url of omdb. Defaults to 'https://omdbapi.com/'.
})
```

#### Example usage

```js
omdb.byId({
  imdb: 'tt0412142',
  title: 'House',
  type: 'series',
  year: 2004,
  plot: 'full',
  tomatoes: true,
  season: 1
}).then(res => console.log(res))
  .catch(err => console.error(err))
```

```js
omdb.bySearch({
  search: 'House',
  type: 'series',
  year: '2004',
  page: 1
}).then(res => console.log(res))
  .catch(err => console.error(err))
```

## Testing

You can run tests with the following npm command:
```
 $ OMDB_KEY=[Your API key] npm test
```

# License

MIT License
