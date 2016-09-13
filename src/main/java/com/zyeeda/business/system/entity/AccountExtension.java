package com.zyeeda.erp.system.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.zyeeda.cdeio.commons.base.entity.DomainEntity;
import com.zyeeda.cdeio.commons.organization.entity.Account;

/**
 * 系统用户扩展信息
 *
 * $Autuor$
 */
@Entity
@Table(name = "ERP_SYSTEM_ACCOUNT_EXTENSION")
public class AccountExtension extends DomainEntity {

    /**
     * 序列化
     */
    private static final long serialVersionUID = -6923532807529113859L;

    /**
     * 系统用户实体
     */
    private Account account;

    /**
     * 数据权限级别.
     */
    private Integer dataLevel;

	@OneToOne
	@JoinColumn(name = "F_ACCOUNT_ID")
	public Account getAccount (){
		return account;
	}

	public void setAccount (Account account){
		this.account = account;
	}

	@Column(name = "F_DATA_LEVEL")
    public Integer getDataLevel() {
        return this.dataLevel;
    }

    public void setDataLevel(final Integer dataLevel) {
        this.dataLevel = dataLevel;
    }
}
