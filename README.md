# omdb-api-pt

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][dev-david-image]][dev-david-url]

[travis-url]: https://travis-ci.org/ChrisAlderson/omdb-api-pt
[travis-image]: https://travis-ci.org/ChrisAlderson/omdb-api-pt.svg?branch=master
[coverage-url]: https://coveralls.io/github/ChrisAlderson/omdb-api-pt?branch=master
[coverage-image]: https://coveralls.io/repos/github/ChrisAlderson/omdb-api-pt/badge.svg?branch=master
[david-url]: https://david-dm.org/ChrisAlderson/omdb-api-pt
[david-image]: https://david-dm.org/ChrisAlderson/omdb-api-pt.svg
[dev-david-url]: https://david-dm.org/ChrisAlderson/omdb-api-pt?type=dev
[dev-david-image]: https://david-dm.org/ChrisAlderson/omdb-api-pt/dev-status.svg

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
