package Models;

public class Chore {

    private Long id;
    private String name;
    private Integer time;
    private Integer points;

    // Default constructor
    public Chore() {}

    // Constructor with required fields
    public Chore(String name, Integer time, Integer points) {
        this.name = name;
        this.time = time;
        this.points = points;
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

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", time=" + time +
                ", points=" + points +
                '}';
    }

}
