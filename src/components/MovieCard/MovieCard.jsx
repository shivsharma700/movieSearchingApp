import './MovieCard.css';
import { useNavigate } from 'react-router';
import { LazyLoadImage } from "react-lazy-load-image-component";

//img
import  ReactSVG  from '../../assets/react.svg';

function MovieCard({ Title, Year, Type, Poster,imdbID }) {
    const navigator = useNavigate()
    return (
        <div className='movie-wrapper'
         onClick={()=>{navigator(`/movie/${imdbID}`)}}
        >
            <div className='movie-image'>
            <LazyLoadImage 
            //    effect='blur'
               key={Poster}
               src={Poster}
               placeholderSrc={ReactSVG}
            />
            </div>
            <div className='movie-title'>
                <span>{Title}</span>
            </div>
            <div className='movie-year'>
                <span>Released in: {Year}</span>
            </div>
            <div className='movie-type'>
                <span>Type: {Type}</span>
            </div>
        </div>
    )
}

export default MovieCard;