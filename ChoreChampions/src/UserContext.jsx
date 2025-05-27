import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook for using the context
export const useUserContext = () => useContext(UserContext);

// Define weapon items for the entire app
const ITEMS = [
    { id: 1, name: 'Wrapping Paper Tube', cost: 5, damage: 2, durability: 1, timeUsed: 0, image: 'public/tube.png' },
    { id: 2, name: 'Giant Q-tip', cost: 20, damage: 4, durability: 2, timeUsed: 0, image: 'public/qTip.png' },
    { id: 3, name: 'Rubber Chicken', cost: 30, damage: 6, durability: 1, timeUsed: 0, image: 'public/chicken.png' },
    { id: 4, name: 'Silly String', cost: 15, damage: 3, durability: 2, timeUsed: 0, image: 'public/sillyString.png'},
    { id: 5, name: 'Water Balloon', cost: 25, damage: 5, durability: 1, timeUsed: 0, image: 'public/waterBalloon.png' },
    { id: 6, name: 'Feather Duster', cost: 10, damage: 2, durability: 3, timeUsed: 0, image: 'public/featherDuster.png' },
    { id: 7, name: 'Bag of Leaves', cost: 12, damage: 1, durability: 4, timeUsed: 0, image: 'public/bagOfLeaves.png' },
    { id: 8, name: 'Confetti Cannon', cost: 40, damage: 8, durability: 1, timeUsed: 0, image: 'public/confettiCanon.png' },
    { id: 9, name: 'Feather Pillow', cost: 8, damage: 2, durability: 5, timeUsed: 0, image: 'public/feather.png' },
    { id: 10, name: 'Pool Noodle', cost: 6, damage: 2, durability: 3, timeUsed: 0, image: 'public/b7fe0154-3209-4260-8653-104d42483a35.png' },
    { id: 11, name: 'Giant Foam Finger', cost: 18, damage: 3, durability: 2, timeUsed: 0, image: 'public/foamFinger.png' },
    { id: 12, name: 'Giant ToothBrush', cost: 22, damage: 4, durability: 3, timeUsed: 0, image: 'public/toothbrush.png' },
];

// Create the provider component
export function UserProvider({ children }) {
  // User state - single source of truth for backend sync
  const [user, setUser] = useState({
    name: "Shan",
    email: "shan@email.com", 
    password: "password123",
    userId: 1,
    houseHoldId: 1,
    userPoints: 5,
    userTime: 5,
  });

  // Helper functions to update specific user properties
  const setUserPoints = (newPoints) => {
    setUser(prev => ({ ...prev, userPoints: newPoints }));
  };

  const setUserTime = (newTime) => {
    setUser(prev => ({ ...prev, userTime: newTime }));
  };
  
  // Game state
  const [userChores, setUserChores] = useState([
    { id: 1, name: 'Wash Dishes', time: 15, points: 10 },
    { id: 2, name: 'Vacuum Living Room', time: 20, points: 15 },
  ]);
  
  // Weapon state
  const [ownedItems, setOwnedItems] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  // Chore management functions
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
      setUser(prev => ({
        ...prev,
        userPoints: prev.userPoints + chore.points,
        userTime: prev.userTime + chore.time
      }));
      handleRemoveChore(chore);
    }
  };
  
  // Item/weapon management functions
  const buyItem = (item) => {
    // Check if user can afford it and doesn't already own it
    if (user.userTime >= item.cost && !ownedItems.some(ownedItem => ownedItem.id === item.id)) {
      // Add to owned items (ensure timeUsed is 0)
      setOwnedItems([...ownedItems, { ...item, timeUsed: 0 }]);
      // Deduct the cost
      setUserTime(user.userTime - item.cost);
      return true;
    }
    return false;
  };
  
  // Remove item if it's no longer usable
  const handleRemoveItem = (itemId) => {
    setOwnedItems(ownedItems.filter(item => item.id !== itemId));
  };
  
  // Track weapon usage
  const incrementWeaponUsage = (weaponId) => {
    if (!weaponId) {
      console.log("No weapon ID provided to incrementWeaponUsage");
      return;
    }
    
    console.log(`Attempting to increment usage for weapon ID: ${weaponId}`);
    console.log("Current ownedItems:", ownedItems);
    
    // Find the weapon in owned items
    const weaponIndex = ownedItems.findIndex(item => item.id === weaponId);
    
    if (weaponIndex === -1) {
      console.log(`Warning: Weapon with ID ${weaponId} not found in ownedItems`);
      return;
    }
    
    // Get the weapon
    const weapon = ownedItems[weaponIndex];
    
    // Calculate new usage count
    const newTimeUsed = (weapon.timeUsed || 0) + 1;
    
    // Create updated items array
    const updatedOwnedItems = [...ownedItems];
    updatedOwnedItems[weaponIndex] = { ...weapon, timeUsed: newTimeUsed };
    
    console.log(`Weapon ${weaponId} usage incremented from ${weapon.timeUsed} to ${newTimeUsed}`);
    
    // Check if weapon should be removed (exceeded durability)
    if (newTimeUsed >= weapon.durability) {
      console.log(`Weapon ${weaponId} has reached its durability limit and will be removed`);
      
      // Remove the weapon
      const filteredItems = ownedItems.filter(item => item.id !== weaponId);
      setOwnedItems(filteredItems);
      
      // If this was the selected weapon, deselect it
      if (selectedWeapon && selectedWeapon.id === weaponId) {
        setSelectedWeapon(null);
      }
    } else {
      // Just update the usage count
      setOwnedItems(updatedOwnedItems);
    }
  };

  // Create the context value object with all values and functions to share
  const contextValue = {
    // User data
    user,
    setUser,
    
    // Points and time (using user object properties)
    userPoints: user.userPoints,
    userTime: user.userTime,
    setUserPoints,
    setUserTime,
    
    // Chores
    userChores,
    setUserChores,
    handleAddChore,
    handleRemoveChore,
    handleCompleteChore,
    
    // Battle system
    ownedItems,
    setOwnedItems,
    buyItem,
    selectedWeapon,
    setSelectedWeapon,
    incrementWeaponUsage,
    handleRemoveItem,
    
    // Items catalog
    ITEMS
  };

  // Provide the context to children components
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}