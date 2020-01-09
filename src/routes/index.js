import React from 'react'
import { Switch } from 'react-router-dom'

import Guest from './guest'

import MainLayout from '@layouts/Main'
import VideoGateway from '@pages/animes/VideoGateway'
import Animes from '@pages/animes/Anime'
import Episodes from '@pages/animes/Episodes'
import Video from '@pages/animes/Video'

import MangaGateway from '@pages/manga/MangaGateway'
import Manga from '@pages/manga/Manga'
import MangaChapters from '@pages/manga/MangaChapters'
import MangaChapter from '@pages/manga/MangaChapter'

export default () => (
  <Switch>
    <MainLayout>
      <Guest exact path="/" component={VideoGateway} />
      <Guest path="/animes/:page" component={Animes} />
      <Guest path="/episodes/:id/:category" component={Episodes} />
      <Guest path="/video/:id" component={Video} />

      <Guest exact path="/manga" component={MangaGateway} />
      <Guest path="/mangas/launch/:page" component={Manga} />
      <Guest path="/mangas/:manga/chapters" component={MangaChapters} />
      <Guest path="/mangas/:manga/chapter/:chapter" component={MangaChapter} />
    </MainLayout>
  </Switch>
)
