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
@Table(name = "BZ_INFORMATIONCYCLE_AUDITPLAN_DETAIL")
@Scaffold("/informationcycle/auditplan-detail")
public class AuditPlanDetail extends RevisionDomainEntity{
  /**
   * 稽核编号
   */
  private String auditNum;
  /**
   * 稽核项目
   */
  private String auditProject;
  /**
   * 预定稽核期间
   */
  private String auditDate;
  /**
   * 实际稽核开始日期
   */
  private Date auditStartDate;
  /**
   * 实际稽核结束日期
   */
  private Date auditEndDate;
  /**
   * 内部控制缺失及异常事项
   */
  private String interiorMatter;
  /**
   * 应行处理措施及改善计划
   */
  private String measuresAndPlan;
  /**
   * 备注
   */
  private String remark;
  /**
   * 稽核计划
   */
  private AuditPlan auditPlan;

  @Column(name = "F_AUDITNUM", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getAuditNum() {
    return auditNum;
  }
  public void setAuditNum(String auditNum) {
    this.auditNum = auditNum;
  }

  @Column(name = "F_AUDITPROJECT", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getAuditProject() {
    return auditProject;
  }
  public void setAuditProject(String auditProject) {
    this.auditProject = auditProject;
  }

  @Column(name = "F_AUDITDATE", length = 500)
  @NullableSize(max = 166)
  public String getAuditDate() {
    return auditDate;
  }
  public void setAuditDate(String auditDate) {
    this.auditDate = auditDate;
  }

  @Column(name = "F_AUDITSTARTDATE")
  @Temporal(TemporalType.DATE)
  public Date getAuditStartDate() {
    return auditStartDate;
  }
  public void setAuditStartDate(Date auditStartDate) {
    this.auditStartDate = auditStartDate;
  }

  @Column(name = "F_AUDITENDDATE")
  @Temporal(TemporalType.DATE)
  public Date getAuditEndDate() {
    return auditEndDate;
  }
  public void setAuditEndDate(Date auditEndDate) {
    this.auditEndDate = auditEndDate;
  }

  @Column(name = "F_INTERIORMATTER", length = 4000)
  @NullableSize(max = 1333)
  public String getInteriorMatter() {
    return interiorMatter;
  }
  public void setInteriorMatter(String interiorMatter) {
    this.interiorMatter = interiorMatter;
  }

  @Column(name = "F_MEASURESANDPLAN", length = 4000)
  @NullableSize(max = 1333)
  public String getMeasuresAndPlan() {
    return measuresAndPlan;
  }
  public void setMeasuresAndPlan(String measuresAndPlan) {
    this.measuresAndPlan = measuresAndPlan;
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
  @JoinColumn(name = "F_AUDITPLAN_ID" )
  public AuditPlan getAuditPlan() {
    return auditPlan;
  }
  public void setAuditPlan(AuditPlan auditPlan) {
    this.auditPlan = auditPlan;
  }
}
