import React from 'react';


const Account = ({ user }) => {
    return (
        <div>
            <h1>Account Settings</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Add form to update user information */}
        </div>
    );
};


export default Account;
