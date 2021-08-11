//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState();
    const { setToken, setRoles } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { from } = location.state || { from: { pathname: "/" } };

    async function loginUser(credentials) {
        return fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => {
              if (data.status === 401) {
                setError("Invalid login");
              }
              else if (data.status !== 200) {
                setError("This error happened: " + data.statusText);
              }
              else {
                  return data.json();
              }
          });
       }    

       const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
          email,
          password
        });
        
        if (response != null) {
            setToken(response.token);
            setRoles(response.roles);
            history.replace(from);
        }
      }    
      
  return(
<form onSubmit={handleSubmit}>
    {error && error.length > 0 && (
        <div>
        {error}
    </div>
    )}

        <label>
          <p>Username</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
  )
}