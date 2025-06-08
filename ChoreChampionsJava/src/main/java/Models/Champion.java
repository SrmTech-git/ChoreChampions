package Models;

public class Champion {

    private Long id;
    private String name;
    private String description;
    private String image;

    // Default constructor
    public Champion() {}

    // Constructor with required fields
    public Champion(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Constructor with all fields except id
    public Champion(String name, String description, String image) {
        this.name = name;
        this.description = description;
        this.image = image;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // Helper method to check if champion has an image
    public boolean hasImage() {
        return image != null && !image.trim().isEmpty();
    }

    @Override
    public String toString() {
        return "Champion{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

}
