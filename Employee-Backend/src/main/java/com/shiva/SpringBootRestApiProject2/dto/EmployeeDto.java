package com.shiva.SpringBootRestApiProject2.dto;

public class EmployeeDto {

    private Integer id;
    private String name;
    private double sal;
    private String mob_num;

    private Integer departmentId;
    private String departmentName;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getSal() { return sal; }
    public void setSal(double sal) { this.sal = sal; }

    public String getMob_num() { return mob_num; }
    public void setMob_num(String mob_num) { this.mob_num = mob_num; }

    public Integer getDepartmentId() { return departmentId; }
    public void setDepartmentId(Integer departmentId) { this.departmentId = departmentId; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
}