import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';


const Search = ({ setAlert, clearUsers, showClearButton }) => {


    const { searchUsers } = useContext(GithubContext);

    const [text, setText] = useState('');

    const handelChange = e => setText(e.target.value);

    const handelSubmit = e => {

        e.preventDefault();

        if (text === '') {

            setAlert('Please enter something', 'light');

        } else {

            searchUsers(text);
            setText('');

        }
    };

    const handelClear = e => {

        clearUsers();

    }


    return (
        <div>
            <form onSubmit={handelSubmit} className="form">
                <input type="text" name="text" placeholder="Search Users..." value={text} onChange={handelChange} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {showClearButton && <button className="btn btn-light btn-block" onClick={handelClear}>Clear</button>}

        </div>
    );
};


Search.propTypes = {

    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired

};

export default Search;
