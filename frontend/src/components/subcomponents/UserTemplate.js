import React from 'react';

function UserTemplate({user}) {
    return (
        <div className='marginBottom20' style={{'borderBottom':'1px solid black'}}>
            <h3>{user.username} - {user.firstname} - {user.lastname} - {user.admin}</h3>
        </div>
    );
}

export default UserTemplate;