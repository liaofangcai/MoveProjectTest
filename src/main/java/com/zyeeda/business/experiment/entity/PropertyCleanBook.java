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
 * @author child
 *
 */
@Entity
@Table(name="bz_property_clean_book")
@Scaffold("experiment/propertycleanbook")
public class PropertyCleanBook extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String property_no;
	/**
	 * 日期
	 */
	private Date  property_date;
    /**
     * 资产编号
     */
    private String property_number;
    /**
     * 资产名称
     */
    private String property_name;
    /**
     * 型号规格
     */
   private String modelnorms;
   /**
    * 保管人
    */
   private String safekeepingperson;
   /**
    * 生产厂家
    */
   private String producevender;
   /**
    * 单位
    */
   private String company;
   /**
    * 购置日期
    */
   private Date purchasedate;
   /**
    * 采购价格
    */
   private Integer purchaseprice;
   /**
    * 联系方式
    */
   private String contaceinformation;
   /**
    * 地点
    */
   private String site;
   /**
    * 备注
    */
   private String remark;
   
    @NotBlank
    @Column(name="property_no",length=300)
    @NullableSize(max=166)
	public String getProperty_no() {
		return property_no;
	}
	public void setProperty_no(String property_no) {
		this.property_no = property_no;
	}
	
	@Column(name="property_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max=166)
	public Date getProperty_date() {
		return property_date;
	}
	public void setProperty_date(Date property_date) {
		this.property_date = property_date;
	}
	
	@Column(name="property_number",length=300)
    @NullableSize(max=166)
	public String getProperty_number() {
		return property_number;
	}
	public void setProperty_number(String property_number) {
		this.property_number = property_number;
	}
	
	@Column(name="property_name",length=300)
    @NullableSize(max=166)
	public String getProperty_name() {
		return property_name;
	}
	public void setProperty_name(String property_name) {
		this.property_name = property_name;
	}
	
	@Column(name="model_norms",length=300)
    @NullableSize(max=166)
	public String getModelnorms() {
		return modelnorms;
	}
	public void setModelnorms(String modelnorms) {
		this.modelnorms = modelnorms;
	}
	
	@Column(name="safekeeping_person",length=300)
    @NullableSize(max=166)
	public String getSafekeepingperson() {
		return safekeepingperson;
	}
	public void setSafekeepingperson(String safekeepingperson) {
		this.safekeepingperson = safekeepingperson;
	}
	
	@Column(name="produc_evender",length=300)
    @NullableSize(max=166)
	public String getProducevender() {
		return producevender;
	}
	public void setProducevender(String producevender) {
		this.producevender = producevender;
	}
	
	@Column(name="company",length=300)
    @NullableSize(max=166)
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	
	
	@Column(name="purchase_price",length=300)
    @NullableSize(max=166)
	public Integer getPurchaseprice() {
		return purchaseprice;
	}
	public void setPurchaseprice(Integer purchaseprice) {
		this.purchaseprice = purchaseprice;
	}
	
	@Column(name="purchase_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max=166)
	public Date getPurchasedate() {
		return purchasedate;
	}
	public void setPurchasedate(Date purchasedate) {
		this.purchasedate = purchasedate;
	}
	
	
	@Column(name="contace_information",length=300)
    @NullableSize(max=166)
	public String getContaceinformation() {
		return contaceinformation;
	}
	public void setContaceinformation(String contaceinformation) {
		this.contaceinformation = contaceinformation;
	}
	
	@Column(name="site",length=300)
    @NullableSize(max=166)
	public String getSite() {
		return site;
	}
	public void setSite(String site) {
		this.site = site;
	}
	
	@Column(name="remark",length=300)
    @NullableSize(max=166)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
   
   
}
