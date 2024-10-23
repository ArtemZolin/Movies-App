import React from 'react';
import { format, parseISO  } from "date-fns";
import store from 'store';

import Card from '../card';
// import { Context } from '../CreateContext/CreateContext';

import './card-list.css';

function CardList({results, genresList,guestSessionId }) {

  // const { results, ratedFilm, tabPane, guestSessionId } = useContext(Context);
  
  // console.log('CardList results=',results)
  const elements = results.map(card => {
    // console.log(card)
    const title = card.title || 'Movie title not specified';
    const overview = card.overview || 'Movie overview not specified';
    const releaseDate = card.release_date ? format(parseISO(card.release_date), 'MMMM dd, yyyy') : 'no release date'
    const popularity = card.vote_average || 0;
    const rating = store.get(`${card.id}`) || card.rating || 0;
    
    return(
      <Card 
        key={card.id}
        id={card.id} 
        title={title} 
        releaseDate = {releaseDate}
        overview={overview} 
        genreIds={card.genre_ids}
        posterPath={card.poster_path} 
        genresList = {genresList}
        popularity = {(Math.round(popularity * 10)/10).toFixed(1)}
        rating = {rating}
        guestSessionId ={guestSessionId}
      />
    ) });

  return (
    <ul className="card-list">
      {elements}      
    </ul>
  );
}

CardList.defaultProps = {
  movieDataFromBase: [],
  guestSessionId: '',
};
export default CardList


