package com.zyeeda.business.experiment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 * 资产清册
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_EX_PRO_CLEANBOOK")
@Scaffold("experiment/propertycleanbook")
public class PropertyCleanBook extends RevisionDomainEntity{

  private static final long serialVersionUID = 1L;
  /**
   *日期
   */
  private Date  propertyDate;
  /**
  * 资产编号
  */
  private String propertyNumber;
  /**
  * 资产名称
  */
  private String propertyName;
  /**
  * 型号规格
  */
  private String modelNorms;
  /**
  *保管人
  */
  private String safekeepingPerson;
  /**
  *生产厂家
  */
  private String produceVender;
  /**
  *单位
  */
  private String company;
  /**
  *购置日期
  */
  private Date purchaseDate;
  /**
  *采购价格
  */
  private Integer purchasePrice;
  /**
  *联系方式
  */
  private String contaceinFormation;
  /**
  *地点
  */
  private String site;
  /**
  *备注
  */
  private String remark; 
   
  @Column(name="F_PRO_DATE")
  @JsonFormat(pattern="yyyy-MM-dd")
  public Date getPropertyDate() {
  return propertyDate;
  }
  public void setPropertyDate(Date propertyDate) {
  this.propertyDate = propertyDate;
  }
   
  @Column(name="F_PRO_NUMber",length=300)
  @NullableSize(max=100)
  public String getPropertyNumber() {
  return propertyNumber;
  }
  public void setPropertyNumber(String propertyNumber) {
  this.propertyNumber = propertyNumber;
  }
   
  @Column(name="F_PRO_NAME",length=300)
  @NullableSize(max=100)
  public String getPropertyName() {
  return propertyName;
  }
  public void setPropertyName(String propertyName) {
  this.propertyName = propertyName;
  }
  
  @Column(name="F_MODEL_NORMS",length=300)
  @NullableSize(max=100)
  public String getModelNorms() {
  return modelNorms;
  }
  public void setModelNorms(String modelNorms) {
  this.modelNorms = modelNorms;
  }
   
  @Column(name="F_SAFE_PER",length=300)
  @NullableSize(max=100)
  public String getSafekeepingPerson() {
  return safekeepingPerson;
  }
  public void setSafekeepingPerson(String safekeepingPerson) {
  this.safekeepingPerson = safekeepingPerson;
  }
   
  @Column(name="F_PRO_VER",length=300)
  @NullableSize(max=100)
  public String getProduceVender() {
  return produceVender;
  }
  public void setProduceVender(String produceVender) {
  this.produceVender = produceVender;
  }
   
  @Column(name="F_COMPANY",length=300)
  @NullableSize(max=100)
  public String getCompany() {
  return company;
  }
  public void setCompany(String company) {
  this.company = company;
  }
   
  @Column(name="F_PUR_DATE")
  @JsonFormat(pattern="yyyy-MM-dd")
  public Date getPurchaseDate() {
  return purchaseDate;
  }
  public void setPurchaseDate(Date purchaseDate) {
  this.purchaseDate = purchaseDate; 
  }
   
  @Column(name="F_PUR_PRICE",length=300)
  @NullableSize(max=100)
  public Integer getPurchasePrice() {
  return purchasePrice;
  }
  public void setPurchasePrice(Integer purchasePrice) {
  this.purchasePrice = purchasePrice;
  }
   
  @Column(name="F_CONTA_FOR",length=300)
  @NullableSize(max=100)
  public String getContaceinFormation() {
  return contaceinFormation;
  }
  public void setContaceinFormation(String contaceinFormation) {
  this.contaceinFormation = contaceinFormation;
  }
   
  @Column(name="F_SITE",length=300)
  @NullableSize(max=100)
  public String getSite() {
  return site;
  }
  public void setSite(String site) {
  this.site = site;
  }
   
  @Column(name="F_REMARJ",length=300)
  @NullableSize(max=100)
  public String getRemark() {
  return remark;
  }
  public void setRemark(String remark) {
  this.remark = remark;
  }
}
