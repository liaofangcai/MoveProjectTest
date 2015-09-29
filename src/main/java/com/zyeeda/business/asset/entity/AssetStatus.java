package com.zyeeda.business.asset.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.ManyToOne;
import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;


@Entity
@Table(name = "bz_asset_status")
@Scaffold("/asset/asset-status")
public class AssetStatus extends RevisionDomainEntity{
  /**
   * 序列化
   */
  private static final long serialVersionUID = 3728277543938624745L;
  /**
   * 使用人
   */
  private String userName;
  /**
   * 开始时间
   */
  private Date startDate;
  /**
   *结束时间
   */
  private Date endDate;
  /**
   * 备注
   */
  private String remark;
  /**
   * 对应的assetManage
   */
  private AssetManage assetManage;

  @NotBlank
  @Column(name = "f_user_name", length = 300)
  @NullableSize(max = 166)
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

  @NotNull
  @Temporal(TemporalType.DATE)
  @Column(name = "f_start_date")
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

  @Temporal(TemporalType.DATE)
  @Column(name = "f_end_date")
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

  @Column(name = "f_remark", length = 300)
  @NullableSize(max = 166)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

  @ManyToOne
  @JoinColumn(name = "f_asset_manage_id")
	public AssetManage getAssetManage() {
		return assetManage;
	}
	public void setAssetManage(AssetManage assetManage) {
		this.assetManage = assetManage;
	}

}
