package com.shiva.SpringBootRestApiProject2.Repository;

import com.shiva.SpringBootRestApiProject2.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}