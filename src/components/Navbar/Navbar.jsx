import { useState } from 'react';
import { useContext } from 'react';

// css
import './Navbar.css'

// context
import ThemeContext from '../../context/ThemeContext';

//components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import useMovieList from '../../hooks/useMovieList';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


function Navbar () {
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const {movieList} = useMovieList(searchTerm);
  const navigator = useNavigate();

  const {theme, setTheme} = useContext(ThemeContext);

  function updateTheme(){
    if(theme == 'dark'){
      setTheme('light');
      localStorage.setItem('app-theme', 'light');
    }else{
      setTheme('dark');
      localStorage.setItem('app-theme', 'dark');
    }
  }

  function handleAutoCompleteClick(e,id){
    navigator(`/movie/${id}`)
  }
  
    return (
     <div className='navbar-Wrapper'>
        <div className='movie-base-title'><Link to="/">Movie Base</Link></div>
        <div className='search-bar'>
          <input
            id='movie-search-input'
            type='text'
            onClick={()=>{
              setIsAutoCompleteVisible(true)
            }}
            onBlur={()=>{
              setIsAutoCompleteVisible(false)
            }}
            onChange={useDebounce((e) =>{
                setSearchTerm(e.target.value);
              })}
            placeholder='what movie you are thinking about...'
          />

          <div id='result-list' style={{display: (isAutoCompleteVisible)? 'block' : 'none'}}>
            <div className='autocomplete-result'>Auto complete results...{searchTerm}</div>
            {movieList.length > 0 && movieList.map(movie => <div onMouseDown={(e)=> handleAutoCompleteClick(e,movie.imdbID)} key={movie.imdbID} className='autocomplete-result'>{movie.Title}</div>)}
          </div>
        </div>

        <div>
           <FontAwesomeIcon onClick={updateTheme} className='theme-icon' icon={(theme == 'dark') ? faSun : faMoon}/>
        </div>
     </div>
)
}

export default Navbar