package com.zyeeda.business.recruitment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.ManyToOne;
import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.validation.constraint.NullableSize;



@Entity
@Table(name = "bz_recruitment_interview")
@Scaffold("/recruitment/recruitment-interview")
public class RecruitmentInterview extends RevisionDomainEntity{
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 3728277543938624745L;
	/**
	 * 面试时间
	 */
	private Date interviewTime;
	/**
	 * 是否签到
	 */
	private Boolean whetherSign;
	/**
	 * 未签到原因
	 */
	private String signReason;
	/**
	 * 是否复试
	 */
	private Boolean reexamine;
	/**
	 * 未复试原因
	 */
	private String reexamineReason;
	/**
	 * 复试结果
	 */
	private String reexamineResult;
	/**
	 * 是否入职
	 */
	private Boolean whetherEntry;
	/**
	 * 备注
	 */
	private String remark;
	/**
	 *对应resume
	 */
	private RecruitmentResume recruitmentResume;

	@NotNull
	@Temporal(TemporalType.DATE)
  @Column(name = "f_interview_time")
	public Date getInterviewTime() {
		return interviewTime;
	}
	public void setInterviewTime(Date interviewTime) {
		this.interviewTime = interviewTime;
	}

	@Column(name = "f_wherther_sign")
	public Boolean getWhetherSign() {
		return whetherSign;
	}
	public void setWhetherSign(Boolean whetherSign) {
		this.whetherSign = whetherSign;
	}


	@Column(name = "f_sign_reason", length = 300)
	@NullableSize(max = 166)
	public String getSignReason() {
		return signReason;
	}
	public void setSignReason(String signReason) {
		this.signReason = signReason;
	}

	@Column(name = "f_reexamine")
	public Boolean getReexamine() {
		return reexamine;
	}
	public void setReexamine(Boolean reexamine) {
		this.reexamine = reexamine;
	}


	@Column(name = "f_reexamine_reason", length = 300)
	@NullableSize(max = 166)
	public String getReexamineReason() {
		return reexamineReason;
	}
	public void setReexamineReason(String reexamineReason) {
		this.reexamineReason = reexamineReason;
	}

	@Column(name = "f_reexamine_result", length = 300)
	@NullableSize(max = 166)
	public String getReexamineResult() {
		return reexamineResult;
	}
	public void setReexamineResult(String reexamineResult) {
		this.reexamineResult = reexamineResult;
	}

	@Column(name = "f_whether_entry")
	public Boolean getWhetherEntry() {
		return whetherEntry;
	}
	public void setWhetherEntry(Boolean whetherEntry) {
		this.whetherEntry = whetherEntry;
	}

	@Column(name = "f_remark", length = 300)
	@NullableSize(max = 166)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}


	@ManyToOne
	@JoinColumn(name = "f_recruitment_resume_id")
	public RecruitmentResume getRecruitmentResume() {
		return recruitmentResume;
	}

	public void setRecruitmentResume(RecruitmentResume recruitmentResume) {
		this.recruitmentResume = recruitmentResume;
	}
}
