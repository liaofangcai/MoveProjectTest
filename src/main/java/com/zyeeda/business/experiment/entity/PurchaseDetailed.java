package com.zyeeda.business.experiment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.business.experiment.entity.PurchaseCleanSingle;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 *
 * lhb
 *
 */
@Entity
@Table(name="BZ_EX_PURCHASE_DETA")
@Scaffold("/experiment/purchase-detailed")
public class PurchaseDetailed extends RevisionDomainEntity {
	/**
	 * 物品名称
	 */
	private String  goodsName;
	/**
	 * 型号规格
	 */
	private String modelStandard;
	/**
	 * 单位
	 */
	private String company;
	/**
	 * 数量
	 */
	private Integer number;
	/**
	 * 单价
	 */
	private Double univalent;
	/**
	 * 金额
	 */
	private Double money;
	/**
	 * 与PurchaseCleanSingle关联
	 */
	private PurchaseCleanSingle pu;

	@NotBlank
	@Column(name="F_GOODS_NAME",length=300)
	@NullableSize(max=100)
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	@Column(name="F_MODELSTANDARD",length=300)
	@NullableSize(max=100)
	public String getModelStandard() {
		return modelStandard;
	}
	public void setModelStandard(String modelStandard) {
		this.modelStandard = modelStandard;
	}

	@Column(name="F_COMPANY",length=300)
	@NullableSize(max=100)
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}

	@Column(name="F_NUMBER")
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}

	@Column(name="F_UNIVALENT")
	public Double getUnivalent() {
		return univalent;
	}
	public void setUnivalent(Double univalent) {
		this.univalent = univalent;
	}

	@Column(name="F_MONEY")
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}

	@ManyToOne
	@JoinColumn(name="F_PU_ID")
	public PurchaseCleanSingle getPu() {
		return pu;
	}
	public void setPu(PurchaseCleanSingle pu) {
		this.pu = pu;
	}
}
