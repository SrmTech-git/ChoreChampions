import React from 'react';

const ChampionCard = ({ champion }) => {
    if (!champion) return null;

    return (
        <div className="championCard">
            <img
                src={champion.image}
                alt={champion.name}
                className="championImage"
            />
            <h3 className="championName">{champion.name}</h3>
        </div>
    );
};

export default ChampionCard;