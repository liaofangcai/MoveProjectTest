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
@Table(name = "bz_salary_info")
@Scaffold("/salarymanager/salary-info")
public class SalaryInfo extends RevisionDomainEntity{
	/**
   * 序列化
   */
  	private static final long serialVersionUID = 3790277543938624745L;
	/*
	 * 月份
	 */
	private Date mounth ;
	/*
	 * 工资总额
	 */
	private Double salaryTotal ;
	/*
	 * 应出勤天数
	 */
	private Double shouldWorks ;
	/*
	 * 实际出勤天数
	 */
	private Double realityWorks ;
	/*
	 * 应付工资
	 */
	private Double shouldSalary ;
	/*
	 * 社保 （个人缴纳）
	 */
	private Double insuranceEmp ; 
	/*
	 * 公积金 （个人缴纳）
	 */
	private Double accumulationFundEmp ; 
	/*
	 * 实发工资
	 */
	private Double realitySalary ;
	/*
	 * 基本工资
	 */
	private Double basicSalary ; 
	/*
	 * 级别工资
	 */
	private Double levelSalary ;
	/*
	 * 岗位工资
	 */
	private Double postSalary ;
	/*
	 * 管理工资
	 */
	private Double managerSalary ;
	/*
	 * 考勤工资
	 */
	private Double attendeSalary;
	/*
	 * 绩效系数
	 */
	private Double gradeLevel ; 
	/*
	 * 绩效奖
	 */
	private Double gradeReward ;
	/*
	 * 绩效工资
	 */
	private Double gradeSalary;
	/*
	 *补助
	 */
	private Double allowance ;
	/*
	 *其他
	 */
	private Double other ; 
	/*
	 *社保 （公式缴费）
	 */
	private Double insuranceCom;
	/*
	 *公积金 （公司缴费）
	 */
	private Double accumulationFundCom;
	/*
	 *个人所得税
	 */
	private Double tax ;
	/*
	 *备注
	 */
	private String remark ;
	/*
	 *员工信息
	 */
	private EmployeeInfo employeeInfo ;

	@Temporal(TemporalType.DATE)
	@Column(name = "f_mounth")
	@NotNull
	public Date getMounth() {
		return mounth;
	}
	public void setMounth(Date mounth) {
		this.mounth = mounth;
	}

	@Column(name = "f_salary_total")
	public Double getSalaryTotal() {
		return salaryTotal;
	}
	public void setSalaryTotal(Double salaryTotal) {
		this.salaryTotal = salaryTotal;
	}

	@Column(name = "f_shouldworks")
	@NotNull
	public Double getShouldWorks() {
		return shouldWorks;
	}
	public void setShouldWorks(Double shouldWorks) {
		this.shouldWorks = shouldWorks;
	}

	@Column(name = "f_realityworks")
	@NotNull
	public Double getRealityWorks() {
		return realityWorks;
	}
	public void setRealityWorks(Double realityWorks) {
		this.realityWorks = realityWorks;
	}

	@Column(name = "f_shouldsalary")
	public Double getShouldSalary() {
		return shouldSalary;
	}
	public void setShouldSalary(Double shouldSalary) {
		this.shouldSalary = shouldSalary;
	}

	@Column(name = "f_emp_insurance")
	@NotNull
	public Double getInsuranceEmp() {
		return insuranceEmp;
	}
	public void setInsuranceEmp(Double insuranceEmp) {
		this.insuranceEmp = insuranceEmp;
	}

	@Column(name = "f_emp_fund")
	@NotNull
	public Double getAccumulationFundEmp() {
		return accumulationFundEmp;
	}
	public void setAccumulationFundEmp(Double accumulationFundEmp) {
		this.accumulationFundEmp = accumulationFundEmp;
	}

	@Column(name = "f_realitysalary")
	public Double getRealitySalary() {
		return realitySalary;
	}
	public void setRealitySalary(Double realitySalary) {
		this.realitySalary = realitySalary;
	} 

	@Column(name = "f_basicsalary")
	@NotNull
	public Double getBasicSalary() {
		return basicSalary;
	}
	public void setBasicSalary(Double basicSalary) {
		this.basicSalary = basicSalary;
	}

	@Column(name = "f_levelsalary")
	@NotNull
	public Double getLevelSalary() {
		return levelSalary;
	}
	public void setLevelSalary(Double levelSalary) {
		this.levelSalary = levelSalary;
	}

	@Column(name = "f_postsalary")
	@NotNull
	public Double getPostSalary() {
		return postSalary;
	}
	public void setPostSalary(Double postSalary) {
		this.postSalary = postSalary;
	}

	@Column(name = "f_managersalary")
	@NotNull
	public Double getManagerSalary() {
		return managerSalary;
	}
	public void setManagerSalary(Double managerSalary) {
		this.managerSalary = managerSalary;
	}

	@Column(name = "f_attendesalary")
	public Double getAttendeSalary() {
		return attendeSalary;
	}
	public void setAttendeSalary(Double attendeSalary) {
		this.attendeSalary = attendeSalary;
	}

	@Column(name = "f_gradelevel")
	@NotNull
	public Double getGradeLevel() {
		return gradeLevel;
	}
	public void setGradeLevel(Double gradeLevel) {
		this.gradeLevel = gradeLevel;
	}

	@Column(name = "f_gradereward")
	public Double getGradeReward() {
		return gradeReward;
	}
	public void setGradeReward(Double gradeReward) {
		this.gradeReward = gradeReward;
	}

	@Column(name = "f_gradesalary")
	public Double getGradeSalary() {
		return gradeSalary;
	}
	public void setGradeSalary(Double gradeSalary) {
		this.gradeSalary = gradeSalary;
	}

	@Column(name = "f_allowance")
	@NotNull
	public Double getAllowance() {
		return allowance;
	}
	public void setAllowance(Double allowance) {
		this.allowance = allowance;
	}

	@Column(name = "f_other")
	public Double getOther() {
		return other;
	}
	public void setOther(Double other) {
		this.other = other;
	}

	@Column(name = "f_com_insurance")
	@NotNull
	public Double getInsuranceCom() {
		return insuranceCom;
	}
	public void setInsuranceCom(Double insuranceCom) {
		this.insuranceCom = insuranceCom;
	}

	@Column(name = "f_com_fund")
	@NotNull
	public Double getAccumulationFundCom() {
		return accumulationFundCom;
	}
	public void setAccumulationFundCom(Double accumulationFundCom) {
		this.accumulationFundCom = accumulationFundCom;
	}

	@Column(name = "f_tax")
	@NotNull
	public Double getTax() {
		return tax;
	}
	public void setTax(Double tax) {
		this.tax = tax;
	}

	@Column(name = "f_remark")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@JoinColumn(name = "f_emp_info")
	@NotNull
	@ManyToOne
	public EmployeeInfo getEmployeeInfo() {
		return employeeInfo;
	}
	public void setEmployeeInfo(EmployeeInfo employeeInfo) {
		this.employeeInfo = employeeInfo;
	} 
}
