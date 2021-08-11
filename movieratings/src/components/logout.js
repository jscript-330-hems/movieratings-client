import React from 'react';
import useAuth from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

export default function LogOut() {

    const history = useHistory();
    const { clearUser, getToken } = useAuth();

    async function handleLogout() {
        clearUser();
          history.push("/")
      }

    return (
        <>
        {getToken() !== null && (
            <button onClick={handleLogout}>Log out</button>
        )}
        </>
    )
}
