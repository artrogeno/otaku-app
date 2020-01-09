import { Router } from 'express'
import { AnimesRouter } from './animes'
import { MangasRouter } from './manga'
import { FilmesRouter } from './filmes'

export class ApiRouter {
  constructor() {
    this.router = Router()
    this.providerRoutes()
  }

  providerRoutes() {
    this.router.use('/animes', new AnimesRouter().router)
    this.router.use('/mangas', new MangasRouter().router)
    this.router.use('/filmes', new FilmesRouter().router)
  }
}
