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
@Table(name = "BZ_INFORMATIONCYCLE_YEARPLAN")
@Scaffold("/informationcycle/yearsplan")
public class YearsPlan extends RevisionDomainEntity{
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
   * 目标（衡量指标）
   */
  private String goal;
  /**
   * 评估周期（月/季）
   */
  private String assessCycle;
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
   * 备注
   */
  private String remark;
  /**
   * 年度计划明细
   */
  private List<YearsPlanDetail> yearsPlanDetails;

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

  @Column(name = "F_GOAL", length = 500)
  @NullableSize(max = 166)
  public String getGoal() {
    return goal;
  }
  public void setGoal(String goal) {
    this.goal = goal;
  }

  @Column(name = "F_ASSESSCYCLE", length = 500)
  @NullableSize(max = 166)
  public String getAssessCycle() {
    return assessCycle;
  }
  public void setAssessCycle(String assessCycle) {
    this.assessCycle = assessCycle;
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

  @Column(name = "F_REMARK", length = 4000)
  @NullableSize(max = 1333)
  public String getRemark() {
    return remark;
  }
  public void setRemark(String remark) {
    this.remark = remark;
  }

  @OneToMany(mappedBy = "yearsPlan")
  public List<YearsPlanDetail> getYearsPlanDetails() {
    return yearsPlanDetails;
  }
  public void setYearsPlanDetails(List<YearsPlanDetail> yearsPlanDetails) {
    this.yearsPlanDetails = yearsPlanDetails;
  }
}
