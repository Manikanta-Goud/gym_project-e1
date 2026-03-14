package com.gym.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String name;
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String email;
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String role;
    @jakarta.persistence.Column(name = "fitness_goal", columnDefinition = "TEXT")
    private String fitnessGoal;
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String experience;
    
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String username;
    private Integer age;
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String bio;
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String timing;

    @jakarta.persistence.Column(name = "home_gym", columnDefinition = "TEXT")
    private String homeGym;

    @jakarta.persistence.Column(name = "photo_url", columnDefinition = "TEXT")
    private String photoUrl;

    @jakarta.persistence.Column(name = "weekly_schedule", columnDefinition = "TEXT")
    private String weeklySchedule;
    
    @jakarta.persistence.Column(name = "partners_count")
    private Integer partnersCount = 0;

    private Integer streak = 0;
    @jakarta.persistence.Column(columnDefinition = "TEXT")
    private String prs;
    
    @jakarta.persistence.Column(name = "last_login")
    private LocalDateTime lastLogin;
}
