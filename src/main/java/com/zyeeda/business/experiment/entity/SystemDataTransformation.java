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
 * 系统数据转换确认
 * @author luohaibo
 *
 */
@Entity
@Table(name="bz_system_data_transformation")
@Scaffold("experiment/systemdatatransformation")
public class SystemDataTransformation extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 数据转换编号
	 */
	private String sys_no;
	/**
	 * 制表日期
	 */
	private Date make_date;
	/**
	 * 信息系统名称
	 */
	private String in_sys_name;
	/**
	 * 服务器
	 */
	private String server;
	/**
	 * 转换开始时间
	 */
	private Date tran_start_data;
	/**
	 * 转换完成时间
	 */
	private Date tran_complete_data;
	/**
	 * 数据转换处理人
	 */
	private String data_tran_handle;
	/**
	 * 数据转换详情  
	 */
	private String data_conversion_details;
	/**
	 * 验证内容
	 */
	private String validation_content;
	/**
	 * 验证结论
	 */
	private String validation_conclusion;
	/**
	 * 验证人
	 */
	private String validation_person;
	/**
	 * 验证时间  
	 */
	private Date validation_data;
	
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
	
	@Column(name="in_sys_name",length=300)
	@NullableSize(max=166)
	public String getIn_sys_name() {
		return in_sys_name;
	}
	public void setIn_sys_name(String in_sys_name) {
		this.in_sys_name = in_sys_name;
	}
	
	@Column(name="server",length=300)
	@NullableSize(max=166)
	public String getServer() {
		return server;
	}
	public void setServer(String server) {
		this.server = server;
	}
	
	@Column(name="tran_start_data",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=166)
	public Date getTran_start_data() {
		return tran_start_data;
	}
	public void setTran_start_data(Date tran_start_data) {
		this.tran_start_data = tran_start_data;
	}

	@Column(name="tran_complete_data",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=166)
	public Date getTran_complete_data() {
		return tran_complete_data;
	}
	public void setTran_complete_data(Date tran_complete_data) {
		this.tran_complete_data = tran_complete_data;
	}
	
	
	@Column(name="data_tran_handle",length=300)
	@NullableSize(max=166)
	public String getData_tran_handle() {
		return data_tran_handle;
	}
	public void setData_tran_handle(String data_tran_handle) {
		this.data_tran_handle = data_tran_handle;
	}
	
	@Column(name="data_conversion_details",length=300)
	@NullableSize(max=166)
	public String getData_conversion_details() {
		return data_conversion_details;
	}
	public void setData_conversion_details(String data_conversion_details) {
		this.data_conversion_details = data_conversion_details;
	}
	
	@Column(name="validation_content",length=300)
	@NullableSize(max=166)
	public String getValidation_content() {
		return validation_content;
	}
	public void setValidation_content(String validation_content) {
		this.validation_content = validation_content;
	}
	
	@Column(name="validation_conclusion",length=300)
	@NullableSize(max=166)
	public String getValidation_conclusion() {
		return validation_conclusion;
	}
	public void setValidation_conclusion(String validation_conclusion) {
		this.validation_conclusion = validation_conclusion;
	}
	
	@Column(name="validation_person",length=300)
	@NullableSize(max=166)
	public String getValidation_person() {
		return validation_person;
	}
	public void setValidation_person(String validation_person) {
		this.validation_person = validation_person;
	}
	
	@Column(name="validation_data",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=166)
	public Date getValidation_data() {
		return validation_data;
	}
	public void setValidation_data(Date validation_data) {
		this.validation_data = validation_data;
	}
	
	
}
