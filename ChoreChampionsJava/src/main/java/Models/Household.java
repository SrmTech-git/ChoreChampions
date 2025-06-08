package Models;
import java.time.LocalDateTime;

public class Household {

    private Long householdId;
    private String name;
    private LocalDateTime createdAt;
    private String inviteCode;

    // Default constructor
    public Household() {
        this.createdAt = LocalDateTime.now();
    }

    // Constructor with required fields
    public Household(String name) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
    }

    // Constructor with all fields except householdId
    public Household(String name, String inviteCode) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
        this.inviteCode = inviteCode;
    }

    // Getters and Setters
    public Long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    // Helper method to check if household has an invite code
    public boolean hasInviteCode() {
        return inviteCode != null && !inviteCode.trim().isEmpty();
    }

    @Override
    public String toString() {
        return "Household{" +
                "householdId=" + householdId +
                ", name='" + name + '\'' +
                ", createdAt=" + createdAt +
                ", inviteCode='" + inviteCode + '\'' +
                '}';
    }
}