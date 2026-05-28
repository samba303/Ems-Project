package com.shiva.SpringBootRestApiProject2.service;

import com.shiva.SpringBootRestApiProject2.entity.Employee;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Integer id);

    Employee updateEmployee(Integer id, Employee employee);

    void deleteEmployee(Integer id);

    // ✅ PAGINATION METHOD (IMPORTANT)
    Page<Employee> getEmployeesWithPagination(int page, int size);
}