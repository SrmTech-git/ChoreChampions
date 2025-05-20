import React from 'react';
import { useUserContext } from "../UserContext";
import DisplayWeaponCard from './DisplayWeaponCard';


function Store() {
    const { 
        userTime, 
        ownedItems, 
        buyItem, 
        selectedWeapon, 
        setSelectedWeapon,
        ITEMS 
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
                                <DisplayWeaponCard weapon={item} buying={true} choosing={false}/>
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
    );
}

export default Store;