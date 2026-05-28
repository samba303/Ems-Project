package com.shiva.SpringBootRestApiProject2.entity;

import jakarta.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String dept;
    private String name;
    private double sal;
    private String mob_num;
    private String email;
     
  

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    
    
    public Employee() {
    }
    

	public Employee(Integer id, String dept, String name, double sal, String mob_num, String email,
			Department department) {
		super();
		this.id = id;
		this.dept = dept;
		this.name = name;
		this.sal = sal;
		this.mob_num = mob_num;
		this.email = email;
		this.department = department;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getDept() {
		return dept;
	}


	public void setDept(String dept) {
		this.dept = dept;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public double getSal() {
		return sal;
	}


	public void setSal(double sal) {
		this.sal = sal;
	}


	public String getMob_num() {
		return mob_num;
	}


	public void setMob_num(String mob_num) {
		this.mob_num = mob_num;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Department getDepartment() {
		return department;
	}


	public void setDepartment(Department department) {
		this.department = department;
	}


	@Override
	public String toString() {
		return "Employee [id=" + id + ", dept=" + dept + ", name=" + name + ", sal=" + sal + ", mob_num=" + mob_num
				+ ", email=" + email + ", department=" + department + "]";
	}



	
}