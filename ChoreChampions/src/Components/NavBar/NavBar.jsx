// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../UserContext';

function NavBar() {
    const { userPoints, user } = useUserContext();
    
    return (
        <nav>
            <div className="logo">ChoreChampions</div>
            <div className="nav-links">
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/ChoreList">Chores</Link>
                </div>
                <div>
                    <Link to="/Dashboard">Dashboard</Link>
                </div>
                <div>
                    <Link to="/Challenge">Challenge</Link>
                </div>
            </div>
            <div className="user-info">
                {user.name} | {userPoints} points
            </div>
        </nav>
    );
}

export default NavBar;