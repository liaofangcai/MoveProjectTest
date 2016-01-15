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
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "BZ_INFORMATIONCYCLE_YEARSBUDGET_DETAIL")
@Scaffold("/informationcycle/yearsbudget-detail")
public class YearsBudgetDetail extends RevisionDomainEntity{
  /**
   * 需求说明
   */
  private String demandExplain;
  /**
   * 一月
   */
  private Double january;
  /**
   * 二月
   */
  private Double february;
  /**
   * 三月
   */
  private Double march;
  /**
   * 四月
   */
  private Double april;
  /**
   * 五月
   */
  private Double may;
  /**
   * 六月
   */
  private Double june;
  /**
   * 七月
   */
  private Double july;
  /**
   * 八月
   */
  private Double august;
  /**
   * 九月
   */
  private Double september;
  /**
   * 十月
   */
  private Double october;
  /**
   * 十一月
   */
  private Double november;
  /**
   * 十二月
   */
  private Double december;
  /**
   * 合计
   */
  private Double total;
  /**
   * 销售订单
   */
  private YearsBudget yearsBudget;

  @Column(name = "F_DEMANDEXPLAIN", length = 500)
  @NotNull
  @NullableSize(max = 166)
  public String getDemandExplain() {
    return demandExplain;
  }
  public void setDemandExplain(String demandExplain) {
    this.demandExplain = demandExplain;
  }

  @Column(name = "F_JANUARY", length = 20)
  @Min(value = 0)
  public Double getJanuary() {
    return january;
  }
  public void setJanuary(Double january) {
    this.january = january;
  }

  @Column(name = "F_FEBRUARY", length = 20)
  @Min(value = 0)
  public Double getFebruary() {
    return february;
  }
  public void setFebruary(Double february) {
    this.february = february;
  }

  @Column(name = "F_MARCH", length = 20)
  @Min(value = 0)
  public Double getMarch() {
    return march;
  }
  public void setMarch(Double march) {
    this.march = march;
  }

  @Column(name = "F_APRIL", length = 20)
  @Min(value = 0)
  public Double getApril() {
    return april;
  }
  public void setApril(Double april) {
    this.april = april;
  }

  @Column(name = "F_MAY", length = 20)
  @Min(value = 0)
  public Double getMay() {
    return may;
  }
  public void setMay(Double may) {
    this.may = may;
  }

  @Column(name = "F_JUNE", length = 20)
  @Min(value = 0)
  public Double getJune() {
    return june;
  }
  public void setJune(Double june) {
    this.june = june;
  }

  @Column(name = "F_JULY", length = 20)
  @Min(value = 0)
  public Double getJuly() {
    return july;
  }
  public void setJuly(Double july) {
    this.july = july;
  }

  @Column(name = "F_AUGUST", length = 20)
  @Min(value = 0)
  public Double getAugust() {
    return august;
  }
  public void setAugust(Double august) {
    this.august = august;
  }

  @Column(name = "F_SEPTEMBER", length = 20)
  @Min(value = 0)
  public Double getSeptember() {
    return september;
  }
  public void setSeptember(Double september) {
    this.september = september;
  }

  @Column(name = "F_OCTOBER", length = 20)
  @Min(value = 0)
  public Double getOctober() {
    return october;
  }
  public void setOctober(Double october) {
    this.october = october;
  }

  @Column(name = "F_NOVEMBER", length = 20)
  @Min(value = 0)
  public Double getNovember() {
    return november;
  }
  public void setNovember(Double november) {
    this.november = november;
  }

  @Column(name = "F_DECEMBER", length = 20)
  @Min(value = 0)
  public Double getDecember() {
    return december;
  }
  public void setDecember(Double december) {
    this.december = december;
  }

  @Column(name = "F_TOTAL", length = 20)
  @Min(value = 0)
  public Double getTotal() {
    return total;
  }
  public void setTotal(Double total) {
    this.total = total;
  }

  @ManyToOne
  @JoinColumn(name = "F_YEARSBUDGET_ID" )
  public YearsBudget getYearsBudget() {
    return yearsBudget;
  }
  public void setYearsBudget(YearsBudget yearsBudget) {
    this.yearsBudget = yearsBudget;
  }
}
