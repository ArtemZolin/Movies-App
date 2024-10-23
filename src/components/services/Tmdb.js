
export default class Tmdb{
// https://api.themoviedb.org/3/movie/popular?api_key=24a8f6af0d4e10d09362dda719c34d9c&language=en-US&page=1
// https://api.themoviedb.org/3/search/movie?api_key=24a8f6af0d4e10d09362dda719c34d9c&include_adult=false&query=pool&page=1
// https://api.themoviedb.org/3/authentication/guest_session/new?api_key=24a8f6af0d4e10d09362dda719c34d9c  

  apiKey = '24a8f6af0d4e10d09362dda719c34d9c';

  baseUrl = 'https://api.themoviedb.org/3/';

  apiTocen ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE4ZjZhZjBkNGUxMGQwOTM2MmRkYTcxOWMzNGQ5YyIsIm5iZiI6MTcyNzk1MDYzOS4xMjI2NzMsInN1YiI6IjY2ZmJmOWYwZjJiOWM5N2MxZGQ2M2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kM95xQBlRG5d6bOHqOpUGJzJ5Sw7h2mY9IGVbTnNL6w'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE4ZjZhZjBkNGUxMGQwOTM2MmRkYTcxOWMzNGQ5YyIsIm5iZiI6MTcyNzk1MDYzOS4xMjI2NzMsInN1YiI6IjY2ZmJmOWYwZjJiOWM5N2MxZGQ2M2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kM95xQBlRG5d6bOHqOpUGJzJ5Sw7h2mY9IGVbTnNL6w'
    }
  };
  
  // eslint-disable-next-line class-methods-use-this
  getDataFromServer = async (url) => {
    try {
      const res = await fetch(url, this.options);
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return await res.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Возникла проблема с fetch запросом: ', err.message);
      return err.message;
    }
  };

  getPopularMovies = async (numberPage = 1) => {
    const url = `${this.baseUrl}movie/popular?language=en-US&page=${numberPage}`;
    const body = await this.getDataFromServer(url);
    return body;
  };

  getRatedMovies = async (guestSessionToken, pageNumber = 2) => {
    // console.log(guestSessionToken, pageNumber)
    const url = `${this.baseUrl}guest_session/${guestSessionToken}/rated/movies?language=en-US&page=${pageNumber}&sort_by=created_at.asc`;
    const body = await this.getDataFromServer(url);
    return body;
  };

  getGenersList = async () => {
    const url = `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`;
    const body = await this.getDataFromServer(url);
    return body;
  };

  searchMovies = async (query = 'return', numberPage = 1) => {
    const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&include_adult=false&query=${query}&page=${numberPage}`;
    const body = await this.getDataFromServer(url);
    return body;
  };

  guestSession = async () => {
    const url = `${this.baseUrl}authentication/guest_session/new?api_key=${this.apiTocen}`;
    const body = await this.getDataFromServer(url);
    return body;
  };

  deleteRateMovie = async (id, guestSessionToken) => {
    const url = `${this.baseUrl}movie/${id}/rating?guest_session_id=${guestSessionToken}`;
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE4ZjZhZjBkNGUxMGQwOTM2MmRkYTcxOWMzNGQ5YyIsIm5iZiI6MTcyNzk1MDYzOS4xMjI2NzMsInN1YiI6IjY2ZmJmOWYwZjJiOWM5N2MxZGQ2M2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kM95xQBlRG5d6bOHqOpUGJzJ5Sw7h2mY9IGVbTnNL6w'
    };
    await fetch(url, {
      method: 'DELETE',
      headers,
    });
  };

  setMovieRating = async (id, guestSessionToken, rate) => {
    const url = `${this.baseUrl}movie/${id}/rating?guest_session_id=${guestSessionToken}`;
    const body = {
      value: rate,
    };
    await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE4ZjZhZjBkNGUxMGQwOTM2MmRkYTcxOWMzNGQ5YyIsIm5iZiI6MTcyNzk1MDYzOS4xMjI2NzMsInN1YiI6IjY2ZmJmOWYwZjJiOWM5N2MxZGQ2M2MwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kM95xQBlRG5d6bOHqOpUGJzJ5Sw7h2mY9IGVbTnNL6w'
      },
      body: JSON.stringify(body)
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Возникла проблема с fetch запросом: ', err.message);
    });
  };
};



