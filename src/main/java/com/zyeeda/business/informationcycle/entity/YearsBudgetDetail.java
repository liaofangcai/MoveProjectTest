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
  private Integer january;
  /**
   * 二月
   */
  private Integer february;
  /**
   * 三月
   */
  private Integer march;
  /**
   * 四月
   */
  private Integer april;
  /**
   * 五月
   */
  private Integer may;
  /**
   * 六月
   */
  private Integer june;
  /**
   * 七月
   */
  private Integer july;
  /**
   * 八月
   */
  private Integer august;
  /**
   * 九月
   */
  private Integer september;
  /**
   * 十月
   */
  private Integer october;
  /**
   * 十一月
   */
  private Integer november;
  /**
   * 十二月
   */
  private Integer december;
  /**
   * 合计
   */
  private Integer total;
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
  public Integer getJanuary() {
    return january;
  }
  public void setJanuary(Integer january) {
    this.january = january;
  }

  @Column(name = "F_FEBRUARY", length = 20)
  @Min(value = 0)
  public Integer getFebruary() {
    return february;
  }
  public void setFebruary(Integer february) {
    this.february = february;
  }

  @Column(name = "F_MARCH", length = 20)
  @Min(value = 0)
  public Integer getMarch() {
    return march;
  }
  public void setMarch(Integer march) {
    this.march = march;
  }

  @Column(name = "F_APRIL", length = 20)
  @Min(value = 0)
  public Integer getApril() {
    return april;
  }
  public void setApril(Integer april) {
    this.april = april;
  }

  @Column(name = "F_MAY", length = 20)
  @Min(value = 0)
  public Integer getMay() {
    return may;
  }
  public void setMay(Integer may) {
    this.may = may;
  }

  @Column(name = "F_JUNE", length = 20)
  @Min(value = 0)
  public Integer getJune() {
    return june;
  }
  public void setJune(Integer june) {
    this.june = june;
  }

  @Column(name = "F_JULY", length = 20)
  @Min(value = 0)
  public Integer getJuly() {
    return july;
  }
  public void setJuly(Integer july) {
    this.july = july;
  }

  @Column(name = "F_AUGUST", length = 20)
  @Min(value = 0)
  public Integer getAugust() {
    return august;
  }
  public void setAugust(Integer august) {
    this.august = august;
  }

  @Column(name = "F_SEPTEMBER", length = 20)
  @Min(value = 0)
  public Integer getSeptember() {
    return september;
  }
  public void setSeptember(Integer september) {
    this.september = september;
  }

  @Column(name = "F_OCTOBER", length = 20)
  @Min(value = 0)
  public Integer getOctober() {
    return october;
  }
  public void setOctober(Integer october) {
    this.october = october;
  }

  @Column(name = "F_NOVEMBER", length = 20)
  @Min(value = 0)
  public Integer getNovember() {
    return november;
  }
  public void setNovember(Integer november) {
    this.november = november;
  }

  @Column(name = "F_DECEMBER", length = 20)
  @Min(value = 0)
  public Integer getDecember() {
    return december;
  }
  public void setDecember(Integer december) {
    this.december = december;
  }

  @Column(name = "F_TOTAL", length = 20)
  @Min(value = 0)
  public Integer getTotal() {
    return total;
  }
  public void setTotal(Integer total) {
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
