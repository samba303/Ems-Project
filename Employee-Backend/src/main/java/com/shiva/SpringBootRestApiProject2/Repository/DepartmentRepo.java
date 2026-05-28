package com.shiva.SpringBootRestApiProject2.Repository;

import com.shiva.SpringBootRestApiProject2.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepo extends JpaRepository<Department, Integer> {
}