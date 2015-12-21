package com.zyeeda.business.experiment.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
/**
 * 请购单
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_EX_PLEASEENOUGHDATA")
@Scaffold("/experiment/pleaseenoughdata")
public class PleaseEnoughData extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 编号
	 */
	private String pleNo;
	/**
	 * 日期
	 */
	private Date pleData;
	/**
	 * 需求部门
	 */
	private String demanDept;
	/**
	 * 需求日期
	 */
	private Date demandDate;
	/**
	 * 需求原因
	 */
	private String demandReason;
	/**
	 * 申请人
	 */
	private String aplicationPerson;
	/**
	 * 部门主管
	 */
	private String director;
	/**
	 * 采购
	 */
	private String purchase;
	/**
	 * 复核
	 */
	private String check;
	/**
	 * 总经理
	 */
	private String generalMnager;
	/**
	 * 
	 * 与PleaseEnoughDatum关联
	 */
	private List<PleaseEnoughDatum>  please;
	
	
	@NotBlank
	@Column(name = "F_PLE_NO", length = 300)
    @NullableSize(max = 100)
	public String getPleNo() {
		return pleNo;
	}
	public void setPleNo(String pleNo) {
		this.pleNo = pleNo;
	}
	
	@Column(name = "F_PLE_DATA", length = 300)
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max = 100)
	public Date getPleData() {
		return pleData;
	}
	public void setPleData(Date pleData) {
		this.pleData = pleData;
	}
	
	@Column(name = "F_DEMAN_DEPT", length = 300)
    @NullableSize(max = 100)
	public String getDemanDept() {
		return demanDept;
	}
	public void setDemanDept(String demanDept) {
		this.demanDept = demanDept;
	}
	
	@Column(name = "F_DEMAND_DATE", length = 300)
	@JsonFormat(pattern="yyyy-MM-dd")
    @NullableSize(max = 100)
	public Date getDemandDate() {
		return demandDate;
	}
	public void setDemandDate(Date demandDate) {
		this.demandDate = demandDate;
	}
	
	@Column(name = "F_DEMAND_REASON", length = 300)
    @NullableSize(max = 100)
	public String getDemandReason() {
		return demandReason;
	}
	public void setDemandReason(String demandReason) {
		this.demandReason = demandReason;
	}
	
	@Column(name = "F_APLICATION_PERSON", length = 300)
    @NullableSize(max = 100)
	public String getAplicationPerson() {
		return aplicationPerson;
	}
	public void setAplicationPerson(String aplicationPerson) {
		this.aplicationPerson = aplicationPerson;
	}
	
	@Column(name = "F_DIRECTOR", length = 300)
    @NullableSize(max = 100)
	public String getDirector() {
		return director;
	}
	public void setDirector(String director) {
		this.director = director;
	}
	
	@Column(name = "F_PURCHASE", length = 300)
    @NullableSize(max = 100)
	public String getPurchase() {
		return purchase;
	}
	public void setPurchase(String purchase) {
		this.purchase = purchase;
	}
	
	@Column(name = "F_CHECK", length = 300)
    @NullableSize(max = 100)
	public String getCheck() {
		return check;
	}
	public void setCheck(String check) {
		this.check = check;
	}
	
	@Column(name = "F_GENERAL_MANAGER", length = 300)
    @NullableSize(max = 100)
	public String getGeneralMnager() {
		return generalMnager;
	}
	public void setGeneralMnager(String generalMnager) {
		this.generalMnager = generalMnager;
	}
	
	@OneToMany(mappedBy="ple",fetch=FetchType.LAZY)
	public List<PleaseEnoughDatum> getPlease() {
		return please;
	}
	public void setPlease(List<PleaseEnoughDatum> please) {
		this.please = please;
	}
}
