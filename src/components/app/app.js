/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */

import React, { Component } from "react";
import { Spin, Alert,Pagination } from "antd";
import store from 'store';

import { Context } from '../CreateContext/CreateContext';
import CardList from "../card-list";
import Tmdb from "../services/Tmdb"
import Search from "../search";
import Header from "../header";

import './app.css';

export default class App extends Component {

  state = {
    isLoading: true,
    results: [],
    genresList: [],
    isError: false,
    notFound: false,
    numberPage: 1,
    totalPages: 0,
    query: '',
    tabPane: '1',
    noFilm: false,
    guestSessionId: '',
    ratedFilm: [],
  }

  getGenersList = () => {
    const callMovieDbService = new Tmdb();
    callMovieDbService
      .getGenersList()
      .then((body) => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          genresList: [...body.genres],
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          notFound: false,
          isError: true,
          noFilm: false,
        });
      });
  }; 

  getPopularMovies = () => {
    const { numberPage } = this.state;
    const callMovieDbService = new Tmdb;
    // console.log(this.state)
    this.setState({
      results: [],
      isLoading: true,
      notFound: false,
      isError: false,
    });
    callMovieDbService
      .getPopularMovies(numberPage)
      .then((item) => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          totalPages: item.total_pages,
          numberPage,
          results: item.results,
          isLoading: false,
        });
        if (item.results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true,
          });
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          notFound: false,
          isError: true,
        });
      });
  };
  
  searchMovies = () =>{
    const {query, numberPage} = this.state;
    const tmdb = new Tmdb;
    this.setState({
      results: [],
      notFound: false,
      isLoading: true,
      isError: false,
      noFilm: false,
    });
    if(query === ''){
      this.getPopularMovies();
    } else {
      tmdb
        .searchMovies(query, numberPage)
        .then((item) => {
          // console.log('searchMovies item',item)
          this.setState({
            totalPages: item.total_pages,
            numberPage,
            results: item.results,
            isLoading: false,
          });
          if (item.results.length === 0 ) {
            this.setState({
              noFilm: true,
              isLoading: false,
              notFound: true
            });
          }
        })
        .catch((e) => {
          console.log(e)
          this.setState({
            isLoading: false,
            notFound: false,
            isError: true
          });
        });
    }
  };

  queryChange = (query) => {
    this.setState(
      {
        query,
        numberPage: 1
      },
      () => {
        this.searchMovies();
      }
    );
  };

  getRatedMovies = () => {
    const {guestSessionId, numberPage} = this.state;
    const tmdb = new Tmdb;
    this.setState({
      ratedFilm: [],
      isLoading:true,
      notFound: false,
      isError: false
    });
    tmdb
      .getRatedMovies(guestSessionId, numberPage)
      .then((item) => {
        // console.log('getRatedMovies item= ',item)
        // console.log('getRatedMovies  guestSessionId =', guestSessionId)
        // console.log("this.state= ",this.state)
        console.log("item.results.length= ",item.results.length)
        this.setState({
          totalPages: item.total_pages,
          numberPage,
          ratedFilm: item.results,
          isLoading: false,
        });
        if ( item.results.length ===0){
          this.setState({
            noFilm: true,
            isLoading:false,
            notFound: true,
          });
        }
       
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          notFound: false,
          isError: true,
        });
      });
  }


  changePage = (page) => {
    const { tabPane } = this.state;
    this.setState(
      {
        numberPage: page,
      },
      () => {
        if (tabPane === '1') {
          this.searchMovies();
        } else {
          this.getRatedMovies();
        }
      }
    );
  };

  createGuestSession = () => {
    const tmdb = new Tmdb;
    tmdb
      .guestSession()
      .then((body) => {
        store.set('guestSessionId', `${body.guest_session_id}`);
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          guestSessionId: body.guest_session_id,
          isLoading: false,
        });
      })

      .catch(() => {
        this.setState({
          isLoading: false,
          notFound: false,
          isError: true,
        });
      });
  };

  changeTab = (key) => {
    if (key === '2') {
      this.setState(
        {
          tabPane: key,
          numberPage: 1,
        },
        () => {
          this.getRatedMovies();
        }
      );
    } else {
      this.setState(
        {
          notFound: false,
          tabPane: key,
          numberPage: 1,
        },
        () => {
          this.getPopularMovies();
        }
      );
    }
  };

  componentDidMount() {
    if (!store.get('guestSessionId')) {
      this.createGuestSession();
      // console.log("я создал гость")
    } else {
      // console.log("я взял в сторедже")
      this.setState({
        guestSessionId: store.get('guestSessionId'),
      });
    }
    // this.createGuestSession();
    this.getGenersList()
    this.getPopularMovies()
  }

  render(){
    const {isLoading, results, genresList, isError, notFound, tabPane, 
      noFilm, totalPages, numberPage,guestSessionId, ratedFilm } = this.state;
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = {results, ratedFilm, tabPane, guestSessionId};    
   
    const movieDataFromBase = contextValue.tabPane === '1' ? contextValue.results : contextValue.ratedFilm;
    
    const spin = isLoading && !isError ? <Spin className="spin"   size="large" /> : null
    const movies = notFound ? null: (<CardList results = {movieDataFromBase} isLoading = {isLoading} guestSessionId ={contextValue.guestSessionId}
      genresList = {genresList}
    >
    </CardList>) 
    const noFilms = noFilm ?<Alert  message="По вашему запросу ничего не найдено" description=" " type="info" showIcon/> : null
    const err = isError ? <Alert message="Error" description="Что-то пошло не так. Мы скоро все исправим, но это не точно " type="error" showIcon/> : null  
    const search = tabPane === '1' ? <Search queryChange={this.queryChange} /> : null;
    const pagination = totalPages > 0 && !isLoading ? (
      <Pagination 
        defaultCurrent={1}
        current={numberPage}
        total={totalPages * 10}
        showSizeChanger={false}guestSessionId
        onChange={this.changePage}
        align="center"
      />
    ) : null

    return (
      <section className="section-movies">
        <div className="movies">
          <Context.Provider value={contextValue}>
            <Header changeTab={this.changeTab}/>
            {search}
            {noFilms}
            {err}
            {spin}
            {movies}
            {pagination}
          </Context.Provider>
        </div>
      </section> 
    )
  }
}

