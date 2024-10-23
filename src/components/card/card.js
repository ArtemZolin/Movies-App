import React from 'react';
import PropTypes from 'prop-types';

import Genres from '../genres';
import Stars from "../Stars"

import './card.css';

// eslint-disable-next-line no-unused-vars
function Card({id, title, releaseDate, overview, genreIds, posterPath, genresList, popularity, guestSessionId, rating}) {
  
  // console.log('В card guestSessionId=',guestSessionId)
  
  const elementsGenres = genreIds.map(item => {
    const filmGenres = [];
    
    genresList.forEach((el) => {
      if (el.id === item) {
        filmGenres.push(el.name);
      }
    });
    return (
      <Genres 
        key={item}
        genre={filmGenres} />
    )
   
  });
  const inputClasses = ['card-popularity-count'];
  if (popularity >= 3 && popularity < 5) {
    inputClasses.push('orange');
  }
  if (popularity >= 5 && popularity < 7) {
    inputClasses.push('yellow');
  }
  if (popularity >= 7) {
    inputClasses.push('green');
  }

  let posterURL ="https://i0.wp.com/img2.reactor.cc/pics/comment/full/гифки-живность-крокодилы-кормёжка-5089896.jpeg?ssl=1"
  if (posterPath) posterURL = `https://image.tmdb.org/t/p/w200${posterPath}`  

  return (
    <div className="card" >
      <img className="cover"
        src= {posterURL }
        alt="poster"
      ></img>
      <h1 className="title">{title}</h1>
      <div className={inputClasses.join(' ')}>{popularity}</div>
      <div className="date">{releaseDate}</div>
      <div className="genres">
        {elementsGenres}
      </div>
      <p className="description">
        {overview}
      </p>
      <Stars className='stars' id={id} guestSessionId={guestSessionId} rating={rating} />
    </div>
  );
}
export default Card;
Card.defaultProps = {
  movieDataFromBase: [],
  guestSessionId: '',
};
Card.propTypes =  {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
}


