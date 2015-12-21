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
 * 系统远程访问记录
 * @author luohaibo
 *
 */
@Entity
@Table(name="bz_system_remote_visit")
@Scaffold("experiment/systemremotevisit")
public class SystemRemoteVisit extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String vi_no;
	/**
	 * 申请日期
	 */
	private Date ap_date;
	/**
	 * 信息系统名称
	 */
	private String in_ap_name;
	/**
	 * 服务器地址
	 */
	private String server_url;
	/**
	 * 服务器用途
	 */
	private String server_uses;
	/**
	 * 访问原因
	 */
	private String visit_reason;
	/**
	 * 操作内容
	 */
	private String operation_content;
	/**
	 * 申请人
	 */
	private String ap_person;
	/**
	 * 申请部门
	 */
	private String ap_dept;
	/**
	 * 部门主管意见
	 */
	private String dept_charge_opinion;
	/**
	 * 日期
	 */
	private Date dept_date;
	/**
	 * 信息部门意见
	 */
	private String in_dept_opinion;
	/**
	 *日期
	 */
	private Date in_date;
	/**
	 * 公司领导审批
	 */
	private String company_leader;
	/**
	 * 日期
	 */
	private Date leader_date;
	
	@NotBlank
	@Column(name="vi_no",length=300)
	@NullableSize(max=166)
	public String getVi_no() {
		return vi_no;
	}
	public void setVi_no(String vi_no) {
		this.vi_no = vi_no;
	}
	
	@Column(name="ap_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=166)
	public Date getAp_date() {
		return ap_date;
	}
	public void setAp_date(Date ap_date) {
		this.ap_date = ap_date;
	}
	
	@Column(name="in_ap_name",length=300)
	@NullableSize(max=166)
	public String getIn_ap_name() {
		return in_ap_name;
	}
	public void setIn_ap_name(String in_ap_name) {
		this.in_ap_name = in_ap_name;
	}
	
	@Column(name="server_url",length=300)
	 @NullableSize(max=166)
	public String getServer_url() {
		return server_url;
	}
	public void setServer_url(String server_url) {
		this.server_url = server_url;
	}
	
	
	@Column(name="server_uses",length=300)
	@NullableSize(max=166)
	public String getServer_uses() {
		return server_uses;
	}
	public void setServer_uses(String server_uses) {
		this.server_uses = server_uses;
	}
	
	@Column(name="visit_reason",length=300)
	@NullableSize(max=166)
	public String getVisit_reason() {
		return visit_reason;
	}
	public void setVisit_reason(String visit_reason) {
		this.visit_reason = visit_reason;
	}
	
	@Column(name="operation_content",length=300)
	@NullableSize(max=166)
	public String getOperation_content() {
		return operation_content;
	}
	public void setOperation_content(String operation_content) {
		this.operation_content = operation_content;
	}
	
	@Column(name="ap_person",length=300)
	@NullableSize(max=166)
	public String getAp_person() {
		return ap_person;
	}
	public void setAp_person(String ap_person) {
		this.ap_person = ap_person;
	}
	
	@Column(name="ap_dept",length=300)
	@NullableSize(max=166)
	public String getAp_dept() {
		return ap_dept;
	}
	public void setAp_dept(String ap_dept) {
		this.ap_dept = ap_dept;
	}
	
	@Column(name="dept_charge_opinion",length=300)
	@NullableSize(max=166)
	public String getDept_charge_opinion() {
		return dept_charge_opinion;
	}
	public void setDept_charge_opinion(String dept_charge_opinion) {
		this.dept_charge_opinion = dept_charge_opinion;
	}
	
	@Column(name="dept_date",length=300)
	@NullableSize(max=166)
	public Date getDept_date() {
		return dept_date;
	}
	public void setDept_date(Date dept_date) {
		this.dept_date = dept_date;
	}
	
	@Column(name="in_dept_opinion",length=300)
	@NullableSize(max=166)
	public String getIn_dept_opinion() {
		return in_dept_opinion;
	}
	public void setIn_dept_opinion(String in_dept_opinion) {
		this.in_dept_opinion = in_dept_opinion;
	}
	
	@Column(name="in_date",length=300)
	@NullableSize(max=166)
	public Date getIn_date() {
		return in_date;
	}
	public void setIn_date(Date in_date) {
		this.in_date = in_date;
	}
	
	@Column(name="company_leader",length=300)
	@NullableSize(max=166)
	public String getCompany_leader() {
		return company_leader;
	}
	public void setCompany_leader(String company_leader) {
		this.company_leader = company_leader;
	}
	
	@Column(name="leader_date",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
	@NullableSize(max=166)
	public Date getLeader_date() {
		return leader_date;
	}
	public void setLeader_date(Date leader_date) {
		this.leader_date = leader_date;
	}
	
}
