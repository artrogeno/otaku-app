import { BaseRouter } from '../../shared/base'
import { FilmesController } from './filmes.controller'

export class FilmesRouter extends BaseRouter {
  constructor() {
    super(FilmesController)
    this.router.get(
      '/gateway',
      this.handler(FilmesController.prototype.gateway)
    )

    this.router.get(
      '/filmes-online-hdx',
      this.handler(FilmesController.prototype.indexFilmesOnlineHDX)
    )

    this.router.get(
      '/filmes-online-hdx/:movie',
      this.handler(FilmesController.prototype.findMovieFilmesOnlineBr)
    )

    this.router.get(
      '/filmes-online-hdx/categories',
      this.handler(FilmesController.prototype.getCategoriesFilmesOnlineBr)
    )

    this.router.get(
      '/filmes-online-hdx/category/:category',
      this.handler(FilmesController.prototype.findCategoryFilmesOnlineBr)
    )

    // this.router.get(
    //   '/filmes-online-br/search/:search',
    //   this.handler(FilmesController.prototype.searchFilmesOnlineBR)
    // )

    // this.router.get(
    //   '/filmes-online-br/:id/:category',
    //   this.handler(FilmesController.prototype.listOnFilmesOnlineBR)
    // )
  }
}
