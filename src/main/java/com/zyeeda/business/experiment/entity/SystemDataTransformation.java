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
@Table(name="BZ_SYS_DATA_TRANS")
@Scaffold("experiment/systemdatatransformation")
public class SystemDataTransformation extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 数据转换编号
	 */
	private String sysName;
	/**
	 * 制表日期
	 */
	private Date makeDate;
	/**
	 * 信息系统名称
	 */
	private String inSysName;
	/**
	 * 服务器
	 */
	private String server;
	/**
	 * 转换开始时间
	 */
	private Date tranStartData;
	/**
	 * 转换完成时间
	 */
	private Date tranCompleteData;
	/**
	 * 数据转换处理人
	 */
	private String dataTranHandle;
	/**
	 * 数据转换详情  
	 */
	private String dataConversionDetails;
	/**
	 * 验证内容
	 */
	private String validationContent;
	/**
	 * 验证结论
	 */
	private String validationConclusion;
	/**
	 * 验证人
	 */
	private String validationPerson;
	/**
	 * 验证时间  
	 */
	private Date validationData;
	
	@NotBlank
    @Column(name="F_SYS_NAME",length=300)
    @NullableSize(max=100)
	public String getSysName() {
		return sysName;
	}
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}
	
	@Column(name="F_MAKE_DATE",length=300)
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max=100)
	public Date getMakeDate() {
		return makeDate;
	}
	public void setMakeDate(Date makeDate) {
		this.makeDate = makeDate;
	}
	
	@Column(name="F_IN_SYS_NAME",length=300)
    @NullableSize(max=100)
	public String getInSysName() {
		return inSysName;
	}
	public void setInSysName(String inSysName) {
		this.inSysName = inSysName;
	}
	
	@Column(name="F_SERVER",length=300)
    @NullableSize(max=100)
	public String getServer() {
		return server;
	}
	public void setServer(String server) {
		this.server = server;
	}
	
	@Column(name="F_TRAN_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getTranStartData() {
		return tranStartData;
	}
	public void setTranStartData(Date tranStartData) {
		this.tranStartData = tranStartData;
	}
	
	@Column(name="F_COMPLETE_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getTranCompleteData() {
		return tranCompleteData;
	}
	public void setTranCompleteData(Date tranCompleteData) {
		this.tranCompleteData = tranCompleteData;
	}
	
	@Column(name="F_DATA_TRAN",length=300)
	@NullableSize(max=100)
	public String getDataTranHandle() {
		return dataTranHandle;
	}
	public void setDataTranHandle(String dataTranHandle) {
		this.dataTranHandle = dataTranHandle;
	}
	
	@Column(name="F_DATA_CONVERSION",length=300)
	@NullableSize(max=100)
	public String getDataConversionDetails() {
		return dataConversionDetails;
	}
	public void setDataConversionDetails(String dataConversionDetails) {
		this.dataConversionDetails = dataConversionDetails;
	}
	
	@Column(name="F_VALIDATION_CONTENT",length=500)
	@NullableSize(max=100)
	public String getValidationContent() {
		return validationContent;
	}
	public void setValidationContent(String validationContent) {
		this.validationContent = validationContent;
	}
	
	@Column(name="F_VALIVATION_CON",length=500)
	@NullableSize(max=166)
	public String getValidationConclusion() {
		return validationConclusion;
	}
	public void setValidationConclusion(String validationConclusion) {
		this.validationConclusion = validationConclusion;
	}
	
	@Column(name="F_VALITATION_PERSON",length=300)
	@NullableSize(max=100)
	public String getValidationPerson() {
		return validationPerson;
	}
	public void setValidationPerson(String validationPerson) {
		this.validationPerson = validationPerson;
	}
	
	@Column(name="F_VALIDATION")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getValidationData() {
		return validationData;
	}
	public void setValidationData(Date validationData) {
		this.validationData = validationData;
	}
}
