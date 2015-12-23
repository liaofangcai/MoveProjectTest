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
@Table(name = "BZ_RENEWALAPPLICATION")
@Scaffold("/informationwork/systemRenewalApplication")
public class SystemRenewalApplication extends RevisionDomainEntity{

	private static final long serialVersionUID = 287543938624745L;
	//编号
	private String systemRenewalApplicationNo;
	//申请日期
	private Date systemRenewalApplicationDate;
	//远程访问申请
	//信息系统名称
	private String informationSystemName;
	//主机名称
	private String masterName;
	//主机地址
	private String address;
	//更新内容
	private String updateContent;
	//影响范围
	private String  incidence;
	//申请人
	private String proposer;
	//申请部门
	private String applicationDepartment;
	// 审核意见
	//部门主管意见
	private String departmentHead;
	//信息部门意见
	private String informationDepartment;
	//公司领导审批
	private String companyLeadershipApproval;

	@NotBlank
	@Column(name="F_RENEWALAPPLICATIONNO",length=300)
	public String getSystemRenewalApplicationNo() {
		return systemRenewalApplicationNo;
	}
	public void setSystemRenewalApplicationNo(String systemRenewalApplicationNo) {
		this.systemRenewalApplicationNo = systemRenewalApplicationNo;
	}

	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="F_RENEWALAPPLICATIONDATE")
	public Date getSystemRenewalApplicationDate() {
		return systemRenewalApplicationDate;
	}
	public void setSystemRenewalApplicationDate(Date systemRenewalApplicationDate) {
		this.systemRenewalApplicationDate = systemRenewalApplicationDate;
	}

	@NotBlank
	@Column(name="F_SYSTEMNAME",length=300)
	public String getInformationSystemName() {
		return informationSystemName;
	}
	public void setInformationSystemName(String informationSystemName) {
		this.informationSystemName = informationSystemName;
	}

	@NotBlank
	@Column(name ="F_MASTERNAME")
	public String getMasterName() {
		return masterName;
	}
	public void setMasterName(String masterName) {
		this.masterName = masterName;
	}

	@NotBlank
	@Column(name="F_ADDRESS")
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	@NotBlank
	@Column(name="F_UPDATECONTENT")
	public String getUpdateContent() {
		return updateContent;
	}
	public void setUpdateContent(String updateContent) {
		this.updateContent = updateContent;
	}

	@NotBlank
	@Column(name="F_INCIDENCE")
	public String getIncidence() {
		return incidence;
	}
	public void setIncidence(String incidence) {
		this.incidence = incidence;
	}

	@NotBlank
	@Column(name="F_PROPOSER",length=300)
	public String getProposer() {
		return proposer;
	}
	public void setProposer(String proposer) {
		this.proposer = proposer;
	}

	@NotBlank
	@Column(name="F_APPLICATION")
	public String getApplicationDepartment() {
		return applicationDepartment;
	}
	public void setApplicationDepartment(String applicationDepartment) {
		this.applicationDepartment = applicationDepartment;
	}

	@NotBlank
	@Column(name="F_DEPARTMENTHEAD")
	public String getDepartmentHead() {
		return departmentHead;
	}
	public void setDepartmentHead(String departmentHead) {
		this.departmentHead = departmentHead;
	}

	@NotBlank
	@Column(name="F_INFORMATION")
	public String getInformationDepartment() {
		return informationDepartment;
	}
	public void setInformationDepartment(String informationDepartment) {
		this.informationDepartment = informationDepartment;
	}

	@NotBlank
	@Column(name="F_LEADERSHIPAPPROVAL")
	public String getCompanyLeadershipApproval() {
		return companyLeadershipApproval;
	}
	public void setCompanyLeadershipApproval(String companyLeadershipApproval) {
		this.companyLeadershipApproval = companyLeadershipApproval;
	}
}
