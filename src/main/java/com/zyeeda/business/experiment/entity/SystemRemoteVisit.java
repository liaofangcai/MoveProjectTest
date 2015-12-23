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
@Table(name="BZ_SYS_REMOTE_VISIT")
@Scaffold("experiment/systemremotevisit")
public class SystemRemoteVisit extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String viNumber;
	/**
	 * 申请日期
	 */
	private Date apDate;
	/**
	 * 信息系统名称
	 */
	private String inApNmae;
	/**
	 * 服务器地址
	 */
	private String serverUrl;
	/**
	 * 服务器用途
	 */
	private String serverUses;
	/**
	 * 访问原因
	 */
	private String visitReason;
	/**
	 * 操作内容
	 */
	private String operationContent;
	/**
	 * 申请人
	 */
	private String apPerson;
	/**
	 * 申请部门
	 */
	private String apDept;
	/**
	 * 部门主管意见
	 */
	private String deptChargeOpinion;
	/**
	 * 日期
	 */
	private Date deptDate;
	/**
	 * 信息部门意见
	 */
	private String inDeptOpinion;
	/**
	 *日期
	 */
	private Date inDate;
	/**
	 * 公司领导审批
	 */
	private String companyLeader;
	/**
	 * 日期
	 */
	private Date leaderDate;
	
	@NotBlank
    @Column(name="F_VI_NUMBER",length=300)
    @NullableSize(max=100)
	public String getViNumber() {
		return viNumber;
	}
	public void setViNumber(String viNumber) {
		this.viNumber = viNumber;
	}
	
    @Column(name="F_AP_DATE")
    @JsonFormat(pattern="yyyy-MM-dd")
	public Date getApDate() {
		return apDate;
	}
	public void setApDate(Date apDate) {
		this.apDate = apDate;
	}
	
	@Column(name="F_IN_AP_NAME",length=300)
    @NullableSize(max=100)
	public String getInApNmae() {
		return inApNmae;
	}
	public void setInApNmae(String inApNmae) {
		this.inApNmae = inApNmae;
	}
	
	@Column(name="F_SERVER_URL",length=300)
	@NullableSize(max=100)
	public String getServerUrl() {
		return serverUrl;
	}
	public void setServerUrl(String serverUrl) {
		this.serverUrl = serverUrl;
	}
	
	@Column(name="F_SERVER_USES",length=300)
	@NullableSize(max=100)
	public String getServerUses() {
		return serverUses;
	}
	public void setServerUses(String serverUses) {
		this.serverUses = serverUses;
	}
	
	@Column(name="F_VI_REASON",length=500)
	@NullableSize(max=166)
	public String getVisitReason() {
		return visitReason;
	}
	public void setVisitReason(String visitReason) {
		this.visitReason = visitReason;
	}
	
    @Column(name="F_OP_CONTENT",length=500)
	@NullableSize(max=166)
	public String getOperationContent() {
		return operationContent;
	}
	public void setOperationContent(String operationContent) {
		this.operationContent = operationContent;
	}
	
	@Column(name="F_AP_PERSOM",length=300)
	@NullableSize(max=100)
	public String getApPerson() {
		return apPerson;
	}
	public void setApPerson(String apPerson) {
		this.apPerson = apPerson;
	}
	
	@Column(name="F_AP_DEPT",length=300)
	@NullableSize(max=100)
	public String getApDept() {
		return apDept;
	}
	public void setApDept(String apDept) {
		this.apDept = apDept;
	}
	
	@Column(name="F_DEPT_CH",length=300)
	@NullableSize(max=100)
	public String getDeptChargeOpinion() {
		return deptChargeOpinion;
	}
	public void setDeptChargeOpinion(String deptChargeOpinion) {
		this.deptChargeOpinion = deptChargeOpinion;
	}
	
	@Column(name="F_DEPT_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getDeptDate() {
		return deptDate;
	}
	public void setDeptDate(Date deptDate) {
		this.deptDate = deptDate;
	}
	
	@Column(name="F_IN_DEPT_OP",length=300)
	@NullableSize(max=100)
	public String getInDeptOpinion() {
		return inDeptOpinion;
	}
	public void setInDeptOpinion(String inDeptOpinion) {
		this.inDeptOpinion = inDeptOpinion;
	}
	
	@Column(name="F_IN_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getInDate() {
		return inDate;
	}
	public void setInDate(Date inDate) {
		this.inDate = inDate;
	}
	
	@Column(name="F_CPMPANY_LEANDER",length=300)
	@NullableSize(max=100)
	public String getCompanyLeader() {
		return companyLeader;
	}
	public void setCompanyLeader(String companyLeader) {
		this.companyLeader = companyLeader;
	}
	
	@Column(name="F_LEADER_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getLeaderDate() {
		return leaderDate;
	}
	public void setLeaderDate(Date leaderDate) {
		this.leaderDate = leaderDate;
	}
	
}
