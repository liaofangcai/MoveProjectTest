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
 * @author child
 *
 */
@Entity
@Table(name="bz_sysdata_change")
@Scaffold("/experiment/sysdatachange")
public class Sysdatachange extends RevisionDomainEntity{

	private static final long serialVersionUID = 1L;
	/*
	 *编号
	 */
	private String  sys_no;
	/*
	 *系统名称
	 */
	private String sys_name;
	/*
	 *申请日期
	 */
	private Date aplicationdate;
	/*
	 * 变更请求类型
	 */
	private String ch_re_type;
	/**
	 * 请说明
	 */
	private String pleasenote;
	/*
	 *变更申请人
	 */
	private String ch_ap_person;
    /**
     * 申请单位
     */
	private Date ap_company;
	/**
	 *变更申请描述
	 */
	private String ch_ap_describe;
	/**
	 *变更的影响
	 */
	private String ch_influence;
	/**
	 * 申请部门主管的意见
	 */
	private String dept_director_opinion;
	 /**
	  * 申请部门主管的日期
	  */
	private Date director_date;
	/**
	 * 项目负责人申请意见
	 */
	private String project_opinion;
	/**
	 * 项目负责人申请日期
	 */
	private Date project_date;

	@NotBlank
	@Column(name="sys_no",length=300)
	@NullableSize(max=166)
	public String getSys_no() {
		return sys_no;
	}
	public void setSys_no(String sys_no) {
		this.sys_no = sys_no;
	}

	@Column(name="application_date",length=300)
	@JsonFormat(pattern = "yyyy-MM-dd ")
	@NullableSize(max=166)
	public Date getAplicationdate() {
		return aplicationdate;
	}
	@NotBlank
	@Column(name="sys_name",length=300)
	@NullableSize(max=166)
	public String getSys_name() {
		return sys_name;
	}
	public void setSys_name(String sys_name) {
		this.sys_name = sys_name;
	}
	public void setAplicationdate(Date aplicationdate) {
		this.aplicationdate = aplicationdate;
	}

	@Column(name="ch_re_type",length=300)
	@NullableSize(max=166)
	public String getCh_re_type() {
		return ch_re_type;
	}
	public void setCh_re_type(String ch_re_type) {
		this.ch_re_type = ch_re_type;
	}

	@Column(name="ch_ap_person",length=300)
	@NullableSize(max=166)
	public String getCh_ap_person() {
		return ch_ap_person;
	}
	public void setCh_ap_person(String ch_ap_person) {
		this.ch_ap_person = ch_ap_person;
	}

	@Column(name="ap_company",length=300)
	@JsonFormat(pattern = "yyyy-MM-dd ")
	@NullableSize(max=166)
	public Date getAp_company() {
		return ap_company;
	}
	public void setAp_company(Date ap_company) {
		this.ap_company = ap_company;
	}

	@Column(name="ch_ap_describe",length=300)
	@NullableSize(max=1333)
	public String getCh_ap_describe() {
		return ch_ap_describe;
	}
	public void setCh_ap_describe(String ch_ap_describe) {
		this.ch_ap_describe = ch_ap_describe;
	}

	@Column(name="ch_influence",length=300)
	@NullableSize(max=133)
	public String getCh_influence() {
		return ch_influence;
	}
	public void setCh_influence(String ch_influence) {
		this.ch_influence = ch_influence;
	}

	@Column(name="dept_director_opinion",length=300)
	@NullableSize(max=133)
	public String getDept_director_opinion() {
		return dept_director_opinion;
	}
	public void setDept_director_opinion(String dept_director_opinion) {
		this.dept_director_opinion = dept_director_opinion;
	}

	@Column(name="director_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=133)
	public Date getDirector_date() {
		return director_date;
	}
	public void setDirector_date(Date director_date) {
		this.director_date = director_date;
	}

	@Column(name="project_opinion",length=300)
	@NullableSize(max=133)
	public String getProject_opinion() {
		return project_opinion;
	}
	public void setProject_opinion(String project_opinion) {
		this.project_opinion = project_opinion;
	}

	@Column(name="project_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=133)
	public Date getProject_date() {
		return project_date;
	}
	public void setProject_date(Date project_date) {
		this.project_date = project_date;
	}
	
	
	@Column(name="please_note",length=300)
	@NullableSize(max=133)
	public String getPleasenote() {
		return pleasenote;
	}
	public void setPleasenote(String pleasenote) {
		this.pleasenote = pleasenote;
	}
}
