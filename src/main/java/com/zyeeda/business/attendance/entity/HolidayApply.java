package com.zyeeda.business.attendance.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import javax.persistence.TemporalType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.zyeeda.cdeio.commons.annotation.scaffold.DateTime;
import com.zyeeda.business.process.entity.ProcessRevisionDomainEntity;
import com.zyeeda.business.process.entity.ApprovalHistory;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.organization.entity.Account;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;


/**
 * 假期申请
 */
@Entity
@Table(name = "bz_attendance_holiday")
@Scaffold("/attendance/holiday-apply")
public class HolidayApply extends ProcessRevisionDomainEntity {

    /**
     * 序列化
     */
    private static final long serialVersionUID = 3728277543938624745L;
    /**
     * 请假申请单号
     */
    private String applyNo;
    /**
     * 申请人
     */
    private Account applier;

    /**
     * 部门
     */
    private Department department;

    /**
     * 申请日期
     */
    private Date appliedDate;

    /**
     * 请假类别（0:事假，1：病假，2：婚假，3：产假，4：丧假，5：年假，6：其他）
     */
    private String holidayType;

    /**
     * 请假开始时间
     */
    private Date startDate;

    /**
     * 请假结束时间
     */
    private Date endTime;

    /**
     * 请假事由
     */
    private String holidayReason;

    /**
     * 合计时间
     */
    private String totalTime;

    /**
     * 职位代理人
     */
    private String deputy;

    /**
     * 需移交事项
     */
    private String transfer;
    /**
     * 审批历史
     */
    private List<ApprovalHistory> approvalHistories;


  @Column(name = "f_apply_no", length = 300)
  @NullableSize(max = 166)
	public String getApplyNo() {
		return applyNo;
	}
	public void setApplyNo(String applyNo) {
		this.applyNo = applyNo;
	}

  @ManyToOne
  @NotNull
  @JoinColumn(name = "f_account_id")
  public Account getApplier() {
      return applier;
  }

  public void setApplier(Account applier) {
      this.applier = applier;
  }

  @ManyToOne
  @NotNull
  @JoinColumn(name = "f_department_id")
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}

  @NotNull
  @Temporal(TemporalType.DATE)
  @Column(name = "f_applied_time")
	public Date getAppliedDate() {
		return appliedDate;
	}
	public void setAppliedDate(Date appliedDate) {
		this.appliedDate = appliedDate;
	}

	@NotBlank
	@Column(name = "f_holiday_type", length = 300)
	@NullableSize(max = 166)
	public String getHolidayType() {
		return holidayType;
	}
	public void setHolidayType(String holidayType) {
		this.holidayType = holidayType;
	}

  @NotNull
  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name = "f_start_time")
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

  @NotNull
  @DateTime
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
  @Column(name = "f_end_time")
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	@NotBlank
	@Column(name = "f_holiday_reason", length = 300)
	@NullableSize(max = 166)
	public String getHolidayReason() {
		return holidayReason;
	}

	public void setHolidayReason(String holidayReason) {
		this.holidayReason = holidayReason;
	}

	@Column(name = "f_total_time", length = 300)
	@NullableSize(max = 166)
	public String getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(String totalTime) {
		this.totalTime = totalTime;
	}

	@Column(name = "f_deputy", length = 300)
	@NullableSize(max = 166)
	public String getDeputy() {
		return deputy;
	}
	public void setDeputy(String deputy) {
		this.deputy = deputy;
	}

	@Column(name = "f_transfer", length = 300)
	@NullableSize(max = 166)
	public String getTransfer() {
		return transfer;
	}
	public void setTransfer(String transfer) {
		this.transfer = transfer;
	}

  @Transient
  public List<ApprovalHistory> getApprovalHistories() {
      return approvalHistories;
  }

  public void setApprovalHistories(List<ApprovalHistory> approvalHistories) {
      this.approvalHistories = approvalHistories;
  }

}
