// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../UserContext';
import styles from './NavBar.module.css';

function NavBar() {
    const { userPoints, user } = useUserContext();
    
    return (
        <nav>
          

            <div className={styles.navLinks}>
                <div className={styles.navLink}>
                    <Link to="/ChoreChampions">Home</Link>
                </div >
                <div className={styles.navLink}>
                    <Link to="/ChoreChampions/ChoreList">Chores</Link>
                </div>
                <div className={styles.navLink}>
                    <Link to="/ChoreChampions/Dashboard">Dashboard</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/ChoreChampions/Challenge">Challenge</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/ChoreChampions/Store">Store</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/ChoreChampions/Login">Login</Link>
                </div>
                <div className={styles.navLink}> 
                    <Link to="/ChoreChampions/Register">Register</Link>
                </div>
                
            </div>

           
        </nav>
    );
}

export default NavBar;