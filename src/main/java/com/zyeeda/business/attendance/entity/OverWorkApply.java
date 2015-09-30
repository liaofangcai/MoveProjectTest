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

import com.zyeeda.business.process.entity.ProcessRevisionDomainEntity;
import com.zyeeda.business.process.entity.ApprovalHistory;

import com.zyeeda.cdeio.commons.annotation.scaffold.Scaffold;
import com.zyeeda.cdeio.commons.organization.entity.Account;
import com.zyeeda.cdeio.commons.organization.entity.Department;
import com.zyeeda.cdeio.validation.constraint.NullableSize;

@Entity
@Table(name = "bz_attendance_overtimework")
@Scaffold("/attendance/overwork-apply")
public class OverWorkApply extends ProcessRevisionDomainEntity {
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
     * 职位
     */
    private String job;

    /**
     * 预计开始时间
     */
    private Date expectedBeginTime;

    /**
     * 预计结束时间
     */
    private Date expectedEndTime;

    /**
     * 加班时段(0:工作日，1:周末, 2:法定节假日)
     */
    private String overTime;

    /**
     * 预计合计时间
     */
    private String expectedTotalTime;

    /**
     * 加班事由
     */
    private String overTimeReason;

    /**
     * 实际开始时间
     */
    private Date beginTime;

    /**
     * 实际结束时间
     */
    private Date endTime;

    /**
     * 实际合计时间
     */
    private String totalTime;
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

    @NotNull
    @Column(name = "f_job", length = 300)
    @NullableSize(max = 166)
    public String getJob() {
    	return job;
    }
    public void setJob(String job) {
    	this.job = job;
    }

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "f_expected_begin_time")
    public Date getExpectedBeginTime() {
    	return expectedBeginTime;
    }
    public void setExpectedBeginTime(Date expectedBeginTime) {
    	this.expectedBeginTime = expectedBeginTime;
    }

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "f_expected_end_time")
    public Date getExpectedEndTime() {
    	return expectedEndTime;
    }
    public void setExpectedEndTime(Date expectedEndTime) {
    	this.expectedEndTime = expectedEndTime;
    }

    @NotBlank
    @Column(name = "f_over_time", length = 300)
    @NullableSize(max = 166)
    public String getOverTime() {
    	return overTime;
    }
    public void setOverTime(String overTime) {
    	this.overTime = overTime;
    }

    @NotBlank
    @Column(name = "f_expected_total_time", length = 300)
    @NullableSize(max = 166)
    public String getExpectedTotalTime() {
    	return expectedTotalTime;
    }

    public void setExpectedTotalTime(String expectedTotalTime) {
    	this.expectedTotalTime = expectedTotalTime;
    }

    @NotBlank
    @Column(name = "f_over_time_reason", length = 300)
    @NullableSize(max = 166)
    public String getOverTimeReason() {
    	return overTimeReason;
    }

    public void setOverTimeReason(String overTimeReason) {
    	this.overTimeReason = overTimeReason;
    }


    @Column(name = "f_begin_time")
    @Temporal(TemporalType.DATE)
    public Date getBeginTime() {
    	return beginTime;
    }
    public void setBeginTime(Date beginTime) {
    	this.beginTime = beginTime;
    }

    @Column(name = "f_end_time")
    @Temporal(TemporalType.DATE)
    public Date getEndTime() {
    	return endTime;
    }
    public void setEndTime(Date endTime) {
    	this.endTime = endTime;
    }

    @Column(name = "f_total_time")
    public String getTotalTime() {
    	return totalTime;
    }
    public void setTotalTime(String totalTime) {
    	this.totalTime = totalTime;
    }

    @Transient
    public List<ApprovalHistory> getApprovalHistories() {
        return approvalHistories;
    }

    public void setApprovalHistories(List<ApprovalHistory> approvalHistories) {
        this.approvalHistories = approvalHistories;
    }

}
