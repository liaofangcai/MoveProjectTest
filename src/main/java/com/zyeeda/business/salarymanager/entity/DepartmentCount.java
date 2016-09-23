package com.zyeeda.business.salarymanager.entity;

import java.util.List;
import java.util.Date;

import com.zyeeda.business.employee.entity.EmployeeInfo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
import com.zyeeda.cdeio.commons.resource.entity.Attachment;

@Entity
@Table(name = "bz_dep_count")
@Scaffold("/salarymanager/department-count")
public class DepartmentCount extends RevisionDomainEntity{
	/*
	 * 部门名称
	 */
	private Department depName ; 
	/*
	 *员工部门Path
	 */
	private String departmentPath;
	/*
	 * 年月
	 */
	private Date mounth ;
	/*
	 * 人数
	 */
	private int memberCount ;
	/*
	 * 应付工资
	 */
	private double shouldSalary ;
	/*
	 * 社保（个人）
	 */
	private double insuranceEmp ; 
	/*
	 * 社保（公司）
	 */
	private double insuranceCom ;
	/*
	 * 公积金（个人）
	 */
	private double accumulationFundEmp ;
	/*
	 * 公积金（公司）
	 */
	private double accumulationFundCom ;
	/*
	 * 个人所得税
	 */
	private double tax ;
	/*
	 * 实发工资
	 */
	private double realitySalary ;
	
	@JoinColumn(name = "f_dep_name")
	@NotNull
	@ManyToOne
	public Department getDepName() {
		return depName;
	}
	public void setDepName(Department depName) {
		this.depName = depName;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "f_mounth")
	@NotNull
	public Date getMounth() {
		return mounth;
	}
	public void setMounth(Date mounth) {
		this.mounth = mounth;
	}

	@Column(name = "f_member_count")
	public int getMemberCount() {
		return memberCount;
	}
	public void setMemberCount(int memberCount) {
		this.memberCount = memberCount;
	}

	@Column(name = "f_shouldsalary")
	public double getShouldSalary() {
		return shouldSalary;
	}
	public void setShouldSalary(double shouldSalary) {
		this.shouldSalary = shouldSalary;
	}

	@Column(name = "f_emp_insurance")
	public double getInsuranceEmp() {
		return insuranceEmp;
	}
	public void setInsuranceEmp(double insuranceEmp) {
		this.insuranceEmp = insuranceEmp;
	}

	@Column(name = "f_com_insurance")
	public double getInsuranceCom() {
		return insuranceCom;
	}
	public void setInsuranceCom(double insuranceCom) {
		this.insuranceCom = insuranceCom;
	}

	@Column(name = "f_emp_fund")
	public double getAccumulationFundEmp() {
		return accumulationFundEmp;
	}
	public void setAccumulationFundEmp(double accumulationFundEmp) {
		this.accumulationFundEmp = accumulationFundEmp;
	}

	@Column(name = "f_com_fund")
	public double getAccumulationFundCom() {
		return accumulationFundCom;
	}
	public void setAccumulationFundCom(double accumulationFundCom) {
		this.accumulationFundCom = accumulationFundCom;
	}

	@Column(name = "f_tax")
	public double getTax() {
		return tax;
	}
	public void setTax(double tax) {
		this.tax = tax;
	}

	@Column(name = "f_realitysalary")
	public double getRealitySalary() {
		return realitySalary;
	}
	public void setRealitySalary(double realitySalary) {
		this.realitySalary = realitySalary;
	}
	
	@Column(name = "f_dep_path")
	public String getDepartmentPath() {
		return departmentPath;
	}
	public void setDepartmentPath(String departmentPath) {
		this.departmentPath = departmentPath;
	}
}