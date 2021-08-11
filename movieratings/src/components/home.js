import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from './logout';
import useAuth from '../hooks/useAuth';

export default function Home() {

    const { getToken } = useAuth();

    return (
        <>
        <div>Home Page</div>
        <Link to="/">Home</Link>
        <br />
        <Link to="/writereview">Write a review</Link>
        <br />
        <Link to="/signup">Sign up (not functioning yet)</Link>
        <br />
        
        {getToken() === null && 
        (
            <>
        <Link to="/login">Log in</Link>
        <br />
        </>
        )}

        <Link to="/adminarea">Admin Area</Link>
        <br />        
        <LogOut />
        </>
    )
}