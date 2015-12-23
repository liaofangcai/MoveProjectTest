package com.zyeeda.business.experiment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

/**
 * 信息安全培训记录表
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_EX_IN_SECURITY")
@Scaffold("experiment/informationsecurity")
public class InformationSecurity extends RevisionDomainEntity{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 编号
	 */
    private String inNumber;
    /**
     * 姓名
     */
    private String name;
    /**
     * 制作日期
     */
    private Date makeDate;
    /**
     * 部门
     */
    private String dept;
    /**
     * 工作
     */
    private String job;
    /**
     * 理论
     */
    private Integer theory;
    /**
     * 安全
     */
    private Integer operation;
    /**
     *合格
     */
    private String qualified;
    /**
     * 不合格
     */
    private String noQualified;
    /**
     * 考评人
     */
    private String evaluationPerson;
    /**
     *签到
     */
    private String signin;
    
    @NotBlank
    @Column(name="F_IN_NUMBER",length=300)
    @NullableSize(max=100)
	public String getInNumber() {
		return inNumber;
	}
	public void setInNumber(String inNumber) {
		this.inNumber = inNumber;
	}
	
	@Column(name="F_NAME",length=300)
	@NullableSize(max=100)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name="F_MAKE_DATE",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=100)
	public Date getMakeDate() {
		return makeDate;
	}
	public void setMakeDate(Date makeDate) {
		this.makeDate = makeDate;
	}
	
	@Column(name="F_DEPT",length=300)
	@NullableSize(max=100)
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	
	@Column(name="F_JOB",length=300)
	@NullableSize(max=100)
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	
	@Column(name="F_THEORY",length=300)
	@NullableSize(max=100)
	public Integer getTheory() {
		return theory;
	}
	public void setTheory(Integer theory) {
		this.theory = theory;
	}
	
	@Column(name="F_OPERATION",length=300)
	@NullableSize(max=100)
	public Integer getOperation() {
		return operation;
	}
	public void setOperation(Integer operation) {
		this.operation = operation;
	}
	
	@Column(name="F_QUALIFIED",length=300)
	@NullableSize(max=100)
	public String getQualified() {
		return qualified;
	}
	public void setQualified(String qualified) {
		this.qualified = qualified;
	}
	
	@Column(name="F_NO_QUALIFIED",length=300)
	@NullableSize(max=100)
	public String getNoQualified() {
		return noQualified;
	}
	public void setNoQualified(String noQualified) {
		this.noQualified = noQualified;
	}
	
	@Column(name="F_EVALUATION_PERSON",length=300)
	@NullableSize(max=100)
	public String getEvaluationPerson() {
		return evaluationPerson;
	}
	public void setEvaluationPerson(String evaluationPerson) {
		this.evaluationPerson = evaluationPerson;
	}
	
	@Column(name="F_SINGNIN",length=300)
	@NullableSize(max=100)
	public String getSignin() {
		return signin;
	}
	public void setSignin(String signin) {
		this.signin = signin;
	}
    
}
