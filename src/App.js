import React, { useState } from "react";
import axios from "axios";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDummyMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://swapi.dev/api/films/");
      const tranfromData = response.data.results.map(data => {
        return {
          id: data.episode_id,
          title: data.title,
          openingText: data.opening_crawl,
          releaseDate: data.release_date
        }
      });
      setMovies(tranfromData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDummyMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Not Found Movies</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
