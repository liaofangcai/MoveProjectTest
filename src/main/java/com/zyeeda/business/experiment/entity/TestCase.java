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
@Table(name="BZ_TEST_CASE")
@Scaffold("/experiment/testcase")
public class TestCase extends RevisionDomainEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7447101674530117774L;
	/**
	 * 测试编号
	 */
	private String testNumber;
    /**
     * 制造日期
     */
	private Date makeDate;
	/**
	 * 用例id
	 */
	private String caseId;
	/**
	 * 所属模块
	 */
	private String theModel;
	/**
	 * 子模块
	 */
	private String submodule;
	/**
	 * 前置条件
	 */
	private String prepositionCondition;
	/**
	 * 输入数据
	 */
	private Integer inputData;
	/**
	 * 测试步骤
	 */
	private String  testStep;
	/**
	 * 预期结果
	 */
	private String pectOutcome;
	/**
	 * 状态
	 */
	private String state;
	/**
	 * 实际结果
	 */
	private String actualResult;
	/**
	 * 备注信息
	 */
	private String remakesInformation;
	
	@NotBlank
	@Column(name="F_TEXT_NUMBER",length=300)
	@NullableSize(max=100)
	public String getTestNumber() {
		return testNumber;
	}
	public void setTestNumber(String testNumber) {
		this.testNumber = testNumber;
	}
	
	
	@Column(name="F_MAKE_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getMakeDate() {
		return makeDate;
	}
	public void setMakeDate(Date makeDate) {
		this.makeDate = makeDate;
	}
	
	@Column(name="F_CASE_ID",length=300)
	@NullableSize(max=100)
	public String getCaseId() {
		return caseId;
	}
	public void setCaseId(String caseId) {
		this.caseId = caseId;
	}
	
	@Column(name="F_THE_MODDEL",length=300)
	@NullableSize(max=100)
	public String getTheModel() {
		return theModel;
	}
	public void setTheModel(String theModel) {
		this.theModel = theModel;
	}
	
	@Column(name="F_SUBMODULE",length=300)
	@NullableSize(max=100)
	public String getSubmodule() {
		return submodule;
	}
	public void setSubmodule(String submodule) {
		this.submodule = submodule;
	}
	
	@Column(name="F_PRE_CON",length=300)
	@NullableSize(max=100)
	public String getPrepositionCondition() {
		return prepositionCondition;
	}
	public void setPrepositionCondition(String prepositionCondition) {
		this.prepositionCondition = prepositionCondition;
	}
	
	@Column(name="F_INPUT_DATA",length=300)
	@NullableSize(max=100)
	public Integer getInputData() {
		return inputData;
	}
	public void setInputData(Integer inputData) {
		this.inputData = inputData;
	}
	
	@Column(name="F_TEST_STEP",length=300)
	@NullableSize(max=100)
	public String getTestStep() {
		return testStep;
	}
	public void setTestStep(String testStep) {
		this.testStep = testStep;
	}
	
	@Column(name="F_PECT_OUT",length=300)
	@NullableSize(max=100)
	public String getPectOutcome() {
		return pectOutcome;
	}
	public void setPectOutcome(String pectOutcome) {
		this.pectOutcome = pectOutcome;
	}
	
	@Column(name="F_STATE",length=300)
	@NullableSize(max=100)
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	@Column(name="F_AC_RESULT",length=300)
	@NullableSize(max=100)
	public String getActualResult() {
		return actualResult;
	}
	public void setActualResult(String actualResult) {
		this.actualResult = actualResult;
	}
	
	@Column(name="F_REMAK_INFOR",length=500)
	@NullableSize(max=166)
	public String getRemakesInformation() {
		return remakesInformation;
	}
	public void setRemakesInformation(String remakesInformation) {
		this.remakesInformation = remakesInformation;
	}
}
