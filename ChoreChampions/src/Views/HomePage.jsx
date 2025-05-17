import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    // Initialize the navigate function
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Welcome to ChoreChampions!</h1>
            <p>Earn points by completing chores and challenge other users to exciting battles or games.</p>
            
            <div className='homeButtonContainer'>
                <button 
                    className='homeButton'
                    onClick={() => navigate('/ChoreList')}
                >
                    Pick Chores
                </button>

                <button  
                    className='homeButton'
                    onClick={() => navigate('/Dashboard')}
                >
                    Dashboard
                </button>

                <button  
                    className='homeButton'
                    onClick={() => navigate('/Challenge')}
                >
                    Challenge friends
                </button>
            </div>
        </div>
    );
}

export default HomePage;