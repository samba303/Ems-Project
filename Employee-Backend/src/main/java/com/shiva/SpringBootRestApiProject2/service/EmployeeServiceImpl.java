package com.shiva.SpringBootRestApiProject2.service;

import com.shiva.SpringBootRestApiProject2.Repository.EmployeeRepository;
import com.shiva.SpringBootRestApiProject2.entity.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // ================= SAVE =================
    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // ================= GET ALL =================
    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // ================= GET BY ID =================
    @Override
    public Employee getEmployeeById(Integer id) {
        Optional<Employee> emp = employeeRepository.findById(id);
        return emp.orElse(null);
    }

    // ================= UPDATE =================
    @Override
    public Employee updateEmployee(Integer id, Employee employee) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existing.setName(employee.getName());
        existing.setSal(employee.getSal());
        existing.setMob_num(employee.getMob_num());
        existing.setEmail(employee.getEmail());
        existing.setDepartment(employee.getDepartment());

        return employeeRepository.save(existing);
    }

    // ================= DELETE =================
    @Override
    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }

    // ================= PAGINATION =================
    @Override
    public Page<Employee> getEmployeesWithPagination(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page, size));
    }
}