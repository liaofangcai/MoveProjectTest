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
 * 系统主机维护记录
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_SYS_HOST_MAINTAIN")
@Scaffold("experiment/syshostmaintain")
public class SysHostMaintain extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String sysName;
	/**
	 * 制表日期
	 */
	private Date makeDate;
	/**
	 * 维护日期
	 */
	private Date maintainDate;
    /**
     * 维护人
     */
    private String  maintionPerson;
    /**
     * 主机名称
     */
    private String hostName;
    /**
     * 维护原因
     */
    private String maintionReason;
    /**
     * 维护内容
     */
    private String maintionContent;
    /**
     * 备注
     */
    private String remarks;
    
    @NotBlank
    @Column(name="F_SYS_NAME",length=300)
    @NullableSize(max=100)
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	
	@Column(name="F_MAKE_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max=100)
	public Date getMakeDate() {
		return makeDate;
	}
	public void setMakeDate(Date makeDate) {
		this.makeDate = makeDate;
	}
	
	@Column(name="F_MAINTAIN_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max=100)
	public Date getMaintainDate() {
		return maintainDate;
	}
	public void setMaintainDate(Date maintainDate) {
		this.maintainDate = maintainDate;
	}
	
	@Column(name="F_MAINTION_PERSON",length=300)
    @NullableSize(max=100)
	public String getMaintionPerson() {
		return maintionPerson;
	}
	public void setMaintionPerson(String maintionPerson) {
		this.maintionPerson = maintionPerson;
	}
	
	@Column(name="F_HOST_NAME",length=300)
    @NullableSize(max=100)
	public String getHostName() {
		return hostName;
	}
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}
	
	@Column(name="F_MAINTION_REASON",length=300)
    @NullableSize(max=100)
	public String getMaintionReason() {
		return maintionReason;
	}
	public void setMaintionReason(String maintionReason) {
		this.maintionReason = maintionReason;
	}
	
	@Column(name="F_MAINTION_CONTENT",length=300)
    @NullableSize(max=100)
	public String getMaintionContent() {
		return maintionContent;
	}
	public void setMaintionContent(String maintionContent) {
		this.maintionContent = maintionContent;
	}
	
	@Column(name="F_REMARKS",length=500)
    @NullableSize(max=166)
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
