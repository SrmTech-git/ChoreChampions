function DisplayUser({ user }) {
  return (
    <div className="DisplayUserCard">
      <img
        className="user-image"
        src={user?.image}
        alt="User Profile"
        
      />
      <div className="user-details">
        <span >{user?.name}</span>
      </div>
    </div>
  );
}

export default DisplayUser;