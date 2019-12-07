import React, { useState, Fragment } from 'react';
import GithubState from './context/github/GithubState';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search github users


  // Get a single GitHub user
  const getUser = async username => {

    setLoading(true);

    const res = await Axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    const data = res.data;

    setUser(data);
    setLoading(false);

  };

  // Get users repos
  const getUserRepos = async username => {

    setLoading(true);

    const res = await Axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    const data = res.data;

    setRepos(data);
    setLoading(false);
  };

  // Clear screen from search results

  const handelClearUsers = () => {

    setUsers([]);
    setLoading(false);
  };

  const handelEmptySearch = (message, type) => {

    setAlert({ message, type });

    setTimeout(() => setAlert(null), 5000);

  };


  return (
    <GithubState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    clearUsers={handelClearUsers}
                    showClearButton={users.length > 0}
                    setAlert={handelEmptySearch} />
                  <Users loading={loading} users={users} />
                </Fragment>

              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (

                <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading} />

              )} />
            </Switch>

          </div>

        </Fragment>
      </Router>
    </GithubState>
  );


}

export default App;
