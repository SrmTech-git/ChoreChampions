// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../UserContext';
import styles from './NavBar.module.css';

function NavBar() {
    const { userPoints, user } = useUserContext();
    
    return (
        <nav>
            <div className="logo">ChoreChampions</div>

            <div className={styles.navLinks}>
                <div className={styles.navLink}>
                    <Link to="/">Home</Link>
                </div >
                <div className={styles.navLink}>
                    <Link to="/ChoreList">Chores</Link>
                </div>
                <div className={styles.navLink}>
                    <Link to="/Dashboard">Dashboard</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/Challenge">Challenge</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/Store">Store</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/Login">Login</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/Register">Register</Link>
                </div>
                
            </div>

            <div className="user-info">
                {user.name} | {userPoints} points
            </div>
        </nav>
    );
}

export default NavBar;