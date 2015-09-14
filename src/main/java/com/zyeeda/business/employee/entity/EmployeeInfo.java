package com.zyeeda.business.employee.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.base.entity.RevisionDomainEntity;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
import com.zyeeda.cdeio.commons.resource.entity.Attachment;


@Entity
@Table(name = "bz_employee_info")
@Scaffold("/employee/employee-info")
public class EmployeeInfo extends RevisionDomainEntity{

  /**
   * 序列化
   */
  private static final long serialVersionUID = 3728277543938624745L;
  /**
   * 姓名
   */
  private String empName;
  /**
   *隶属
   */
  private String membership;
  /**
   * 性别
   */
  private Boolean gender;
  /**
   * 籍贯
   */
  private String origin;
  /**
   * 民族
   */
  private String nation;
  /**
   * 婚姻状况
   */
  private String marriage;
  /**
   * 联系方式
   */
  private String phoneNum;
  /**
   * 身份证号
   */
  private String  idNum;
  /**
   * 生日
   */
  private Date birthday;
  /**
   * 工行卡号
   */
  private String bankNum;
  /**
   * 社保电脑号
   */
  private String insuranceNum;
  /**
   * 公积金号
   */
  private String  accumulationFund;
  /**
   * 归属地
   */
  private String attribution;
  /**
   * 部门
   */
  private Department department;
  /**
   * 岗位
   */
  private String post;
  /**
   * 级别
   */
  private String grade;
  /**
   * 职务
   */
  private String job;
  /**
   * 入职日期
   */
  private Date entryTime;
  /**
   * 在职工龄
   */
  private String seniority;
  /**
   * 试用期
   */
  private String probation;
  /**
   * 转正日期
   */
  private Date positiveDate;

  /**
   * 合同起始
   */
  private Date agreementDate;
  /**
   * 合同期限
   */
  private Integer agreementLast;
  /**
   * 合同结束
   */
  private Date agreementEnd;
  /**
   * 毕业学校
   */
  private String graduateSchool;
  /**
   * 毕业时间
   */
  private Date graduateTime;
  /**
   * 学历
   */
  private String education;
  /**
   * 专业
   */
  private String major;
  /**
   * 户籍地址
   */
  private String accountLocation;
  /**
   * 户籍类型
   */
  private String locationKind;
  /**
   * 现住址
   */
  private String adress;
  /**
   * 紧急联系人
   */
  private String emergency;
  /**
   *  关系
   */
  private String emergencyRelation;
  /**
   * 紧急联系方式
   */
  private String emergencyTel;
  /**
   * 备注
   */
  private String remark;
  /**
   * 其他信息
   *
   */
  private List<OtherInfo> otherInfos;
  /**
   * 是否离职
   */
  private Boolean whetherLeaved;
  /**
   * 离职时间
   */
  private Date leaveDate;
  /**
   * 离职原因
   */
  private String leaveReason;
  /**
   * 离职证明
   */
  private Boolean leaveProve;
  /**
   * 附件
   */
  private List<Attachment> attachments;


  @Column(name = "f_emp_name", length = 300)
  @NotBlank
	@NullableSize(max = 166)
	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	@Column(name = "f_membership", length = 300)
  @NotBlank
	@NullableSize(max = 166)
	public String getMembership() {
		return membership;
	}

	public void setMembership(String membership) {
		this.membership = membership;
	}

	@Column(name = "f_gender")
	public Boolean getGender() {
		return gender;
	}

	public void setGender(Boolean gender) {
		this.gender = gender;
	}

  @Column(name = "f_origin", length = 300)
  @NullableSize(max = 166)
	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	@Column(name = "f_nation", length = 300)
  @NullableSize(max = 166)
	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	@Column(name = "f_marriage", length = 300)
  @NullableSize(max = 166)
	public String getMarriage() {
		return marriage;
	}

	public void setMarriage(String marriage) {
		this.marriage = marriage;
	}

  @Column(name = "f_phone_num")
	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum (String phoneNum) {
		this.phoneNum = phoneNum;
	}

	@Column(name = "f_id_num")
	public String getIdNum() {
		return idNum;
	}

	public void setIdNum (String idNum) {
		this.idNum = idNum;
	}

  @Column(name = "f_birthday")
  @Temporal(TemporalType.DATE)
	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

  @Column(name = "f_bank_num")
	public String getBankNum() {
		return bankNum;
	}

	public void setBankNum (String bankNum) {
		this.bankNum = bankNum;
	}

  @Column(name = "f_insurance_num")
	public String getInsuranceNum() {
		return insuranceNum;
	}

	public void setInsuranceNum (String insuranceNum) {
		this.insuranceNum = insuranceNum;
	}

  @Column(name = "f_accumulationfund")
	public String getAccumulationFund() {
		return accumulationFund;
	}

	public void setAccumulationFund (String accumulationFund) {
		this.accumulationFund = accumulationFund;
	}

  @Column(name = "f_attribution")
  @NullableSize(max = 166)
	public String getAttribution() {
		return attribution;
	}

	public void setAttribution(String attribution) {
		this.attribution = attribution;
	}

  @ManyToOne
  @JoinColumn(name = "f_department_id")
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

  @Column(name = "f_post", length = 300)
  @NullableSize(max = 166)
	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

  @Column(name = "f_grade", length = 300)
  @NullableSize(max = 166)
	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

  @Column(name = "f_job", length = 300)
  @NullableSize(max = 166)
	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

  @Column(name = "f_entry_time")
  @Temporal(TemporalType.DATE)
	public Date getEntryTime() {
		return entryTime;
	}

	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}

  @Column(name = "f_seniority", length = 300)
  @NullableSize(max = 166)
	public String getSeniority() {
		return seniority;
	}

	public void setSeniority(String seniority) {
		this.seniority = seniority;
	}

  @Column(name = "f_probation", length = 300)
  @NullableSize(max = 166)
	public String getProbation() {
		return probation;
	}

	public void setProbation(String probation) {
		this.probation = probation;
	}

  @Column(name = "f_positive_date")
  @Temporal(TemporalType.DATE)
	public Date getPositiveDate() {
		return positiveDate;
	}

	public void setPositiveDate(Date positiveDate) {
		this.positiveDate = positiveDate;
	}

  @Column(name = "f_agreement_date")
  @Temporal(TemporalType.DATE)
	public Date getAgreementDate() {
		return agreementDate;
	}

	public void setAgreementDate(Date agreementDate) {
		this.agreementDate = agreementDate;
	}

  @Column(name = "f_agreement_last")
	public Integer getAgreementLast() {
		return agreementLast;
	}

	public void setAgreementLast(Integer agreementLast) {
		this.agreementLast = agreementLast;
	}

  @Column(name = "f_agreement_end")
  @Temporal(TemporalType.DATE)
	public Date getAgreementEnd() {
		return agreementEnd;
	}

	public void setAgreementEnd(Date agreementEnd) {
		this.agreementEnd = agreementEnd;
	}

  @Column(name = "f_graduate_school", length = 300)
  @NullableSize(max = 166)
	public String getGraduateSchool() {
		return graduateSchool;
	}

	public void setGraduateSchool(String graduateSchool) {
		this.graduateSchool = graduateSchool;
	}

  @Column(name = "f_graduate_time")
  @Temporal(TemporalType.DATE)
	public Date getGraduateTime() {
		return graduateTime;
	}

	public void setGraduateTime(Date graduateTime) {
		this.graduateTime = graduateTime;
	}

  @Column(name = "f_education", length = 300)
  @NullableSize(max = 166)
	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

  @Column(name = "f_major", length = 300)
  @NullableSize(max = 166)
	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

  @Column(name = "f_accountlocation", length = 300)
  @NullableSize(max = 166)
	public String getAccountLocation() {
		return accountLocation;
	}

	public void setAccountLocation(String accountLocation) {
		this.accountLocation = accountLocation;
	}

  @Column(name = "f_location_kind", length = 300)
  @NullableSize(max = 166)
	public String getLocationKind() {
		return locationKind;
	}

	public void setLocationKind(String locationKind) {
		this.locationKind = locationKind;
	}

  @Column(name = "f_adress", length = 300)
  @NullableSize(max = 166)
	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

  @Column(name = "f_emergency", length = 300)
  @NullableSize(max = 166)
	public String getEmergency() {
		return emergency;
	}

	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}

  @Column(name = "f_emergency_relation", length = 300)
  @NullableSize(max = 166)
	public String getEmergencyRelation() {
		return emergencyRelation;
	}

	public void setEmergencyRelation(String emergencyRelation) {
		this.emergencyRelation = emergencyRelation;
	}

  @Column(name = "f_emergency_tel")
	public String getEmergencyTel() {
		return emergencyTel;
	}

	public void setEmergencyTel (String emergencyTel) {
		this.emergencyTel = emergencyTel;
	}

  @Column(name = "f_remark", length = 300)
  @NullableSize(max = 166)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

  @OneToMany(mappedBy = "employeeInfo")
  public List<OtherInfo> getOtherInfos() {
    return otherInfos;
  }

  public void setOtherInfos(List<OtherInfo> otherInfos) {
    this.otherInfos = otherInfos;
  }

  @Column(name = "f_whether_leaved")
  public Boolean getWhetherLeaved(){
    return whetherLeaved;
  }
  public void setWhetherLeaved(Boolean whetherLeaved){
    this.whetherLeaved = whetherLeaved;
  }

  @Column(name = "f_leave_date")
  @Temporal(TemporalType.DATE)
  public Date getLeaveDate() {
    return leaveDate;
  }

  public void setLeaveDate(Date leaveDate) {
    this.leaveDate = leaveDate;
  }

  @Column(name = "f_leave_reason", length = 300)
  @NullableSize(max = 166)
  public String getLeaveReason() {
    return leaveReason;
  }

  public void setLeaveReason(String leaveReason) {
    this.leaveReason = leaveReason;
  }


  @Column(name = "f_leave_prove")
  public Boolean getLeaveProve(){
    return leaveProve;
  }
  public void setLeaveProve(Boolean leaveProve){
    this.leaveProve = leaveProve;
  }

  @OneToMany
  @JoinTable(name = "bz_employee_info_attachment",
  joinColumns = @JoinColumn(name = "f_employee_id"),
  inverseJoinColumns = @JoinColumn(name = "f_attachment_id"))
  public List<Attachment> getAttachments() {
    return attachments;
  }

  public void setAttachments(List<Attachment> attachments) {
    this.attachments = attachments;
  }

}
