package com.shiva.SpringBootRestApiProject2.controller;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shiva.SpringBootRestApiProject2.Repository.EmployeeRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepo;

    // TOTAL EMPLOYEES
    @GetMapping("/employee-count")
    public long employeeCount() {

        return employeeRepo.count();
    }

    // ANALYTICS
    @GetMapping("/dept-count")
    public Map<String, Long> getDeptCount() {

        return employeeRepo.findAll()
                .stream()
                .filter(e -> e.getDepartment() != null)
                .collect(Collectors.groupingBy(
                        e -> e.getDepartment().getName(),
                        Collectors.counting()
                ));
    }
}