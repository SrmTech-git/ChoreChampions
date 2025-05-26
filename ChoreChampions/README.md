Data Structure: 
User: 
        {name: "Shan",
        email: "shan@email.com", 
        userId: 1,
        houseHoldId: 1,
        userPoints: 5,
        userTime: 5}

Chore:
        { id: 1, name: 'Wash Dishes', time: 15, points: 10 },

Weapon: 
        { id: 1, name: 'Wrapping Paper Tube', cost: 5, damage: 2, durability: 1, timeUsed: 0, image: 'public/tube.png' },

DB- Chore and weapon tables should have an associated table between them and user table that has user ID and ChoreID/WeaponID. 

<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <!-- User Table -->
  <g id="user-table">
    <rect x="50" y="50" width="250" height="220" fill="#e3f2fd" stroke="#1976d2" stroke-width="2"/>
    <rect x="50" y="50" width="250" height="40" fill="#1976d2"/>
    <text x="175" y="75" text-anchor="middle" fill="white" font-size="18" font-weight="bold">User</text>
    
    <text x="60" y="115" font-size="14">userId (PK)</text>
    <text x="60" y="135" font-size="14">name</text>
    <text x="60" y="155" font-size="14">email</text>
    <text x="60" y="175" font-size="14">houseHoldId (FK)</text>
    <text x="60" y="195" font-size="14">userPoints</text>
    <text x="60" y="215" font-size="14">userTime</text>
  </g>

  <!-- Household Table -->
  <g id="household-table">
    <rect x="50" y="320" width="250" height="120" fill="#e8f5e9" stroke="#388e3c" stroke-width="2"/>
    <rect x="50" y="320" width="250" height="40" fill="#388e3c"/>
    <text x="175" y="345" text-anchor="middle" fill="white" font-size="18" font-weight="bold">Household</text>
    
    <text x="60" y="385" font-size="14">houseHoldId (PK)</text>
    <text x="60" y="405" font-size="14">name</text>
  </g>

  <!-- Chore Table -->
  <g id="chore-table">
    <rect x="450" y="50" width="250" height="160" fill="#fff3e0" stroke="#f57c00" stroke-width="2"/>
    <rect x="450" y="50" width="250" height="40" fill="#f57c00"/>
    <text x="575" y="75" text-anchor="middle" fill="white" font-size="18" font-weight="bold">Chore</text>
    
    <text x="460" y="115" font-size="14">id (PK)</text>
    <text x="460" y="135" font-size="14">name</text>
    <text x="460" y="155" font-size="14">time</text>
    <text x="460" y="175" font-size="14">points</text>
  </g>

  <!-- Weapon Table -->
  <g id="weapon-table">
    <rect x="450" y="320" width="250" height="200" fill="#fce4ec" stroke="#c2185b" stroke-width="2"/>
    <rect x="450" y="320" width="250" height="40" fill="#c2185b"/>
    <text x="575" y="345" text-anchor="middle" fill="white" font-size="18" font-weight="bold">Weapon</text>
    
    <text x="460" y="385" font-size="14">id (PK)</text>
    <text x="460" y="405" font-size="14">name</text>
    <text x="460" y="425" font-size="14">cost</text>
    <text x="460" y="445" font-size="14">damage</text>
    <text x="460" y="465" font-size="14">durability</text>
    <text x="460" y="485" font-size="14">timeUsed</text>
    <text x="460" y="505" font-size="14">image</text>
  </g>

  <!-- UserChore Junction Table -->
  <g id="user-chore-table">
    <rect x="850" y="50" width="250" height="160" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>
    <rect x="850" y="50" width="250" height="40" fill="#7b1fa2"/>
    <text x="975" y="75" text-anchor="middle" fill="white" font-size="18" font-weight="bold">UserChore</text>
    
    <text x="860" y="115" font-size="14">id (PK)</text>
    <text x="860" y="135" font-size="14">userId (FK)</text>
    <text x="860" y="155" font-size="14">choreId (FK)</text>
    <text x="860" y="175" font-size="14">completedAt</text>
  </g>

  <!-- UserWeapon Junction Table -->
  <g id="user-weapon-table">
    <rect x="850" y="320" width="250" height="180" fill="#e0f2f1" stroke="#00695c" stroke-width="2"/>
    <rect x="850" y="320" width="250" height="40" fill="#00695c"/>
    <text x="975" y="345" text-anchor="middle" fill="white" font-size="18" font-weight="bold">UserWeapon</text>
    
    <text x="860" y="385" font-size="14">id (PK)</text>
    <text x="860" y="405" font-size="14">userId (FK)</text>
    <text x="860" y="425" font-size="14">weaponId (FK)</text>
    <text x="860" y="445" font-size="14">acquiredAt</text>
    <text x="860" y="465" font-size="14">currentDurability</text>
  </g>

  <!-- Relationships -->
  <!-- User to Household -->
  <line x1="175" y1="270" x2="175" y2="320" stroke="black" stroke-width="1"/>
  <polygon points="175,320 170,310 180,310" fill="black"/>
  <text x="185" y="295" font-size="12">belongs to</text>

  <!-- User to UserChore -->
  <line x1="300" y1="130" x2="850" y2="130" stroke="black" stroke-width="1"/>
  <line x1="840" y1="125" x2="850" y2="130" stroke="black" stroke-width="1"/>
  <line x1="840" y1="135" x2="850" y2="130" stroke="black" stroke-width="1"/>
  <text x="550" y="125" font-size="12" text-anchor="middle">completes</text>

  <!-- Chore to UserChore -->
  <line x1="700" y1="130" x2="850" y2="130" stroke="black" stroke-width="1"/>
  <line x1="840" y1="125" x2="850" y2="130" stroke="black" stroke-width="1"/>
  <line x1="840" y1="135" x2="850" y2="130" stroke="black" stroke-width="1"/>

  <!-- User to UserWeapon -->
  <line x1="300" y1="160" x2="350" y2="160" stroke="black" stroke-width="1"/>
  <line x1="350" y1="160" x2="350" y2="410" stroke="black" stroke-width="1"/>
  <line x1="350" y1="410" x2="850" y2="410" stroke="black" stroke-width="1"/>
  <line x1="840" y1="405" x2="850" y2="410" stroke="black" stroke-width="1"/>
  <line x1="840" y1="415" x2="850" y2="410" stroke="black" stroke-width="1"/>
  <text x="550" y="405" font-size="12" text-anchor="middle">owns</text>

  <!-- Weapon to UserWeapon -->
  <line x1="700" y1="410" x2="850" y2="410" stroke="black" stroke-width="1"/>
  <line x1="840" y1="405" x2="850" y2="410" stroke="black" stroke-width="1"/>
  <line x1="840" y1="415" x2="850" y2="410" stroke="black" stroke-width="1"/>

  <!-- Cardinality Labels -->
  <text x="310" y="125" font-size="12">1</text>
  <text x="830" y="125" font-size="12">*</text>
  <text x="710" y="125" font-size="12">1</text>
  <text x="830" y="125" font-size="12">*</text>
  
  <text x="310" y="155" font-size="12">1</text>
  <text x="830" y="405" font-size="12">*</text>
  <text x="710" y="405" font-size="12">1</text>
  <text x="830" y="405" font-size="12">*</text>
  
  <text x="185" y="265" font-size="12">*</text>
  <text x="185" y="335" font-size="12">1</text>
</svg>