package com.zyeeda.business.asset.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.persistence.Transient;
import javax.persistence.Temporal;
import javax.persistence.OrderBy;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.NotBlank;


import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "bz_asset_manage")
@Scaffold("/asset/asset-manage")
public class AssetManage extends RevisionDomainEntity{
  /**
   * 序列化
   */
  private static final long serialVersionUID = 3728277543938624745L;
  /**
   * 资产编号
   */
  private String equipmentNo;
  /**
   *资产名称
   */
  private String equipmentName;
  /**
   * 规格型号
   */
  private String equipmentVersion;
  /**
   * 序列号
   */
  private String equipmentId;
  /**
   *生产厂家
   */
  private String manufacturer;
  /**
   * 单位
   */
  private String unit;
  /**
   *购置日期
   */
  private Date purchaseDate;
  /**
   *采购价格
   */
  private Double price;
  /**
   * 附件配备
   */
  private String attachment;
  /**
   * 供应商名称
   */
  private String providerName;
  /**
   * 供应商地址
   */
  private String providerAddress;
  /**
   *联系人
   */
  private String contacts;
  /**
   * 联系方式
   */
  private String phoneNum;
  /**
   *地点
   */
  private String address;
  /**
   * 状态(0:闲置，1:使用中，2:待维修，3:转移,4:报废)
   */
  private String status;
  /**
   * 备注;
   */
  private String remark;
  /**
   * 对应的assetStatus;
   */
  private List<AssetStatus>  assetStatus;
  /**
   *最近使用人（不存入数据库）
   */
  private String latelyUser;


  @NotBlank
  @Column(name = "f_equipment_no", length = 300)
  @NullableSize(max = 166)
	public String getEquipmentNo() {
		return equipmentNo;
	}
	public void setEquipmentNo(String equipmentNo) {
		this.equipmentNo = equipmentNo;
	}

  @NotBlank
  @Column(name = "f_equipment_name", length = 300)
  @NullableSize(max = 166)
	public String getEquipmentName() {
		return equipmentName;
	}
	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}


  @NotBlank
  @Column(name = "f_equipment_version", length = 300)
  @NullableSize(max = 166)
	public String getEquipmentVersion() {
		return equipmentVersion;
	}
	public void setEquipmentVersion(String equipmentVersion) {
		this.equipmentVersion = equipmentVersion;
	}


  @Column(name = "f_equipment_id", length = 300)
  @NullableSize(max = 166)
	public String getEquipmentId() {
		return equipmentId;
	}
	public void setEquipmentId(String equipmentId) {
		this.equipmentId = equipmentId;
	}

  @Column(name = "f_manufacturer", length = 300)
  @NullableSize(max = 166)
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

  @NotBlank
  @Column(name = "f_unit", length = 300)
  @NullableSize(max = 166)
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}

  @NotNull
  @Column(name = "f_purchasedate")
  @Temporal(TemporalType.DATE)
	public Date getPurchaseDate() {
		return purchaseDate;
	}
	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

  @Column(name = "f_price", length = 20)
  @Min(value = 0)
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}

  @Column(name = "f_attachment", length = 300)
  @NullableSize(max = 166)
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

  @Column(name = "f_provider_name", length = 300)
  @NullableSize(max = 166)
	public String getProviderName() {
		return providerName;
	}
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

  @Column(name = "f_provider_address", length = 300)
  @NullableSize(max = 166)
	public String getProviderAddress() {
		return providerAddress;
	}
	public void setProviderAddress(String providerAddress) {
		this.providerAddress = providerAddress;
	}

  @Column(name = "f_contacts", length = 300)
  @NullableSize(max = 166)
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

  @Column(name = "f_phone_num", length = 300)
  @NullableSize(max = 166)
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

  @Column(name = "f_address", length = 300)
  @NullableSize(max = 166)
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

  @NotBlank
  @Column(name = "f_status", length = 300)
  @NullableSize(max = 166)
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

  @Column(name = "f_remark", length = 300)
  @NullableSize(max = 166)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

  @OneToMany(mappedBy = "assetManage", fetch = FetchType.LAZY)
  @OrderBy("startDate DESC")
	public List<AssetStatus> getAssetStatus() {
		return assetStatus;
	}
	public void setAssetStatus(List<AssetStatus> assetStatus) {
		this.assetStatus = assetStatus;
	}

  @Transient
  public String getLatelyUser(){
    if(null != assetStatus && !assetStatus.isEmpty()){
      latelyUser = assetStatus.get(0).getUserName();
    }
    System.out.print("assetStatus ========" + assetStatus);
    return latelyUser;
  }
  public void setLatelyUser(String latelyUser){
    this.latelyUser = latelyUser;
  }

}
