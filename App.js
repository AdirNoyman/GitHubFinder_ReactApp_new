import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component {

  state = {

    users: [],
    loading: false,
    alert: null
  };

  // async componentDidMount() {

  //   this.setState({ loading: true });

  //   const res = await Axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   const data = res.data;

  //   this.setState({ users: [...data], loading: false });

  // }

  // Search github users
  handelSearchUsers = async text => {

    this.setState({ loading: true });

    const res = await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    const data = res.data.items;

    this.setState({ users: [...data], loading: false });

  };

  handelClearUsers = () => this.setState({ users: [], loading: false });

  handelEmptySearch = (message, type) => {

    this.setState({ alert: { message, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);

  };

  render() {

    const { users, loading, alert } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search searchUsers={this.handelSearchUsers}
            clearUsers={this.handelClearUsers}
            showClearButton={users.length > 0}
            setAlert={this.handelEmptySearch} />
          <Users loading={loading} users={users} />
        </div>

      </Fragment>
    );
  }

}

export default App;
