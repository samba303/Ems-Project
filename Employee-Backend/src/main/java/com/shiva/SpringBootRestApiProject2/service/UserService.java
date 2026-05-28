package com.shiva.SpringBootRestApiProject2.service;

import com.shiva.SpringBootRestApiProject2.Repository.UserRepository;
import com.shiva.SpringBootRestApiProject2.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService { 

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public User saveUser(User user) {

        // 🔥 FIX ROLE PROPERLY
        String role = user.getRole();

        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role.toUpperCase();
        }

        user.setRole(role);

        // 🔥 Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repo.save(user);
    }
}