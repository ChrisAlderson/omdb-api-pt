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

Copyright (c) 2017 - omdb-api-pt - Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
