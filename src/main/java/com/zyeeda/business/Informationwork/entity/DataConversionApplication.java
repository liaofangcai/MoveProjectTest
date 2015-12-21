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
@Table(name = "bz_dataConversionApplication")
@Scaffold("/informationwork/dataConversionApplication")
public class DataConversionApplication extends RevisionDomainEntity{

	private static final long serialVersionUID = 285243938624745L;
	//编号
	private String systemRenewalApplicationNo;
    //申请日期
	private Date applicationTime;

    //系统数据转换申请
	//信息系统名称
	private String informationSystemName;
	//服务器
	private String masterName;
	//申请原因
	private String address;
	//影响范围
	private String updateContent;
	//数据转换详情
	private String  incidence;
    //转换开始时间
    private Date proposer;
    //转换完成时间
    private Date applicationDepartment;
    //申请人
    private String identifierPersonnal;
    //申请部门
    private String identifierTime;

    // 审核意见
    //部门主管意见
    private String departmentHead;
    //信息部门意见
    private String informationDepartment;
    //公司领导审批
    private String companyLeadershipApproval;


    @NotBlank
    @Column(name="f_systemRenewalApplicationNo",length=300)
	public String getSystemRenewalApplicationNo() {
		return systemRenewalApplicationNo;
	}
	public void setSystemRenewalApplicationNo(String systemRenewalApplicationNo) {
		this.systemRenewalApplicationNo = systemRenewalApplicationNo;
	}
	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="f_applicationTime")
	public Date getApplicationTime(){
		return applicationTime;
	}
	public void setApplicationTime(Date applicationTime){
		this.applicationTime=applicationTime;
	}

	@NotBlank
	@Column(name="f_informationSystemName",length=300)
	public String getInformationSystemName() {
		return informationSystemName;
	}
	public void setInformationSystemName(String informationSystemName) {
		this.informationSystemName = informationSystemName;
	}
	@NotBlank
	@Column(name ="f_masterName")
	public String getMasterName() {
		return masterName;
	}
	public void setMasterName(String masterName) {
		this.masterName = masterName;
	}
	@NotBlank
	@Column(name="f_address")
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@NotBlank
	@Column(name="f_updateContent")
	public String getUpdateContent() {
		return updateContent;
	}
	public void setUpdateContent(String updateContent) {
		this.updateContent = updateContent;
	}
	@NotBlank
	@Column(name="f_incidence")
	public String getIncidence() {
		return incidence;
	}
	public void setIncidence(String incidence) {
		this.incidence = incidence;
	}

    @NotNull
    @DateTime
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
	@Column(name="f_proposer",length=300)
	public Date getProposer() {
		return proposer;
	}
	public void setProposer(Date proposer) {
		this.proposer = proposer;
	}
	@NotNull
    @DateTime
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
	@Column(name="f_applicationDepartment")
	public Date getApplicationDepartment() {
		return applicationDepartment;
	}
	public void setApplicationDepartment(Date applicationDepartment) {
		this.applicationDepartment = applicationDepartment;
	}
	@NotBlank
	@Column(name="f_departmentHead")
	public String getDepartmentHead() {
		return departmentHead;
	}
	public void setDepartmentHead(String departmentHead) {
		this.departmentHead = departmentHead;
	}
	@NotBlank
	@Column(name="f_informationDepartment")
	public String getInformationDepartment() {
		return informationDepartment;
	}
	public void setInformationDepartment(String informationDepartment) {
		this.informationDepartment = informationDepartment;
	}
	@NotBlank
	@Column(name="f_companyLeadershipApproval")
	public String getCompanyLeadershipApproval() {
		return companyLeadershipApproval;
	}
	public void setCompanyLeadershipApproval(String companyLeadershipApproval) {
		this.companyLeadershipApproval = companyLeadershipApproval;
	}



    @NotBlank
    @Column(name="f_identifierPersonnal")
	public String getIdentifierPersonnal() {
		return identifierPersonnal;
	}
	public void setIdentifierPersonnal(String identifierPersonnal) {
		this.identifierPersonnal = identifierPersonnal;
	}
    @NotBlank
    @Column(name="f_identifierTime")
	public String getIdentifierTime() {
		return identifierTime;
	}
	public void setIdentifierTime(String identifierTime) {
		this.identifierTime = identifierTime;
	}




}
