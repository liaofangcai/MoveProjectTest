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
@Table(name = "BZ_INFORMATIONCYCLE_YEARSBUDGET")
@Scaffold("/informationcycle/yearsbudget")
public class YearsBudget extends RevisionDomainEntity{
  /**
   * 计划单号
   */
  private String budgetNum;
  /**
   * 计划名称
   */
  private String budgetName;
  /**
   * 年度
   */
  private String years;
  /**
   * 部门
   */
  private Department department;
  /**
   * 预算合计
   */
  private Integer total;
  /**
   * 填写人
   */
  private String writer;
  /**
   * 填写日期
   */
  private Date writeDate;
  /**
   * 复核
   */
  private String reApproved;
  /**
   * 核准
   */
  private String approved;
  /**
   * 备注
   */
  private String remark;
  /**
   * 年度预算明细
   */
  private List<YearsBudgetDetail> yearsBudgetDetails;

  @Column(name = "F_BUDGET_NUM", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getBudgetNum() {
    return budgetNum;
  }
  public void setBudgetNum(String budgetNum) {
    this.budgetNum = budgetNum;
  }

  @Column(name = "F_BUDGET_NAME", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getBudgetName() {
    return budgetName;
  }
  public void setBudgetName(String budgetName) {
    this.budgetName = budgetName;
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

  @Column(name = "F_TOTAL", length = 20)
  @Min(value = 0)
  public Integer getTotal() {
    return total;
  }
  public void setTotal(Integer total) {
    this.total = total;
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

  @Column(name = "F_REAPPROVED", length = 500)
  @NullableSize(max = 166)
  public String getReApproved() {
    return reApproved;
  }
  public void setReApproved(String reApproved) {
    this.reApproved = reApproved;
  }

  @Column(name = "F_APPROVED", length = 500)
  @NullableSize(max = 166)
  public String getApproved() {
    return approved;
  }
  public void setApproved(String approved) {
    this.approved = approved;
  }

  @Column(name = "F_REMARK", length = 4000)
  @NullableSize(max = 1333)
  public String getRemark() {
    return remark;
  }
  public void setRemark(String remark) {
    this.remark = remark;
  }

  @OneToMany(mappedBy = "yearsBudget")
  public List<YearsBudgetDetail> getYearsBudgetDetails() {
    return yearsBudgetDetails;
  }
  public void setYearsBudgetDetails(List<YearsBudgetDetail> yearsBudgetDetails) {
    this.yearsBudgetDetails = yearsBudgetDetails;
  }
}
