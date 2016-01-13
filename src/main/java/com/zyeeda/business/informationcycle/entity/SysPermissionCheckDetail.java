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
import javax.validation.constraints.Min;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "BZ_INFORMATIONCYCLE_SYSPERMISSIONCHECK_DETAIL")
@Scaffold("/informationcycle/syspermissioncheck-detail")
public class SysPermissionCheckDetail extends RevisionDomainEntity{
  /**
   * 账号名称
   */
  private String accountName;
  /**
   * 用户名称
   */
  private String userName;
  /**
   * 账户类型
   */
  private String accountType;
  /**
   * 开始日期
   */
  private Date startDate;
  /**
   * 是否仍在使用
   */
  private String ifInUse;
  /**
   * 备注
   */
  private String remark;
  /**
   * 系统账户权限清查
   */
  private SysPermissionCheck sysPermissionCheck;

  @Column(name = "F_ACCOUNTNAME", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getAccountName() {
    return accountName;
  }
  public void setAccountName(String accountName) {
    this.accountName = accountName;
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

  @Column(name = "F_ACCOUNTTYPE", length = 500)
  @NullableSize(max = 166)
  public String getAccountType() {
    return accountType;
  }
  public void setAccountType(String accountType) {
    this.accountType = accountType;
  }

  @Column(name = "F_STARTDATE")
  @Temporal(TemporalType.DATE)
  public Date getStartDate() {
    return startDate;
  }
  public void setStartDate(Date startDate) {
    this.startDate = startDate;
  }

  @Column(name = "F_REMARK", length = 4000)
  @NullableSize(max = 1333)
  public String getRemark() {
    return remark;
  }
  public void setRemark(String remark) {
    this.remark = remark;
  }

  @Column(name = "F_IFINUSE", length = 500)
  @NullableSize(max = 166)
  public String getIfInUse() {
    return ifInUse;
  }
  public void setIfInUse(String ifInUse) {
    this.ifInUse = ifInUse;
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
