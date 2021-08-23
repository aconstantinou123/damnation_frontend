import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { useEffect } from "react"

import "./Article.css";

import ArticleView from "../../components/ArticleView/ArticleView"

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const Article = ({ 
  articles,
  articlesFetched,
  fetchArticles,
  selectArticleToEdit,
  articleSubmitted,
}) => {

  useEffect(() => {
    if (!articlesFetched) {
      fetchArticles();
    }
    
  }, [fetchArticles, articlesFetched]);


  useEffect(() => {
    if (articleSubmitted) {
      fetchArticles();
    }
  }, [fetchArticles, articleSubmitted]);


  const { id } = useParams()
  const article = articles.find(article => article.id === id)
  return (
    <div className="article-container">
      {
        articlesFetched
        ? <ArticleView 
            article={article}
            selectArticleToEdit={selectArticleToEdit}
          />
        : <div>Loading...</div>
      }
      
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...articleActions,
      ...articleFormActions,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    ...state.articleReducer,
    ...state.articleFormReducer,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

