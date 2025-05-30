import React from 'react';
import ChampionCard from './ChampionCard';

const champions = [
    { name: 'Pretty Platypus', image: 'cat5.png' },
    { name: 'Mystery Moss', image: 'cat5.png' },
    { name: 'Bad Bat', image: 'cat5.png' },
    { name: 'Pretentious Paladin', image: 'cat5.png' },
    { name: 'Sleepy Sloth', image: 'cat5.png' },
    { name: 'Goofy Golem', image: 'cat5.png' },
    { name: 'Stone Serpent', image: 'cat5.png' },
    { name: 'Bolsterous Bard', image: 'cat5.png' },
    { name: 'Very Hungry Vampling', image: 'cat5.png' },
    { name: 'Nexus Phoenix', image: 'cat5.png' },
];

function ChooseChampion({ handleSelectChampion, chosenChampion }) {
    return (
        <div>
            <div className='championGrid'>
                {champions.map((champion) => (
                    <div className='championWrapper' key={champion.name}>
                        <ChampionCard champion={champion} />
                        <div className="champion-status">
                            {chosenChampion && chosenChampion.name === champion.name ? (
                                <button className="selected-champion">SELECTED</button>
                            ) : (
                                <button
                                    className="action-button choose"
                                    onClick={() => handleSelectChampion && handleSelectChampion(champion)}
                                >
                                    Choose
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChooseChampion;