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
 * @author child
 *
 */
@Entity
@Table(name="bz_information_security")
@Scaffold("experiment/informationsecurity")
public class InformationSecurity extends RevisionDomainEntity{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 编号
	 */
    private String in_no;
    /**
     * 姓名
     */
    private String name;
    /**
     * 制作日期
     */
    private Date makedate;
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
    private String no_qualified;
    /**
     * 考评人
     */
    private String evaluationperson;
    /**
     *签到
     */
    private String signin;
    
    @NotBlank
	@Column(name="in_no",length=300)
	@NullableSize(max=166)
	public String getIn_no() {
		return in_no;
	}
	public void setIn_no(String in_no) {
		this.in_no = in_no;
	}
	
	@Column(name="name",length=300)
	@NullableSize(max=166)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name="makedate",length=300)
	@JsonFormat(pattern = "yyyy-MM-dd ")
	@NullableSize(max=166)
	public Date getMakedate() {
		return makedate;
	}
	public void setMakedate(Date makedate) {
		this.makedate = makedate;
	}
	
	@NotBlank
	@Column(name="dept",length=300)
	@NullableSize(max=166)
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	
	@Column(name="job",length=300)
	@NullableSize(max=166)
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	
	@Column(name="theory",length=300)
	@NullableSize(max=166)
	public Integer getTheory() {
		return theory;
	}
	public void setTheory(Integer theory) {
		this.theory = theory;
	}
	
	@Column(name="operation",length=300)
	@NullableSize(max=166)
	public Integer getOperation() {
		return operation;
	}
	public void setOperation(Integer operation) {
		this.operation = operation;
	}
	
	@Column(name="qualified",length=300)
	@NullableSize(max=166)
	public String getQualified() {
		return qualified;
	}
	public void setQualified(String qualified) {
		this.qualified = qualified;
	}
	
	@Transient
	public String getNo_qualified() {
		return no_qualified;
	}
	public void setNo_qualified(String no_qualified) {
		this.no_qualified = no_qualified;
	}
	
	@Column(name="evaluation_person",length=300)
	@NullableSize(max=166)
	public String getEvaluationperson() {
		return evaluationperson;
	}
	public void setEvaluationperson(String evaluationperson) {
		this.evaluationperson = evaluationperson;
	}
	
	@Column(name="signin",length=300)
	@NullableSize(max=166)
	public String getSignin() {
		return signin;
	}
	public void setSignin(String signin) {
		this.signin = signin;
	}
    
}
