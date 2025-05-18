import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../UserContext";

function Battle() {
    // Get state from router
    const location = useLocation();
    const { currentUser, opponent } = location.state || {};
    
    // Access user context to update points
    const { setUserPoints } = useUserContext();
    
    useEffect(() => {
        // Determine the winner first
        if (currentUser && opponent) {
            // Reset user points to 0 after battle is complete
            setUserPoints(0);
        }
    }, [currentUser, opponent, setUserPoints]);
    
    if (!currentUser || !opponent) {
        console.log("Battle state:", location.state);
        return <div>Loading battle... No users found in navigation state.</div>;
    }

    const currentUserPoints = currentUser.points || 0;
    const opponentPoints = opponent.points || 0;

    let winnerText = "";
    if (currentUserPoints > opponentPoints) {
        winnerText = `${currentUser.name} wins!`;
    } else if (currentUserPoints < opponentPoints) {
        winnerText = `${opponent.name} wins!`;
    } else {
        winnerText = "It's a tie!";
    }

    return (
        <div>
            <h2>Battle!</h2>
            <div>
                <strong>{currentUser.name}</strong>: {currentUserPoints} points
            </div>
            <div>
                <strong>{opponent.name}</strong>: {opponentPoints} points
            </div>
            <h3>{winnerText}</h3>
            <p>Your points have been reset to 0 after the battle.</p>
        </div>
    );
}

export default Battle;