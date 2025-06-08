package Models;

public class Weapon {

    private Long id;
    private String name;
    private Integer cost;
    private Integer damage;
    private Integer durability;
    private Integer durabilityUsed;
    private String image;

    // Default constructor
    public Weapon() {
        this.durabilityUsed = 0;
    }

    // Constructor with required fields
    public Weapon(String name, Integer cost, Integer damage, Integer durability) {
        this.name = name;
        this.cost = cost;
        this.damage = damage;
        this.durability = durability;
        this.durabilityUsed = 0;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getDamage() {
        return damage;
    }

    public void setDamage(Integer damage) {
        this.damage = damage;
    }

    public Integer getDurability() {
        return durability;
    }

    public void setDurability(Integer durability) {
        this.durability = durability;
    }

    public Integer getDurabilityUsed() {
        return durabilityUsed;
    }

    public void setDurabilityUsed(Integer durabilityUsed) {
        this.durabilityUsed = durabilityUsed;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getRemainingDurability() {
        return durability - durabilityUsed;
    }

    public boolean isBroken() {
        return durabilityUsed >= durability;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost=" + cost +
                ", damage=" + damage +
                ", durability=" + durability +
                ", durabilityUsed=" + durabilityUsed +
                ", image='" + image + '\'' +
                '}';
    }


}
