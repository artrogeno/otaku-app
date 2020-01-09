import request from 'request'
import cheerio from 'cheerio'

import GATEWAY from '../../shared/constants/gateway'

const { URL_FILMES_ONLINE_HDX } = GATEWAY

const _listGateway = [
  {
    title: 'Filmes Online HDX',
    gateway: 'filmes-online-hdx',
    url: URL_FILMES_ONLINE_HDX,
    working: true,
  },
]

const getVideoNoRedirect = (uri, baseUrl) => {
  const promise = new Promise((resolve, reject) => {
    const prams = {
      uri,
      method: 'GET',
      simple: false,
      followRedirect: false,
      referer: baseUrl,
      headers: {
        referer: baseUrl,
      },
    }
    request(prams, (error, response, body) => {
      if (!error && response.statusCode == 302) {
        resolve(response.headers['location'])
      } else {
        reject(error)
      }
    })
  })
  return promise
}

const findGateway = uri => {
  return _listGateway.filter(item => item.url === uri)[0]
}

const crawler = uri => {
  const promise = new Promise((resolve, reject) => {
    request(uri, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(error)
      }
    })
  })
  return promise
}

export const listGateway = () => {
  return _listGateway
}

export const indexOnFilmesOnlineHDX = async () => {
  try {
    let movies = []
    let series = []

    const { url: _uri, gateway } = findGateway(URL_FILMES_ONLINE_HDX)
    const html = await crawler(`${_uri}`)
    const $ = cheerio.load(html)

    // const content = $('.movies.slideListAll').children('.movies')

    const dataMovies = `.movies-carousel[data-loader='movies']`
    const dataSeries = `.movies-carousel[data-loader='series']`

    const getBaseLink = base => {
      const [category, movie] = base.split(URL_FILMES_ONLINE_HDX)[1].split('/')
      return { category, movie }
    }

    const setDataList = context => {
      let { category, movie } = getBaseLink(context.attr('href'))
      let title = context
        .find('.item h2.title')
        .text()
        .trim()
      let cats = context
        .find('.item .cats')
        .text()
        .trim()
      let image = context.find('.item .lazy').attr('data-original')
      let votes = {
        image: context.find('.item .votes > img').attr('src'),
        imdb: context
          .find('.item .votes')
          .text()
          .trim(),
      }

      return { gateway, category, movie, title, cats, image, votes }
    }

    $(`${dataMovies} a.linker`).each((i, elem) => {
      const context = $(elem)
      movies.push(setDataList(context))
    })

    $(`${dataSeries} a.linker`).each((i, elem) => {
      const context = $(elem)
      series.push(setDataList(context))
    })

    // console.log('TEST: ', content.html())

    return { movies, series }
  } catch (error) {
    console.log(error)
  }
}

// assistir-filme/o-rei
//http://cdn.topcine.tv/filmes/server1/The.king.2019.mp4
export const findOnMovieFilmesOnlineBr = async movie => {
  try {
    console.log('OPA')
    let movieData = {}
    const { url: _uri, gateway } = findGateway(URL_FILMES_ONLINE_HDX)
    const html = await crawler(`${_uri}assistir-filme/${movie}`)
    const $ = cheerio.load(html)

    movieData.title = $('.infos')
      .find('h2.title')
      .text()
      .trim()
    movieData.titleEng = $('.infos')
      .find('.titleEng > h2')
      .text()
      .trim()
    movieData.genre = $('.infos')
      .find('.genre a')
      .text()
      .trim()

    movieData.image = $(`img[alt='${movieData.title}']`).attr('src')

    movieData.url = $('.get_player_content').attr('href')

    // console.log('TEST: ', content.html())

    return movieData
  } catch (error) {
    console.log(error)
  }
}

export const getOnCategoriesFilmesOnlineBr = async () => {
  try {
    const categories = []
    const { url: _uri, gateway } = findGateway(URL_FILMES_ONLINE_HDX)
    const html = await crawler(`${_uri}filme/`)
    const $ = cheerio.load(html)

    const contant = $('#homepage-items')

    const getBaseLink = base => {
      const [path, category] = base.split(URL_FILMES_ONLINE_HDX)[1].split('/')
      return { path, category }
    }

    contant.find('a').each((i, elem) => {
      let dataCategory = {}
      const context = $(elem)

      const { path, category } = getBaseLink(context.attr('href'))
      dataCategory = { path, category }
      dataCategory.image = context.find('.lazy').attr('data-original')
      dataCategory.title = context.find('.title').text()
      dataCategory.gateway = gateway

      categories.push(dataCategory)
    })

    return categories
  } catch (error) {
    console.log(error)
  }
}

export const findOnCategoryFilmesOnlineBr = async category => {
  try {
    const movies = []
    const { url: _uri, gateway } = findGateway(URL_FILMES_ONLINE_HDX)
    const html = await crawler(`${_uri}filmes-online/${category}`)
    const $ = cheerio.load(html)
    const contant = $('.movies-list .category-item')

    const getBaseLink = base => {
      const [path, movie] = base.split(URL_FILMES_ONLINE_HDX)[1].split('/')
      return { path, movie }
    }

    contant.find('a').each((i, elem) => {
      let dataCategory = {}
      const context = $(elem)
      const { path, movie } = getBaseLink(context.attr('href'))
      dataCategory = { path, movie }
      dataCategory.image = context.find('.lazy').attr('data-original')
      dataCategory.title = context.find('.title').text()
      dataCategory.cats = context.find('.cats').text()
      dataCategory.votes = {
        image: context.find('.votes > img').attr('src'),
        imdb: context
          .find('.votes')
          .text()
          .trim(),
      }
      dataCategory.gateway = gateway
      movies.push(dataCategory)
    })

    return movies
  } catch (error) {
    console.log(error)
  }
}

export const getOnFilmesOnlineHDX = async (page = 1) => {
  try {
    const animes = []
    let pages = {
      maxPage: 0,
      page,
      pageSize: 0,
    }
    const { url: _uri, gateway } = findGateway(URL_ANIMES_ONLINE_BR)
    const html = await crawler(`${_uri}/page/${page}`)
    const $ = cheerio.load(html)

    const content = $('.telinhas')
      .children('ul')
      .find('li')

    pages.pageSize = content.length

    content.each((i, elem) => {
      const context = $(elem)
      let date = context.find('p').text()
      let title = context.find('.thumbTT').text()
      let url = context.find('.thumbTT').attr('href')
      let image = context
        .find('.thumbTel')
        .first()
        .find('img')
        .attr('data-src')
      let id = url
        .split(URL_ANIMES_ONLINE_BR)
        .slice(-1)[0]
        .split('/')[1]

      let urlEps = context
        .find('.episodiosLink')
        .find('a')
        .attr('href')
      const ep = urlEps
        .split(URL_ANIMES_ONLINE_BR)
        .slice(-1)[0]
        .split('/')
      let episodes = {
        id: ep[1],
        category: ep[0],
        url: urlEps,
      }

      animes.push({
        id,
        gateway,
        image,
        date: date.replace('.', ' ').trim(),
        title,
        url,
        episodes,
      })
    })

    // PAGE
    const listPages = $('#paginacao > ul li')
    const lastElem = listPages.eq(-1).text()
    pages.maxPage = parseInt(lastElem.replace('(', '').replace(')', ''))
      ? listPages
          .eq(-1)
          .text()
          .match(/\d+/g)[0]
      : listPages.eq(-2).text()
    return { pages, animes }
  } catch (error) {
    console.log('ERROR: ', error)
  }
}
