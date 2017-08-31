// Import the necessary modules.
const { expect } = require('chai')

const OmdbApi = require('..')

/** @test {OmdbApi} */
describe('OmdbApi', () => {
  /**
   * The OmdbApi instance.
   * @type {OmdbApi}
   */
  let omdb

  /**
   * Hook for setting up the Omdb tests.
   * @type {Function}
   */
  before(() => {
    omdb = new OmdbApi({
      apiKey: process.env.OMDB_KEY
    })
  })

  /** @test {OmdbApi#byId} */
  it('should get a show by id', done => {
    omdb.byId({
      imdb: 'tt0412142',
      title: 'House',
      type: 'series',
      year: 2004,
      plot: 'full',
      tomatoes: true,
      season: 1
    }).then(res => {
      expect(res).to.be.an('object')

      expect(res.Title).to.be.a('string')
      expect(res.Year).to.be.a('string')
      expect(res.Rated).to.be.a('string')
      expect(res.Released).to.be.a('string')
      expect(res.Runtime).to.be.a('string')
      expect(res.Genre).to.be.a('string')
      expect(res.Director).to.be.a('string')
      expect(res.Writer).to.be.a('string')
      expect(res.Actors).to.be.a('string')
      expect(res.Plot).to.be.a('string')
      expect(res.Language).to.be.a('string')
      expect(res.Country).to.be.a('string')
      expect(res.Awards).to.be.a('string')
      expect(res.Poster).to.be.a('string')

      expect(res.Ratings).to.be.an('array')

      const random = Math.floor(Math.random() * res.Ratings.length)
      const toTest = res.Ratings[random]

      expect(toTest.Source).to.be.a('string')
      expect(toTest.Value).to.be.a('string')

      expect(res.Metascore).to.be.a('string')
      expect(res.imdbRating).to.be.a('string')
      expect(res.imdbVotes).to.be.a('string')
      expect(res.imdbID).to.be.a('string')
      expect(res.Type).to.be.a('string')
      expect(res.totalSeasons).to.be.a('string')
      expect(res.Response).to.be.a('string')

      expect(res.tomatoMeter).to.be.a('string')
      expect(res.tomatoImage).to.be.a('string')
      expect(res.tomatoRating).to.be.a('string')
      expect(res.tomatoReviews).to.be.a('string')
      expect(res.tomatoFresh).to.be.a('string')
      expect(res.tomatoRotten).to.be.a('string')
      expect(res.tomatoConsensus).to.be.a('string')
      expect(res.tomatoUserMeter).to.be.a('string')
      expect(res.tomatoUserRating).to.be.a('string')
      expect(res.tomatoUserReviews).to.be.a('string')
      expect(res.tomatoURL).to.be.a('string')
      expect(res.DVD).to.be.a('string')
      expect(res.BoxOffice).to.be.a('string')
      expect(res.Production).to.be.a('string')
      expect(res.Website).to.be.a('string')

      done()
    }).catch(done)
  })

  /** @test {OmdbApi#byId} */
  it('should throw an error when getting by id', () => {
    expect(omdb.byId.bind(omdb, {
      imdb: undefined,
      title: undefined
    })).to.throw('imdb and/or title needs to be given!')
    expect(omdb.byId.bind(omdb, {
      imdb: 'tt0412142',
      type: 'faulty'
    })).to.throw('faulty is not a valid value for type!')
    expect(omdb.byId.bind(omdb, {
      imdb: 'tt0412142',
      type: 'series',
      plot: 'faulty'
    })).to.throw('faulty is not a valid value for plot!')
    expect(omdb.byId.bind(omdb, {
      imdb: 'tt0412142',
      type: 'series',
      plot: 'full',
      tomatoes: 'faulty'
    })).to.throw('Value for \'tomatoes\' has to be a boolean!')
  })

  /** @test {OmdbApi#bySearch} */
  it('should get shows by searching', done => {
    omdb.bySearch({
      search: 'House',
      type: 'series',
      year: '2004',
      page: 1
    }).then(res => {
      expect(res).to.be.an('object')

      expect(res.Search).to.be.an('array')

      const random = Math.floor(Math.random() * res.Search.length)
      const toTest = res.Search[random]

      expect(toTest.Title).to.be.a('string')
      expect(toTest.Year).to.be.a('string')
      expect(toTest.imdbID).to.be.a('string')
      expect(toTest.Type).to.be.a('string')
      expect(toTest.Poster).to.be.a('string')

      expect(res.totalResults).to.be.a('string')
      expect(res.Response).to.be.a('string')

      done()
    }).catch(done)
  })

  /** @test {OmdbApi#bySearch} */
  it('should throw an error when searching', () => {
    expect(omdb.bySearch.bind(omdb, {
      search: undefined
    })).to.throw('search is a required field!')
    expect(omdb.bySearch.bind(omdb, {
      search: 'House',
      type: 'faulty'
    })).to.throw('faulty is not a valid value for type!')
    expect(omdb.bySearch.bind(omdb, {
      search: 'House',
      type: 'series',
      page: 101
    })).to.throw('101 is not a valid value for page!')
  })
})
