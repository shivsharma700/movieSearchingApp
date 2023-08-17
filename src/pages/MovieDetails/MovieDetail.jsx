//import css
import './MovieDetail.css'
import '@smastrom/react-rating/style.css'

import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { searchMovieById } from "../../Apis/ombd";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Rating } from '@smastrom/react-rating'


function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const {id} = useParams();

  async function downloadMovie(){
    const response = await axios.get(searchMovieById(id));
    setMovie(response.data)
  }

  useEffect(()=>{
    downloadMovie();
    const random = Math.random();
    if(random > 0.5) {
        throw "error";
    }
  },[id]);

  return (
    <>
      <div className="movie-detail-wrapper">
            {movie && <MovieCard 
                        Title={movie.Title} 
                        Year={movie.Year}
                        Type={movie.Type}
                        Poster={movie.Poster} 
                        imdbID={movie.imdbID}
                        />
            }
            { movie && <div className="movie-details">
                <div>
                   Plot : {movie.Plot}
                </div> 
                <div>
                    Actors : {movie.Actors}
                </div>
                <div>
                   Genre : {movie.Genre.split(',').map((genre) =>{
                      return <span className='genre' key={genre}>{genre}</span>
                   })}
                </div>
                <div>
                  <Rating items={10} value={Math.floor(movie.imdbRating)} />
                </div>
              </div>}
      </div>
    </>
  )
}

export default MovieDetail