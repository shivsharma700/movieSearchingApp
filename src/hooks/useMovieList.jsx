import axios from "axios";
import { useState,useEffect } from "react";
import { searchMovie } from "../Apis/ombd";

function useMovieList(...args){
    const [movieList, setMovieList] = useState([]);

  async function downLoadDefaultMovies(...args){
    try {
        const url = args.map((name) => searchMovie(name));
        const response = await axios.all(url.map(url => axios.get(url)));
        if(response[0].data.Error){
            setMovieList([]);
        }else{
            const movies = response.map((movieResponse) => movieResponse.data.Search);
           setMovieList([].concat(...movies)); 
        }
    } catch (error) {
        console.log('api request failed')
    }
  }

  useEffect(()=>{
    downLoadDefaultMovies(...args)
  }, [...args]);

  return {movieList};
}

export default useMovieList;