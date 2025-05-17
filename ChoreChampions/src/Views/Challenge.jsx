import React, { useState } from 'react';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

// Example users data (replace with real data or props)
const usersList = [
    { id: 4, name: 'Alice', points: 15 },
    { id: 2, name: 'Bob', points: 20 },
    { id: 3, name: 'Charlie', points: 30 },
];

function Challenge() {
    const { user, userPoints } = useUserContext();
    const currentUserId = user.userId;
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    
    // Filter out the current user
    const otherUsers = usersList.filter(u => u.id !== parseInt(currentUserId));

    const handleSelect = (otherUser) => {
        setSelectedUser(otherUser);
        // Optional feedback
        // alert(`You challenged: ${otherUser.name}`);
    };
    
    // In your Challenge component, ensure the user object has points
    const startBattle = () => {
        if (!selectedUser) return;
        
        // Make sure the current user has points (taking it from UserContext)
        const currentUserWithPoints = {
            ...user,
            points: userPoints // Assuming userPoints is in your UserContext
        };
        
        // Navigate to the Battle page with state (users info)
        navigate('/Battle', { 
            state: { 
                currentUser: currentUserWithPoints,
                opponent: selectedUser
            }
        });
    };

    return (
        <div>
            <h2>Choose a user to battle:</h2>
            <ul>
                {otherUsers.map(otherUser => (
                    <li key={otherUser.id}>
                        <p>{otherUser.name}: {otherUser.points} points</p>
                        <button
                            onClick={() => handleSelect(otherUser)} 
                            disabled={selectedUser && selectedUser.id === otherUser.id} 
                        >
                            {selectedUser && selectedUser.id === otherUser.id ? 'Selected' : 'Select'}
                        </button>
                    </li>
                ))}
            </ul>
            
            {selectedUser && (
                <div>
                    <h3>You have selected {selectedUser.name}!</h3>
                    <p>Click the button below to start the battle!</p>
                    <button
                        onClick={startBattle}
                    >
                        Start Battle
                    </button>
                </div>
            )}
            
            {otherUsers.length === 0 && (
                <p>No other users available to challenge.</p>
            )}
        </div>
    );
}

export default Challenge;