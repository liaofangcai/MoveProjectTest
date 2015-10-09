package com.zyeeda.business.attendance.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import javax.persistence.TemporalType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.zyeeda.business.process.entity.ProcessRevisionDomainEntity;
import com.zyeeda.business.process.entity.ApprovalHistory;

import com.zyeeda.cdeio.commons.annotation.scaffold.DateTime;
import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.organization.entity.Account;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;
@Entity
@Table(name = "bz_attendance_daysoff")
@Scaffold("/attendance/daysoff-apply")
public class DaysoffApply extends ProcessRevisionDomainEntity {
    /**
     * 序列化
     */
    private static final long serialVersionUID = 3728277543938624745L;

    /**
     * 请假申请单号
     */
    private String applyNo;

    /**
     * 加班申请
     */
    private OverWorkApply overWorkApply;

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
     * 职位
     */
    private String job;

    /**
     * 调休开始时间
     */
    private Date daysoffBeginDate;

    /**
     * 调休结束时间
     */
    private Date daysoffEndDate;

    /**
     * 调休合计时间
     */
    private String totalTime;

    /**
     * 调休事由
     */
    private String daysoffReason;

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

    @OneToOne
    @NotNull
    @JoinColumn(name = "f_overwork_apply_id")
    public OverWorkApply  getOverWorkApply(){
        return overWorkApply;
    }
    public void setOverWorkApply(OverWorkApply overWorkApply){
        this.overWorkApply = overWorkApply;
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
    @Column(name = "f_job", length = 300)
    @NullableSize(max = 166)
  	public String getJob() {
  		return job;
  	}
  	public void setJob(String job) {
  		this.job = job;
  	}

    @NotNull
    @DateTime
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    @Column(name = "f_daysoff_begin_date")
  	public Date getDaysoffBeginDate() {
  		return daysoffBeginDate;
  	}
  	public void setDaysoffBeginDate(Date daysoffBeginDate) {
  		this.daysoffBeginDate = daysoffBeginDate;
  	}

    @NotNull
    @DateTime
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    @Column(name = "f_daysoff_end_date")
  	public Date getDaysoffEndDate() {
  		return daysoffEndDate;
  	}
  	public void setDaysoffEndDate(Date daysoffEndDate) {
  		this.daysoffEndDate = daysoffEndDate;
  	}


    @Column(name = "f_total_time")
  	public String getTotalTime() {
  		return totalTime;
  	}
  	public void setTotalTime(String totalTime) {
  		this.totalTime = totalTime;
  	}

    @NotBlank
    @Column(name = "f_daysoff_reason")
  	public String getDaysoffReason() {
  		return daysoffReason;
  	}
  	public void setDaysoffReason(String daysoffReason) {
  		this.daysoffReason = daysoffReason;
  	}

    @Transient
    public List<ApprovalHistory> getApprovalHistories() {
        return approvalHistories;
    }

    public void setApprovalHistories(List<ApprovalHistory> approvalHistories) {
        this.approvalHistories = approvalHistories;
    }

}
