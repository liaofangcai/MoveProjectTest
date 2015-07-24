package com.zyeeda.business.commons.entity;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;


/**
 *数字字典主类别
 *
 * $Autuor$
 */

@Entity
@Table(name = "BZ_MAIN_DIGITAL_DICTIONARY")
@Scaffold("/dictionary/main-dictionary")
public class MainDigitalDictionary extends RevisionDomainEntity {

	/**
     * 序列化
     */
    private static final long serialVersionUID = 1134970414030106069L;

    /**
     * 名称
     */
	private String name;

	/**
     * 标识
     */
	private String mark;

	/**
	 *明细
	 */
	private List<DetailDigitalDictionary> detailDigitalDictionarys = new ArrayList<DetailDigitalDictionary>();

	@NotBlank
	@NullableSize(max = 166)
	@Column(name = "F_NAME", length = 300)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@NotBlank
	@NullableSize(max = 166)
	@Column(name = "F_MARK", length = 300)
	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	@OneToMany(mappedBy = "mainDigitalDictionary")
	public List<DetailDigitalDictionary> getDetailDigitalDictionarys() {
		return detailDigitalDictionarys;
	}

	public void setDetailDigitalDictionarys(
			List<DetailDigitalDictionary> detailDigitalDictionarys) {
		this.detailDigitalDictionarys = detailDigitalDictionarys;
	}

}
