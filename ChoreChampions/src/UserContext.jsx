import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook for using the context
export const useUserContext = () => useContext(UserContext);

// Define weapon items for the entire app
const ITEMS = [
    { id: 1, name: 'Wrapping Paper Tube', cost: 5, damage: 2, durability: 1, timeUsed: 0, image: '/tube.png' },
    { id: 2, name: 'Giant Q-tip', cost: 20, damage: 4, durability: 2, timeUsed: 0, image: '/qTip.png' },
    { id: 3, name: 'Rubber Chicken', cost: 30, damage: 6, durability: 1, timeUsed: 0, image: '/chicken.png' },
    { id: 4, name: 'Silly String', cost: 15, damage: 3, durability: 2, timeUsed: 0, image: '/sillyString.png'},
    { id: 5, name: 'Water Balloon', cost: 25, damage: 5, durability: 1, timeUsed: 0, image: '/waterBalloon.png' },
    { id: 6, name: 'Feather Duster', cost: 10, damage: 2, durability: 3, timeUsed: 0, image: '/featherDuster.png' },
    { id: 7, name: 'Bag of Leaves', cost: 12, damage: 1, durability: 4, timeUsed: 0, image: '/bagOfLeaves.png' },
    { id: 8, name: 'Confetti Cannon', cost: 40, damage: 8, durability: 1, timeUsed: 0, image: '/confettiCanon.png' },
    { id: 9, name: 'Feather Pillow', cost: 8, damage: 2, durability: 5, timeUsed: 0, image: '/feather.png' },
    { id: 10, name: 'Pool Noodle', cost: 6, damage: 2, durability: 3, timeUsed: 0, image: '/b7fe0154-3209-4260-8653-104d42483a35.png' },
    { id: 11, name: 'Giant Foam Finger', cost: 18, damage: 3, durability: 2, timeUsed: 0, image: '/foamFinger.png' },
    { id: 12, name: 'Giant ToothBrush', cost: 22, damage: 4, durability: 3, timeUsed: 0, image: '/toothbrush.png' },
];

// JWT utility functions
const TOKEN_KEY = 'jwt_token';

const getStoredToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const setStoredToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const removeStoredToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// JWT token validation (basic check)
const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    // Split JWT into parts
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Create the provider component
export function UserProvider({ children }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // User state - single source of truth for backend sync
  const [user, setUser] = useState({
    name: "",
    email: "", 
    password: "",
    userId: null,
    houseHoldId: null,
    userPoints: 0,
    userTime: 0,
  });

  // Game state - keep existing logic unchanged
  const [userChores, setUserChores] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuthToken = async () => {
      // TEMPORARY: Hardcode authenticated user for development
      const DEVELOPMENT_MODE = true; // Set to false when backend is ready
      
      if (DEVELOPMENT_MODE) {
        // Simulate a logged-in user
        const mockUser = {
          name: "Shan",
          email: "shan@email.com",
          userId: 1,
          houseHoldId: 1,
          userPoints: 25,
          userTime: 30,
        };
        
        setUser(mockUser);
        setToken("mock-jwt-token-for-development");
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }
      
      // Real authentication logic (for when backend is ready)
      const storedToken = getStoredToken();
      
      if (storedToken && isTokenValid(storedToken)) {
        setToken(storedToken);
        setIsAuthenticated(true);
        
        // Optionally fetch user data from backend using the token
        await fetchUserData(storedToken);
      } else {
        // Token is invalid or expired
        if (storedToken) {
          removeStoredToken();
        }
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuthToken();
  }, []);

  // Fetch user data from backend (you'll need to implement this endpoint)
  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // If fetching fails, logout the user
      logout();
    }
  };

  // Login function
  const login = async (email, password) => {
    // TEMPORARY: Mock login for development
    const DEVELOPMENT_MODE = true; // Set to false when backend is ready
    
    if (DEVELOPMENT_MODE) {
      // Simulate successful login
      const mockUser = {
        name: "Shan",
        email: email,
        userId: 1,
        houseHoldId: 1,
        userPoints: 25,
        userTime: 30,
      };
      
      setUser(mockUser);
      setToken("mock-jwt-token-for-development");
      setIsAuthenticated(true);
      
      return { success: true };
    }
    
    // Real login logic (for when backend is ready)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const { token: authToken, user: userData } = data;
        
        setToken(authToken);
        setStoredToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  // Register function
  const register = async (userData) => {
    // TEMPORARY: Mock registration for development
    const DEVELOPMENT_MODE = true; // Set to false when backend is ready
    
    if (DEVELOPMENT_MODE) {
      // Simulate successful registration
      const mockUser = {
        name: userData.name,
        email: userData.email,
        userId: Math.floor(Math.random() * 1000), // Random ID for demo
        houseHoldId: 1,
        userPoints: 0,
        userTime: 0,
      };
      
      setUser(mockUser);
      setToken("mock-jwt-token-for-development");
      setIsAuthenticated(true);
      
      return { success: true };
    }
    
    // Real registration logic (for when backend is ready)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        const { token: authToken, user: newUser } = data;
        
        setToken(authToken);
        setStoredToken(authToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    removeStoredToken();
    setIsAuthenticated(false);
    setUser({
      name: "",
      email: "", 
      password: "",
      userId: null,
      houseHoldId: null,
      userPoints: 0,
      userTime: 0,
    });
    setUserChores([]);
    setOwnedItems([]);
    setSelectedWeapon(null);
  };

  // Helper functions to update specific user properties
  const setUserPoints = (newPoints) => {
    setUser(prev => ({ ...prev, userPoints: newPoints }));
  };

  const setUserTime = (newTime) => {
    setUser(prev => ({ ...prev, userTime: newTime }));
  };

  // API request wrapper with authentication (for future use)
  const authenticatedRequest = async (url, options = {}) => {
    if (!token) {
      throw new Error('No authentication token available');
    }

    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers: authHeaders
    });

    // If token is expired or invalid, logout user
    if (response.status === 401) {
      logout();
      throw new Error('Authentication expired');
    }

    return response;
  };

  // ========== EXISTING GAME LOGIC - UNCHANGED ==========

  // Chore management functions - keep existing logic
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
  
  // Item/weapon management functions - keep existing logic
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
  
  // Remove item if it's no longer usable - keep existing logic
  const handleRemoveItem = (itemId) => {
    setOwnedItems(ownedItems.filter(item => item.id !== itemId));
  };
  
  // Track weapon usage - keep existing logic
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
    // Authentication - NEW
    isAuthenticated,
    isLoading,
    token,
    login,
    register,
    logout,
    authenticatedRequest,
    
    // User data
    user,
    setUser,
    
    // Points and time (using user object properties)
    userPoints: user.userPoints,
    userTime: user.userTime,
    setUserPoints,
    setUserTime,
    
    // Chores - EXISTING LOGIC
    userChores,
    setUserChores,
    handleAddChore,
    handleRemoveChore,
    handleCompleteChore,
    
    // Battle system - EXISTING LOGIC
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