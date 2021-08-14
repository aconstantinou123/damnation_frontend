
import ArticleList from '../../components/ArticleList/ArticleList'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'
import ArticleMain from '../../components/ArticleMain/AricleMain'

import articles from '../../data/data.json'
import './LandingPage.css'

function LandingPage() {
  const mainArticle = articles.filter(article => article.is_main)
  const nonMainArticles = articles.filter(article => !article.is_main)
  return (
    <>
      <main className="landing-page">
        <Title/>
        <hr className="solid-thick"></hr>
        <ArticleMain articles={mainArticle}/>
        <hr className="solid-thin"></hr>
        <ArticleList articles={nonMainArticles}/>
      </main>
      <Footer/>
    </>
  )
}

export default LandingPage