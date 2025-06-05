import React, { useState } from 'react';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Store from '../Components/Store';
import DisplayUser from '../Components/DisplayUser';
import DisplayWeaponCard from '../Components/DisplayWeaponCard';
import ChooseChampion from '../Components/ChooseChampion';
import ChampionCard from '../Components/ChampionCard';

// Example users data (replace with real data or props)
const usersList = [
    { name: 'Alice', userId: 4, points: 15, houseHoldId: 1, image: '/alice.png' },
    { name: 'Bob', userId: 2, points: 20, houseHoldId: 1, image: '/bob.png' },
    { name: 'Charlie', userId: 3, points: 30, houseHoldId: 2, image: '/charlie.png' },
    { name: 'Shan', userId: 1, points: 5, houseHoldId: 1, image: '/shan.png' },
];

function Challenge() {

    const { 
        user, 
        userPoints, 
        userTime, 
        ownedItems, 
        selectedWeapon, 
    } = useUserContext();
       
    const [chosenChampion, setChosenChampion] = useState(null);
    const [selectedOpponent, setSelectedOpponent] = useState(null);
    const navigate = useNavigate();
    
    const availableOpponents = usersList.filter(u => u.userId !== parseInt(user.userId));

    const handleSelectOpponent = (opponent) => {
        setSelectedOpponent(opponent);
    };

    const handleSelectChampion = (champion) => {
        setChosenChampion(champion);
        console.log(champion);
    };
    
    const startBattle = () => {
        if (!selectedOpponent) {
            alert("Please select an opponent first!");
            return;
        }
        
        const currentUserWithData = {
            ...user,
            points: userPoints,
            weapon: selectedWeapon
        };
        
        navigate('/Battle', { 
            state: { 
                currentUser: currentUserWithData,
                opponent: selectedOpponent,
                chosenChampion: chosenChampion
            }
        });
    };

    const OpponentSelection = () => (
        <div className="opponents-section">
            <h2>Choose Your Opponent</h2>
            <div className="userGrid">
                {availableOpponents.map(opponent => (
                    <div key={opponent.userId} className="userWrapper">
                        <DisplayUser user={opponent} />
                        <div className="opponent-status">
                            {selectedOpponent?.userId === opponent.userId ? (
                                <button className="">SELECTED</button>
                            ) : (
                                <button 
                                    className="select-opponent-btn action-button choose" 
                                    onClick={() => handleSelectOpponent(opponent)}
                                >
                                    Select
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {availableOpponents.length === 0 && (
                <p className="no-opponents-message">No other users available to challenge.</p>
            )}
        </div>
    );

    const ChampionSelection = () => (
        <div>
            <h3>Choose your Champion</h3>
            <ChooseChampion 
                handleSelectChampion={handleSelectChampion} 
                chosenChampion={chosenChampion}
            />
        </div>
    );

    const WeaponSelection = () => (
        <div className="store-section">
            <div className="owned-weapons-section">
                <h3>Your Arsenal - Choose One Weapon For Battle:</h3>
                {ownedItems.length === 0 ? (
                    <p className="no-weapons-message">
                        You don't own any weapons yet. Purchase one from the store above!
                    </p>
                ) : (
                    <div className="weaponGrid">
                        {ownedItems.map(item => (
                            <div key={item.id} className="weaponWrapper">
                                <DisplayWeaponCard weapon={item} buying={false} choosing={true}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const BattlePreparation = () => (
        <div className="battle-preparation">
            <h2>Ready For Battle?</h2>
            <div className="battle-summary">
                <div className="challenger">
                    
                </div>
                
                <div className="opponent">
                    
                </div>
            </div>
            
            <button className="start-battle-btn" onClick={startBattle}>
                Start Battle!
            </button>
        </div>
    );

    const BattleSummaryDisplay = () => (
        <div className="battle-summary-display">
            <h2>Battle Summary</h2>
            
            <div className="summary-grid">
                <div className="summary-item">
                    <h3>Chosen Opponent</h3>
                    {selectedOpponent ? (
                        <div className="userWrapper">
                            <DisplayUser user={selectedOpponent} />
                        </div>
                    ) : (
                        <p className="not-selected">No opponent selected</p>
                    )}
                </div>

                <div className="summary-item">
                    <h3>Chosen Weapon</h3>
                    {selectedWeapon ? (
                        <div className="weapon-display weaponWrapper">
                            <DisplayWeaponCard weapon={selectedWeapon}/>
                        </div>
                    ) : (
                        <p className="not-selected">No weapon selected</p>
                    )}
                </div>

                <div className="summary-item">
                    <h3>Chosen Champion</h3>
                    {chosenChampion ? (
                        <div className='championWrapper' key={chosenChampion.name}>
                            <ChampionCard champion={chosenChampion} />
                        </div>
                    ) : (
                        <p className="not-selected">No champion selected</p>
                    )}
                </div>
            </div>

            <div className="points-summary">
                <h3>User Points</h3>
                <div className="points-display">
                    <p>Current Points: {userPoints}</p>
                    <p>Current Time: {userTime}</p>
                    {selectedWeapon && (
                        <p>Weapon Bonus: +{selectedWeapon.damage}</p>
                    )}
                    <p className="total-power">
                        Total Battle Power: {userPoints + (selectedWeapon ? selectedWeapon.damage : 0)}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="challenge-page">
            <h1>Battle Challenge</h1>
            
            <div className="challenge-container">
                <OpponentSelection />
                <ChampionSelection />
                <WeaponSelection />
            </div>
            
            {selectedOpponent && <BattlePreparation />}
            <BattleSummaryDisplay />
        </div>
    );
}

export default Challenge;