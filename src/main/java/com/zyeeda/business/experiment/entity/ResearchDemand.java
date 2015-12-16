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
@Entity
@Table(name="bz_research_demand")
@Scaffold("experiment/researchdemand")
public class ResearchDemand extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String research_no;
	/**
	 * 制表日期
	 */
	private Date make_date;
	/**
	 * 事由简述
	 */
	private String brife_introduction;
	/**
	 * 项目类别
	 */
	private String project_type;
	/**
	 * 需求提出人
	 */
	private String demand_put_forword;
	/**
	 * 需求提出时间
	 */
	private Date demand_forword_date;
	/**
	 * 属于部门
	 */
	private String atttibute_dept;
	/**
	 * 联系方式
	 */
	private String contact_informating;
	/**
	 * 主要原因和背景
	 */
	private String reason;
	/**
	 * 功能/性能/业务
	 */
	private String function;
	/**
	 * 完成任务
	 */
	private String complete_task;
	/**
	 * 审核意见
	 */
	private String examine_Opinion;
	/**
	 * 签字
	 */
	private String examine_sign;
	/**
	 * 日期
	 */
	private Date examine_date;
	/**
	 * 批准意见
	 */
	private String ratify_opinion;
	/**
	 * 签字
	 */
	private String ratify_sign;
	/**
	 * 日期
	 */
	private Date ratify_date;
	

    @NotBlank
    @Column(name="research_no",length=300)
    @NullableSize(max=166)
	public String getResearch_no() {
		return research_no;
	}
	public void setResearch_no(String research_no) {
		this.research_no = research_no;
	}
	
	@Column(name="make_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max=166)
	public Date getMake_date() {
		return make_date;
	}
	public void setMake_date(Date make_date) {
		this.make_date = make_date;
	}
	
	@Column(name="brife_introduction",length=300)
    @NullableSize(max=166)
	public String getBrife_introduction() {
		return brife_introduction;
	}
	public void setBrife_introduction(String brife_introduction) {
		this.brife_introduction = brife_introduction;
	}
	
	@Column(name="project_type",length=300)
    @NullableSize(max=166)
	public String getProject_type() {
		return project_type;
	}
	public void setProject_type(String project_type) {
		this.project_type = project_type;
	}
	
	@Column(name="demand_put_forword",length=300)
    @NullableSize(max=166)
	public String getDemand_put_forword() {
		return demand_put_forword;
	}
	public void setDemand_put_forword(String demand_put_forword) {
		this.demand_put_forword = demand_put_forword;
	}
	
	@Column(name="demand_forword_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max=166)
	public Date getDemand_forword_date() {
		return demand_forword_date;
	}
	public void setDemand_forword_date(Date demand_forword_date) {
		this.demand_forword_date = demand_forword_date;
	}
	
	@Column(name="attibulte_dept",length=300)
	@NullableSize(max=166)
	public String getAtttibute_dept() {
		return atttibute_dept;
	}
	public void setAtttibute_dept(String atttibute_dept) {
		this.atttibute_dept = atttibute_dept;
	}
	
	@Column(name="contact_information",length=300)
    @NullableSize(max=166)
	public String getContact_informating() {
		return contact_informating;
	}
	public void setContact_informating(String contact_informating) {
		this.contact_informating = contact_informating;
	}
	
	@Column(name="reason",length=300)
    @NullableSize(max=166)
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
	@Column(name="function",length=300)
    @NullableSize(max=166)
	public String getFunction() {
		return function;
	}
	public void setFunction(String function) {
		this.function = function;
	}
	
	@Column(name="complete_task",length=300)
    @NullableSize(max=166)
	public String getComplete_task() {
		return complete_task;
	}
	public void setComplete_task(String complete_task) {
		this.complete_task = complete_task;
	}
	
	@Column(name="examine_opinion",length=300)
    @NullableSize(max=166)
	public String getExamine_Opinion() {
		return examine_Opinion;
	}
	public void setExamine_Opinion(String examine_Opinion) {
		this.examine_Opinion = examine_Opinion;
	}
	
	@Column(name="examine_sign",length=300)
    @NullableSize(max=166)
	public String getExamine_sign() {
		return examine_sign;
	}
	public void setExamine_sign(String examine_sign) {
		this.examine_sign = examine_sign;
	}
	
	@Column(name="examine_date",length=300)
    @NullableSize(max=166)
	public Date getExamine_date() {
		return examine_date;
	}
	public void setExamine_date(Date examine_date) {
		this.examine_date = examine_date;
	}
	
	@Column(name="ratify_opinion",length=300)
    @NullableSize(max=166)
	public String getRatify_opinion() {
		return ratify_opinion;
	}
	public void setRatify_opinion(String ratify_opinion) {
		this.ratify_opinion = ratify_opinion;
	}
	
	@Column(name="ratify_sign",length=300)
    @NullableSize(max=166)
	public String getRatify_sign() {
		return ratify_sign;
	}
	public void setRatify_sign(String ratify_sign) {
		this.ratify_sign = ratify_sign;
	}
	
	@Column(name="ratify_date",length=300)
    @NullableSize(max=166)
	public Date getRatify_date() {
		return ratify_date;
	}
	public void setRatify_date(Date ratify_date) {
		this.ratify_date = ratify_date;
	}
}
