// ChoreList.jsx
import React from 'react';
import { useUserContext } from '../UserContext';

const CHORES = [
    { id: 10, name: 'Clean Bathroom', time: 25, points: 20 },
    { id: 6, name: 'Mow the Lawn', time: 45, points: 30 },
    { id: 7, name: 'Organize Bookshelf', time: 15, points: 10 },
    { id: 8, name: 'Water Plants', time: 10, points: 5 },
    { id: 9, name: 'Meal Prep', time: 60, points: 35 },
];

function ChoreList() {
    const { userChores, handleAddChore } = useUserContext();
    
    return (
        <div>
            <h2>Available Chores</h2>
            <ul>
                {CHORES.map(chore => (
                    <li key={chore.id}>
                        <strong>{chore.name}</strong> - {chore.time} mins - {chore.points} pts
                        <button
                            onClick={() => handleAddChore(chore)}
                            disabled={userChores.some(c => c.id === chore.id)}
                        >
                            {userChores.some(c => c.id === chore.id) ? 'Added' : 'Add'}
                        </button>
                    </li>
                ))}
            </ul>
            
            <h2>Your Chore List</h2>
            <ul>
                {userChores.length === 0 && <li>No chores selected.</li>}
                {userChores.map(chore => (
                    <li key={chore.id}>
                        {chore.name} - {chore.time} mins - {chore.points} pts
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChoreList;