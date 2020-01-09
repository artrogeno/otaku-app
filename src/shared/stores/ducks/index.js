import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { reducer as header } from './header'
import { reducer as auth } from './auth'
import { reducer as gateway } from './gateway'
import { reducer as search } from './search'
import { reducer as anime } from './anime'
import { reducer as episode } from './episode'
import { reducer as video } from './video'
import { reducer as manga } from './manga'
import { reducer as mangaChapters } from './mangaChapters'
import { reducer as mangaChapter } from './mangaChapter'

export default history =>
  combineReducers({
    header,
    auth,
    gateway,
    search,
    anime,
    episode,
    video,
    manga,
    mangaChapters,
    mangaChapter,
    router: connectRouter(history),
  })
