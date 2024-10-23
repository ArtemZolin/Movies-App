import React, {Component} from "react";
import { Rate } from 'antd';
import store from 'store';
import PropTypes from 'prop-types';

import './stars.css'
import Tmdb from "../services/Tmdb";

export default class Stars extends Component{
  state = {
    // eslint-disable-next-line react/no-unused-state
    ratingValue: store.get(`${this.props.id}`) || 0,
  }

  setMovieRating =(rate) =>{
    // console.log("setMovieRating =" ,rate )
    const {guestSessionId, id} = this.props;
    // console.log("guestSessionId =",guestSessionId, "id= ", id )
    const tmdb = new Tmdb()
    this.setState({
      ratingValue: rate,
    });
    if( rate ===0)
      tmdb.deleteRateMovie(id, guestSessionId);
    tmdb.setMovieRating(id, guestSessionId, rate);
    store.set(`${id}`,`${rate}`)
    // console.log("setMovieRating отправил id, guestSessionId, rate  =",id, guestSessionId, rate)
  }

  render() {
    const {ratingValue} = this.state;
    return (
      <Rate
        count={10}
        value={ratingValue}
        onChange={(rate) =>{
          this.setMovieRating(rate);
        }}
      />
    )
  }
}
Stars.defaultProps = {
  guestSessionId: '',
  id: 0,
};

Stars.propTypes = {
  guestSessionId: PropTypes.string,
  id: PropTypes.number,
};