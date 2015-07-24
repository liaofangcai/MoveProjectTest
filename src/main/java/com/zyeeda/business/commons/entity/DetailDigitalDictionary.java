package com.zyeeda.business.commons.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;

/**
 * 数字字典明细
 *
 * $Autuor$
 */
@Entity
@Table(name = "BZ_DETAIL_DIGITAL_DICTIONARY")
@Scaffold("/dictionary/detail-dictionary")
public class DetailDigitalDictionary extends RevisionDomainEntity{

	/**
     * 序列化
     */
    private static final long serialVersionUID = -6202199916880791700L;

    /**
     * 名称
     */
	private String name;

	/**
     * 值
     */
	private Integer value;

	/**
     * 缺陷等级
     */
	private String remark;

	/**
     * 主
     */
	private MainDigitalDictionary mainDigitalDictionary;

	@NotBlank
	@NullableSize(max = 166)
	@Column(name = "F_NAME", length = 300)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Range(max = 100)
	@Column(name = "F_VALUE")
	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	@ManyToOne
	@JoinColumn(name = "F_MAIN_DICTIONNARY_ID")
	public MainDigitalDictionary getMainDigitalDictionary() {
		return mainDigitalDictionary;
	}

	public void setMainDigitalDictionary(MainDigitalDictionary mainDigitalDictionary) {
		this.mainDigitalDictionary = mainDigitalDictionary;
	}

	@NullableSize(max = 166)
	@Column(name = "F_REMARK", length = 300)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}
