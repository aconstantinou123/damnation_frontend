import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Title from '../Title/Title'
import history from '../../history'

import * as articleActions from '../../actions/articleActions'
import * as archiveActions from '../../actions/archiveActions'

import './Header.css'

const Header = ({ 
  user,
  setCurrentPage,
  setSearchValue,
  searchValue,
  resetDate,
}) => {
  const handleHomeClick = () => {
    setCurrentPage(1)
    resetDate()
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    history.push(`/search/${searchValue}`)
    resetDate()
  }

  const handleSearchOnChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleCreateArticleClick = () => {
    resetDate()
    setCurrentPage(1)
    setSearchValue('')
  }

  const onEmailClick = () => {
    window.open('mailto:damnationsubs@gmail.com?subject=Subject&body=Hello%20Damnation%20team')
  }

  const onTwitterClick = () => {
    window.open('https://twitter.com/DamnationLit')
  }

  return (
  <>
    <div className='social-media-container'>
      <img src='/assets/twitter.png' alt='Twitter logo' onClick={onTwitterClick}/>
      <img src='/assets/email.png' alt='Email logo' onClick={onEmailClick}/>
    </div>
    <Title
      setCurrentPage={setCurrentPage}
      resetDate={resetDate}
    />
    <div className='header-button-container'>
      <div className='header-div-1'></div>
      <div className='header-div-2'>
      {/* <Link className='link' to='/about'>About</Link> */}
      <Link className='link' to='/submissions'>Submissions</Link>
      <Link className='link' to='/' onClick={handleHomeClick}>Home</Link>
      <Link className='link' to='/archive'>Archive</Link>
      {
        user && (
          <>
            <Link className='link' to='/create' onClick={handleCreateArticleClick}>Create</Link>
            <Link className='link' to='/logout'>Logout</Link>
          </>
        )
      }
      </div>
      <div className='header-div-3'>
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input 
              className='search-input' 
              type="text" 
              placeholder="Search.." 
              name="search"
              value={searchValue}
              onChange={handleSearchOnChange}
              />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <div className='header-hr-container'>
      <hr className='solid-thick'></hr>
    </div>
  </>
)}

const mapDispatchToProps  = (dispatch) => {
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
    ...state.articleReducer,
    ...state.userReducer,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)