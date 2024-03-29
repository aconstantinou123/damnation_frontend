import axios from 'axios'
import moment from 'moment'

import {
  APP_URL,
  FETCH_ARTICLE_DATES_PENDING,
  FETCH_ARTICLE_DATES_SUCCESS,
  FETCH_ARTICLE_DATES_ERROR,
} from '../constants/types'

const archiveDatesFetching = () => ({
  type: FETCH_ARTICLE_DATES_PENDING,
})

const archiveDatesFetched = (payload) => ({
  type: FETCH_ARTICLE_DATES_SUCCESS,
  payload,
})

const articleDatesError = (error) => ({
  type: FETCH_ARTICLE_DATES_ERROR,
  payload: error,
})

export const fetchArchiveDates = () => async (dispatch) => {
  dispatch(archiveDatesFetching())
  try {
    const response = await axios.get(`${APP_URL}/api/article-dates`)
    const sortedDates = response.data.dates
      .map(strDate => moment(strDate, 'MMMM YYYY'))
      .sort((a, b) => moment(b).diff(a))
      .map(date => date.format('MMMM YYYY'))
    dispatch(archiveDatesFetched(sortedDates))
  } catch (err) {
    dispatch(articleDatesError(err))
  }
}
