// NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../UserContext';
import styles from './NavBar.module.css';

function NavBar() {
    const { userPoints, user } = useUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    
    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>ChoreChampions</div>
                
                {/* Hamburger button for mobile */}
                <button 
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                </button>

                <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                    <div className={styles.navLink}>
                        <Link to="/ChoreChampions" onClick={closeMenu}>Home</Link>
                    </div>
                    <div className={styles.navLink}>
                        <Link to="/ChoreChampions/ChoreList" onClick={closeMenu}>Chores</Link>
                    </div>
                    <div className={styles.navLink}>
                        <Link to="/ChoreChampions/Dashboard" onClick={closeMenu}>Dashboard</Link>
                    </div>
                    <div className={styles.navLink}> 
                        <Link to="/ChoreChampions/Challenge" onClick={closeMenu}>Challenge</Link>
                    </div>
                    <div className={styles.navLink}> 
                        <Link to="/ChoreChampions/Store" onClick={closeMenu}>Store</Link>
                    </div>
                    <div className={styles.navLink}> 
                        <Link to="/ChoreChampions/Login" onClick={closeMenu}>Login</Link>
                    </div>
                    <div className={styles.navLink}> 
                        <Link to="/ChoreChampions/Register" onClick={closeMenu}>Register</Link>
                    </div>
                </div>

                <div className={styles.userInfo}>
                    {user.name} | {userPoints} points
                </div>
            </div>
        </nav>
    );
}

export default NavBar;