import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayChoreCard from './DisplayChoreCard';

const DisplayChoreHistory = () => {

    const [choreHistory, setChoreHistory] = useState([
        {
        id: 1,                       // Primary key
        name: 'Wash Dishes',         // Chore description
        time: 15,                    // Time required to complete (minutes)
        points: 10,                 // Points earned upon completion
        dateCompleted: '2023-10-01T12:00:00Z', // Date completed in ISO format
        
        }
    ]);

    // useEffect(() => {
    //     axios.get('/user-chores/History')
    //         .then(response => setChoreHistory(response.data))
    //         .catch(error => {
    //             console.error('Error fetching chore history:', error);
    //             setChores([]);
    //         });
    // }, []);

    if (!choreHistory || choreHistory.length === 0) {
        return <div>No chore history available.</div>;
    }else{
        return (
            <div>
                <h2>Chore History</h2>
                <ul>
                    {choreHistory.map((chore) => (
                        <li key={chore.id} >
                            <DisplayChoreCard chore={chore} hasTime={true}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
   
};

export default DisplayChoreHistory;