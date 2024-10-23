/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/order
import React, { Component } from "react";
// eslint-disable-next-line import/order
import PropTypes from 'prop-types';

import './search.css'

// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';

export default class Search extends Component{
  // state = {
  //   query: ''
  // }
  
  onSearch = (e) => {
    const {queryChange} = this.props;
    
    const request = e.target.value.replace(/ +/g, ' ').trim();

    queryChange(request)

  };

  onSubmit = (e) => {
    e.preventDefault();
    // this.props.queryChange(this.state.query);
    // this.setState({
    //   query: ''
    // });
  };

  render(){
    return (
      <form className="search"
        onSubmit={this.onSubmit}
      >
        <input  
          type="input" 
          placeholder="Type to search"
          onChange={debounce(this.onSearch, 1000)}></input>
      </form>
    )
  }
}

Search.defaultProps = {
  queryChange: () => {}
}

Search.propTypes = {
  queryChange: PropTypes.func,
};