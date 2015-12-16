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
 * @author child
 *
 */
@Entity
@Table(name="bz_metting_record")
@Scaffold("/experiment/mettingrecord")
public class MettingRecord extends RevisionDomainEntity{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5947324107076373160L;
	/**
	 * 编号
	 */
	private String metting_no;
	/**
	 * 会议日期
	 */
	private Date make_date;
	/**
	 * 会议类别
	 */
	private String metting_type;
	/**
	 * 时间
	 */
	private Date metting_date;
	/**
	 * 地点
	 */
	private String place;
	/**
	 * 参加人员
	 */
	private String join_personnel;
    /**
     * 会议纪要
     */
	private String setting_summary;
	/**
	 * 会议流程
	 */
	private String setting_process;
	/**
	 * 交流内容及建议
	 */
	private String com_content_suggest;
	/**
	 * 会议总结
	 */
	private String setting_summarize;
	
	@NotBlank
	@Column(name="metting_no",length=300)
	@NullableSize(max=166)
	public String getMetting_no() {
		return metting_no;
	}
	public void setMetting_no(String metting_no) {
		this.metting_no = metting_no;
	}
	
	@Column(name="make_date",length=300)
	@JsonFormat(pattern=("yyyy-MM-dd"))
	@NullableSize(max=166)
	public Date getMake_date() {
		return make_date;
	}
	public void setMake_date(Date make_date) {
		this.make_date = make_date;
	}
	
	@Column(name="metting_type",length=300)
	@NullableSize(max=166)
	public String getMetting_type() {
		return metting_type;
	}
	public void setMetting_type(String metting_type) {
		this.metting_type = metting_type;
	}
	
	@Column(name="metting_date",length=300)
	@JsonFormat(pattern=("yyyy-MM-dd"))
	@NullableSize(max=166)
	public Date getMetting_date() {
		return metting_date;
	}
	public void setMetting_date(Date metting_date) {
		this.metting_date = metting_date;
	}
	
	@Column(name="place",length=300)
	@NullableSize(max=166)
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	
	@Column(name="join_personnel",length=300)
	@NullableSize(max=166)
	public String getJoin_personnel() {
		return join_personnel;
	}
	public void setJoin_personnel(String join_personnel) {
		this.join_personnel = join_personnel;
	}
	
	@Column(name="setting_summary",length=300)
	@NullableSize(max=166)
	public String getSetting_summary() {
		return setting_summary;
	}
	public void setSetting_summary(String setting_summary) {
		this.setting_summary = setting_summary;
	}
	
	@Column(name="setting_process",length=300)
	@NullableSize(max=166)
	public String getSetting_process() {
		return setting_process;
	}
	public void setSetting_process(String setting_process) {
		this.setting_process = setting_process;
	}
	
	@Column(name="com_content_suggest",length=300)
	@NullableSize(max=166)
	public String getCom_content_suggest() {
		return com_content_suggest;
	}
	public void setCom_content_suggest(String com_content_suggest) {
		this.com_content_suggest = com_content_suggest;
	}
	
	@Column(name="setting_summarize",length=300)
	@NullableSize(max=166)
	public String getSetting_summarize() {
		return setting_summarize;
	}
	public void setSetting_summarize(String setting_summarize) {
		this.setting_summarize = setting_summarize;
	}
	
	
}
