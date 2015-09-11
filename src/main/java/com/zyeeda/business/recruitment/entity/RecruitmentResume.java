package com.zyeeda.business.recruitment.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.resource.entity.Attachment;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
import com.zyeeda.cdeio.commons.resource.entity.Attachment;

@Entity
@Table(name = "bz_recruitment_resume")
@Scaffold("/recruitment/recruitment-resume")
public class RecruitmentResume extends RevisionDomainEntity{
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 3728277543938624745L;
	/**
	 * 姓名
	 */
	private String name;
	/**
	 * 性别
	 */
  private Boolean gender;
	/**
	 * 面试职位
	 */
  private String post;
	/**
	 * 身份证号
	 */
  private String idNum;
	/**
	 *学历
	 */
  private String education;
	/**
	 * 专业
	 */
  private String major;
	/**
	 * 联系方式
	 */
  private String  phoneNum;
	/**
	 * 邮箱
	 */
  private String email;
	/**
	 * 毕业院校
	 */
  private String graduateSchool;
	/**
	 * 曾就业单位
	 */
  private String workHistory;
	/**
	 * 参加工作时间
	 */
  private Date timeToWork;
	/**
	 * 工作年限
	 */
  private String workYears;
	/**
	 * 信息来源
	 */
  private String infoSources;
  /**
	 * 其他说明
	 */
  private String remark;
	/**
	 * 附件
	 */
  private List<Attachment> attachments;
  /**
   * 创建时间
   */
  private Date buildTime;
  /**
   *
   * 对应面试记录
   */
  private List<RecruitmentInterview> recruitmentInterviews;

  @NotBlank
  @Column(name = "f_name", length = 300)
	@NullableSize(max = 166)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "f_gender")
	public Boolean getGender() {
		return gender;
	}
	public void setGender(Boolean gender) {
		this.gender = gender;
	}

  @NotBlank
	@Column(name = "f_post", length = 300)
	@NullableSize(max = 166)
	public String getPost() {
		return post;
	}
	public void setPost(String post) {
		this.post = post;
	}

  @NotNull
	@Column(name = "f_idnum")
	public String getIdNum() {
		return idNum;
	}
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}

  @NotBlank
	@Column(name = "f_education", length = 300)
	@NullableSize(max = 166)
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}

  @NotBlank
	@Column(name = "f_major", length = 300)
	@NullableSize(max = 166)
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}

  @NotNull
	@Column(name = "f_phonenum")
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

  @NotBlank
	@Column(name = "f_email", length = 300)
	@NullableSize(max = 166)
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "f_graduate_school", length = 300)
	@NullableSize(max = 166)
	public String getGraduateSchool() {
		return graduateSchool;
	}
	public void setGraduateSchool(String graduateSchool) {
		this.graduateSchool = graduateSchool;
	}

	@Column(name = "f_work_history", length = 300)
	@NullableSize(max = 166)
	public String getWorkHistory() {
		return workHistory;
	}
	public void setWorkHistory(String workHistory) {
		this.workHistory = workHistory;
	}

	@Column(name = "f_time_to_work")
	@Temporal(TemporalType.DATE)
	public Date getTimeToWork() {
		return timeToWork;
	}
	public void setTimeToWork(Date timeToWork) {
		this.timeToWork = timeToWork;
	}

	@Column(name = "f_work_years", length = 300)
	@NullableSize(max = 166)
	public String getWorkYears() {
		return workYears;
	}
	public void setWorkYears(String workYears) {
		this.workYears = workYears;
	}

	@Column(name = "f_info_sources", length = 300)
	@NullableSize(max = 166)
	public String getInfoSources() {
		return infoSources;
	}
	public void setInfoSources(String infoSources) {
		this.infoSources = infoSources;
	}


	@Column(name = "f_remark", length = 300)
	@NullableSize(max = 166)
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Temporal(TemporalType.DATE)
  @Column(name = "f_build_time")
  public Date getBuildTime() {
      return buildTime;
  }

  public void setBuildTime(Date buildTime) {
      this.buildTime = buildTime;
  }

  @NotNull
	@OneToMany(mappedBy = "recruitmentResume")
	public List<RecruitmentInterview> getRecruitmentInterviews() {
		return recruitmentInterviews;
	}

	public void setRecruitmentInterviews(List<RecruitmentInterview> recruitmentInterviews) {
		this.recruitmentInterviews = recruitmentInterviews;
	}

	@OneToMany
	@JoinTable(name = "zda_field_todo_attachment",
	joinColumns = @JoinColumn(name = "f_todo_id"),
	inverseJoinColumns = @JoinColumn(name = "f_attachment_id"))
	public List<Attachment> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
}
