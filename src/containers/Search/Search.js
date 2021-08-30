import Pagination from 'react-js-pagination'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/Header/Header'
import ArticleList from '../../components/ArticleList/ArticleList'
import Loading from '../../components/Loading/Loading'

import * as articleActions from '../../actions/articleActions'
import * as archiveActions from '../../actions/archiveActions'

import history from '../../history'

import './Search.css'

const Search = ({
  articles,
  setArticleToView,
  articleCount,
  currentPage,
  setCurrentPage,
  user,
  searchArticles,
  searchArticlesFetched,
  articleSubmitted,
  fetchArticleCount,
  articleDeleteSuccess,
  articleCountFetched,
  resetArticleCount,
  setArchiveLocation,
  setSearchValue,
}) => {

  const { search } = useParams()

  useEffect(() => {
    setSearchValue(search)
    searchArticles(search, currentPage)
  }, [currentPage, searchArticles, resetArticleCount, setSearchValue, search]);

  useEffect(() => {
    return () => {
      setCurrentPage(1)
      setSearchValue('')
    }
  }, [setCurrentPage, setSearchValue])

  useEffect(() => {
    const location = history.location.pathname
    setArchiveLocation(location)
  }, [setArchiveLocation])

  useEffect(() => {
    if (articleSubmitted) {
      fetchArticleCount()
    }
  }, [articleSubmitted, fetchArticleCount]);

  useEffect(() => {
    if (articleDeleteSuccess) {
      fetchArticleCount()
    }
  }, [articleDeleteSuccess, fetchArticleCount]);

  useEffect(() => {
    if (!articleCountFetched) {
      fetchArticleCount()
    }
  }, [fetchArticleCount, articleCountFetched])


  const handlePageChange = data => {
    setCurrentPage(data)
  }
  return (
    <>
      <Header
        user={user}
      />
      {
        searchArticlesFetched ? (
          <>
            <ArticleList 
              articles={articles}
              setArticleToView={setArticleToView}
            />
            {
              articleCount &&
                <div className='pagination-container'>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={9}
                    totalItemsCount={articleCount}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                  />
                </div>
            }
          </>
        ) : (
          <Loading/>
        )
      }
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...articleActions,
      ...archiveActions,
    },
    dispatch
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.archiveReducer,
    ...state.articleReducer,
    ...state.articleFormReducer,
    ...state.userReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)