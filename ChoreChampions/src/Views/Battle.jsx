import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import './BattleAnimation.css'; // Import your CSS file for styling

function Battle() {
    // Get state from router
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, opponent, chosenChampion } = location.state || {};
    
    // Access user context to update points and get real-time weapon data
    const { 
        setUserPoints, 
        setUserTime, 
        setSelectedWeapon,
        selectedWeapon,
        incrementWeaponUsage,
        ownedItems
    } = useUserContext();
    
    const [battleResult, setBattleResult] = useState(null);
    const [battleAnimationComplete, setBattleAnimationComplete] = useState(false);
    const [weaponUsed, setWeaponUsed] = useState(false);
    
    // Get the current state of the weapon from ownedItems (for up-to-date timeUsed)
    const getCurrentWeaponState = () => {
        if (!currentUser || !currentUser.weapon) return null;
        
        // Find the weapon in ownedItems for current state
        return ownedItems.find(item => item.id === currentUser.weapon.id) || currentUser.weapon;
    };
    
    const currentWeaponState = getCurrentWeaponState();
    
    useEffect(() => {
        if (!currentUser || !opponent) {
            return;
        }
        
        // Simulate battle with a small delay for animation
        const battleTimer = setTimeout(() => {
            determineBattleResult();
            setBattleAnimationComplete(true);
            setUserPoints(0); // Update user points
            setUserTime(0); // Update user time
        }, 2500);
        
        return () => clearTimeout(battleTimer);
    }, [currentUser, opponent]);
    
    // Handle the end of battle, reset points and increment weapon usage
    useEffect(() => {
        if (battleAnimationComplete && !weaponUsed) {
            if (currentUser && currentUser.weapon && currentUser.weapon.id) {
                console.log("Incrementing usage for weapon:", currentUser.weapon.id);
                // Increment the usage counter for the weapon
                incrementWeaponUsage(currentUser.weapon.id);
                setWeaponUsed(true); // Flag to prevent multiple increments
            }
            
            // Reset user points after battle is over
            const resetTimer = setTimeout(() => {
                setUserPoints(0);
                setUserTime(0);
                setSelectedWeapon(null); // Reset the selected weapon too
            }, 3000);
            
            return () => clearTimeout(resetTimer);
        }
    }, [
        battleAnimationComplete, 
        weaponUsed,
        currentUser, 
        setUserPoints, 
        setUserTime, 
        setSelectedWeapon, 
        incrementWeaponUsage
    ]);
    
    const determineBattleResult = () => {
        if (!currentUser || !opponent) return;
        
        // Calculate total power for each combatant
        const userWeaponDamage = currentUser.weapon ? currentUser.weapon.damage : 0;
        const userTotalPower = currentUser.points + userWeaponDamage;
        const opponentTotalPower = opponent.points;
        
        let result;
        if (userTotalPower > opponentTotalPower) {
            result = {
                winner: currentUser.name,
                userScore: userTotalPower,
                opponentScore: opponentTotalPower,
                weaponBonus: userWeaponDamage
            };
        } else if (userTotalPower < opponentTotalPower) {
            result = {
                winner: opponent.name,
                userScore: userTotalPower,
                opponentScore: opponentTotalPower,
                weaponBonus: userWeaponDamage
            };
        } else {
            result = {
                winner: "tie",
                userScore: userTotalPower,
                opponentScore: opponentTotalPower,
                weaponBonus: userWeaponDamage
            };
        }
        
        setBattleResult(result);
    };
    
    const handleReturnToChallenge = () => {
        navigate('/Challenge');
    };
    
    if (!currentUser || !opponent) {
        return (
            <div className="battle-error">
                <h2>Battle Error</h2>
                <p>No battle data found. Please select an opponent first.</p>
                <button 
                    className="return-button"
                    onClick={() => navigate('/Challenge')}
                >
                    Go to Challenge Screen
                </button>
            </div>
        );
    }

    return (
        <div className="battle-arena">
            <h1>Battle Arena</h1>
                {chosenChampion ? (
                    <div>
                        <img className='championImage'
                            src={chosenChampion.image}
                            alt={chosenChampion.name} 
                        />
                        <p>{chosenChampion.name}</p>
                    </div>
                ) : (
                    <div>
                        <p>No champion selected</p>
                    </div>
                )}
            <div className="combatants">
                <div className="combatant-user">
                    <h3>{currentUser.name}</h3>
                    <div className="stats">
                        <p>Base Points: {currentUser.points}</p>
                        {currentUser.weapon && (
                            <div className="weapon-info">
                                <p>Weapon: {currentUser.weapon.name}</p>
                                <p>Damage Bonus: +{currentUser.weapon.damage}</p>
                                {currentUser.weapon.durability && (
                                    <p>Durability: {
                                        // Use the current state from ownedItems if available
                                        currentWeaponState 
                                            ? `${currentWeaponState.timeUsed || 0}/${currentWeaponState.durability}`
                                            : `${currentUser.weapon.timeUsed || 0}/${currentUser.weapon.durability}`
                                    }</p>
                                )}
                            </div>
                        )}
                        <p className="total-power">
                            Total Power: {currentUser.points + (currentUser.weapon ? currentUser.weapon.damage : 0)}
                        </p>
                    </div>
                </div>
                
                <div className="vs">VS</div>
                
                <div className="combatant-opponent">
                    <h3>{opponent.name}</h3>
                    <div className="stats">
                        <p>Points: {opponent.points}</p>
                        <p className="total-power">Total Power: {opponent.points}</p>
                    </div>
                </div>
            </div>
            
            {!battleAnimationComplete && (
                <div className="battle-animation">
                    <p>Battle in progress...</p>
                    <div className="loading-animation">
                        {/* Removed the sword-clash div since we're using the whole container for shaking */}
                    </div>
                </div>
            )}
            
            {battleResult && battleAnimationComplete && (
                <div className="battle-results">
                    <h3 className={`result-header ${battleResult.winner === currentUser.name ? 'victory' : battleResult.winner === 'tie' ? 'tie' : 'defeat'}`}>
                        {battleResult.winner === "tie" 
                            ? "It's a tie!" 
                            : `${battleResult.winner} wins!`}
                    </h3>
                    
                    <div className="battle-details">
                        <div className="user-result">
                            <h3>{currentUser.name}</h3>
                            <p>Base Points: {currentUser.points}</p>
                            {battleResult.weaponBonus > 0 && (
                                <p className="weapon-bonus">Weapon Bonus: +{battleResult.weaponBonus}</p>
                            )}
                            <p className="final-score">Final Score: {battleResult.userScore}</p>
                        </div>
                        
                        <div className="opponent-result">
                            <h3>{opponent.name}</h3>
                            <p>Points: {opponent.points}</p>
                            <p className="final-score">Final Score: {battleResult.opponentScore}</p>
                        </div>
                    </div>
                    
                    <div className="post-battle-message">
                        <p>Your points and time have been reset.</p>
                        <p>Complete more chores to earn points and time for your next battle!</p>
                        {currentUser.weapon && (
                            <p>Your weapon usage has been tracked. {
                                currentWeaponState && 
                                `Durability: ${currentWeaponState.timeUsed}/${currentWeaponState.durability}`
                            }</p>
                        )}
                    </div>
                    
                    <button 
                        className="return-button"
                        onClick={handleReturnToChallenge}
                    >
                        Return to Challenge
                    </button>
                </div>
            )}
        </div>
    );
}

export default Battle;

