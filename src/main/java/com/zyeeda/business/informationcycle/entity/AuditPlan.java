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
@Table(name = "BZ_INFORMATIONCYCLE_AUDITPLAN")
@Scaffold("/informationcycle/auditplan")
public class AuditPlan extends RevisionDomainEntity{
  /**
   * 计划单号
   */
  private String planNum;
  /**
   * 计划名称
   */
  private String planName;
  /**
   * 年度
   */
  private String years;
  /**
   * 部门
   */
  private Department department;
  /**
   * 填写人
   */
  private String writer;
  /**
   * 填写日期
   */
  private Date writeDate;
  /**
   * 部门主管
   */
  private String manager;
  /**
   * 执行稽核人员
   */
  private String executeMan;
  /**
   * 备注
   */
  private String remark;
  /**
   * 稽核明细
   */
  private List<AuditPlanDetail> auditPlanDetails;

  @Column(name = "F_PLAN_NUM", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getPlanNum() {
    return planNum;
  }
  public void setPlanNum(String planNum) {
    this.planNum = planNum;
  }

  @Column(name = "F_PLAN_NAME", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getPlanName() {
    return planName;
  }
  public void setPlanName(String planName) {
    this.planName = planName;
  }

  @Column(name = "F_YEARS", length = 500)
  @NullableSize(max = 166)
  public String getYears() {
    return years;
  }
  public void setYears(String years) {
    this.years = years;
  }

  @ManyToOne
  @JoinColumn(name = "F_DEPARTMENT_ID")
  public Department getDepartment() {
    return department;
  }

  public void setDepartment(Department department) {
    this.department = department;
  }

  @Column(name = "F_WRITER", length = 500)
  @NullableSize(max = 166)
  public String getWriter() {
    return writer;
  }
  public void setWriter(String writer) {
    this.writer = writer;
  }

  @Column(name = "F_WRITEDATE")
  @Temporal(TemporalType.DATE)
  public Date getWriteDate() {
    return writeDate;
  }
  public void setWriteDate(Date writeDate) {
    this.writeDate = writeDate;
  }

  @Column(name = "F_MANAGER", length = 500)
  @NullableSize(max = 166)
  public String getManager() {
    return manager;
  }
  public void setManager(String manager) {
    this.manager = manager;
  }

  @Column(name = "F_EXECUTEMAN", length = 500)
  @NullableSize(max = 166)
  public String getExecuteMan() {
    return executeMan;
  }
  public void setExecuteMan(String executeMan) {
    this.executeMan = executeMan;
  }

  @Column(name = "F_REMARK", length = 4000)
  @NullableSize(max = 1333)
  public String getRemark() {
    return remark;
  }
  public void setRemark(String remark) {
    this.remark = remark;
  }

  @OneToMany(mappedBy = "auditPlan")
  public List<AuditPlanDetail> getAuditPlanDetails() {
    return auditPlanDetails;
  }
  public void setAuditPlanDetails(List<AuditPlanDetail> auditPlanDetails) {
    this.auditPlanDetails = auditPlanDetails;
  }
}
