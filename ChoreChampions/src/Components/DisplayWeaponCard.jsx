import React from 'react';
import { useUserContext } from "../UserContext";


function DisplayWeaponCard({ 
  weapon, 
  buying = false,
  choosing = false,
  canRemove = false
}) {
  const { 
    userTime, 
    ownedItems, 
    buyItem, 
    selectedWeapon, 
    setSelectedWeapon,
    handleRemoveItem 
  } = useUserContext();
  
  if (!weapon) return null;
  
  // Check if user owns this weapon
  const isOwned = ownedItems.some(item => item.id === weapon.id);
  
  // Check if this weapon is currently selected
  const isSelected = selectedWeapon?.id === weapon.id;
  
  // Determine action button based on props
  const renderActionButton = () => {
    if (buying) {
      return (
        <button 
          className={`action-button buy ${isOwned ? 'owned' : ''}`}
          onClick={() => buyItem(weapon)}
          disabled={userTime < weapon.cost || isOwned}
        >
          {isOwned ? 'Owned' : `Buy for ${weapon.cost} credits`}
        </button>
      );
    }
    
    if (choosing) {
      return (
        <button 
          className={`action-button choose ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedWeapon(isSelected ? null : weapon)}
        >
          {isSelected ? 'Selected' : 'Choose'}
        </button>
      );
    }
    
    if (canRemove) {
      return (
        <button 
          className="action-button remove"
          onClick={() => handleRemoveItem(weapon.id)}
        >
          Remove
        </button>
      );
    }
    
    return null;
  };
  
  return (
    <div 
      className={`weapon-card ${isSelected && choosing ? 'selected' : ''}`}
      onClick={choosing ? () => setSelectedWeapon(isSelected ? null : weapon) : undefined}
    >
      <h3 className="weapon-name">{weapon.name}</h3>
      
      <div className="weapon-stats">
        {weapon.image && (
          <div className="weapon-image">
            <img src={weapon.image} alt={weapon.name} />
          </div>
        )}
        
        <div className="stat">
          <span className="stat-label">Damage:</span>
          <span className="stat-value">+{weapon.damage}</span>
        </div>
        
        {buying && (
          <div className="stat">
            <span className="stat-label">Cost:</span>
            <span className="stat-value">{weapon.cost} credits</span>
          </div>
        )}
        
        {weapon.durability && (
          <div className="stat">
            <span className="stat-label">Durability:</span>
            <span className="stat-value">
              {weapon.timeUsed !== undefined ? weapon.timeUsed : 0}/{weapon.durability}
            </span>
          </div>
        )}
        
        {renderActionButton() && (
          <div className="action-button-container">
            {renderActionButton()}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayWeaponCard;