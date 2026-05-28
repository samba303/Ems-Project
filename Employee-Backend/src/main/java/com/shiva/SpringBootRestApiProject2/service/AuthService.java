package com.shiva.SpringBootRestApiProject2.service;

import com.shiva.SpringBootRestApiProject2.dto.LoginRequest;
import com.shiva.SpringBootRestApiProject2.entity.User;

public interface AuthService {

    void register(User user);

    String login(LoginRequest request);
}