import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import "./CreateArticle.css";

import ArticleForm from "../../components/ArticleForm/ArticleForm"

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const CreateArticle = ({ 
  saveArticleTitle,
  saveArticleAuthor,
  saveArticleImgUrl,
  saveArticleSummary,
  saveArticleIsMain,
  saveArticleContent,
  submitArticleCreate,
  articleId,
  articleDate,
  articleTitle,
  articleAuthor,
  articleImgUrl,
  articleSummary,
  articleIsMain,
  articleContent
}) => {
  return (
    <div className="create-article-container">
      <ArticleForm
        formName='Create new article'
        saveArticleTitle={saveArticleTitle}
        saveArticleAuthor={saveArticleAuthor}
        saveArticleImgUrl={saveArticleImgUrl}
        saveArticleSummary={saveArticleSummary}
        saveArticleIsMain={saveArticleIsMain}
        saveArticleContent={saveArticleContent}
        submitArticle={submitArticleCreate}
        articleId={articleId}
        articleDate={articleDate}
        articleTitle={articleTitle}
        articleAuthor={articleAuthor}
        articleImgUrl={articleImgUrl}
        articleSummary={articleSummary}
        articleIsMain={articleIsMain}
        articleContent={articleContent}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle)

