import { BaseController } from '../../shared/base'
import {
  listGateway,
  indexOnFilmesOnlineHDX,
  findOnMovieFilmesOnlineBr,
  getOnCategoriesFilmesOnlineBr,
  findOnCategoryFilmesOnlineBr,
} from './filmes.model'

export class FilmesController extends BaseController {
  constructor(req, res, next) {
    super(req, res, next)
  }

  gateway() {
    const data = listGateway()
    let messages = this.messages.GATEWAY_GET_SUCCESS
    this.sendResponse({ data, messages })
  }

  async indexFilmesOnlineHDX() {
    const data = await indexOnFilmesOnlineHDX()
    let messages = this.messages.FILMES_ONLINE_HDX_INDEX_SUCCESS
    this.sendResponse({ data, messages })
  }

  async findMovieFilmesOnlineBr() {
    const { movie } = this.req.params
    const data = await findOnMovieFilmesOnlineBr(movie)
    let messages = this.messages.FILMES_ONLINE_HDX_FIND_SUCCESS
    this.sendResponse({ data, messages })
  }

  async getCategoriesFilmesOnlineBr() {
    const data = await getOnCategoriesFilmesOnlineBr()
    let messages = this.messages.FILMES_ONLINE_HDX_CATEGORIES_SUCCESS
    this.sendResponse({ data, messages })
  }

  async findCategoryFilmesOnlineBr() {
    const { category } = this.req.params
    const data = await findOnCategoryFilmesOnlineBr(category)
    let messages = this.messages.FILMES_ONLINE_HDX_CATEGORY_SUCCESS
    this.sendResponse({ data, messages })
  }

  // async findAnimesOnlineBr() {
  //   const { id } = this.req.params
  //   const data = await findEpOnAnimesOnlineBR(id)
  //   let messages = this.messages.ANIMES_ONLINE_BR_FIND_SUCCESS
  //   this.sendResponse({ data, messages })
  // }

  // async listOnAnimesOnlineBR() {
  //   const { id, category } = this.req.params
  //   const data = await listEpisodesOnAnimesOnlineBR(id, category)
  //   let messages = this.messages.ANIMES_ONLINE_BR_LIST_SUCCESS
  //   this.sendResponse({ data, messages })
  // }

  // async searchAnimesOnlineBR() {
  //   const { search } = this.req.params
  //   const data = await searchOnAnimesOnlineBR(search)
  //   let messages = this.messages.ANIMES_ONLINE_BR_SEARCH_SUCCESS
  //   this.sendResponse({ data, messages })
  // }
}
