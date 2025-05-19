import React from 'react';
import { useUserContext } from "../UserContext";

const ITEMS = [
    { id: 1, name: 'Wrapping Paper Tube', cost: 5, damage: 2, durability: 1, timeUsed: 0},
    { id: 2, name: 'Giant Q-tip', cost: 20, damage: 4, durability: 2, timeUsed: 0 },
    { id: 3, name: 'Rubber Chicken', cost: 30, damage: 6, durability: 1, timeUsed: 0 },
    { id: 4, name: 'Silly String', cost: 15, damage: 3, durability: 2 , timeUsed: 0},
    { id: 5, name: 'Water Balloon', cost: 25, damage: 5, durability: 1, timeUsed: 0 },
    { id: 6, name: 'Feather Duster', cost: 10, damage: 2, durability: 3, timeUsed: 0 },
    { id: 7, name: 'Bag of Laundry', cost: 12, damage: 1, durability: 4, timeUsed: 0 },
    { id: 8, name: 'Confetti Cannon', cost: 40, damage: 8, durability: 1, timeUsed: 0 },
    { id: 9, name: 'Feather Pillow', cost: 8, damage: 2, durability: 5, timeUsed: 0 },
    { id: 10, name: 'Pool Noodle', cost: 6, damage: 2, durability: 3, timeUsed: 0 },
    { id: 11, name: 'Giant Foam Finger', cost: 18, damage: 3, durability: 2, timeUsed: 0 },
    { id: 12, name: 'Giant ToothBrush', cost: 22, damage: 4, durability: 3, timeUsed: 0 },
];

function Store() {
    const { 
        userTime, 
        ownedItems, 
        buyItem, 
        selectedWeapon, 
        setSelectedWeapon 
    } = useUserContext();

    function handleBuy(item) {
        buyItem(item);
    }

    function handleSelect(item) {
        // If this item is already selected, unselect it
        if (selectedWeapon && selectedWeapon.id === item.id) {
            setSelectedWeapon(null);
        } else {
            // Otherwise select this item
            setSelectedWeapon(item);
        }
    }

    return (
        <div className="store-container">
            <h2>Silly Weapons Store</h2>
            <div className="time-credits">
                <h3>Your Time Credits: <span className="credit-amount">{userTime}</span></h3>
            </div>
            
            {/* Available Weapons Section */}
            <div className="available-weapons">
                <h3>Available Weapons For Purchase:</h3>
                <ul className="weapons-list">
                    {ITEMS.map(item => {
                        const isOwned = ownedItems.some(owned => owned.id === item.id);
                        
                        return (
                            <li key={item.id} className="weapon-item">
                                <div className="weapon-info">
                                    <span className="weapon-name">{item.name}</span>
                                    <span className="weapon-stats">Cost: {item.cost} credits | Damage: +{item.damage}</span>
                                </div>
                                {!isOwned && (
                                    <button
                                        onClick={() => handleBuy(item)}
                                        disabled={userTime < item.cost}
                                        className={`buy-button ${userTime < item.cost ? 'disabled' : ''}`}
                                    >
                                        {userTime < item.cost ? 'Not enough credits' : 'Buy'}
                                    </button>
                                )}
                                {isOwned && (
                                    <span className="owned-badge">Owned</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            
            {/* Owned Weapons Section */}
            <div className="owned-weapons-section">
                <h3>Your Arsenal - Choose One Weapon For Battle:</h3>
                {ownedItems.length === 0 ? (
                    <p className="no-weapons-message">You don't own any weapons yet. Purchase one from the store above!</p>
                ) : (
                    <ul className="owned-weapons-list">
                        {ownedItems.map(item => (
                            <li 
                                key={item.id} 
                                className={`owned-weapon ${selectedWeapon?.id === item.id ? 'selected' : ''}`}
                                onClick={() => handleSelect(item)}
                            >
                                <div className="weapon-details">
                                    <span className="weapon-name">{item.name}</span>
                                    <span className="weapon-damage">+{item.damage} damage</span>
                                    <span className="weapon-durability">Durability: {item.timeUsed}/{item.durability}</span>
                                </div>
                                <div className="weapon-status">
                                    {selectedWeapon?.id === item.id ? (
                                        <span className="equipped">EQUIPPED</span>
                                    ) : (
                                        <button className="select-weapon-btn">Select</button>
                                    )}
                                </div>
                            </li>
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
    );
}

export default Store;