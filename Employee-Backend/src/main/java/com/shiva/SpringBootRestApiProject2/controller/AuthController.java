package com.shiva.SpringBootRestApiProject2.controller;

import com.shiva.SpringBootRestApiProject2.dto.LoginRequest;
import com.shiva.SpringBootRestApiProject2.entity.User;
import com.shiva.SpringBootRestApiProject2.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shiva.SpringBootRestApiProject2.Repository.UserRepository;
import com.shiva.SpringBootRestApiProject2.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	@Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        authService.register(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    
    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestParam String username,
            @RequestParam String newPassword
    ) {

        Optional<User> optionalUser =
                userRepo.findByUsername(username);

        if(optionalUser.isEmpty()){
            return "User Not Found";
        }

        User user = optionalUser.get();

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepo.save(user);

        return "Password Updated";
    }
}