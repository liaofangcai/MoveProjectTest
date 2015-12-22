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
@Table(name = "bz_systemDataConversionClan")
@Scaffold("/informationwork/systemDataConversionClan")
public class SystemDataConversionClan extends RevisionDomainEntity{

	private static final long serialVersionUID = 2875243938624745L;
	//编号
	private String systemRenewalApplicationNo;

    //系统数据转换计划
	//信息系统名称
	private String informationSystemName;
	//转换内容
	private String masterName;
	//风险评估
	private String address;
	//实施步骤
	private String updateContent;
	//参与人员
	private String  incidence;
    //开始转换时间
    private Date proposer;
    //结束转换时间
    private Date applicationDepartment;
    //验证人
    private String identifierPersonnal;
    //验证时间
    private Date identifierTime;

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
	@NotNull
    @DateTime
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    @Column(name="f_identifierTime")
	public Date getIdentifierTime() {
		return identifierTime;
	}
	public void setIdentifierTime(Date identifierTime) {
		this.identifierTime = identifierTime;
	}




}
