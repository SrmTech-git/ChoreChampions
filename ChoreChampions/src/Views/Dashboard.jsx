import React from 'react';
import { useUserContext } from '../UserContext';
import DisplayWeaponCard from '../Components/DisplayWeaponCard';
import DisplayChoreCard from '../Components/DisplayChoreCard';
import DisplayChoreHistory from '../Components/DisplayChoreHistory';

function Dashboard() {
    const { 
        userChores, 
        userPoints, 
        handleRemoveChore, 
        handleCompleteChore, 
        user, 
        ownedItems,
        setOwnedItems,
        handleRemoveItem 
    } = useUserContext();
    
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Welcome to your Dashboard, {user.name}!</h2>
                <p className="user-points">Total Points: {userPoints}</p>
            </header>
            
            <section className="dashboard-section">
                <div className='display-user-info'>
                    <DisplayChoreHistory />
                </div>
            </section>
            
            <section className="dashboard-section">
                <h3>Your Chores:</h3>
                {userChores.length === 0 ? (
                    <p className="empty-state">
                        No chores added yet. Go to the Chores page to add some!
                    </p>
                ) : (
                    <ul className="chores-list">
                        {userChores.map(chore => (
                            <li key={chore.id} className="chore-item">
                                <DisplayChoreCard 
                                    chore={chore} 
                                    canAdd={false} 
                                    canComplete={true}  
                                    canRemove={true}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="dashboard-section">
                <h3>Your Weapons:</h3>
                {ownedItems.length === 0 ? (
                    <p className="empty-state">
                        No weapons owned yet. Go to the Challenge screen to see what you can buy!
                    </p>
                ) : (
                    <ul className="weapons-list weaponGrid">
                        {ownedItems.map(item => (
                            <li key={item.id} className="weapon-item">
                                <div className="weapon-display weaponWrapper ">
                                    <DisplayWeaponCard
                                        weapon={item} 
                                        buying={false} 
                                        choosing={false}
                                        canRemove={true}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default Dashboard;