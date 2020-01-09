import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  mangaChapterRequest: ['gateway', 'manga', 'chapter'],
  mangaChapterSuccess: ['data'],
})

export const MangaChapterTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  data: {},
  loading: true,
})

export const request = state => state.merge({ loading: true })
export const success = (state, { data }) =>
  state.merge({ loading: false, data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MANGA_CHAPTER_REQUEST]: request,
  [Types.MANGA_CHAPTER_SUCCESS]: success,
})
