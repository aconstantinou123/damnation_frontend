import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './EditArticle.css';

import ArticleForm from '../../components/ArticleForm/ArticleForm'

import * as articleActions from '../../actions/articleActions'
import * as articleFormActions from '../../actions/articleFormActions'

const EditArticle = ({ 
  setIsExternalFile,
  setFileUploaded,
  saveArticleTitle,
  saveArticleAuthor,
  saveArticleImgUrl,
  saveArticleSummary,
  saveArticleIsMain,
  saveArticleContent,
  saveArticleExtraInfo,
  editArticleFile,
  submitArticleEdit,
  selectedFile,
  articleId,
  articleDate,
  articleTitle,
  articleAuthor,
  articleImgUrl,
  articleSummary,
  articleIsMain,
  articleContent,
  articleExtraInfo,
  articleError,
  articleFileUploaded,
  articleIsExternalFile,
  articleFileName,
  externalFile,
  articleFileError,
  articleSubmitting,
  articleFileEditing,
  uploadProgress,
  resetArticleForm,
}) => {
  useEffect(() => {
    return () => {
      resetArticleForm()
    }
  },[resetArticleForm])
  return (
    <div className='edit-article-container'>
      <ArticleForm
        formName='Edit article'
        setIsExternalFile={setIsExternalFile}
        setFileUploaded={setFileUploaded}
        saveArticleTitle={saveArticleTitle}
        saveArticleAuthor={saveArticleAuthor}
        saveArticleImgUrl={saveArticleImgUrl}
        saveArticleSummary={saveArticleSummary}
        saveArticleIsMain={saveArticleIsMain}
        saveArticleContent={saveArticleContent}
        saveArticleExtraInfo={saveArticleExtraInfo}
        saveArticleFile={editArticleFile}
        submitArticle={submitArticleEdit}
        selectedFile={selectedFile}
        articleId={articleId}
        articleDate={articleDate}
        articleTitle={articleTitle}
        articleAuthor={articleAuthor}
        articleImgUrl={articleImgUrl}
        articleSummary={articleSummary}
        articleIsMain={articleIsMain}
        articleContent={articleContent}
        articleExtraInfo={articleExtraInfo}
        articleError={articleError}
        articleFileUploaded={articleFileUploaded}
        articleIsExternalFile={articleIsExternalFile}
        articleFileName={articleFileName}
        externalFile={externalFile}
        articleFileError={articleFileError}
        articleSubmitting={articleSubmitting}
        articleFileSubmitting={articleFileEditing}
        uploadProgress={uploadProgress}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)

