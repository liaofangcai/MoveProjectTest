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
@Table(name = "BZ_DATACONVERSIONCLAN")
@Scaffold("/informationwork/systemdataconversionclan")
public class SystemDataConversionClan extends RevisionDomainEntity{

  private static final long serialVersionUID = 2875243938624745L;
  //编号
  private String systemRenewalApplicationNo;
  private Date maketable;
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

  private String headperson;

  private Date headdate;

  private String departmentperson;

  private Date departmentdate;

  private String approvalperson;

  private Date approvaldate;

  @NotBlank
  @Column(name="F_RENEWALAPPLICATIONNO",length=300)
  public String getSystemRenewalApplicationNo() {
    return systemRenewalApplicationNo;
  }
  public void setSystemRenewalApplicationNo(String systemRenewalApplicationNo) {
    this.systemRenewalApplicationNo = systemRenewalApplicationNo;
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

  @Column(name="F_DEPARTMENT")
  public String getInformationDepartment() {
    return informationDepartment;
  }
  public void setInformationDepartment(String informationDepartment) {
    this.informationDepartment = informationDepartment;
  }

  @Column(name="F_SHIPAPPROVAL")
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

  @Temporal(TemporalType.DATE)
  @Column(name="F_IDENTIFIERTIME")
  public Date getIdentifierTime() {
    return identifierTime;
  }
  public void setIdentifierTime(Date identifierTime) {
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

  @Column(name = "F_MAKETABLE")
  @Temporal(TemporalType.DATE)
  public Date getMaketable() {
    return maketable;
  }
  public void setMaketable(Date maketable) {
    this.maketable = maketable;
  }

}
