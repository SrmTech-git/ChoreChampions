import React from 'react';
import styles from './Footer.module.css';

function Footer(){
    const currentYear = new Date().getFullYear();
    return (
        <footer >
            &copy; {currentYear} Chore Champions
        </footer>
    );
};

export default Footer;