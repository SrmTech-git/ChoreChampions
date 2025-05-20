// ChoreList.jsx
import React from 'react';
import { useUserContext } from '../UserContext';
import DisplayChoreCard from '../Components/DisplayChoreCard';


const CHORES = [
    { id: 1, name: 'Wash Dishes', time: 15, points: 10 },
    { id: 2, name: 'Vacuum Living Room', time: 20, points: 15 },
    { id: 3, name: 'Vacuum Bedroom', time: 15, points: 10 },
    { id: 4, name: 'Take Out Trash', time: 5, points: 5 },
    { id: 5, name: 'Empty Recycling Bin', time: 5, points: 5 },
    { id: 6, name: 'Wash one load of Laundry', time: 60, points: 15 },
    { id: 7, name: 'Fold and Put Away Laundry', time: 15, points: 10 },
    { id: 8, name: 'Clean Bathroom Sink', time: 5, points: 5 },
    { id: 9, name: 'Clean Bathroom Toilet', time: 10, points: 10 },
    { id: 10, name: 'Clean Bathroom Shower/Tub', time: 15, points: 15 },
    { id: 11, name: 'Clean Bathroom Mirror', time: 5, points: 5 },
    { id: 12, name: 'Mop Bathroom Floor', time: 10, points: 10 },
    { id: 13, name: 'Mow the Lawn', time: 60, points: 50 },
    { id: 14, name: 'Edge the Lawn', time: 20, points: 15 },
    { id: 15, name: 'Organize Bookshelf', time: 15, points: 10 },
    { id: 16, name: 'Dust Shelves', time: 10, points: 5 },
    { id: 17, name: 'Water Indoor Plants', time: 5, points: 5 },
    { id: 18, name: 'Water Garden/Outdoor Plants', time: 10, points: 5 },
    { id: 19, name: 'Meal Prep - Breakfast', time: 20, points: 15 },
    { id: 20, name: 'Meal Prep - Lunch', time: 25, points: 15 },
    { id: 21, name: 'Meal Prep - Dinner', time: 30, points: 20 },
    { id: 22, name: 'Wipe Kitchen Counters', time: 5, points: 5 },
    { id: 23, name: 'Clean Refrigerator', time: 20, points: 15 },
    { id: 24, name: 'Sweep Kitchen Floor', time: 10, points: 5 },
    { id: 25, name: 'Mop Kitchen Floor', time: 15, points: 10 },
    { id: 26, name: 'Clean Stovetop', time: 10, points: 10 },
    { id: 27, name: 'Empty Dishwasher', time: 5, points: 5 },
    { id: 28, name: 'Change Bed Sheets', time: 10, points: 10 },
    { id: 29, name: 'Sort Mail/Papers', time: 10, points: 5 },
    { id: 30, name: 'Clean Microwave', time: 5, points: 5 },
];

function ChoreList() {
    const { userChores, handleAddChore } = useUserContext();
    
    return (
        <div>
            <h2>Available Chores</h2>
            <ul>
                {CHORES.map(chore => (
                    <li key={chore.id}>
                        <DisplayChoreCard chore={chore} canAdd={true} />
                    </li>
                ))}
            </ul>
            
            <h2>Your Chore List</h2>
            <ul>
                {userChores.length === 0 && <li>No chores selected.</li>}
                {userChores.map(chore => (
                    <li key={chore.id}>
                        <DisplayChoreCard chore={chore} canAdd={false} canComplete={true}  canRemove={true}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChoreList;