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
 * 系统(主机)更新记录
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_SYS_HOST_REPLACE")
@Scaffold("experiment/syshostreplace")
public class SysHostReplace extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String sysNumber;
	/**
	 * 系统名称
	 */
	private String sysName; 
	/**
	 * 主机名称
	 */
    private String hostNmae;
    /**
     * 主机地址
     */
    private String hostUrl;
    /**
     * 操作人
     */
    private String operationPerson;
    /**
     * 操作时间
     */
    private Date operationDate;
    /**
     * 更新内容
     */
    private String updateContent;
    /**
     * 备注
     */
    private String remarks;
    
    
    @NotBlank
 	@Column(name="F_SYS_NUMBER",length=300)
 	@NullableSize(max=100)
	public String getSysNumber() {
		return sysNumber;
	}
	public void setSysNumber(String sysNumber) {
		this.sysNumber = sysNumber;
	}
	
	@Column(name="F_HOST_NAME",length=300)
 	@NullableSize(max=100)
	public String getHostNmae() {
		return hostNmae;
	}
	public void setHostNmae(String hostNmae) {
		this.hostNmae = hostNmae;
	}
	
	@Column(name="F_HOST_URL",length=300)
 	@NullableSize(max=100)
	public String getHostUrl() {
		return hostUrl;
	}
	public void setHostUrl(String hostUrl) {
		this.hostUrl = hostUrl;
	}
	
	@Column(name="F_OPERATION_PERSON",length=300)
 	@NullableSize(max=100)
	public String getOperationPerson() {
		return operationPerson;
	}
	public void setOperationPerson(String operationPerson) {
		this.operationPerson = operationPerson;
	}
	
	@Column(name="F_OPERATION_DATE",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
 	@NullableSize(max=100)
	public Date getOperationDate() {
		return operationDate;
	}
	public void setOperationDate(Date operationDate) {
		this.operationDate = operationDate;
	}
	
	@Column(name="F_UPDATE_CONTENT",length=2000)
 	@NullableSize(max=666)
	public String getUpdateContent() {
		return updateContent;
	}
	public void setUpdateContent(String updateContent) {
		this.updateContent = updateContent;
	}
	
	@Column(name="F_REMANKS",length=2000)
 	@NullableSize(max=666)
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	@Column(name="F_SYS_NAME",length=300)
 	@NullableSize(max=100)
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
}
