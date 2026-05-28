package com.shiva.SpringBootRestApiProject2.controller;

import com.shiva.SpringBootRestApiProject2.Repository.DepartmentRepo;
import com.shiva.SpringBootRestApiProject2.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    @Autowired
    private DepartmentRepo repo;

    @PostMapping("/add")
    public Department add(@RequestBody Department dept) {
        return repo.save(dept);
    }

    @GetMapping("/all")
    public List<Department> all() {
        return repo.findAll();
    }

    @GetMapping("/count")
    public long count() {
        return repo.count();
    }
}