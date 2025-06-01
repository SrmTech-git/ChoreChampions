# Chore Champions

A gamified household chore management system where users earn points by completing chores and can spend those points on fun "weapons" as rewards.

## Overview

Chore Champions transforms mundane household tasks into an engaging game-like experience. Users complete chores to earn points and time credits, which they can then spend on collecting various household "weapons" (fun items like wrapping paper tubes).

## Data Models

### User
Represents a member of a household who can complete chores and collect weapons.

```javascript
{
  userId: 1,                    // Primary key
  name: "Shan",                 // User's display name
  email: "shan@email.com",      // Unique email for authentication
  password: "abc",              // Hashed password for authentication
  houseHoldId: 1,              // Foreign key to Household table
  userPoints: 5,               // Current points balance
  userTime: 5                  // Time credits earned
}
```

### Chore
Defines a household task that users can complete to earn rewards.

```javascript
{
  id: 1,                       // Primary key
  name: 'Wash Dishes',         // Chore description
  time: 15,                    // Time required to complete (minutes)
  points: 10                   // Points earned upon completion
}
```

### Weapon
Represents collectible items that users can purchase with their earned points.

```javascript
{
  id: 1,                       // Primary key
  name: 'Wrapping Paper Tube', // Weapon name
  cost: 5,                     // Points required to purchase
  damage: 2,                   // Attack power (for gamification)
  durability: 1,               // Number of uses before breaking
  timeUsed: 0,                 // Tracks usage count
  image: 'public/tube.png'     // Path to weapon image
}
```

### Household
Groups users together, typically representing a family or roommates sharing chores.

```javascript
{
  houseHoldId: 1,              // Primary key
  name: 'The Smith Family',    // Household name
  createdAt: '2024-01-01',     // Date household was created
  inviteCode: 'SMITH123'       // Unique code for joining household
}
```

## Database Architecture

### Entity Relationship Diagram
![ERD](public/ERD.png)

### Relational Tables

The system uses junction tables to manage many-to-many relationships:

1. **UserChore** - Tracks which chores users have assigned/completed
   - `id` (Primary Key)
   - `userId` (Foreign Key → User)
   - `choreId` (Foreign Key → Chore)
   - `status` (e.g., 'assigned', 'completed')
   - `completedAt` (Timestamp)

2. **UserWeapon** - Manages user's weapon inventory
   - `id` (Primary Key)
   - `userId` (Foreign Key → User)
   - `weaponId` (Foreign Key → Weapon)
   - `currentDurability` (Tracks remaining uses)
   - `acquiredAt` (Timestamp)

## Backend API Requirements

### Chore Management

#### 1. Get All Chores
- **Endpoint**: `GET /chores`
- **Purpose**: Populate the available chores list in the UI
- **Response**: Array of all chore objects

#### 2. Assign Chore to User
- **Endpoint**: `POST /user-chores`
- **Purpose**: Add a chore to a user's task list
- **Request Body**: `{ userId, choreId }`
- **Response**: Created UserChore object

#### 3. Complete Chore
- **Endpoint**: `DELETE /user-chores/:id`
- **Purpose**: Mark chore as completed and award points
- **Side Effects**: 
  - Remove chore from user's active list
  - Update user's points and time balance

  #### 4. get Chore history
- **Endpoint**: `GET /user-chores/History`
- **Purpose**: Show all completed chores ordered by time stamp
- **Side Effects**: 
 

### Weapon Management

#### 4. Get All Weapons
- **Endpoint**: `GET /weapons`
- **Purpose**: Display available weapons in the shop
- **Response**: Array of all weapon objects

#### 5. Purchase Weapon
- **Endpoint**: `POST /user-weapons`
- **Purpose**: Add weapon to user's inventory
- **Request Body**: `{ userId, weaponId }`
- **Validation**: Check if user has enough points
- **Side Effects**: Deduct points from user balance

#### 6. Use/Break Weapon
- **Endpoint**: `DELETE /user-weapons/:id`
- **Purpose**: Remove weapon when durability reaches zero
- **Trigger**: When `currentDurability` = 0

### User Management

#### 7. Update User Stats
- **Endpoint**: `PUT /users/:id`
- **Purpose**: Update user points and time
- **Request Body**: Complete user object with updated values
- **Note**: Frontend sends the entire user object with new point/time values

## Technical Stack Recommendations

### Backend (Java/Spring Boot)
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA/Hibernate
- **API**: RESTful endpoints
- **Authentication**: Spring Security with JWT

### Frontend (React)
- **Framework**: React 18.x
- **State Management**: Context API or Redux
- **Routing**: React Router
- **UI Components**: Material-UI or custom components
- **HTTP Client**: Axios

### Database Schema Example (PostgreSQL)

```sql

-- Households table
CREATE TABLE households (
    household_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    invite_code VARCHAR(50) UNIQUE
);

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    household_id INTEGER REFERENCES households(household_id),
    user_points INTEGER DEFAULT 0,
    user_time INTEGER DEFAULT 0,
    image TEXT
);

-- Chores table
CREATE TABLE chores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    time INTEGER NOT NULL,
    points INTEGER NOT NULL
);

-- Weapons table
CREATE TABLE weapons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    cost INTEGER NOT NULL,
    damage INTEGER NOT NULL,
    durability INTEGER NOT NULL,
    time_used INTEGER DEFAULT 0,
    image text
);

-- Create champions table
CREATE TABLE champions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description text NOT NULL,
    image text
);

-- Junction tables
CREATE TABLE user_chores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    chore_id INTEGER REFERENCES chores(id),
    status VARCHAR(50) DEFAULT 'assigned',
    completed_at TIMESTAMP
);

CREATE TABLE user_weapons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    weapon_id INTEGER REFERENCES weapons(id),
    current_durability INTEGER,
    acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



```

## Future Enhancements

1. **Household Management**: Allow users to create/join households
2. **Chore Scheduling**: Recurring chores with due dates
3. **Leaderboards**: Compare points within households
4. **Weapon Trading**: Allow users to trade weapons
5. **Achievement System**: Badges for completing chore streaks
6. **Mobile App**: React Native implementation

Weapons Inserts

INSERT INTO weapons (id, name, cost, damage, durability, time_used, image) VALUES
(1, 'Wrapping Paper Tube', 5, 2, 1, 0, 'public/tube.png'),
(2, 'Giant Q-tip', 20, 4, 2, 0, 'public/qTip.png'),
(3, 'Rubber Chicken', 30, 6, 1, 0, 'public/chicken.png'),
(4, 'Silly String', 15, 3, 2, 0, 'public/sillyString.png'),
(5, 'Water Balloon', 25, 5, 1, 0, 'public/waterBalloon.png'),
(6, 'Feather Duster', 10, 2, 3, 0, 'public/featherDuster.png'),
(7, 'Bag of Leaves', 12, 1, 4, 0, 'public/bagOfLeaves.png'),
(8, 'Confetti Cannon', 40, 8, 1, 0, 'public/confettiCanon.png'),
(9, 'Feather Pillow', 8, 2, 5, 0, 'public/feather.png'),
(10, 'Pool Noodle', 6, 2, 3, 0, 'public/b7fe0154-3209-4260-8653-104d42483a35.png'),
(11, 'Giant Foam Finger', 18, 3, 2, 0, 'public/foamFinger.png'),
(12, 'Giant ToothBrush', 22, 4, 3, 0, 'public/toothbrush.png');


Champion inserts

INSERT INTO champions (name, description, image) VALUES
('Pretty Platypus', 'A charming aquatic warrior with a sleek bill and webbed feet, known for graceful underwater combat techniques.', 'cat5.png'),
('Mystery Moss', 'An enigmatic nature champion covered in ancient moss that conceals powerful earth-based magic and secrets of the forest.', 'cat5.png'),
('Bad Bat', 'A mischievous flying fighter with razor-sharp echolocation abilities and a rebellious attitude toward authority.', 'cat5.png'),
('Pretentious Paladin', 'A self-righteous holy warrior who constantly lectures opponents about honor while wielding divine magic with dramatic flair.', 'cat5.png'),
('Sleepy Sloth', 'A surprisingly effective slow-motion fighter whose deliberate movements and drowsy demeanor mask devastating delayed attacks.', 'cat5.png'),
('Goofy Golem', 'A clumsy but lovable stone construct that accidentally stumbles into victory with unpredictable rock-based abilities.', 'cat5.png'),
('Stone Serpent', 'A massive crystalline snake that burrows through solid rock and strikes with earth-shattering force from underground.', 'cat5.png'),
('Boisterous Bard', 'A loud and theatrical musician who buffs allies and confuses enemies with epic songs and dramatic performances.', 'cat5.png'),
('Very Hungry Vampling', 'A perpetually starving young vampire with an insatiable appetite for both blood and victory in battle.', 'cat5.png'),
('Nexus Phoenix', 'A legendary firebird connected to magical ley lines, capable of resurrection and wielding flames that burn across dimensions.', 'cat5.png');


Chore inserts

INSERT INTO chores (id, name, time, points) VALUES
(1, 'Wash Dishes', 15, 10),
(2, 'Vacuum Living Room', 20, 15),
(3, 'Vacuum Bedroom', 15, 10),
(4, 'Take Out Trash', 5, 5),
(5, 'Empty Recycling Bin', 5, 5),
(6, 'Wash one load of Laundry', 60, 15),
(7, 'Fold and Put Away Laundry', 15, 10),
(8, 'Clean Bathroom Sink', 5, 5),
(9, 'Clean Bathroom Toilet', 10, 10),
(10, 'Clean Bathroom Shower/Tub', 15, 15),
(11, 'Clean Bathroom Mirror', 5, 5),
(12, 'Mop Bathroom Floor', 10, 10),
(13, 'Mow the Lawn', 60, 50),
(14, 'Edge the Lawn', 20, 15),
(15, 'Organize Bookshelf', 15, 10),
(16, 'Dust Shelves', 10, 5),
(17, 'Water Indoor Plants', 5, 5),
(18, 'Water Garden/Outdoor Plants', 10, 5),
(19, 'Meal Prep - Breakfast', 20, 15),
(20, 'Meal Prep - Lunch', 25, 15),
(21, 'Meal Prep - Dinner', 30, 20),
(22, 'Wipe Kitchen Counters', 5, 5),
(23, 'Clean Refrigerator', 20, 15),
(24, 'Sweep Kitchen Floor', 10, 5),
(25, 'Mop Kitchen Floor', 15, 10),
(26, 'Clean Stovetop', 10, 10),
(27, 'Empty Dishwasher', 5, 5),
(28, 'Change Bed Sheets', 10, 10),
(29, 'Sort Mail/Papers', 10, 5),
(30, 'Clean Microwave', 5, 5);


insert Household

INSERT INTO households (household_id, name, invite_code) VALUES
(1, 'The Test Family', 'TEST123')
(2, 'The other family', 'OTHERS123');


Insert dummy users

INSERT INTO users (user_id, name, email, password, household_id, user_points, user_time, image) VALUES
(1, 'Alice', 'alice@example.com', '$2a$10$example.hash.for.password123', 1, 25, 45,),
(2, 'Bob', 'bob@example.com', '$2a$10$example.hash.for.secretpass', 1, 15, 30,),
(3, 'Charlie', 'charlie@example.com', '$2a$10$example.hash.for.mypassword', 1, 40, 60,),
(4, 'Shan', 'shan@example.com', '$2a$10$example.hash.for.wonderpass', 1, 0, 0,),
(5, 'Kolt', 'kolt@example.com', '$2a$10$example.hash.for.missionpass', 1, 0, 0,);


