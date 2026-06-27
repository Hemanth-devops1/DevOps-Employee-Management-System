package com.devops.employeebackend.service;

import com.devops.employeebackend.entity.Employee;
import com.devops.employeebackend.exception.ResourceNotFoundException;
import com.devops.employeebackend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee getEmployeeById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee Not Found"));

    }

    public Employee addEmployee(Employee employee) {

        return repository.save(employee);

    }

    public Employee updateEmployee(Long id, Employee employee) {

        Employee existing = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee Not Found"));

        existing.setName(employee.getName());
        existing.setEmail(employee.getEmail());
        existing.setDepartment(employee.getDepartment());
        existing.setSalary(employee.getSalary());

        return repository.save(existing);

    }

    public String deleteEmployee(Long id) {

        Employee employee = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee Not Found"));

        repository.delete(employee);

        return "Employee Deleted Successfully";

    }

}