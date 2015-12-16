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
 * 系统测试用例
 * @author lhb
 *
 */
@Entity
@Table(name="bz_test_case")
@Scaffold("/experiment/testcase")
public class TestCase extends RevisionDomainEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7447101674530117774L;
	/**
	 * 测试编号
	 */
	private String test_no;
    /**
     * 制造日期
     */
	private Date make_date;
	/**
	 * 用例id
	 */
	private String case_id;
	/**
	 * 所属模块
	 */
	private String the_model;
	/**
	 * 子模块
	 */
	private String submodule;
	/**
	 * 前置条件
	 */
	private String preposition_condition;
	/**
	 * 输入数据
	 */
	private Integer input_data;
	/**
	 * 测试步骤
	 */
	private String  test_step;
	/**
	 * 预期结果
	 */
	private String pect_outcome;
	/**
	 * 状态
	 */
	private String state;
	/**
	 * 实际结果
	 */
	private String actual_result;
	/**
	 * 备注信息
	 */
	private String remakes_information;
	
	@NotBlank
	@Column(name="test_no",length=300)
	@NullableSize(max=166)
	public String getTest_no() {
		return test_no;
	}
	public void setTest_no(String test_no) {
		this.test_no = test_no;
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
	
	@Column(name="case_id",length=300)
	@NullableSize(max=166)
	public String getCase_id() {
		return case_id;
	}
	public void setCase_id(String case_id) {
		this.case_id = case_id;
	}
	
	@Column(name="the_model",length=300)
	@NullableSize(max=166)
	public String getThe_model() {
		return the_model;
	}
	public void setThe_model(String the_model) {
		this.the_model = the_model;
	}
	
	@Column(name="submodule",length=300)
	@NullableSize(max=166)
	public String getSubmodule() {
		return submodule;
	}
	public void setSubmodule(String submodule) {
		this.submodule = submodule;
	}
	
	@Column(name="preposition_condition",length=300)
	@NullableSize(max=166)
	public String getPreposition_condition() {
		return preposition_condition;
	}
	public void setPreposition_condition(String preposition_condition) {
		this.preposition_condition = preposition_condition;
	}
	
	@Column(name="input_data",length=300)
	@NullableSize(max=166)
	public Integer getInput_data() {
		return input_data;
	}
	public void setInput_data(Integer input_data) {
		this.input_data = input_data;
	}
	
	@Column(name="test_step",length=300)
	@NullableSize(max=166)
	public String getTest_step() {
		return test_step;
	}
	public void setTest_step(String test_step) {
		this.test_step = test_step;
	}
	
	@Column(name="pect_outcome",length=300)
	@NullableSize(max=166)
	public String getPect_outcome() {
		return pect_outcome;
	}
	public void setPect_outcome(String pect_outcome) {
		this.pect_outcome = pect_outcome;
	}
	
	@Column(name="state",length=300)
	@NullableSize(max=166)
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	@Column(name="actual_result",length=300)
	@NullableSize(max=166)
	public String getActual_result() {
		return actual_result;
	}
	public void setActual_result(String actual_result) {
		this.actual_result = actual_result;
	}
	
	@Column(name="remakes_information",length=300)
	@NullableSize(max=166)
	public String getRemakes_information() {
		return remakes_information;
	}
	public void setRemakes_information(String remakes_information) {
		this.remakes_information = remakes_information;
	}
	
	
}
