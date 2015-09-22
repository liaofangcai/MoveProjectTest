package com.zyeeda.business.recruitment.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;


@Entity
@Table(name = "bz_recruitment_demand")
@Scaffold("/recruitment/recruitment-demand")
public class RecruitmentDemand extends RevisionDomainEntity{
	/**
	 * 序列化
	 */
	 private static final long serialVersionUID = 3728277543938624745L;
	 /**
	  * 部门名称
	  */
	 private Department department;
	 /**
	  * 岗位名称
	  */
	 private String post;
	 /**
	  * 需求人数
	  */
	 private Integer number;
	 /**
	  * 工作经历要求
	  */
	 private String experience;
	 /**
	  * 学历
	  */
	 private String education;
	 /**
	  * 专业
	  */
	 private String major;
	 /**
	  * 工作地点
	  */
	 private String workplace;
	 /**
	  * 是否紧急（0：一般，1：紧急）
	  */
	 private String isUrgent;
	 /**
	  * 其他说明
	  */
	 private String remark;
	 /**
	  * 申请人
	  */
	 private String applier;
	 /**
	  * 申请时间
	  */
   private Date appliedTime;
   /**
    * 状态(0: 关闭，1： 启用 )
    */
   private String enabled;

	@ManyToOne
	@NotNull
	@JoinColumn(name = "f_department_id")
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Column(name = "f_post", length = 300)
	@NotBlank
	@NullableSize(max = 166)
	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	@Column(name = "f_number")
	@NotNull
	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	@Column(name = "f_experience", length = 300)
	@NotBlank
	@NullableSize(max = 166)
	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	@Column(name = "f_education", length = 300)
	@NotBlank
	@NullableSize(max = 166)
	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	@Column(name = "f_major", length = 300)
	@NotBlank
	@NullableSize(max = 166)
	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	@Column(name = "f_work_place", length = 300)
	@NullableSize(max = 166)
	public String getWorkplace() {
		return workplace;
	}

	public void setWorkplace(String workplace) {
		this.workplace = workplace;
	}

	@Column(name = "f_is_urgent",length = 300)
	@NullableSize(max = 166)
	public String getIsUrgent() {
		return isUrgent;
	}

	public void setIsUrgent(String isUrgent) {
		this.isUrgent = isUrgent;
	}

	@Column(name = "f_remark", length = 300)
	@NullableSize(max = 166)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "f_applier",length = 300)
	@NullableSize(max = 166)
	public String getApplier(){
		return applier;
	}
	public void setApplier(String applier){
		this.applier = applier;
	}

	@Temporal(TemporalType.DATE)
  @Column(name = "f_applied_time")
  public Date getAppliedTime() {
      return appliedTime;
  }

  public void setAppliedTime(Date appliedTime) {
      this.appliedTime = appliedTime;
  }

  @Column(name = "f_enabled", length = 300)
  @NullableSize(max = 166)
	public String getEnabled() {
		return enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

}
