import { slashDB } from './slashdb';

class Auth {
  constructor() {
    this.authenticated = slashDB.getIsAuthenticated();
  }

  async login(username, password, fnc) {
    await slashDB
      .authenticateCookieSessionLogin(username, password)
      .then(() => {
        this.authenticated = slashDB.getIsAuthenticated();
      })
      .then(fnc);
  }

  async logout(fnc) {
    await slashDB
      .authenticateCookieSessionLogout()
      .then(() => {
        this.authenticated = slashDB.getIsAuthenticated();
      })
      .then(fnc);
  }

  async isAuthenticated() {
    var state;
    state = await slashDB.isAuthenticated();
    return state;
  }

  getAuth() {
    return this.authenticated;
  }
}

export default new Auth();

//check if cookie is available
//make req check response
//or
//make my own cookie / or use local storage /
//on enter to site do a pre flight to ckeck user definition
// user/def

// make cookie and store user name on login
// on reload make req to such userdef to se if user is still logged in
//
// store
// make a quick get to user name
//
