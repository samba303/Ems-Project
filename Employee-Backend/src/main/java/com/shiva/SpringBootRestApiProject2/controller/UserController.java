package com.shiva.SpringBootRestApiProject2.controller;

import com.shiva.SpringBootRestApiProject2.entity.User;
import com.shiva.SpringBootRestApiProject2.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

	    @Autowired
	    private UserService service;

	    @PostMapping("/register")
	    public User registerUser(@RequestBody User user) {

	        return service.saveUser(user);
	    }
	}

