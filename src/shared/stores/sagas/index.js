import { all, takeLatest } from 'redux-saga/effects'

import { signIn, isAthenticated, redirect } from './auth'
import { headerProps } from './header'
import { gatewayRequest, gatewaySelected } from './gateway'
import { searchRequest } from './search'
import { initialRequest } from './anime'
import { episodeRequest } from './episode'
import { videoRequest } from './video'
import { mangaRequest } from './manga'
import { mangaChaptersRequest } from './mangaChapters'
import { mangaChapterRequest } from './mangaChapter'

import { AuthTypes } from '../ducks/auth'
import { HeaderTypes } from '../ducks/header'
import { GatewayTypes } from '../ducks/gateway'
import { SearchTypes } from '../ducks/search'
import { AnimeTypes } from '../ducks/anime'
import { EpisodeTypes } from '../ducks/episode'
import { VideoTypes } from '../ducks/video'
import { MangaTypes } from '../ducks/manga'
import { MangaChaptersTypes } from '../ducks/mangaChapters'
import { MangaChapterTypes } from '../ducks/mangaChapter'

export default function* rootSagas() {
  return yield all([
    isAthenticated(),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_IN_REDIRECT, redirect),

    takeLatest(HeaderTypes.HEADER_PROPS, headerProps),

    takeLatest(GatewayTypes.GATEWAY_REQUEST, gatewayRequest),
    takeLatest(GatewayTypes.GATEWAY_SELECTED, gatewaySelected),

    takeLatest(SearchTypes.SEARCH_REQUEST, searchRequest),

    takeLatest(AnimeTypes.ANIME_REQUEST, initialRequest),
    takeLatest(EpisodeTypes.EPISODE_REQUEST, episodeRequest),
    takeLatest(VideoTypes.VIDEO_REQUEST, videoRequest),

    takeLatest(MangaTypes.MANGA_REQUEST, mangaRequest),
    takeLatest(MangaChaptersTypes.MANGA_CHAPTERS_REQUEST, mangaChaptersRequest),
    takeLatest(MangaChapterTypes.MANGA_CHAPTER_REQUEST, mangaChapterRequest),
  ])
}
