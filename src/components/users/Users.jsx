import React, { Fragment } from 'react'
import UserItem from './UserItem';
import { Spinner } from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {

    const userStyle = {

        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridGap: '1rem'
    };

    return (
        <Fragment>
            {loading ?
                (<Spinner />)
                :
                (<div style={userStyle}>
                    {users.map(user => <UserItem key={user.id} user={user} />)}
                </div>)}
        </Fragment>
    );

};

Users.propTypes = {

    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}



export default Users;
