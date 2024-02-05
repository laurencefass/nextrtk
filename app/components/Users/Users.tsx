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
    selectUserEntities,
    User,
    selectAllUsers,
    addUsers,
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

export const UserCRUD = () => {
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    let users = useSelector(selectUserEntities);
    const dispatch = useDispatch();

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
            </div>
        </div>
    );
};

// Define the props for the component, including an optional array of users
interface UserListProps {
    userList?: User[];
}

const UserManager: React.FC<UserListProps> = ({ userList }) => {
    const dispatch = useDispatch();
    let users = useSelector(selectUserEntities);
    console.log("userList", userList);
    
    useEffect(() => {
        if (userList) {
            console.log("adding props.userList to store")
            dispatch(addUsers(userList));
        }
        else {
            (async () => {
                console.log("fetching users from store")
                try {
                    const result = await dispatch(fetchUsers()).unwrap()
                    console.log("thunk promise result", result);              
                } catch (rejectedValueOrSerializedError) {
                    // handle error here
                }    
            })();
        }
    }, []);

    const handleFetchUsers = () => {
        dispatch(fetchUsers());    
    }

    const handleSaveUsers = () => {
        const allUsers = Object.values(users);
        dispatch(saveUsers(allUsers));
    };

    return (
        <div className="block-container">
            <div>
                <h1>Entity CRUD with server persistence</h1>
                <p>Component uses <a href="https://redux-toolkit.js.org/api/createEntityAdapter">RTK EntityAdapters</a> to manage collections, see <a href="/library">library manager </a> for relational data demo</p>
                <p>This component can be initialised using Redux in the browser, or mounted and populated by a React Server Component</p>
                {userList && <div className="bordered">
                    <h2>This component was initialised by React Server Component props injection!</h2>
                    <p>Click <a href="/users/client">here </a> for client side fetching. Once loaded Redux takes over and it works exactly the same!</p>
                    <p>Data fetching on the server has many advtanges including improved security</p>
                </div>}
                <p>Save changes to persist to backend (max 10 records)</p>

                <button onClick={handleFetchUsers}>Re-fetch users</button>
                <button onClick={handleSaveUsers}>Save users</button>
            </div>
            <UserCRUD />
            <UserList />
        </div>
    );
};

export default UserManager;