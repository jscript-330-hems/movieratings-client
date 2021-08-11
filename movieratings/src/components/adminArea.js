import React from 'react';

export default function AdminArea() {
    return (
        <div>Admin Area.  This should be protected and viewable to only admins.  The thought is that the "roles" array is saved to sessionStorage locally to control
            whether a link to this area is shown.  But even if the client played with this in the browser dev tools, the Express routes would still do a check to 
            make sure the user is really in the role according to the database record.
        </div>
    )
}