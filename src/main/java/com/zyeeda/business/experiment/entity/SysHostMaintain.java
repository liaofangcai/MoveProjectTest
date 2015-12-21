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
@Table(name="bz_sys_host_maintain")
@Scaffold("experiment/syshostmaintain")
public class SysHostMaintain extends RevisionDomainEntity{

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
	 * 维护日期
	 */
	private Date maintain_date;
    /**
     * 维护人
     */
    private String  maintion_person;
    /**
     * 主机名称
     */
    private String host_name;
    /**
     * 维护原因
     */
    private String maintion_reason;
    /**
     * 维护内容
     */
    private String maintion_content;
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
	@JsonFormat(pattern="yyyy-MM-dd")
 	@NullableSize(max=166)
	public Date getMake_date() {
		return make_date;
	}
	public void setMake_date(Date make_date) {
		this.make_date = make_date;
	}
	
	@Column(name="maintain_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
 	@NullableSize(max=166)
	public Date getMaintain_date() {
		return maintain_date;
	}
	public void setMaintain_date(Date maintain_date) {
		this.maintain_date = maintain_date;
	}
	
	@Column(name="maintion_person",length=300)
 	@NullableSize(max=166)
	public String getMaintion_person() {
		return maintion_person;
	}
	public void setMaintion_person(String maintion_person) {
		this.maintion_person = maintion_person;
	}
	
	@Column(name="host_name",length=300)
 	@NullableSize(max=166)
	public String getHost_name() {
		return host_name;
	}
	public void setHost_name(String host_name) {
		this.host_name = host_name;
	}
	
	@Column(name="maintion_peason",length=300)
 	@NullableSize(max=166)
	public String getMaintion_reason() {
		return maintion_reason;
	}
	public void setMaintion_reason(String maintion_reason) {
		this.maintion_reason = maintion_reason;
	}
	
	@Column(name="maintion_content",length=300)
 	@NullableSize(max=166)
	public String getMaintion_content() {
		return maintion_content;
	}
	public void setMaintion_content(String maintion_content) {
		this.maintion_content = maintion_content;
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
