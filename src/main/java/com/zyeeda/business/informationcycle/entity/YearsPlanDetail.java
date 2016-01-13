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
@Table(name = "BZ_INFORMATIONCYCLE_YEARPLAN_DETAIL")
@Scaffold("/informationcycle/yearsplan-detail")
public class YearsPlanDetail extends RevisionDomainEntity{
  /**
   * 重点工作项目
   */
  private String emphasisWork;
  /**
   * 专案负责人
   */
  private String principal;
  /**
   * 预定完成日期
   */
  private Date forecastedDate;
  /**
   * 其他说明
   */
  private String remark;
  /**
   * 销售订单
   */
  private YearsPlan yearsPlan;

  @Column(name = "F_EMPHASISWORK", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getEmphasisWork() {
    return emphasisWork;
  }
  public void setEmphasisWork(String emphasisWork) {
    this.emphasisWork = emphasisWork;
  }

  @Column(name = "F_PRINCIPAL", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getPrincipal() {
    return principal;
  }
  public void setPrincipal(String principal) {
    this.principal = principal;
  }

  @Column(name = "F_FORECASTEDDATE")
  @Temporal(TemporalType.DATE)
  public Date getForecastedDate() {
    return forecastedDate;
  }
  public void setForecastedDate(Date forecastedDate) {
    this.forecastedDate = forecastedDate;
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
  @JoinColumn(name = "F_YEARSPLAN_ID" )
  public YearsPlan getYearsPlan() {
    return yearsPlan;
  }
  public void setYearsPlan(YearsPlan yearsPlan) {
    this.yearsPlan = yearsPlan;
  }
}
