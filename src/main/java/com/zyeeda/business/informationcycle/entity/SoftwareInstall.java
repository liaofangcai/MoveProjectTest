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
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "BZ_INFORMATIONCYCLE_SOFTWAREINSTALL")
@Scaffold("/informationcycle/softwareinstall")
public class SoftwareInstall extends RevisionDomainEntity{
  /**
   * 清查单号
   */
  private String checkNum;
  /**
   * 清查名称
   */
  private String checkName;
  /**
   *系统名称
   */
  private String sysName;
  /**
   * 年度
   */
  private String years;
  /**
   * 检查人
   */
  private String checkMan;
  /**
   * 检查日期日期
   */
  private Date checkDate;
  /**
   * 部门主管
   */
  private String manager;
  /**
   * 备注
   */
  private String remark;
  /**
   * 系统账号权限清查明细
   */
  private List<SoftwareInstallDetail> softwareInstallDetails;

  @Column(name = "F_CHECK_NUM", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getCheckNum() {
    return checkNum;
  }
  public void setCheckNum(String checkNum) {
    this.checkNum = checkNum;
  }

  @Column(name = "F_CHECK_NAME", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getCheckName() {
    return checkName;
  }
  public void setCheckName(String checkName) {
    this.checkName = checkName;
  }

  @Column(name = "F_YEARS", length = 500)
  @NullableSize(max = 166)
  public String getYears() {
    return years;
  }
  public void setYears(String years) {
    this.years = years;
  }

  @Column(name = "F_SYSNAME", length = 500)
  @NullableSize(max = 166)
  public String getSysName() {
    return sysName;
  }
  public void setSysName(String sysName) {
    this.sysName = sysName;
  }

  @Column(name = "F_CHECKMAN", length = 500)
  @NullableSize(max = 166)
  public String getCheckMan() {
    return checkMan;
  }
  public void setCheckMan(String checkMan) {
    this.checkMan = checkMan;
  }

  @Column(name = "F_WRITEDATE")
  @Temporal(TemporalType.DATE)
  public Date getCheckDate() {
    return checkDate;
  }
  public void setCheckDate(Date checkDate) {
    this.checkDate = checkDate;
  }

  @Column(name = "F_MANAGER", length = 500)
  @NullableSize(max = 166)
  public String getManager() {
    return manager;
  }
  public void setManager(String manager) {
    this.manager = manager;
  }

  @Column(name = "F_REMARK", length = 4000)
  @NullableSize(max = 1333)
  public String getRemark() {
    return remark;
  }
  public void setRemark(String remark) {
    this.remark = remark;
  }

  @OneToMany(mappedBy = "sysPermissionCheck")
  public List<SoftwareInstallDetail> getSoftwareInstallDetails() {
    return softwareInstallDetails;
  }
  public void setSoftwareInstallDetails(List<SoftwareInstallDetail> softwareInstallDetails) {
    this.softwareInstallDetails = softwareInstallDetails;
  }
}
