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
 * 系统上线申请表
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_INFOR_SYSTEM")
@Scaffold("experiment/Informationsystem")
public class InformationSystem extends RevisionDomainEntity{
	 /**
	  * 
	  */
	  private static final long serialVersionUID = 1L;
	  /**
	   * 编号
	   */
     private String inSysNumber;
     /**
      * 申请日期
      */
     private Date aplicationDate; 
     /**
      * 信息系统名称
      */
     private String inSysName;
     /**
      * 系统情况说明
      */
     private String sysCondition;
     /**
      * 是否完成测试
      */
     private  String completeTest;
     /**
      * 测试情况
      */
     private String testCondition;
     /**
      * 上线是否涉及其他系统
      */
     private String relateSys;
     /**
      *备注
      */
     private String comments;
     /**
      * 申请人
      */
     private String aplicationPerson;
     /**
      * 申请部门
      */
     private String aplicationDept;
     /**
      * 部门主管意见
      */
     private String deptDirector;
     /**
      * 部门主管审批日期
      */
     private Date deptDate;
     /**
      * 实施部门意见
      */
     private String implementDept;
     /**
      * 实施日期
      */
     private Date implementDate;
     /**
      * 公司领导审批
      */
     private String corportionlead;
     /**
      * 公司领导审批日期
      */
     private Date corportionDate;
      
    @NotBlank
    @Column(name="F_IN_SYS_NUMBER",length=300)
    @NullableSize(max=100)
    public String getInSysNumber() {
		return inSysNumber;
	}
	public void setInSysNumber(String inSysNumber) {
		this.inSysNumber = inSysNumber;
	}
	
	@Column(name="F_APPLICATION_DATE")
    @JsonFormat(pattern="yyyy-MM-dd")
	public Date getAplicationDate() {
		return aplicationDate;
	}
	public void setAplicationDate(Date aplicationDate) {
		this.aplicationDate = aplicationDate;
	}
	
	@Column(name="F_IN_SYS_NAME",length=300)
    @NullableSize(max=100)
	public String getInSysName() {
		return inSysName;
	}
	public void setInSysName(String inSysName) {
		this.inSysName = inSysName;
	}
	
	@Column(name="F_SYS_CONDITION",length=300)
    @NullableSize(max=100)
	public String getSysCondition() {
		return sysCondition;
	}
	public void setSysCondition(String sysCondition) {
		this.sysCondition = sysCondition;
	}
	
	@Column(name="F_COMPLETE_TEST",length=300)
    @NullableSize(max=100)
	public String getCompleteTest() {
		return completeTest;
	}
	public void setCompleteTest(String completeTest) {
		this.completeTest = completeTest;
	}
	
	@Column(name="F_TEST_CONDITION",length=300)
    @NullableSize(max=100)
	public String getTestCondition() {
		return testCondition;
	}
	public void setTestCondition(String testCondition) {
		this.testCondition = testCondition;
	}
	
	@Column(name="F_RELATESYS",length=300)
    @NullableSize(max=100)
	public String getRelateSys() {
		return relateSys;
	}
	public void setRelateSys(String relateSys) {
		this.relateSys = relateSys;
	}
	
	@Column(name="F_APLICATION_PERSON",length=300)
    @NullableSize(max=100)
	public String getAplicationPerson() {
		return aplicationPerson;
	}
	public void setAplicationPerson(String aplicationPerson) {
		this.aplicationPerson = aplicationPerson;
	}
	
	@Column(name="F_APLICATION_DEPT",length=300)
    @NullableSize(max=100)
	public String getAplicationDept() {
		return aplicationDept;
	}
	public void setAplicationDept(String aplicationDept) {
		this.aplicationDept = aplicationDept;
	}
	
	@Column(name="F_DEPT_DIRECTOR",length=300)
    @NullableSize(max=100)
	public String getDeptDirector() {
		return deptDirector;
	}
	public void setDeptDirector(String deptDirector) {
		this.deptDirector = deptDirector;
	}
	
	@Column(name="F_DEPT_DATE",length=300)
    @JsonFormat(pattern="yyyy-MM-dd")
	public Date getDeptDate() {
		return deptDate;
	}
	public void setDeptDate(Date deptDate) {
		this.deptDate = deptDate;
	}
	
	@Column(name="F_IMPLEMENT_DEPT",length=300)
    @NullableSize(max=100)
	public String getImplementDept() {
		return implementDept;
	}
	public void setImplementDept(String implementDept) {
		this.implementDept = implementDept;
	}
	
	@Column(name="F_IMPLEMENT_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getImplementDate() {
		return implementDate;
	}
	public void setImplementDate(Date implementDate) {
		this.implementDate = implementDate;
	}
	
	@Column(name="F_CORPORTION_Date")
    @JsonFormat(pattern="yyyy-MM-dd")
	public Date getCorportionDate() {
		return corportionDate;
	}
	public void setCorportionDate(Date corportionDate) {
		this.corportionDate = corportionDate;
	}
	
	@Column(name="F_COMMNENTS",length=300)
    @NullableSize(max=100)
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	
	@Column(name="F_CORPORTIONLEAD",length=300)
    @NullableSize(max=100)
	public String getCorportionlead() {
		return corportionlead;
	}
	public void setCorportionlead(String corportionlead) {
		this.corportionlead = corportionlead;
	}
	
}
