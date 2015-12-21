package com.zyeeda.business.experiment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 * 请购清单明细与PleaseEnoughData关联
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_EX_PLEASEEN_ENOUGH")
@Scaffold("/experiment/pleaseenoughdatum")
public class PleaseEnoughDatum extends RevisionDomainEntity{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1601826743757817338L;
	/**
	 * 物品名称
	 */
	private String goodsName;
	/**
	 * 规格型号
	 */
	private String standardModel;
	/**
	 * 单位
	 */
	private String company;
	/**
	 * 数量
	 */
	private Integer number;
	/**
	 * 预计价格
	 */
	private Double estimatePrice;
	/**
	 * 预计费用
	 */
	private Integer estimateCost;
	/**
	 * 与PleaseEnoughData关联
	 */
	private PleaseEnoughData ple;
	
	@NotBlank
    @Column(name = "F_GOODS_NAME", length = 300)
	@NullableSize(max = 100)
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	
	@Column(name = "F_STANDARD_MODEL", length = 300)
	@NullableSize(max = 100)
	public String getStandardModel() {
		return standardModel;
	}
	public void setStandardModel(String standardModel) {
		this.standardModel = standardModel;
	}
	
	@Column(name = "F_COMPANY", length = 300)
	@NullableSize(max = 100)
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	
	@Column(name = "F_NUMBER")
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	
	@Column(name = "F_ESTIMATE_PRICE", length = 300)
	@NullableSize(max = 100)
	public Double getEstimatePrice() {
		return estimatePrice;
	}
	public void setEstimatePrice(Double estimatePrice) {
		this.estimatePrice = estimatePrice;
	}
	
	@Column(name = "F_ESTIMATE_COST", length = 300)
	@NullableSize(max = 100)
	public Integer getEstimateCost() {
		return estimateCost;
	}
	public void setEstimateCost(Integer estimateCost) {
		this.estimateCost = estimateCost;
	}
	
	@ManyToOne
	@JoinColumn(name="F_PLEA_ID")
	public PleaseEnoughData getPle() {
		return ple;
	}
	public void setPle(PleaseEnoughData ple) {
		this.ple = ple;
	}
	
}
