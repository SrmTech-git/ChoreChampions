import React from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../UserContext';

function DisplayChoreCard({ chore, canAdd, canRemove, canComplete, hasTime }) {
  // Get handlers directly from UserContext
  const { handleRemoveChore, handleCompleteChore, handleAddChore,userChores } = useUserContext();
  const isChoreAdded = userChores.some(c => c.id === chore.id);

  return (
    <div className="chore-card">
      <div className="chore-card-content">
        <h3 className="chore-name">{chore.name}</h3>
        <div className="chore-details">
          <span className="chore-time">{chore.time} mins</span>
          <span className="chore-points">{chore.points} pts</span>
        </div>
      </div>
      
      {canAdd && (
        <div className="chore-card-actions">
          <button 
            className="complete-btn"
            onClick={() => handleAddChore(chore)}
          >
            {isChoreAdded ? 'Added' : 'Add to list'}
          </button>
        </div>
      )}
      {canComplete && (
        <div className="chore-card-actions">
          <button 
            className="complete-btn"
            onClick={() => handleCompleteChore(chore)}
          >
            Complete
          </button>
        </div>
      )}
      {canRemove && (
        <div className="chore-card-actions">
          <button 
            className="remove-btn"
            onClick={() => handleRemoveChore(chore)}
          >
            Remove
          </button>
        </div>
      )}
      {hasTime && (
        <div className="chore-card-actions">
          <span className="time-required"> {new Date(chore.dateCompleted).toLocaleString()} </span>
        </div>
      )}
    </div>
  );
}

DisplayChoreCard.propTypes = {
  chore: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired
  }).isRequired,
  showActions: PropTypes.bool
};

export default DisplayChoreCard;