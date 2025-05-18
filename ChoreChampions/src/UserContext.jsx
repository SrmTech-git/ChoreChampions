// UserContext.jsx
import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook for using the context
export const useUserContext = () => useContext(UserContext);

// Create the provider component
export function UserProvider({ children }) {
  const [userPoints, setUserPoints] = useState(5);
  const [user, setUser] = useState({
    name: "Shan",
    email: "shan@email.com",
    password: "password", 
    userId: "1",
    points: userPoints,
    houseHoldId: 1
  });
  const [userChores, setUserChores] = useState([
    { id: 1, name: 'Wash Dishes', time: 15, points: 10 },
    { id: 2, name: 'Vacuum Living Room', time: 20, points: 15 },
  ]);

  const handleAddChore = (chore) => {
    if (!userChores.find(c => c.id === chore.id)) {
      setUserChores([...userChores, chore]);
    }
  };

  const handleRemoveChore = (chore) => {
    setUserChores(userChores.filter(c => c.id !== chore.id));
  };

 const handleCompleteChore = (chore) => {
    const isConfirmed = window.confirm(`Have you FULLY completed the chore: ${chore.name}?\n(Being dishonest can result in damaged relationships and loss of trust)`);
    
    if (isConfirmed) {
      setUserPoints(userPoints + chore.points);
      handleRemoveChore(chore);
    }
};

  // All the values and functions we want to share
  const contextValue = {
    user,
    setUser,
    userPoints,
    setUserPoints,
    userChores,
    setUserChores,
    handleAddChore,
    handleRemoveChore,
    handleCompleteChore
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}