import React, { Fragment, useContext } from 'react'
import UserItem from './UserItem';
import { Spinner } from '../layout/Spinner';
import GithubContext from "../../context/github/githubContext";

const Users = () => {

    const githubContext = useContext(GithubContext);
    const { loading, users } = githubContext;

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


export default Users;
