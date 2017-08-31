// Import the necessary modules.
const debug = require('debug')
const got = require('got')
const { stringify } = require('querystring')

const { name } = require('./package')

/**
 * The rating model.
 * @typedef Rating
 * @property {string} Source The Source of the rating.
 * @property {string} Value The Value of the rating.
 */

/**
 * The content model, can be a movie or show.
 * @typedef {Object} Content
 * @property {string} Title The Title of the movie or show.
 * @property {string} Year The Year of the movie or show.
 * @property {string} Rated The Rated of the movie or show.
 * @property {string} Released The Released of the movie or show.
 * @property {string} Runtime The Runtime of the movie or show.
 * @property {string} Genre The Genre of the movie or show.
 * @property {string} Director The Director of the movie or show.
 * @property {string} Writer The Writer of the movie or show.
 * @property {string} Actors The Actors of the movie or show.
 * @property {string} Plot The Plot of the movie or show.
 * @property {string} Language The Language of the movie or show.
 * @property {string} Country The Country of the movie or show.
 * @property {string} Awards The Awards of the movie or show.
 * @property {string} Poster The Poster of the movie or show.
 * @property {Array<Rating>} Ratings The Rating of the movie or show.
 * @property {string} Metascore The Metascore of the movie or show.
 * @property {string} imdbRating The imdbRating of the movie or show.
 * @property {string} imdbVotes The imdbVotes of the movie or show.
 * @property {string} imdbID The imdbID of the movie or show.
 * @property {string} Type The Type of the movie or show.
 * @property {string} totalSeasons The totalSeasons of the movie or show.
 * @property {string} Response The Response of the movie or show.
 * @property {string} tomatoMeter The tomatoMeter  of the movie or show.
 * @property {string} tomatoImage The tomatoImage  of the movie or show.
 * @property {string} tomatoRating The tomatoRating  of the movie or show.
 * @property {string} tomatoReviews The tomatoReviews  of the movie or show.
 * @property {string} tomatoFresh The tomatoFresh  of the movie or show.
 * @property {string} tomatoRotten The tomatoRotten  of the movie or show.
 * @property {string} tomatoConsensus The tomatoConsensus  of the movie or
 * show.
 * @property {string} tomatoUserMeter The tomatoUserMeter  of the movie or
 * show.
 * @property {string} tomatoUserRating The tomatoUserRating  of the movie or
 * show.
 * @property {string} tomatoUserReviews The tomatoUserReviews  of the movie or
 * show.
 * @property {string} tomatoURL The tomatoURL  of the movie or show.
 * @property {string} DVD The DVD  of the movie or show.
 * @property {string} BoxOffice The BoxOffice  of the movie or show.
 * @property {string} Production The Production  of the movie or show.
 * @property {string} Website The Website  of the movie or show.
 */

/**
 * The search result model.
 * @typedef {Object} SearchResult
 * @property {string} Title The Title of the search object.
 * @property {string} Year The Year of the search object.
 * @property {string} imdbID The imdbID of the search object.
 * @property {string} Type The Type of the search object.
 * @property {string} Poster The Poster of the search object.
 */

/**
 * The search response.
 * @typedef {Object} Search
 * @property {Array<SearchResult} Search The Search fo the search response.
 * @property {string} totalResults The totalResults of the search response.
 * @property {string} Response The Response of the search response.
 */

/**
 * An OMDB API wrapper for NodeJS.
 * @type {OmdbApi}
 */
module.exports = class OmdbApi {

  /**
   * Create a new instance of the module.
   * @param {!Object} config - The config object of the module.
   * @param {!string} config.apiKey - Your API key.
   * @param {!string} config.baseUrl=https://omdbapi.com/ - v
   */
  constructor({apiKey, baseUrl = 'https://omdbapi.com/'}) {
    if (!apiKey) {
      throw new Error('No API key given!')
    }

    /**
     * Your API key.
     * @type {string}
     */
    this.apiKey = apiKey
    /**
     * Your API key.
     * @type {string}
     */
    this._baseUrl = baseUrl
    /**
     * Show extra output.
     * @type {Function}
     */
    this._debug = debug(name)

    /**
     * Allowed types to search for.
     * @type {Array<string>}
     */
    OmdbApi._types = ['movie', 'series', 'episode']
    /**
     * Allowed plots to search for.
     * @type {Array<string>}
     */
    OmdbApi._plots = ['short', 'full']
  }

  /**
   * Make a get request to omdbapi.com.
   * @param {!Object} [query] - The querystring for the request.
   * @returns {Promise<Response, Error>} - The response body wrapped in
   * cheerio.
   */
  _get(query) {
    query.apikey = this.apiKey
    this._debug(`Making request to: '${this._baseUrl}?${stringify(query)}'`)

    return got.get(this._baseUrl, {
      query,
      json: true
    }).then(({ body }) => body)
  }

  /**
   * Check if a given type is supported by the OMDB api.
   * @throws {Error} - TYPE is not a valid value for type!
   * @param {!string} type - The type to check if it is valid.
   * @returns {undefined}
   */
  _checkType(type) {
    if (type && OmdbApi._types.indexOf(type) === -1) {
      throw new Error(`${type} is not a valid value for type!`)
    }
  }

  /**
   * Get by id.
   * @throws {Error} - imdb and/or title needs to be given!
   * @throws {Error} - TYPE is not a valid value for type!
   * @throws {Error} - PLOT is not a valid value for plot!
   * @throws {Error} - Value for 'tomatoes' has to be a boolean!
   * @param {!Object} config - The config object for the method.
   * @param {?string} config.imdb - The imdb id of the content you want to
   * search for.
   * @param {?string} config.title - The title of the content you want to
   * search for.
   * @param {?string} config.type - The type of content you want to search for.
   * @param {?number} config.year - The year in which the content was released.
   * @param {?string} [config.plot='short'] - The type of plot you want.
   * @param {?boolean} [config.tomatoes=false] - Add Rotten Tomatoes ratings
   * with the response.
   * @param {?number}  config.season - The season you want to search for.
   * @returns {Promise<Content, Error>} - The promise to get content by id.
   */
  byId({imdb, title, type, year, plot = 'short', tomatoes = false, season}) {
    if (!imdb && !title) {
      throw new Error(`imdb and/or title needs to be given!`)
    }
    if (OmdbApi._plots.indexOf(plot) === -1) {
      throw new Error(`${plot} is not a valid value for plot!`)
    }
    if (typeof tomatoes !== 'boolean') {
      throw new Error(`Value for 'tomatoes' has to be a boolean!`)
    }
    this._checkType(type)

    return this._get({
      i: imdb,
      t: title,
      type,
      y: year,
      plot,
      tomatoes
    })
  }

  /**
   * Get by search
   * @throws {Error} - search is a required field!
   * @throws {Error} - TYPE is not a valid value for type!
   * @throws {Error} - PAGE is not a valid value for page!
   * @param {!Object} config - The config object for the method.
   * @param {!sring} config.search - A query to search for.
   * @param {?sring} config.type - The type of content you want to search for.
   * @param {?number} config.year - The year in which the content was released.
   * @param {?number} [config.page=1}] - The page you want to search on.
   * @returns {Promise<Search, Error>} - The promise to get content by search.
   */
  bySearch({search, type, year, page = 1}) {
    if (!search) {
      throw new Error(`search is a required field!`)
    }
    if (parseInt(page, 10) > 100 || parseInt(page, 10) < 1) {
      throw new Error(`${page} is not a valid value for page!`)
    }
    this._checkType(type)

    return this._get({
      s: search,
      type,
      y: year,
      page
    })
  }

}
