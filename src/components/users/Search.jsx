import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showClearButton, searchUsers, clearUsers, setAlert }) => {

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
    )

}

Search.propTypes = {

    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired

};

export default Search;
