import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {

    state = {

        text: ''
    }

    static propTypes = {

        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClearButton: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired

    };

    handelChange = e => this.setState({ [e.target.name]: e.target.value });

    handelSubmit = e => {

        e.preventDefault();

        if (this.state.text === '') {

            this.props.setAlert('Please enter something', 'light');

        } else {

            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });

        }
    };

    handelClear = e => {

        this.props.clearUsers();

    }


    render() {

        const { showClearButton } = this.props;

        return (
            <div>
                <form onSubmit={this.handelSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.handelChange} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {showClearButton && <button className="btn btn-light btn-block" onClick={this.handelClear}>Clear</button>}

            </div>
        )
    }
}

export default Search
