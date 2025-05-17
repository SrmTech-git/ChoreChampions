// Dashboard.jsx
import React from 'react';
import { useUserContext } from '../UserContext';

function Dashboard() {
    const { userChores, userPoints, handleRemoveChore, handleCompleteChore, user } = useUserContext();
    
    return (
        <div>
            <h2>Welcome to your Dashboard, {user.name}!</h2>
            <p>Total Points: {userPoints}</p>
            
            <h3>Your Chores:</h3>
            {userChores.length === 0 ? (
                <p>No chores added yet. Go to the Chores page to add some!</p>
            ) : (
                <ul>
                    {userChores.map(chore => (
                        <li key={chore.id}>
                            <strong>{chore.name}</strong> - {chore.time} mins - {chore.points} pts
                            <button onClick={() => handleCompleteChore(chore)}>Complete</button>
                            <button onClick={() => handleRemoveChore(chore)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;