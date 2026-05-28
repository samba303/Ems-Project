package com.shiva.SpringBootRestApiProject2.service;

import com.shiva.SpringBootRestApiProject2.dto.LoginRequest;
import com.shiva.SpringBootRestApiProject2.entity.User;
import com.shiva.SpringBootRestApiProject2.Repository.UserRepository;
import com.shiva.SpringBootRestApiProject2.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

	  
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // REGISTER
    @Override
    public void register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // default role if not given
        if (user.getRole() == null) {
            user.setRole("USER");
        }

        userRepository.save(user);
    }

    // LOGIN
    @Override
    public String login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getUsername(), user.getRole());
    }
}