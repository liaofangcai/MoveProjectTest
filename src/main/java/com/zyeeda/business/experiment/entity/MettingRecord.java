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
 * 会议记录
 * @author luohaibo
 *
 */
@Entity
@Table(name="BZ_EX_METTING_RECORD")
@Scaffold("/experiment/mettingrecord")
public class MettingRecord extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5947324107076373160L;
	/**
	 * 编号
	 */
	private String mettingNUmber;
	/**
	 * 会议日期
	 */
	private Date makeDate;
	/**
	 * 会议类别
	 */
	private String mettingType;
	/**
	 * 时间
	 */
	private Date mettingDate;
	/**
	 * 地点
	 */
	private String place;
	/**
	 * 参加人员
	 */
	private String joinPersonnel;
    /**
     * 会议纪要
     */
	private String settingSummary;
	/**
	 * 会议流程
	 */
	private String settingProcess;
	/**
	 * 交流内容及建议
	 */
	private String comContentSuggest;
	/**
	 * 会议总结
	 */
	private String settingSummarize;
	
	@NotBlank
	@Column(name="F_METTING_NUMBER",length=300)
	@NullableSize(max=100)
	public String getMettingNUmber() {
		return mettingNUmber;
	}
	public void setMettingNUmber(String mettingNUmber) {
		this.mettingNUmber = mettingNUmber;
	}
	
	@Column(name="F_MAKE_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getMakeDate() {
		return makeDate;
	}
	public void setMakeDate(Date makeDate) {
		this.makeDate = makeDate;
	}
	
	@Column(name="F_METTING_TYPE",length=300)
	@NullableSize(max=100)
	public String getMettingType() {
		return mettingType;
	}
	public void setMettingType(String mettingType) {
		this.mettingType = mettingType;
	}
	
	@Column(name="F_METTINGG_DATE")
	@JsonFormat(pattern="yyyy-MM-dd")
	public Date getMettingDate() {
		return mettingDate;
	}
	public void setMettingDate(Date mettingDate) {
		this.mettingDate = mettingDate;
	}
	
	@Column(name="F_PLACE",length=300)
	@NullableSize(max=100)
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	
	@Column(name="F_JOIN_PERSONNEL",length=300)
	@NullableSize(max=100)
	public String getJoinPersonnel() {
		return joinPersonnel;
	}
	public void setJoinPersonnel(String joinPersonnel) {
		this.joinPersonnel = joinPersonnel;
	}
	
	@Column(name="F_SETTING_SUMMARY",length=300)
	@NullableSize(max=100)
	public String getSettingSummary() {
		return settingSummary;
	}
	public void setSettingSummary(String settingSummary) {
		this.settingSummary = settingSummary;
	}
	
	@Column(name="F_SETTING_PRO",length=500)
	@NullableSize(max=166)
	public String getSettingProcess() {
		return settingProcess;
	}
	public void setSettingProcess(String settingProcess) {
		this.settingProcess = settingProcess;
	}
	
	@Column(name="F_COM_CONTENT",length=500)
	@NullableSize(max=166)
	public String getComContentSuggest() {
		return comContentSuggest;
	}
	public void setComContentSuggest(String comContentSuggest) {
		this.comContentSuggest = comContentSuggest;
	}
	
	@Column(name="F_SETTING_SU",length=500)
	@NullableSize(max=166)
	public String getSettingSummarize() {
		return settingSummarize;
	}
	public void setSettingSummarize(String settingSummarize) {
		this.settingSummarize = settingSummarize;
	}
}
