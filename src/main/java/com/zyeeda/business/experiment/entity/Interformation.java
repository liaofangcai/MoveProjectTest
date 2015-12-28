package com.zyeeda.business.experiment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;

/**
 * 信息系统账号申请实体
 */
@Entity
@Table(name="BZ_EX_INFOR_SYS")
@Scaffold("/experiment/interformation")
public class Interformation extends RevisionDomainEntity{
	
	private static final long serialVersionUID = -2707536963585536898L;
  /*
  * 信息系统编号
  */
  private String interformationSystemNum;
  /*
  姓名
  */
  private String name;
  /*
  邮箱
  */
  private String email;
  /*
  部门
   */
  private String dept;
  /*
  岗位
  */
  private String post;
  /*
  信息系统名称
  */
  private String interformationSystemName;
  /*
  用户名
  */
  private String userName;
  /*
  申请内容
  */
  private String content;
  /*
   * 描述
  */
  private String description;
  /*
   *创建日期
   */
  private Date aplicationDate;
  /*
   * 部门主管意见
   */
  private String deptOpinions;
  /**
   * 部门处理人
   */
  private String deptHandlePerson;
   /*
   * 部门日期
   */
  private Date deptDate;
  /*
   * 管理员审核
   */
  private String administratoraudit;
  /**
   * 处理人
   */
  private String  adminHandlePerson;
  /*
   * 管理员审核日期
   */
  private Date administratorauditDate;
  /*
   * 处理结果
   */
  private String rocessingResults;
  /**
   * 处理人
   */
  private String handlePserson;
  /*
   * 处理日期
   */
  private Date rocessingResultsDate;

  @NotBlank
  @Column(name="F_INFOR_SYS_NAME",length=300)
  @NullableSize(max=100)
  public String getInterformationSystemNum() {
	return interformationSystemNum;
  }
  public void setInterformationSystemNum(String interformationSystemNum) {
	this.interformationSystemNum = interformationSystemNum;
  }
  @NotBlank
  @Column(name="F_NAME",length=300)
  @NullableSize(max=100)
  public String getName() {
  	return name;
  }
 public void setName(String name) {
  	this.name = name;
  }

  @Column(name="F_EMAIL",length=300)
  @Email
  public String getEmail() {
  	return email;
  }
  public void setEmail(String email) {
  	this.email = email;
  }

  @Column(name="F_DEPT",length=300)
  @NullableSize(max=100)
  public String getDept() {
  	return dept;
  }
  public void setDept(String dept) {
  	this.dept = dept;
  }

  @Column(name="F_POST",length=300)
  @NullableSize(max=100)
  public String getPost() {
  	return post;
  }
  public void setPost(String post) {
  	this.post = post;
  }

  @Column(name="F_INFOR_NAME",length=300)
  @NullableSize(max=100)
  public String getInterformationSystemName() {
  	return interformationSystemName;
  }
  public void setInterformationSystemName(String interformationSystemName) {
  	this.interformationSystemName = interformationSystemName;
  }

  @Column(name="F_USERNAME",length=300)
  @NullableSize(max=100)
  public String getUserName() {
	return userName;
  }
  public void setUserName(String userName) {
	this.userName = userName;
  }

  @Column(name="F_CONTENT",length=300)
  @NullableSize(max=100)
  public String getContent() {
  	return content;
  }
  public void setContent(String content) {
  	this.content = content;
  }

  @Column(name="D_DESCRIPTION",length=2000)
  @NullableSize(max=666)
  public String getDescription() {
  	return description;
  }
  public void setDescription(String description) {
  	this.description = description;
  }

  @Column(name="F_APLICATION_DATE")
  @JsonFormat(pattern = "yyyy-MM-dd ")
  public Date getAplicationDate() {
  	return aplicationDate;
  }
  public void setAplicationDate(Date aplicationDate) {
  	this.aplicationDate = aplicationDate;
  }

  @Column(name="F_DEPT_OPINIONS",length=2000)
  @NullableSize(max=666)
  public String getDeptOpinions() {
  	return deptOpinions;
  }
  public void setDeptOpinions(String deptOpinions) {
  	this.deptOpinions = deptOpinions;
  }

  @Column(name="F_DEPT_DATE")
  @JsonFormat(pattern = "yyyy-MM-dd")
  public Date getDeptDate() {
  	return deptDate;
  }
  public void setDeptDate(Date deptDate) {
  	this.deptDate = deptDate;
  }
  
  @Column(name="F_ADMINISTRA",length=2000)
  @NullableSize(max=666)
  public String getAdministratoraudit() {
  	return administratoraudit;
  }
  public void setAdministratoraudit(String administratoraudit) {
  	this.administratoraudit = administratoraudit;
  }
  
  @Column(name="F_ADMIN_DATE")
  @JsonFormat(pattern="yyyy-MM-dd")
  public Date getAdministratorauditDate() {
  	return administratorauditDate;
  }
  public void setAdministratorauditDate(Date administratorauditDate) {
  	this.administratorauditDate = administratorauditDate;
  }
  
  @Column(name="F_ROC_RESULT",length=2000)
  @NullableSize(max=666)
  public String getRocessingResults() {
  	return rocessingResults;
  }
  public void setRocessingResults(String rocessingResults) {
  	this.rocessingResults = rocessingResults;
  }
  
  
  @Column(name="F_ROC_Date")
  @JsonFormat(pattern = "yyyy-MM-dd")
  public Date getRocessingResultsDate() {
  	return rocessingResultsDate;
  }
  public void setRocessingResultsDate(Date rocessingResultsDate) {
  	this.rocessingResultsDate = rocessingResultsDate;
  }
  
  @Column(name="F_HAND_PERSON",length=300)
  @NullableSize(max=100)
  public String getDeptHandlePerson() {
		return deptHandlePerson;
  }
  public void setDeptHandlePerson(String deptHandlePerson) {
		this.deptHandlePerson = deptHandlePerson;
  }
  
  @Column(name="F_ANDMIN_HANDLE",length=300)
  @NullableSize(max=100)
  public String getAdminHandlePerson() {
		return adminHandlePerson;
  }
  public void setAdminHandlePerson(String adminHandlePerson) {
		this.adminHandlePerson = adminHandlePerson;
  }
  
  @Column(name="F_PERSON",length=300)
  @NullableSize(max=100)
  public String getHandlePserson() {
		return handlePserson;
  }
  public void setHandlePserson(String handlePserson) {
		this.handlePserson = handlePserson;
  }
}