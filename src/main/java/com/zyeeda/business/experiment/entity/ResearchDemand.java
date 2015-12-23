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
 * 
 * @author lhb
 *
 */
@Entity
@Table(name="BZ_RE_DEMAND")
@Scaffold("experiment/researchdemand")
public class ResearchDemand extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String researchNumber;
	/**
	 * 制表日期
	 */
	private Date makeDate;
	/**
	 * 事由简述
	 */
	private String brifeIntroduction;
	/**
	 * 项目类别
	 */
	private String projectType;
	/**
	 * 需求提出人
	 */
	private String demandPutForword;
	/**
	 * 需求提出时间
	 */
	private Date demandForworDate;
	/**
	 * 属于部门
	 */
	private String atttibuteDept;
	/**
	 * 联系方式
	 */
	private String contactInformating;
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
	private String completeTask;
	/**
	 * 审核意见
	 */
	private String examineOpinion;
	/**
	 * 签字
	 */
	private String examineSign;
	/**
	 * 日期
	 */
	private Date examineDate;
	/**
	 * 批准意见
	 */
	private String ratifyOpinion;
	/**
	 * 签字
	 */
	private String ratifySign;
	/**
	 * 日期
	 */
	private Date ratifyDate;
	
	@NotBlank
	@Column(name="F_RE_NUMBER",length=300)
	@NullableSize(max=100)
	public String getResearchNumber() {
		return researchNumber;
	}
	public void setResearchNumber(String researchNumber) {
		this.researchNumber = researchNumber;
	}
	
	@Column(name="F_MAKE_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getMakeDate() {
		return makeDate;
	}
	public void setMakeDate(Date makeDate) {
		this.makeDate = makeDate;
	}
	
	@Column(name="F_BR_INTRO",length=300)
	@NullableSize(max=100)
	public String getBrifeIntroduction() {
		return brifeIntroduction;
	}
	public void setBrifeIntroduction(String brifeIntroduction) {
		this.brifeIntroduction = brifeIntroduction;
	}
	
	@Column(name="F_PROJECT_TYPE",length=300)
	@NullableSize(max=100)
	public String getProjectType() {
		return projectType;
	}
	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}
	
	@Column(name="F_DEMAND_PUT",length=300)
	@NullableSize(max=100)
	public String getDemandPutForword() {
		return demandPutForword;
	}
	public void setDemandPutForword(String demandPutForword) {
		this.demandPutForword = demandPutForword;
	}
	
	@Column(name="F_DEMAND_FORWOR")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getDemandForworDate() {
		return demandForworDate;
	}
	public void setDemandForworDate(Date demandForworDate) {
		this.demandForworDate = demandForworDate;
	}
	
	@Column(name="F_ATTRI_DEPT",length=300)
	@NullableSize(max=100)
	public String getAtttibuteDept() {
		return atttibuteDept;
	}
	public void setAtttibuteDept(String atttibuteDept) {
		this.atttibuteDept = atttibuteDept;
	}
	
	@Column(name="F_CONTACT_IN",length=500)
	@NullableSize(max=100)
	public String getContactInformating() {
		return contactInformating;
	}
	public void setContactInformating(String contactInformating) {
		this.contactInformating = contactInformating;
	}
	
	@Column(name="F_REASON",length=500)
	@NullableSize(max=166)
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
	@Column(name="F_FUNCTION",length=500)
	@NullableSize(max=166)
	public String getFunction() {
		return function;
	}
	public void setFunction(String function) {
		this.function = function;
	}
	
	@Column(name="F_COM_TASK",length=500)
	@NullableSize(max=100)
	public String getCompleteTask() {
		return completeTask;
	}
	public void setCompleteTask(String completeTask) {
		this.completeTask = completeTask;
	}
	
	@Column(name="F_EX_OPINION",length=500)
	@NullableSize(max=166)
	public String getExamineOpinion() {
		return examineOpinion;
	}
	public void setExamineOpinion(String examineOpinion) {
		this.examineOpinion = examineOpinion;
	}
	
	@Column(name="F_EX_SIGN",length=300)
	@NullableSize(max=100)
	public String getExamineSign() {
		return examineSign;
	}
	public void setExamineSign(String examineSign) {
		this.examineSign = examineSign;
	}
	
	@Column(name="F_EX_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getExamineDate() {
		return examineDate;
	}
	public void setExamineDate(Date examineDate) {
		this.examineDate = examineDate;
	}
	
	@Column(name="F_RA_OPINION",length=500)
	@NullableSize(max=166)
	public String getRatifyOpinion() {
		return ratifyOpinion;
	}
	public void setRatifyOpinion(String ratifyOpinion) {
		this.ratifyOpinion = ratifyOpinion;
	}
	
	@Column(name="F_RA_SIGN",length=300)
	@NullableSize(max=100)
	public String getRatifySign() {
		return ratifySign;
	}
	public void setRatifySign(String ratifySign) {
		this.ratifySign = ratifySign;
	}
	
	@Column(name="F_RA_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getRatifyDate() {
		return ratifyDate;
	}
	public void setRatifyDate(Date ratifyDate) {
		this.ratifyDate = ratifyDate;
	}
}
