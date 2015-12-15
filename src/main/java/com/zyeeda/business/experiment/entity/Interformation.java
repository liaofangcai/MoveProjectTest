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
@Table(name="bz_interformation_system")
@Scaffold("/experiment/interformation")
public class Interformation extends RevisionDomainEntity{
  /**
	 * 
	 */
	private static final long serialVersionUID = -2707536963585536898L;
/*
  * 信息系统编号
  */
  private String interformationSystemNo;
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
  private String username;
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
   /*
   * 部门日期
   */
  private Date deptDate;
  /*
   * 管理员审核
   */
  private String administratoraudit;
  /*
   * 管理员审核日期
   */
  private String administratorauditDate;
  /*
   * 处理结果
   */
  private String rocessingResults;
  /*
   * 处理日期
   */
  private Date rocessingResultsDate;

  @NotBlank
  @Column(name="interformation_system",length=300)
  @NullableSize(max=166)
  public String getInterformationSystemNo() {
  	return interformationSystemNo;
  }
  public void setInterformationSystemNo(String interformationSystemNo) {
  	this.interformationSystemNo = interformationSystemNo;
  }

  @NotBlank
  @Column(name="name",length=300)
  @NullableSize(max=166)
  public String getName() {
  	return name;
  }
  public void setName(String name) {
  	this.name = name;
  }

  @Column(name="email",length=300)
  @Email
  public String getEmail() {
  	return email;
  }
  public void setEmail(String email) {
  	this.email = email;
  }

  @Column(name="dept",length=300)
  @NullableSize(max=166)
  public String getDept() {
  	return dept;
  }
  public void setDept(String dept) {
  	this.dept = dept;
  }

  @Column(name="post",length=300)
  @NullableSize(max=166)
  public String getPost() {
  	return post;
  }
  public void setPost(String post) {
  	this.post = post;
  }

  @Column(name="interformationSystemname",length=300)
  @NullableSize(max=166)
  public String getInterformationSystemName() {
  	return interformationSystemName;
  }
  public void setInterformationSystemName(String interformationSystemName) {
  	this.interformationSystemName = interformationSystemName;
  }

  @Column(name="username",length=300)
  @NullableSize(max=166)
  public String getUsername() {
  	return username;
  }
  public void setUsername(String username) {
  	this.username = username;
  }

  @Column(name="content",length=300)
  @NullableSize(max=166)
  public String getContent() {
  	return content;
  }
  public void setContent(String content) {
  	this.content = content;
  }

  @Column(name="description",length=300)
  @NullableSize(max=1333)
  public String getDescription() {
  	return description;
  }
  public void setDescription(String description) {
  	this.description = description;
  }

  @Column(name="aplicationdate",length=300)
  @JsonFormat(pattern = "yyyy-MM-dd ")
  @NullableSize(max=166)
  public Date getAplicationDate() {
  	return aplicationDate;
  }
  public void setAplicationDate(Date aplicationDate) {
  	this.aplicationDate = aplicationDate;
  }

  @Column(name="deptopinions",length=300)
  @NullableSize(max=1333)
  public String getDeptOpinions() {
  	return deptOpinions;
  }
  public void setDeptOpinions(String deptOpinions) {
  	this.deptOpinions = deptOpinions;
  }

  @Column(name="deptdate",length=300)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  @NullableSize(max=166)
  public Date getDeptDate() {
  	return deptDate;
  }
  public void setDeptDate(Date deptDate) {
  	this.deptDate = deptDate;
  }
  @Column(name="administratoraudit",length=300)
  @NullableSize(max=1333)
  public String getAdministratoraudit() {
  	return administratoraudit;
  }
  public void setAdministratoraudit(String administratoraudit) {
  	this.administratoraudit = administratoraudit;
  }
  @Column(name="administratorauditDate",length=300)
  @NullableSize(max=166)
  public String getAdministratorauditDate() {
  	return administratorauditDate;
  }
  public void setAdministratorauditDate(String administratorauditDate) {
  	this.administratorauditDate = administratorauditDate;
  }
  @Column(name="rocessingResults",length=300)
  @NullableSize(max=1333)
  public String getRocessingResults() {
  	return rocessingResults;
  }
  public void setRocessingResults(String rocessingResults) {
  	this.rocessingResults = rocessingResults;
  }
  @Column(name="rocessingResultsDate",length=300)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  @NullableSize(max=166)
  public Date getRocessingResultsDate() {
  	return rocessingResultsDate;
  }
  public void setRocessingResultsDate(Date rocessingResultsDate) {
  	this.rocessingResultsDate = rocessingResultsDate;
  }
}