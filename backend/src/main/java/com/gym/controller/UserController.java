package com.gym.controller;

import com.gym.model.User;
import com.gym.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/email/{email}")
    public org.springframework.http.ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .map(org.springframework.http.ResponseEntity::ok)
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public org.springframework.http.ResponseEntity<User> getUserById(@PathVariable java.util.UUID id) {
        return userRepository.findById(id)
                .map(org.springframework.http.ResponseEntity::ok)
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }

    @PostMapping("/login-or-register")
    public User loginOrRegister(@RequestBody User requestUser) {
        User user = userRepository.findByEmail(requestUser.getEmail())
                                  .orElse(new User());
        
        user.setEmail(requestUser.getEmail());
        if (requestUser.getName() != null) user.setName(requestUser.getName());
        if (requestUser.getRole() != null) user.setRole(requestUser.getRole());
        if (requestUser.getFitnessGoal() != null) user.setFitnessGoal(requestUser.getFitnessGoal());
        if (requestUser.getExperience() != null) user.setExperience(requestUser.getExperience());
        
        if (requestUser.getUsername() != null) user.setUsername(requestUser.getUsername());
        if (requestUser.getAge() != null) user.setAge(requestUser.getAge());
        if (requestUser.getBio() != null) user.setBio(requestUser.getBio());
        if (requestUser.getTiming() != null) user.setTiming(requestUser.getTiming());
        
        user.setLastLogin(LocalDateTime.now());
        
        return userRepository.save(user);
    }
    @PutMapping("/{id}")
    public org.springframework.http.ResponseEntity<?> updateUser(@PathVariable java.util.UUID id, @RequestBody User updatedUser) {
        try {
            return userRepository.findById(id).map(user -> {
                if (updatedUser.getName() != null) user.setName(updatedUser.getName());
                if (updatedUser.getUsername() != null) user.setUsername(updatedUser.getUsername());
                if (updatedUser.getBio() != null) user.setBio(updatedUser.getBio());
                if (updatedUser.getAge() != null) user.setAge(updatedUser.getAge());
                if (updatedUser.getFitnessGoal() != null) user.setFitnessGoal(updatedUser.getFitnessGoal());
                if (updatedUser.getExperience() != null) user.setExperience(updatedUser.getExperience());
                if (updatedUser.getTiming() != null) user.setTiming(updatedUser.getTiming());
                if (updatedUser.getHomeGym() != null) user.setHomeGym(updatedUser.getHomeGym());
                if (updatedUser.getPhotoUrl() != null) user.setPhotoUrl(updatedUser.getPhotoUrl());
                if (updatedUser.getWeeklySchedule() != null) user.setWeeklySchedule(updatedUser.getWeeklySchedule());
                if (updatedUser.getPrs() != null) user.setPrs(updatedUser.getPrs());
                
                return org.springframework.http.ResponseEntity.ok(userRepository.save(user));
            }).orElse(org.springframework.http.ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return org.springframework.http.ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
