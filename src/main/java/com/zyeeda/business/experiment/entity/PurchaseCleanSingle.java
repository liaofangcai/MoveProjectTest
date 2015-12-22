package com.zyeeda.business.experiment.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.business.experiment.entity.PurchaseDetailed;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 * 采购单
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_EX_PURCHASE")
@Scaffold("/experiment/purchase_clean")
public class PurchaseCleanSingle extends RevisionDomainEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String purchaseNumber;
	/**
	 * 供应商名称
	 */
	private String seller;
	/**
	 * 联系人
	 */
	private String sellerContacts;
	/**
	 * 需求方名称
	 */
	private String buyers;
	/**
	 * 联系人
	 */
	private String buyersContacts;
	/**
	 * 电话
	 */
	private String telephone;
	/**
	 * 联系电话;
	 */
	private String contactsNumber;
	/**
	 * 日期
	 */
	private Date purchaseDate;
	/**
	 * 交货日期
	 */
	private Date deliveryDate;
	/**
	 * 注备
	 */
	private String remanks;
	/**
	 * 申请人
	 */
	private String aplicationPreson;
	/**
	 * 部门主管
	 */
	private String deptDrictor;
	/**
	 * 采购
	 */
	private String purchase;
	/**
	 * 复核
	 */
	private String check;
	/**
	 * 总经理
	 */
	private String generalManager;
	/**
	 * 
	 * 与PurchaseDetailed关联
	 */
	private List<PurchaseDetailed> pude;
	
	
	@NotBlank
	@Column(name="F_PURCHASE_NUMBER",length=300)
	@NullableSize(max=100)
	public String getPurchaseNumber() {
		return purchaseNumber;
	}
	public void setPurchaseNumber(String purchaseNumber) {
		this.purchaseNumber = purchaseNumber;
	}
	
	@Column(name="F_SELLER",length=300)
	@NullableSize(max=100)
	public String getSeller() {
		return seller;
	}
	public void setSeller(String seller) {
		this.seller = seller;
	}
	
	@Column(name="F_SELLER_CONTACTS",length=300)
	@NullableSize(max=100)
	public String getSellerContacts() {
		return sellerContacts;
	}
	public void setSellerContacts(String sellerContacts) {
		this.sellerContacts = sellerContacts;
	}
	
	@Column(name="F_BUYERS",length=300)
	@NullableSize(max=100)
	public String getBuyers() {
		return buyers;
	}
	public void setBuyers(String buyers) {
		this.buyers = buyers;
	}
	
	@Column(name="F_BUYERS_CONTACTS",length=300)
	@NullableSize(max=100)
	public String getBuyersContacts() {
		return buyersContacts;
	}
	public void setBuyersContacts(String buyersContacts) {
		this.buyersContacts = buyersContacts;
	}
	
	@Column(name="F_TELEPHONE",length=300)
	@NullableSize(max=100)
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	@Column(name="F_CONTACTS_NUMBER",length=300)
	@NullableSize(max=100)
	public String getContactsNumber() {
		return contactsNumber;
	}
	public void setContactsNumber(String contactsNumber) {
		this.contactsNumber = contactsNumber;
	}
	
	@Column(name="F_PUR_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getPurchaseDate() {
		return purchaseDate;
	}
	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	
	@Column(name="F_AP_PRESON",length=300)
	@NullableSize(max=100)
	public String getAplicationPreson() {
		return aplicationPreson;
	}
	public void setAplicationPreson(String aplicationPreson) {
		this.aplicationPreson = aplicationPreson;
	}
	
	@Column(name="F_DEPT_DRICTOR",length=300)
	@NullableSize(max=100)
	public String getDeptDrictor() {
		return deptDrictor;
	}
	public void setDeptDrictor(String deptDrictor) {
		this.deptDrictor = deptDrictor;
	}
	
	@Column(name="F_PURCHASE",length=300)
	@NullableSize(max=100)
	public String getPurchase() {
		return purchase;
	}
	public void setPurchase(String purchase) {
		this.purchase = purchase;
	}
	
	@Column(name="F_CHECK",length=300)
	@NullableSize(max=100)
	public String getCheck() {
		return check;
	}
	public void setCheck(String check) {
		this.check = check;
	}
	
	@Column(name="F_GENERAL_MANAGER",length=300)
	@NullableSize(max=100)
	public String getGeneralManager() {
		return generalManager;
	}
	public void setGeneralManager(String generalManager) {
		this.generalManager = generalManager;
	}
	
	@Column(name="F_DELIVERY_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	
	@Column(name="F_REMANKS",length=300)
	@NullableSize(max=100)
	public String getRemanks() {
		return remanks;
	}
	public void setRemanks(String remanks) {
		this.remanks = remanks;
	}
	
	@OneToMany(mappedBy="pu",fetch=FetchType.LAZY)
	public List<PurchaseDetailed> getPude() {
		return pude;
	}
	public void setPude(List<PurchaseDetailed> pude) {
		this.pude = pude;
	}
}
