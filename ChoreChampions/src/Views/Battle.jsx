import React from "react";
import { useLocation } from "react-router-dom";

function Battle() {
    // Get state from router
    const location = useLocation();
    const { currentUser, opponent } = location.state || {};
    
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
        </div>
    );
}

export default Battle;