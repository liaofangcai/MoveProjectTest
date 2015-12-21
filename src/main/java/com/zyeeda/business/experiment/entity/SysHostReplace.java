package com.zyeeda.business.experiment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 * 系统(主机)更新记录
 * @author luohaibo
 *
 */
@Entity
@Table(name="bz_sys_host_replace")
@Scaffold("experiment/syshostreplace")
public class SysHostReplace extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String sys_no;
	/**
	 * 制表日期
	 */
	private Date make_date;
	/**
	 * 主机名称
	 */
    private String host_name;
    /**
     * 主机地址
     */
    private String host_url;
    /**
     * 操作人
     */
    private String operation_person;
    /**
     * 操作时间
     */
    private Date operation_date;
    /**
     * 更新内容
     */
    private String update_content;
    /**
     * 备注
     */
    private String remarks;
    
    @NotBlank
 	@Column(name="sys_no",length=300)
 	@NullableSize(max=166)
	public String getSys_no() {
		return sys_no;
	}
	public void setSys_no(String sys_no) {
		this.sys_no = sys_no;
	}
	
	@Column(name="make_date",length=300)
 	@NullableSize(max=166)
	public Date getMake_date() {
		return make_date;
	}
	public void setMake_date(Date make_date) {
		this.make_date = make_date;
	}
	
	@Column(name="host_name",length=300)
 	@NullableSize(max=166)
	public String getHost_name() {
		return host_name;
	}
	public void setHost_name(String host_name) {
		this.host_name = host_name;
	}
	
	@Column(name="host_url",length=300)
 	@NullableSize(max=166)
	public String getHost_url() {
		return host_url;
	}
	public void setHost_url(String host_url) {
		this.host_url = host_url;
	}
	
	@Column(name="operation_person",length=300)
 	@NullableSize(max=166)
	public String getOperation_person() {
		return operation_person;
	}
	public void setOperation_person(String operation_person) {
		this.operation_person = operation_person;
	}
	
	@Column(name="operation_date",length=300)
 	@NullableSize(max=166)
	public Date getOperation_date() {
		return operation_date;
	}
	public void setOperation_date(Date operation_date) {
		this.operation_date = operation_date;
	}
	
	@Column(name="update_content",length=300)
 	@NullableSize(max=166)
	public String getUpdate_content() {
		return update_content;
	}
	public void setUpdate_content(String update_content) {
		this.update_content = update_content;
	}
	
	@Column(name="remarks",length=300)
 	@NullableSize(max=166)
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
