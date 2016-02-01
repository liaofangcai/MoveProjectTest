package com.zyeeda.business.informationwork.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.persistence.Transient;
import javax.persistence.Temporal;
import javax.persistence.OrderBy;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.NotBlank;
import com.zyeeda.cdeio.commons.annotation.scaffold.DateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "BZ_DATACONVERSIONAPPLICATION")
@Scaffold("/informationwork/dataconversionapplication")
public class DataConversionApplication extends RevisionDomainEntity{

	private static final long serialVersionUID = 285243938624745L;

	private String systemRenewalApplicationNo;

	private Date applicationTime;

	private String informationSystemName;

	private String masterName;

	private String address;

	private String updateContent;

	private String  incidence;

	private Date proposer;

	private Date applicationDepartment;

	private String identifierPersonnal;

	private String identifierTime;

	private String departmentHead;

	private String informationDepartment;

	private String companyLeadershipApproval;

	private String headperson;

	private Date headdate;

	private String departmentperson;

	private Date departmentdate;

	private String approvalperson;

	private Date approvaldate;

	@NotBlank
	@Column(name="F_NUMBER",length=300)
	public String getSystemRenewalApplicationNo() {
	  return systemRenewalApplicationNo;
	}
	public void setSystemRenewalApplicationNo(String systemRenewalApplicationNo) {
	this.systemRenewalApplicationNo = systemRenewalApplicationNo;
	}

	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="F_APPLICATIONTIME")
	public Date getApplicationTime(){
	  return applicationTime;
	}
	public void setApplicationTime(Date applicationTime){
	  this.applicationTime=applicationTime;
	}

	@Column(name="F_INFORMATIONSYSTEMNAME",length=300)
	public String getInformationSystemName() {
	  return informationSystemName;
	}
	public void setInformationSystemName(String informationSystemName) {
	  this.informationSystemName = informationSystemName;
	}

	@Column(name ="F_MASTERNAME")
	public String getMasterName() {
	  return masterName;
	}
	public void setMasterName(String masterName) {
	  this.masterName = masterName;
	}

	@Column(name="F_ADDRESS")
	public String getAddress() {
	  return address;
	}
	public void setAddress(String address) {
	  this.address = address;
	}

	@Column(name="F_UPDATECONTENT")
	public String getUpdateContent() {
	  return updateContent;
	}
	public void setUpdateContent(String updateContent) {
	  this.updateContent = updateContent;
	}

	@Column(name="F_INCIDENCE")
	public String getIncidence() {
	  return incidence;
	}
	public void setIncidence(String incidence) {
	  this.incidence = incidence;
	}

	@Temporal(TemporalType.DATE)
	@Column(name="F_PROPOSER",length=300)
	public Date getProposer() {
	  return proposer;
	}
	public void setProposer(Date proposer) {
	  this.proposer = proposer;
	}

	@Temporal(TemporalType.DATE)
	@Column(name="F_APPLICATIONDEPARTMENT")
	public Date getApplicationDepartment() {
	  return applicationDepartment;
	}
	public void setApplicationDepartment(Date applicationDepartment) {
	  this.applicationDepartment = applicationDepartment;
	}

	@Column(name="F_DEPARTMENTHEAD")
	public String getDepartmentHead() {
	  return departmentHead;
	}
	public void setDepartmentHead(String departmentHead) {
	  this.departmentHead = departmentHead;
	}

	@Column(name="F_INFORMATIONDEPARTMENT")
	public String getInformationDepartment() {
	  return informationDepartment;
	}
	public void setInformationDepartment(String informationDepartment) {
	  this.informationDepartment = informationDepartment;
	}

	@Column(name="F_COMPANYAPPROVAL")
	public String getCompanyLeadershipApproval() {
	  return companyLeadershipApproval;
	}
	public void setCompanyLeadershipApproval(String companyLeadershipApproval) {
	  this.companyLeadershipApproval = companyLeadershipApproval;
	}

	@Column(name="F_IDENTIFIERPERSONNAL")
	public String getIdentifierPersonnal() {
	  return identifierPersonnal;
	}
	public void setIdentifierPersonnal(String identifierPersonnal) {
	  this.identifierPersonnal = identifierPersonnal;
	}

	@Column(name="F_IDENTIFIERTIME")
	public String getIdentifierTime() {
	  return identifierTime;
	}
	public void setIdentifierTime(String identifierTime) {
		this.identifierTime = identifierTime;
	}


	@Column(name = "F_HEADPERSON")
	public String getHeadperson() {
		return headperson;
	}

	public void setHeadperson(String headperson) {
		this.headperson = headperson;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "F_HEADDATE")
	public Date getHeaddate() {
		return headdate;
	}

	public void setHeaddate(Date headdate) {
		this.headdate = headdate;
	}

	@Column(name = "F_DEPARTMENTPERSON")
	public String getDepartmentperson() {
		return departmentperson;
	}

	public void setDepartmentperson(String departmentperson) {
		this.departmentperson = departmentperson;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "F_DEPARTMENTDATE")
	public Date getDepartmentdate() {
		return departmentdate;
	}

	public void setDepartmentdate(Date departmentdate) {
		this.departmentdate = departmentdate;
	}

	@Column(name = "F_APPROVALPERSON")
	public String getApprovalperson() {
		return approvalperson;
	}

	public void setApprovalperson(String approvalperson) {
		this.approvalperson = approvalperson;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "F_APPROVALDATE")
	public Date getApprovaldate() {
		return approvaldate;
	}

	public void setApprovaldate(Date approvaldate) {
		this.approvaldate = approvaldate;
	}


}
