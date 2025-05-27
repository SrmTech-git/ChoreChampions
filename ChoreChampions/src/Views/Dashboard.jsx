// Dashboard.jsx
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
        handleRemoveItem, } = useUserContext();
    
    return (
        <div>
            <div>
                <h2>Welcome to your Dashboard, {user.name}!</h2>

                <div className='display-user-info'>
                    <DisplayChoreHistory/>
                </div>
                
                <p>Total Points: {userPoints}</p>
                
                <h3>Your Chores:</h3>
                {userChores.length === 0 ? (
                    <p>No chores added yet. Go to the Chores page to add some!</p>
                ) : (
                    <ul>
                        {userChores.map(chore => (
                            <li key={chore.id}>
                                <DisplayChoreCard chore={chore} canAdd={false} canComplete={true}  canRemove={true}/>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
            <div>
                <h3>Your weapons</h3>
                {ownedItems.length === 0 ? (
                    <p>No weapons owned yet. Go to the Challenge screen to see what you can buy!</p>
                ) : (
                    <ul>
                        {ownedItems.map(item => (
                            <li key={item.id}>
                                <DisplayWeaponCard
                                    weapon={item} 
                                    buying={false} 
                                    choosing={false}
                                    canRemove={true}
                                    
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;