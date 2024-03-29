import axios from 'axios'

import {
  APP_URL,
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_EXTERNAL_FILE_PENDING,
  FETCH_EXTERNAL_FILE_SUCCESS,
  FETCH_EXTERNAL_FILE_ERROR,
  FETCH_MAIN_ARTICLE_PENDING,
  FETCH_MAIN_ARTICLE_SUCCESS,
  FETCH_MAIN_ARTICLE_ERROR,
  SET_CURRENT_PAGE,
  SET_ARTICLE_TO_VIEW,
  SET_SEARCH_VALUE,
  RESET_ARTICLE_FETCHED_STATE,
  SET_LOCATION,
  SET_DATE,
  RESET_DATE,
  RESET_MAIN_ARTICLE_STATE,
} from '../constants/types'

const articlesFetching = () => ({
  type: FETCH_ARTICLES_PENDING,
})

const articlesFetched = (payload) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload,
})

const articlesError = (error) => ({
  type: FETCH_ARTICLES_ERROR,
  payload: error,
})

export const fetchArticles = (notMain) => async (dispatch, getState) => {
  const { articleReducer } = getState()
  const { date, currentPage, searchValue } = articleReducer
  const page = `pageNumber=${currentPage}`
  const dateToSearch = date ? `&date=${date}` : ''
  const search = searchValue ? `&query=${searchValue}` : ''
  const isMainArticle = notMain ? `&main=false` : ''
  dispatch(articlesFetching())
  try {
    const response = await axios.get(`${APP_URL}/api/article?${page}${dateToSearch}${search}${isMainArticle}`)
    dispatch(articlesFetched(response.data))
  } catch (err) {
    dispatch(articlesError(err))
  }
}

const fetchExternalFilePending = () => ({
  type: FETCH_EXTERNAL_FILE_PENDING,
})

const fetchExternalFileSuccess = (payload) => ({
  type: FETCH_EXTERNAL_FILE_SUCCESS,
  payload,
})

const fetchExternalFileError = (error) => ({
  type: FETCH_EXTERNAL_FILE_ERROR,
  payload: error
})

export const fetchExternalFile = (filename) => async (dispatch) => {
  dispatch(fetchExternalFilePending())
  try {
    const response = await axios.get(`${APP_URL}/api/files/${filename}`, {
      responseType: 'arraybuffer',
    })
    const data = Buffer.from(response.data, "binary").toString("base64")
    dispatch(fetchExternalFileSuccess(data))
  } catch (err) {
    dispatch(fetchExternalFileError(err))
  }
}

const fetchMainArticlePending = () => ({
  type: FETCH_MAIN_ARTICLE_PENDING,
})

const fetchMainArticleSuccess = (payload) => ({
  type: FETCH_MAIN_ARTICLE_SUCCESS,
  payload,
})

const fetchMainArticleError = (error) => ({
  type: FETCH_MAIN_ARTICLE_ERROR,
  payload: error,
})

export const fetchMainArticle = () => async (dispatch) => {
  dispatch(fetchMainArticlePending())
  try {
    const response = await axios.get(`${APP_URL}/api/article?pageNumber=1&main=true`)
    dispatch(fetchMainArticleSuccess(response.data))
  } catch (err) {
    dispatch(fetchMainArticleError(err))
  }
}

export const resetMainArticleState = () => ({
  type: RESET_MAIN_ARTICLE_STATE,
})

export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload,
})

export const setArticleContent = (payload) => ({
  type: SET_ARTICLE_TO_VIEW,
  payload,
})

export const setArticleToView = (article) => async (dispatch) => {
  dispatch(setArticleContent(article))
  if(article.filename && 
    !['mp4', 'mp3', 'wav'].some(x => article.filename.includes(x))) {
    dispatch(fetchExternalFile(article.filename))
  }
}

const articleFetching = () => ({
  type: FETCH_ARTICLE_PENDING,
})

const articleFetched = (payload) => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload,
})

const articleError = (error) => ({
  type: FETCH_ARTICLE_ERROR,
  payload: error,
})

export const fetchArticle = (id) => async (dispatch) => {
  dispatch(articleFetching())
  try {
    const response = await axios.get(`${APP_URL}/api/article/${id}`)
    dispatch(articleFetched(response.data.data))
    if(response.data.data.filename && 
      !['mp4', 'mp3', 'wav'].some(x => response.data.data.filename.includes(x))){
      dispatch(fetchExternalFile(response.data.data.filename))
    }
  } catch (err) {
    dispatch(articleError(err))
  }
}

export const setSearchValue = (payload) => ({
  type: SET_SEARCH_VALUE,
  payload,
})

export const resetArticleFetchedState = () => ({
  type: RESET_ARTICLE_FETCHED_STATE,
})

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
})

export const setDate = (payload) => ({
  type: SET_DATE,
  payload,
})

export const resetDate = () => ({
  type: RESET_DATE,
})