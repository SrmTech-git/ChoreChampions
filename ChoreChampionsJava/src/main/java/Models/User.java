package Models;

public class User {

    private Long userId;
    private String name;
    private String email;
    private String password;
    private Long householdId;
    private Integer userPoints;
    private Integer userTime;
    private String image;

    // Default constructor
    public User() {
        this.userPoints = 0;
        this.userTime = 0;
    }

    // Constructor with required fields
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userPoints = 0;
        this.userTime = 0;
    }

    // Constructor with household
    public User(String name, String email, String password, Long householdId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.householdId = householdId;
        this.userPoints = 0;
        this.userTime = 0;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }

    public Integer getUserPoints() {
        return userPoints;
    }

    public void setUserPoints(Integer userPoints) {
        this.userPoints = userPoints;
    }

    public Integer getUserTime() {
        return userTime;
    }

    public void setUserTime(Integer userTime) {
        this.userTime = userTime;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Helper methods
    public boolean hasImage() {
        return image != null && !image.trim().isEmpty();
    }

    public boolean isInHousehold() {
        return householdId != null;
    }

    public void addPoints(Integer points) {
        if (points != null && points > 0) {
            this.userPoints += points;
        }
    }

    public void addTime(Integer time) {
        if (time != null && time > 0) {
            this.userTime += time;
        }
    }

    public Double getAveragePointsPerTime() {
        if (userTime == null || userTime == 0) {
            return 0.0;
        }
        return (double) userPoints / userTime;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", householdId=" + householdId +
                ", userPoints=" + userPoints +
                ", userTime=" + userTime +
                ", image='" + image + '\'' +
                '}';
    }
}
