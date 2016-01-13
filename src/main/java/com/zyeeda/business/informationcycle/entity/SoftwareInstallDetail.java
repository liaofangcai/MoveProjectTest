package com.zyeeda.business.informationcycle.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "BZ_INFORMATIONCYCLE_SOFTWAREINSTALL_DETAIL")
@Scaffold("/informationcycle/softwareinstall-detail")
public class SoftwareInstallDetail extends RevisionDomainEntity{
  /**
   * 用户名称
   */
  private String userName;
  /**
   * 计算机名
   */
  private String pcName;
  /**
   * 检查情况
   */
  private String checkStatus;
  /**
   * 异常事项
   */
  private String unusualStatus;
  /**
   * 处理措施
   */
  private String treatment;
  /**
   * 备注
   */
  private String remark;
  /**
   * 系统账户权限清查
   */
  private SysPermissionCheck sysPermissionCheck;

  @Column(name = "F_PCNAME", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getPcName() {
    return pcName;
  }
  public void setPcName(String pcName) {
    this.pcName = pcName;
  }

  @Column(name = "F_USERNAME", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }

  @Column(name = "F_CHECKSTATUS", length = 4000)
  @NullableSize(max = 1333)
  public String getCheckStatus() {
    return checkStatus;
  }
  public void setCheckStatus(String checkStatus) {
    this.checkStatus = checkStatus;
  }

  @Column(name = "F_UNUSUALSTATUS", length = 4000)
  @NullableSize(max = 1333)
  public String getUnusualStatus() {
    return unusualStatus;
  }
  public void setUnusualStatus(String unusualStatus) {
    this.unusualStatus = unusualStatus;
  }

  @Column(name = "F_TREATMENT", length = 4000)
  @NullableSize(max = 1333)
  public String getTreatment() {
    return treatment;
  }
  public void setTreatment(String treatment) {
    this.treatment = treatment;
  }

  @Column(name = "F_REMARK", length = 4000)
  @NullableSize(max = 1333)
  public String getRemark() {
    return remark;
  }
  public void setRemark(String remark) {
    this.remark = remark;
  }

  @ManyToOne
  @JoinColumn(name = "F_SYSPERMISSIONCHECK_ID" )
  public SysPermissionCheck getSysPermissionCheck() {
    return sysPermissionCheck;
  }
  public void setSysPermissionCheck(SysPermissionCheck sysPermissionCheck) {
    this.sysPermissionCheck = sysPermissionCheck;
  }
}
