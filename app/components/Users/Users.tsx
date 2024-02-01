'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectUsers,
    useDispatch,
    addUser,
    updateUser,
    removeUser,
    fetchUsers,
    saveUsers,
} from "@/lib/redux";

const Header = () => {
    return <>
        <h2>EntityAdapter Users</h2>
        <p>Enter id and Show User to update</p>
    </>
}

export const UserList = () => {
    const { entities, loading, saving } = useSelector(selectUsers);
    console.log("users", entities);
    console.log("loading", loading);

    if (saving) {
        return <>
            <Header/>
            <p>Saving...</p>
        </>
    }

    if (loading) {
        return <>
            <Header/>
            <p>Loading...</p>
        </>
    }

    return (
        <div>
            <Header/>
            <div>
                {Object.keys(entities).length === 0 ? (
                    <p>No users available</p>
                ) : (
                    Object.values(entities).map((user) => (
                        <div key={user.id}>{user.firstName} {user.lastName} ({user.id})</div>
                    ))
                )}
            </div>
        </div>
    );
};

const UserCRUD = () => {
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    let users = useSelector(selectUsers).entities;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleFetchUsers = () => {
        dispatch(fetchUsers());    
    }

    const handleShowUser = () => {
        const user = users[userId];
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        } else {
            console.log("User not found");
            resetForm();
        }
    };

    const handleSaveChanges = () => {
        const allUsers = Object.values(users);
        dispatch(saveUsers(allUsers));
    };

    const handleAddUser = () => {
        dispatch(addUser({ id: userId, firstName, lastName }));
        resetForm();
    };

    const handleUpdateUser = () => {
        dispatch(updateUser({ id: userId, changes: { firstName, lastName }}));
        resetForm();
    };

    const handleRemoveUser = () => {
        dispatch(removeUser(userId));
        resetForm();
    };

    const resetForm = () => {
        setUserId('');
        setFirstName('');
        setLastName('');
    };

    return (
        <div className="pad-bottom-10">
            <h2>User details (enter id and Select to highlight and CRUD)</h2>
            <p>Save Changes to persist to backend (max 10 records)</p>
            <div>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleShowUser}>Show User</button>
                <button onClick={handleAddUser}>Add User</button>
                <button onClick={handleUpdateUser}>Update User</button>
                <button onClick={handleRemoveUser}>Remove User</button>
                <button onClick={handleSaveChanges}>Save users</button>
                <button onClick={handleFetchUsers}>Fetch users</button>
            </div>
            {/* <div>id: { userId }, first: { firstName}, last: { lastName } </div> */}
        </div>
    );
};

const UserManager = () => {
    return (
        <div className="block-container">
            <div>
                <h1>Entity CRUD with server persistence</h1>
                <p>This is using <a href="https://redux-toolkit.js.org/api/createEntityAdapter">RTK EntityAdapters</a> to manage collections, see <a href="/library">library manager </a> for relational data demo</p>
            </div>
            <UserCRUD />
            <UserList />
        </div>
    );
};

export default UserManager;