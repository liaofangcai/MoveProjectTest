package com.zyeeda.business.experiment.entity;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 * 系统数据变更申请表
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_EX_SYS_CHANGE")
@Scaffold("/experiment/sysdatachange")
public class Sysdatachange extends RevisionDomainEntity{

	private static final long serialVersionUID = 1L;
	/*
	 *编号
	 */
	private String  sysNumber;
	/*
	 *系统名称
	 */
	private String sysNmae;
	/*
	 *申请日期
	 */
	private Date aplicationDate;
	/*
	 * 变更请求类型
	 */
	private String chReType;
	/**
	 * 请说明
	 */
	private String pleaseNote;
	/*
	 *变更申请人
	 */
	private String chApPerson;
    /**
     * 申请单位
     */
	private String apCompany;
	/**
	 *变更申请描述
	 */
	private String chApDescribe;
	/**
	 *变更的影响
	 */
	private String chInfluence;
	/**
	 * 申请部门主管的意见
	 */
	private String deptDirectorOpinion;
	/**
	 *处理人
	 */
	private String deptPerson;
	 /**
	  * 处理日期
	  */
	private Date directorDate;
	/**
	 * 项目负责人申请意见
	 */
	private String projectOpinion;
	/**
	 * 处理人
	 */
	private String projectPerson;
	/**
	 * 处理日期
	 */
	private Date projectDate;
	

	@NotBlank
	@Column(name="F_SYS_NUMBER",length=300)
	@NullableSize(max=100)
	public String getSysNumber() {
		return sysNumber;
	}
	public void setSysNumber(String sysNumber) {
		this.sysNumber = sysNumber;
	}
	
	@Column(name="F_SYS_NAME",length=300)
	@NullableSize(max=100)
	public String getSysNmae() {
		return sysNmae;
	}
	public void setSysNmae(String sysNmae) {
		this.sysNmae = sysNmae;
	}
	
	@Column(name="F_APLICATION_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getAplicationDate() {
		return aplicationDate;
	}
	public void setAplicationDate(Date aplicationDate) {
		this.aplicationDate = aplicationDate;
	}
	
	@Column(name="F_CH_RE_TYPE",length=300)
	@NullableSize(max=100)
	public String getChReType() {
		return chReType;
	}
	public void setChReType(String chReType) {
		this.chReType = chReType;
	}
	
	@Column(name="F_PLEASE_NOTE",length=300)
	@NullableSize(max=100)
	public String getPleaseNote() {
		return pleaseNote;
	}
	public void setPleaseNote(String pleaseNote) {
		this.pleaseNote = pleaseNote;
	}
	
	@Column(name="F_CH_APLICATION_PERSON",length=300)
	@NullableSize(max=100)
	public String getChApPerson() {
		return chApPerson;
	}
	public void setChApPerson(String chApPerson) {
		this.chApPerson = chApPerson;
	}
	
	@Column(name="F_CHAP_DESCTIBE",length=300)
	@NullableSize(max=100)
	public String getChApDescribe() {
		return chApDescribe;
	}
	public void setChApDescribe(String chApDescribe) {
		this.chApDescribe = chApDescribe;
	}
	
	@Column(name="F_CH_INFUENCE",length=300)
	@NullableSize(max=100)
	public String getChInfluence() {
		return chInfluence;
	}
	public void setChInfluence(String chInfluence) {
		this.chInfluence = chInfluence;
	}
	
	@Column(name="F_DEPT_DIREC",length=300)
	@NullableSize(max=100)
	public String getDeptDirectorOpinion() {
		return deptDirectorOpinion;
	}
	public void setDeptDirectorOpinion(String deptDirectorOpinion) {
		this.deptDirectorOpinion = deptDirectorOpinion;
	}
	
	@Column(name="F_DIRECTOR_DATE",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getDirectorDate() {
		return directorDate;
	}
	public void setDirectorDate(Date directorDate) {
		this.directorDate = directorDate;
	}
	
	@Column(name="F_PROJECT_OP",length=300)
	@NullableSize(max=100)
	public String getProjectOpinion() {
		return projectOpinion;
	}
	public void setProjectOpinion(String projectOpinion) {
		this.projectOpinion = projectOpinion;
	}
	
	@Column(name="F_PROJECT_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getProjectDate() {
		return projectDate;
	}
	public void setProjectDate(Date projectDate) {
		this.projectDate = projectDate;
	}
	
	@Column(name="F_AP_COMPANY",length=300)
	@NullableSize(max=100)
	public String getApCompany() {
		return apCompany;
	}
	public void setApCompany(String apCompany) {
		this.apCompany = apCompany;
	}
	
	@Column(name="F_DEPT_PERSON",length=300)
	@NullableSize(max=100)
	public String getDeptPerson() {
		return deptPerson;
	}
	public void setDeptPerson(String deptPerson) {
		this.deptPerson = deptPerson;
	}
	
	@Column(name="F_PROJECT_PERSON",length=300)
	@NullableSize(max=100)
	public String getProjectPerson() {
		return projectPerson;
	}
	public void setProjectPerson(String projectPerson) {
		this.projectPerson = projectPerson;
	}
	
}
