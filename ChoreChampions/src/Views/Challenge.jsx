import React, { useState } from 'react';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Store from '../Components/Store';
import DisplayUser from '../Components/DisplayUser';
import DisplayWeaponCard from '../Components/DisplayWeaponCard';

// Example users data (replace with real data or props)
const usersList = [
    { name: 'Alice', userId: 4, points: 15, houseHoldId: 1, image: 'public/alice.png' },
    { name: 'Bob', userId: 2, points: 20, houseHoldId: 1, image: 'public/bob.png' },
    { name: 'Charlie', userId: 3, points: 30, houseHoldId: 2, image: 'public/charlie.png' },
    { name: 'Shan', userId: 1, points: 5, houseHoldId: 1, image: 'public/shan.png' },
];

function Challenge() {
    const { 
        user, 
        userPoints, 
        userTime, 
        ownedItems, 
        buyItem, 
        selectedWeapon, 
        setSelectedWeapon,
        ITEMS 
    } = useUserContext();
       
    
    const [selectedOpponent, setSelectedOpponent] = useState(null);
    const navigate = useNavigate();
    
    // Filter out the current user
    const availableOpponents = usersList.filter(u => u.userId !== parseInt(user.userId));

    const handleSelectOpponent = (opponent) => {
        setSelectedOpponent(opponent);
    };
    
    const startBattle = () => {
        if (!selectedOpponent) {
            alert("Please select an opponent first!");
            return;
        }
        
        // Prepare the current user data with points
        const currentUserWithData = {
            ...user,
            points: userPoints,
            weapon: selectedWeapon
        };
        
        // Navigate to battle with state
        navigate('/Battle', { 
            state: { 
                currentUser: currentUserWithData,
                opponent: selectedOpponent
            }
        });
    };

    return (
        <div className="challenge-page">
            <h1>Battle Challenge</h1>
            
            <div className="challenge-container">
                <div className="opponents-section">
                    <h2>Choose Your Opponent</h2>
                    <ul className="opponents-list">
                        {availableOpponents.map(opponent => (
                            <li key={opponent.userId}>
                                <div>
                                    <DisplayUser user={opponent} />
                                    <div className="opponent-status">
                                        {selectedOpponent?.userId === opponent.userId ? (
                                            <span className="selected-opponent">SELECTED</span>
                                        ) : (
                                            <button className="select-opponent-btn" onClick={() => handleSelectOpponent(opponent)}>Select</button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    {availableOpponents.length === 0 && (
                        <p className="no-opponents-message">No other users available to challenge.</p>
                    )}
                </div>

                <div className="store-section">
                     {/* Owned Weapons Section */}
            <div className="owned-weapons-section">
                <h3>Your Arsenal - Choose One Weapon For Battle:</h3>
                {ownedItems.length === 0 ? (
                    <p className="no-weapons-message">You don't own any weapons yet. Purchase one from the store above!</p>
                ) : (
                    <ul className="owned-weapons-list">
                        {ownedItems.map(item => (
                            <DisplayWeaponCard weapon={item} buying={false} choosing={true}/>
                        ))}
                    </ul>
                )}
            </div>
            
            {/* Battle Weapon Summary */}
            <div className="battle-weapon-summary">
                <h3>Selected For Battle:</h3>
                {selectedWeapon ? (
                    <div className="selected-weapon-info">
                        <p>
                            <strong>{selectedWeapon.name}</strong> will give you a 
                            <strong> +{selectedWeapon.damage} damage bonus</strong> in battle!
                        </p>
                    </div>
                ) : (
                    <p className="no-weapon-selected">
                        No weapon selected. Your damage will be based on points only.
                    </p>
                )}
            </div>
                </div>
            </div>
            
            {selectedOpponent && (
                <div className="battle-preparation">
                    <h2>Ready For Battle?</h2>
                    <div className="battle-summary">
                        <div className="challenger">
                            <h3>You: {user.name}</h3>
                            <p>Points: {userPoints}</p>
                            {selectedWeapon && (
                                <p>Weapon: {selectedWeapon.name} (+{selectedWeapon.damage} damage)</p>
                            )}
                            <p>Total Power: {userPoints + (selectedWeapon ? selectedWeapon.damage : 0)}</p>
                        </div>
                        
                        <div className="vs">VS</div>
                        
                        <div className="opponent">
                            <h3>Opponent: {selectedOpponent.name}</h3>
                            <p>Points: {selectedOpponent.points}</p>
                            <p>Total Power: {selectedOpponent.points}</p>
                        </div>
                    </div>
                    
                    <button 
                        className="start-battle-btn"
                        onClick={startBattle}
                    >
                        Start Battle!
                    </button>
                </div>
            )}
        </div>
    );
}

export default Challenge;

